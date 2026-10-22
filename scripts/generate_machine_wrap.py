#!/usr/bin/env python3
"""Generate editable SVG wrap masters and an annotated measured-proof PDF."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
TOKENS_PATH = ROOT / "design/machine-wrap/tokens.json"
TOKENS = json.loads(TOKENS_PATH.read_text())
OUT = ROOT / "output/machine-wrap"
SVG_DIR = OUT / "svg"
PDF_DIR = ROOT / "output/pdf"
PDF_PATH = PDF_DIR / "the-chef-code-machine-wrap-measured-proof.pdf"
CHEFBOT = ROOT / "public/images/chefbot.png"
MOCKUP_3Q = OUT / "mockups/chefbot-machine-three-quarter.png"
MOCKUP_FRONT = OUT / "mockups/chefbot-machine-front.png"
FONT_SORA = ROOT / "app/fonts/Sora-Variable.ttf"
FONT_INTER = ROOT / "app/fonts/Inter-Variable.ttf"

COLORS = TOKENS["colors"]
NAVY = HexColor(COLORS["navy"])
INK = HexColor(COLORS["ink"])
BLUE = HexColor(COLORS["blue"])
ORANGE = HexColor(COLORS["orange"])
PAPER = HexColor(COLORS["paper"])
MUTED = HexColor("#6E737C")
RED = HexColor(COLORS["warning"])


def esc(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def wave_paths(width: int, height: int) -> str:
    y = int(height * 0.76)
    return f"""
      <path d="M 0 {y} C {width*.2:.0f} {y-height*.09:.0f}, {width*.42:.0f} {y+height*.09:.0f}, {width*.63:.0f} {y} S {width*.88:.0f} {y-height*.1:.0f}, {width} {y-height*.04:.0f} L {width} {height} L 0 {height} Z" fill="{COLORS['navy']}"/>
      <path d="M 0 {y-height*.04:.0f} C {width*.2:.0f} {y-height*.14:.0f}, {width*.42:.0f} {y+height*.03:.0f}, {width*.63:.0f} {y-height*.06:.0f} S {width*.88:.0f} {y-height*.16:.0f}, {width} {y-height*.1:.0f}" fill="none" stroke="{COLORS['blue']}" stroke-width="{max(12,width*.012):.0f}"/>
      <path d="M 0 {y-height*.09:.0f} C {width*.2:.0f} {y-height*.19:.0f}, {width*.42:.0f} {y-height*.02:.0f}, {width*.63:.0f} {y-height*.11:.0f} S {width*.88:.0f} {y-height*.21:.0f}, {width} {y-height*.15:.0f}" fill="none" stroke="{COLORS['pale_blue']}" stroke-width="{max(28,width*.022):.0f}"/>
      <path d="M 0 {y-height*.15:.0f} C {width*.2:.0f} {y-height*.25:.0f}, {width*.42:.0f} {y-height*.08:.0f}, {width*.63:.0f} {y-height*.17:.0f} S {width*.88:.0f} {y-height*.27:.0f}, {width} {y-height*.21:.0f}" fill="none" stroke="{COLORS['orange']}" stroke-width="{max(8,width*.006):.0f}"/>
    """


def bubbles(width: int, height: int) -> str:
    circles = [(0.10,0.12,0.035),(0.18,0.20,0.018),(0.85,0.14,0.024),(0.78,0.69,0.015)]
    return "".join(f'<circle cx="{width*x:.0f}" cy="{height*y:.0f}" r="{width*r:.0f}" fill="none" stroke="{COLORS["blue"]}" stroke-width="8" opacity=".9"/>' for x,y,r in circles)


def brand_block(width: int, height: int, large: bool = True) -> str:
    size = int(width * (.115 if large else .085))
    tagline = int(width * .028)
    return f"""
      <text x="{width/2:.0f}" y="{height*.2:.0f}" text-anchor="middle" fill="{COLORS['navy']}" font-family="Sora, Arial, sans-serif" font-size="{size}" font-weight="700">{esc(TOKENS['copy']['brand'])}</text>
      <path d="M {width*.48:.0f} {height*.225:.0f} Q {width*.5:.0f} {height*.235:.0f} {width*.52:.0f} {height*.225:.0f}" fill="none" stroke="{COLORS['orange']}" stroke-width="10" stroke-linecap="round"/>
      <text x="{width/2:.0f}" y="{height*.245:.0f}" text-anchor="middle" fill="{COLORS['navy']}" font-family="Inter, Arial, sans-serif" font-size="{tagline}" font-weight="600" letter-spacing="2">{esc(TOKENS['copy']['tagline'])}</text>
    """


def chefbot_link(x: int, y: int, w: int, h: int) -> str:
    relative = "../../../public/images/chefbot.png"
    return f'<image href="{relative}" x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet" opacity=".96"/>'


def svg_document(panel: str, width: int, height: int, physical: tuple[float,float] | None, include_bot: bool = False, front: bool = False) -> str:
    physical_attrs = f' width="{physical[0]}in" height="{physical[1]}in"' if physical else ""
    safe = int(min(width, height) * .035)
    cutouts = ""
    if front:
        cutouts = f"""
          <g id="provisional-cutouts" data-print="false" style="display:none">
            <rect x="280" y="1300" width="1780" height="1200" rx="45" fill="none" stroke="{COLORS['warning']}" stroke-width="18" stroke-dasharray="50 32"/>
            <rect x="2240" y="1450" width="650" height="820" rx="35" fill="none" stroke="{COLORS['warning']}" stroke-width="18" stroke-dasharray="50 32"/>
            <rect x="300" y="2850" width="2700" height="1650" rx="45" fill="none" stroke="{COLORS['warning']}" stroke-width="18" stroke-dasharray="50 32"/>
            <text x="1600" y="4700" text-anchor="middle" fill="{COLORS['warning']}" font-family="Inter, Arial" font-size="110" font-weight="800">VERIFY ALL CUTOUTS ON MACHINE BEFORE PRINTING</text>
          </g>
        """
    bot = chefbot_link(int(width*.55), int(height*.32), int(width*.42), int(height*.45)) if include_bot else ""
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}"{physical_attrs} data-panel="{panel}" data-status="{TOKENS['status']}">
  <title>{esc(TOKENS['project'])} - {panel}</title>
  <desc>Editable measured-proof artwork. Verify all dimensions and cutouts on the physical machine before printing.</desc>
  <g id="background"><rect width="{width}" height="{height}" fill="{COLORS['white']}"/></g>
  <g id="brand-architecture">{wave_paths(width,height)}{bubbles(width,height)}</g>
  <g id="character">{bot}</g>
  <g id="typography">{brand_block(width,height,not include_bot)}</g>
  <g id="safe-area" data-print="false" style="display:none"><rect x="{safe}" y="{safe}" width="{width-safe*2}" height="{height-safe*2}" fill="none" stroke="{COLORS['orange']}" stroke-width="10" stroke-dasharray="30 20"/></g>
  {cutouts}
  <g id="bleed" data-print="false" style="display:none"><rect x="2" y="2" width="{width-4}" height="{height-4}" fill="none" stroke="{COLORS['blue']}" stroke-width="4"/></g>
</svg>
"""


def write_svgs() -> None:
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    panels = {
        "front-32x75in.svg": svg_document("front", 3200, 7500, (32,75), False, True),
        "rear-32x75in.svg": svg_document("rear", 3200, 7500, (32,75), False, False),
        "left-side-depth-variable.svg": svg_document("left-side-depth-variable", 1200, 3000, None, True, False),
        "right-side-depth-variable.svg": svg_document("right-side-depth-variable", 1200, 3000, None, True, False),
        "top-depth-variable.svg": svg_document("top-depth-variable", 3200, 1200, None, False, False),
    }
    for name, content in panels.items():
        (SVG_DIR / name).write_text(content)
    readme = """# The Chef Code Machine Wrap - Measured Proof\n\nPROVISIONAL: VERIFY ON MACHINE BEFORE PRINTING.\n\n- Front and rear use the scan's provisional 32 x 75 inch overall size.\n- Side and top SVGs use normalized viewBoxes because physical depth is unknown. Set their horizontal dimension to the measured machine depth before production.\n- Layer IDs: background, brand-architecture, character, typography, safe-area, provisional-cutouts, bleed.\n- Hidden annotation layers use `data-print=false`; do not enable them in production artwork.\n- Linked Chef Bot artwork is intentional and located at `public/images/chefbot.png`. Package it with the SVG masters.\n- Convert Sora and Inter text to outlines in the printer's preflight workflow after copy approval.\n- Add printer-specific bleed only after physical measurement and substrate confirmation.\n"""
    (OUT / "README.md").write_text(readme)


W, H = landscape((960, 540))


def fit_image(c: Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    with Image.open(path) as im:
        iw, ih = im.size
    s = min(w/iw, h/ih)
    dw, dh = iw*s, ih*s
    c.drawImage(str(path), x+(w-dw)/2, y+(h-dh)/2, dw, dh, preserveAspectRatio=True, mask="auto")


def ptext(c: Canvas, value: str, x: float, y: float, size: float, font: str = "Inter", color=INK) -> None:
    c.setFillColor(color); c.setFont(font,size); c.drawString(x,y,value)


def wrapped(c: Canvas, value: str, x: float, y: float, width: float, size=11, leading=17, color=MUTED, font="Inter") -> float:
    words=value.split(); lines=[]; line=""
    for word in words:
        test=(line+" "+word).strip()
        if pdfmetrics.stringWidth(test,font,size)<=width: line=test
        else: lines.append(line); line=word
    if line: lines.append(line)
    for row in lines:
        ptext(c,row,x,y,size,font,color); y-=leading
    return y


def page_base(c: Canvas, number: int, dark=False) -> None:
    c.setFillColor(NAVY if dark else PAPER); c.rect(0,0,W,H,fill=1,stroke=0)
    color=Color(1,1,1,.45) if dark else Color(0,0,0,.38)
    ptext(c,"THE CHEF CODE / MACHINE WRAP MEASURED PROOF",42,22,7,"Inter",color)
    c.setFillColor(color); c.setFont("Inter",7); c.drawRightString(W-42,22,f"{number:02d}")


def heading(c: Canvas, label: str, title: str, x=42, y=475, dark=False) -> None:
    ptext(c,label.upper(),x,y,8,"Inter",ORANGE)
    ptext(c,title,x,y-48,34,"Sora",white if dark else INK)


def warning(c: Canvas, x: float, y: float, w: float) -> None:
    c.setFillColor(HexColor("#FFF0EF")); c.setStrokeColor(Color(229/255,50/255,45/255,.28)); c.roundRect(x,y,w,44,10,fill=1,stroke=1)
    ptext(c,"VERIFY ON MACHINE BEFORE PRINTING",x+14,y+16,9,"Inter",RED)


def generate_pdf() -> None:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    c=Canvas(str(PDF_PATH),pagesize=(W,H),pageCompression=1)
    c.setTitle("The Chef Code Machine Wrap - Measured Proof")
    c.setAuthor("The Chef Code")

    page_base(c,1,True); heading(c,"Measured proof / v1.0","Premium by design.\nMeasured before print.",42,478,True)
    wrapped(c,"A classic white and navy full-exterior wrap concept for the Chef Bot automated beverage machine.",46,335,360,13,20,HexColor("#AEBED1"))
    warning(c,46,80,310); fit_image(c,MOCKUP_3Q,455,42,455,465); c.showPage()

    page_base(c,2); heading(c,"Approval mockup","Three-quarter product view")
    fit_image(c,MOCKUP_3Q,42,55,876,360); warning(c,618,435,300); c.showPage()

    page_base(c,3); heading(c,"Approval mockup","Straight-on front view")
    fit_image(c,MOCKUP_FRONT,330,48,300,390)
    ptext(c,"PROVISIONAL OVERALL",42,345,8,"Inter",ORANGE); ptext(c,"32 in wide",42,302,25,"Sora",NAVY); ptext(c,"75 in high",42,265,25,"Sora",NAVY)
    wrapped(c,"The scan supports the overall front proportion only. Every opening, seam and hardware position must be measured physically.",42,212,230,11,17)
    warning(c,660,78,258); c.showPage()

    page_base(c,4); heading(c,"Panel system","Editable vector masters")
    cards=[("FRONT","32 x 75 in","Provisional cutout layer"),("REAR","32 x 75 in","Confirm vents and service labels"),("LEFT / RIGHT","Depth variable","Extend fields; protect Chef Bot"),("TOP","Depth variable","Confirm access and clearances")]
    for i,(name,size,note) in enumerate(cards):
        x=42+(i%2)*448; y=278-(i//2)*162
        c.setFillColor(white); c.setStrokeColor(Color(0,0,0,.1)); c.roundRect(x,y,420,134,18,fill=1,stroke=1)
        ptext(c,name,x+22,y+94,8,"Inter",ORANGE); ptext(c,size,x+22,y+59,20,"Sora",NAVY); ptext(c,note,x+22,y+25,9.5,"Inter",MUTED)
    c.showPage()

    page_base(c,5,True); heading(c,"Visual language","Clean. Hygienic. Premium.",42,478,True)
    wrapped(c,"White communicates cleanliness. Navy creates disciplined architecture. Pale blue adds freshness and technology. Orange is reserved for energy and action.",46,345,400,12,19,HexColor("#AEBED1"))
    palette=[("PAPER",COLORS["paper"]),("NAVY",COLORS["navy"]),("BLUE",COLORS["blue"]),("ORANGE",COLORS["orange"])]
    for i,(name,value) in enumerate(palette):
        x=500+i*102; c.setFillColor(HexColor(value)); c.circle(x,285,36,fill=1,stroke=0); ptext(c,name,x-28,225,8,"Inter",white); ptext(c,value,x-28,207,7,"Inter",HexColor("#91A5BB"))
    ptext(c,"MINIMAL IDENTITY",46,176,8,"Inter",ORANGE); ptext(c,TOKENS["copy"]["brand"],46,128,30,"Sora",white); ptext(c,TOKENS["copy"]["tagline"],46,90,11,"Inter",HexColor("#AEBED1")); c.showPage()

    page_base(c,6); heading(c,"Printer measurement sheet","Measure once. Produce correctly.")
    items=["Overall depth","Display opening: W x H + left/top offset","Payment panel: W x H + left/top offset","Dispensing bay: W x H + left/top offset","Cup opening: W x H + left/top offset","Door seams, hinges, locks and handles","Side/rear vents and service clearances","Substrate, laminate, bleed and max panel width"]
    for i,item in enumerate(items):
        col=i%2; row=i//2; x=42+col*448; y=350-row*72
        c.setStrokeColor(Color(0,0,0,.18)); c.rect(x,y,24,24,fill=0,stroke=1); ptext(c,item,x+38,y+7,10,"Inter",INK); c.line(x+38,y-10,x+400,y-10)
    warning(c,42,52,360); c.showPage()

    page_base(c,7); heading(c,"Production layers","What prints and what does not")
    rows=[("PRINT","background","Full-bleed white/navy field"),("PRINT","brand-architecture","Blue waves, orbit lines, orange accent"),("PRINT","character","Intentional linked Chef Bot artwork"),("PRINT","typography","Convert Sora and Inter to outlines at preflight"),("DO NOT PRINT","safe-area","Hidden layout guide"),("DO NOT PRINT","provisional-cutouts","Measurement and warning layer"),("DO NOT PRINT","bleed","Printer-specific guide")]
    y=374
    for status,name,note in rows:
        ptext(c,status,42,y,8,"Inter",ORANGE if status=="PRINT" else RED); ptext(c,name,170,y,11,"Sora",NAVY); ptext(c,note,365,y,10,"Inter",MUTED); c.setStrokeColor(Color(0,0,0,.1)); c.line(42,y-16,918,y-16); y-=45
    c.showPage()

    page_base(c,8,True); heading(c,"Handoff","Ready for physical measurement",42,478,True)
    wrapped(c,"This package is a professional measured proof, not authorization to print. A vinyl installer must measure the physical cabinet, transfer final cutouts into the hidden SVG layers, confirm bleed and safe zones, then issue a final production proof.",46,345,430,13,20,HexColor("#AEBED1"))
    ptext(c,"FILES INCLUDED",540,365,8,"Inter",ORANGE)
    files=["5 editable SVG panel masters","Annotated 8-page PDF proof","Front and three-quarter mockups","Shared tokens and printer checklist"]
    yy=324
    for item in files: ptext(c,"+",540,yy,12,"Sora",BLUE); ptext(c,item,566,yy,11,"Inter",white); yy-=46
    warning(c,46,76,310); c.showPage(); c.save()


if __name__ == "__main__":
    OUT.mkdir(parents=True,exist_ok=True)
    pdfmetrics.registerFont(TTFont("Sora",str(FONT_SORA)))
    pdfmetrics.registerFont(TTFont("Inter",str(FONT_INTER)))
    write_svgs(); generate_pdf()
