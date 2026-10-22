#!/usr/bin/env python3
"""Generate The Chef Code brand book from the canonical JSON tokens."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output/pdf/the-chef-code-brand-book.pdf"
PUBLIC = ROOT / "public/downloads/the-chef-code-brand-book.pdf"
TOKENS = json.loads((ROOT / "data/brand.json").read_text())

W, H = 960, 540
INK = HexColor("#07080A")
PAPER = HexColor("#F7F8FA")
NAVY = HexColor("#071A33")
ORANGE = HexColor("#FF6B22")
BLUE = HexColor("#59B8FF")
MUTED = HexColor("#6E737C")
LINE = Color(12 / 255, 18 / 255, 28 / 255, alpha=0.12)

pdfmetrics.registerFont(TTFont("Sora", ROOT / "tmp/pdfs/fonts/Sora.ttf"))
pdfmetrics.registerFont(TTFont("Inter", ROOT / "tmp/pdfs/fonts/Inter.ttf"))


def rgb(hex_value: str) -> tuple[int, int, int]:
    value = hex_value.lstrip("#")
    return tuple(int(value[i:i+2], 16) for i in (0, 2, 4))


def lerp(a: int, b: int, t: float) -> int:
    return round(a + (b - a) * t)


def gradient(c: Canvas, x: float, y: float, w: float, h: float, start: str, end: str, steps: int = 120) -> None:
    a, b = rgb(start), rgb(end)
    for i in range(steps):
        t = i / max(1, steps - 1)
        c.setFillColorRGB(*(lerp(a[j], b[j], t) / 255 for j in range(3)))
        c.rect(x + w * i / steps, y, w / steps + 1, h, fill=1, stroke=0)


def image_cover(c: Canvas, path: Path, x: float, y: float, w: float, h: float, focus_y: float = 0.5) -> None:
    with Image.open(path) as im:
        iw, ih = im.size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx = x + (w - dw) / 2
    dy = y + (h - dh) * focus_y
    c.saveState()
    clip = c.beginPath(); clip.rect(x, y, w, h); c.clipPath(clip, stroke=0)
    c.drawImage(str(path), dx, dy, dw, dh, mask="auto")
    c.restoreState()


def image_contain(c: Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    with Image.open(path) as im:
        iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(str(path), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def text(c: Canvas, value: str, x: float, y: float, size: float, font: str = "Inter", color=INK) -> None:
    c.setFillColor(color); c.setFont(font, size); c.drawString(x, y, value)


def wrapped(c: Canvas, value: str, x: float, y: float, width: float, size: float = 13, leading: float = 19, font: str = "Inter", color=MUTED, max_lines: int = 8) -> float:
    words, lines, current = value.split(), [], ""
    for word in words:
        probe = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(probe, font, size) <= width:
            current = probe
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    c.setFont(font, size); c.setFillColor(color)
    for line in lines[:max_lines]:
        c.drawString(x, y, line); y -= leading
    return y


def label(c: Canvas, value: str, x: float, y: float, color=ORANGE) -> None:
    text(c, value.upper(), x, y, 8.5, "Inter", color)


def title(c: Canvas, value: str, x: float, y: float, size: float = 46, color=INK) -> None:
    c.setFont("Sora", size); c.setFillColor(color)
    for line in value.split("\n"):
        c.drawString(x, y, line); y -= size * 1.02


def round_box(c: Canvas, x: float, y: float, w: float, h: float, radius: float = 20, fill=white, stroke=LINE) -> None:
    c.setFillColor(fill); c.setStrokeColor(stroke); c.setLineWidth(1)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1)


def footer(c: Canvas, page: int, dark: bool = False) -> None:
    color = Color(1, 1, 1, alpha=.45) if dark else Color(7/255, 8/255, 10/255, alpha=.42)
    text(c, "THE CHEF CODE  /  BRAND SYSTEM V1.0", 48, 24, 7.5, "Inter", color)
    c.setFont("Inter", 7.5); c.setFillColor(color); c.drawRightString(912, 24, f"{page:02d}")


def new_page(c: Canvas, page: int, background=PAPER, dark: bool = False) -> None:
    c.setFillColor(background); c.rect(0, 0, W, H, fill=1, stroke=0); footer(c, page, dark)


def finish(c: Canvas) -> None:
    c.showPage()


def generate() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True); PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    c = Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
    c.setTitle("The Chef Code Brand Book")
    c.setAuthor("The Chef Code")
    c.setSubject("Brand guidelines for The Chef Code and Chef Bot")
    hero = ROOT / "public/images/chefbot.png"
    spotlight = ROOT / "public/images/chefbot-spotlight.png"
    machine = ROOT / "public/images/chefbot-machine.png"

    # 01 Cover
    new_page(c, 1, INK, True)
    c.setFillColor(Color(89/255,184/255,1,alpha=.10)); c.circle(765, 282, 205, fill=1, stroke=0)
    label(c, "Brand guidelines / Version 1.0", 54, 470)
    title(c, "One Chef.\nInfinite Worlds.\nEndless Creations.", 54, 400, 55, white)
    wrapped(c, "The visual, verbal and interface system for The Chef Code and Chef Bot.", 57, 202, 390, 13, 20, "Inter", HexColor("#AEB5C0"))
    image_contain(c, hero, 535, 40, 370, 470)
    finish(c)

    # 02 Foundation
    new_page(c, 2)
    label(c, "01 / Foundation", 48, 482); title(c, "A story-driven\ntechnology brand.", 48, 432, 45)
    wrapped(c, "The Chef Code transforms discoveries from Chef Bot's culinary universe into automated food and beverage experiences in the real world.", 48, 310, 360, 13, 19)
    round_box(c, 468, 284, 444, 174, 26, NAVY, NAVY)
    label(c, "Core idea", 496, 424, HexColor("#91A5BB"))
    title(c, "One Chef. Infinite Worlds.\nEndless Creations.", 496, 368, 29, white)
    round_box(c, 468, 70, 444, 188, 26)
    label(c, "Relationship", 496, 222)
    wrapped(c, "The Chef Code is the company and system. Chef Bot is its recognizable central protagonist: curious, friendly, inventive and slightly adventurous.", 496, 182, 370, 13, 20)
    finish(c)

    # 03 Story system
    new_page(c, 3, white)
    label(c, "02 / Story system", 48, 482); title(c, "Curiosity becomes\ncreation.", 48, 432, 47)
    steps = TOKENS["brand"]["cycle"]
    start_x, y = 48, 240
    for i, step in enumerate(steps):
        x = start_x + i * 174
        c.setFillColor(NAVY if i in (0, 3) else PAPER); c.setStrokeColor(LINE)
        c.roundRect(x, y, 145, 96, 20, fill=1, stroke=1)
        text(c, f"0{i+1}", x+18, y+66, 9, "Inter", BLUE if i in (0,3) else ORANGE)
        text(c, step, x+18, y+28, 17, "Sora", white if i in (0,3) else INK)
        if i < len(steps)-1:
            text(c, ">", x+153, y+39, 16, "Sora", ORANGE)
    wrapped(c, "Every story begins with wonder. A discovery is translated into an idea, engineered into an automated system, then shared as a useful real-world experience.", 48, 156, 820, 14, 22)
    finish(c)

    # 04 Character
    new_page(c, 4, INK, True)
    image_cover(c, spotlight, 0, 0, 474, H, .35)
    label(c, "03 / Character", 520, 478); title(c, "Always\nChef Bot.", 520, 424, 50, white)
    wrapped(c, "His world can change. His recognizable silhouette, chef identity, expressive eyes and compact proportions must remain.", 523, 300, 350, 13, 20, "Inter", HexColor("#AEB5C0"))
    rules = [("DO", "Protect the chef hat, eyes and friendly silhouette."), ("DO", "Use clean studio or story-led cinematic light."), ("AVOID", "Publishing internal turnarounds as campaign artwork."), ("AVOID", "Cropping away every identifying feature.")]
    yy = 210
    for tag, rule in rules:
        color = HexColor("#7DE9C3") if tag == "DO" else HexColor("#FF9B76")
        text(c, tag, 523, yy, 8, "Inter", color); wrapped(c, rule, 580, yy, 300, 10.5, 15, "Inter", white, 2); yy -= 48
    finish(c)

    # 05 Core colors
    new_page(c, 5)
    label(c, "04 / Core color", 48, 482); title(c, "Precision meets possibility.", 48, 430, 43)
    cards = TOKENS["colors"]
    for i, item in enumerate(cards):
        col = i % 4; row = i // 4
        x, y = 48 + col * 218, 248 - row * 174
        round_box(c, x, y, 196, 148, 18, white)
        c.setFillColor(HexColor(item["hex"]) if item["hex"].startswith("#") else white); c.roundRect(x, y+64, 196, 84, 18, fill=1, stroke=0)
        text(c, item["name"], x+14, y+38, 11, "Sora")
        text(c, item["hex"], x+14, y+18, 8.5, "Inter", MUTED)
    finish(c)

    # 06 Universe palettes
    new_page(c, 6, NAVY, True)
    label(c, "05 / Universe palettes", 48, 482); title(c, "Four worlds.\nOne coherent system.", 48, 428, 43, white)
    wrapped(c, "Universe palettes add atmosphere without replacing the core brand. Use them when the story context is explicit.", 48, 320, 370, 13, 20, "Inter", HexColor("#AEBED1"))
    for i, item in enumerate(TOKENS["universes"]):
        x = 468 + (i % 2) * 222; y = 286 - (i // 2) * 166
        gradient(c, x, y, 202, 140, item["from"], item["to"])
        text(c, item["name"], x+16, y+18, 13, "Sora", white)
    finish(c)

    # 07 Typography
    new_page(c, 7, white)
    label(c, "06 / Typography", 48, 482); title(c, "Sora leads.\nInter explains.", 48, 432, 48)
    round_box(c, 48, 76, 410, 248, 26, NAVY, NAVY)
    label(c, "Display / Sora", 74, 288, HexColor("#91A5BB")); title(c, "Infinite\nworlds.", 74, 232, 52, white)
    round_box(c, 480, 76, 432, 248, 26, PAPER)
    label(c, "Body and UI / Inter", 508, 288)
    text(c, "Curiosity becomes creation.", 508, 222, 24, "Inter")
    wrapped(c, "Use Inter for paragraphs, navigation, labels, specifications, data and product interfaces.", 508, 168, 350, 13, 20)
    finish(c)

    # 08 Type scale
    new_page(c, 8)
    label(c, "07 / Type scale", 48, 482); title(c, "A hierarchy for every screen.", 48, 432, 40)
    y = 348
    for item in TOKENS["typeScale"]:
        c.setStrokeColor(LINE); c.line(48, y-18, 912, y-18)
        text(c, item["name"], 48, y, 10, "Sora")
        text(c, item["font"], 272, y, 9.5, "Inter", MUTED)
        text(c, item["size"], 420, y, 9.5, "Inter", MUTED)
        text(c, f"Weight {item['weight']}", 560, y, 9.5, "Inter", MUTED)
        text(c, f"Leading {item['lineHeight']}", 738, y, 9.5, "Inter", MUTED)
        y -= 43
    finish(c)

    # 09 Space and shape
    new_page(c, 9, white)
    label(c, "08 / Space and shape", 48, 482); title(c, "Built on a 4 px rhythm.", 48, 430, 43)
    y0 = 272
    for i, space in enumerate(TOKENS["spacing"]):
        x = 48 + i * 83
        c.setFillColor(ORANGE); c.roundRect(x, y0, min(space, 68), 38, 4, fill=1, stroke=0)
        text(c, str(space), x, y0-22, 8.5, "Inter", MUTED)
    wrapped(c, "4-16 px: controls and tight component gaps. 24-48 px: cards and content groups. 64-128 px: page margins and cinematic section pacing.", 48, 188, 820, 13, 21)
    for i, radius in enumerate(TOKENS["radii"]):
        x = 48 + i * 218
        round_box(c, x, 70, 196, 84, min(38, 18+i*7), PAPER)
        text(c, radius["name"], x+16, 116, 10, "Sora"); text(c, radius["value"], x+16, 90, 9, "Inter", MUTED)
    finish(c)

    # 10 Imagery and product bridge
    new_page(c, 10, INK, True)
    label(c, "09 / Imagery", 48, 482); title(c, "Discovery,\nmade real.", 48, 430, 47, white)
    wrapped(c, "Use Chef Bot to carry narrative emotion. Use product imagery as the bridge from fictional discovery to engineered experience - never as a disconnected sales interruption.", 48, 302, 354, 13, 20, "Inter", HexColor("#AEB5C0"))
    image_cover(c, machine, 454, 58, 458, 424, .5)
    text(c, "DO", 48, 188, 8, "Inter", HexColor("#7DE9C3")); wrapped(c, "Protect subject focus, give imagery breathing room and keep light direction intentional.", 48, 164, 330, 11, 17, "Inter", white)
    text(c, "AVOID", 48, 100, 8, "Inter", HexColor("#FF9B76")); wrapped(c, "Busy overlays, stretched assets, inconsistent character proportions or public use of reference sheets.", 48, 76, 330, 11, 17, "Inter", white)
    finish(c)

    # 11 Interface and motion
    new_page(c, 11, NAVY, True)
    label(c, "10 / Interface and motion", 48, 482); title(c, "Clear, warm and\nquietly futuristic.", 48, 430, 44, white)
    round_box(c, 48, 80, 518, 224, 26, white, white)
    text(c, "The Chef Code", 74, 268, 11, "Sora"); text(c, "STORY   UNIVERSES   CREATIONS", 240, 268, 7.5, "Inter", MUTED)
    text(c, "The next universe", 74, 214, 8, "Inter", ORANGE); title(c, "Discovery, made real.", 74, 170, 32)
    c.setFillColor(ORANGE); c.roundRect(74, 104, 130, 34, 17, fill=1, stroke=0); text(c, "Explore the universe", 90, 116, 8, "Inter", white)
    motion = [("Reveal", "800 ms", "Gentle rise with restrained easing."), ("Hover", "250 ms", "Subtle elevation, never spectacle."), ("Reduced motion", "Required", "Remove motion; preserve meaning.")]
    for i, (a,b,d) in enumerate(motion):
        x, y = 594, 230 - i*78
        label(c, a, x, y+40, HexColor("#91A5BB")); text(c, b, x, y+14, 15, "Sora", white); wrapped(c, d, 718, y+14, 182, 9.5, 14, "Inter", HexColor("#AEBED1"), 2)
    finish(c)

    # 12 Voice + quick reference
    new_page(c, 12)
    label(c, "11 / Voice and quick reference", 48, 482); title(c, "Wonder without noise.", 48, 430, 44)
    voice = [("CURIOUS", "Invite discovery."), ("INVENTIVE", "Make technology tangible."), ("FRIENDLY", "Use plain human language."), ("CINEMATIC", "Write in scenes.")]
    for i, (a,b) in enumerate(voice):
        x = 48 + (i%2)*250; y = 276 - (i//2)*92
        label(c, a, x, y+44); text(c, b, x, y+14, 15, "Sora")
    round_box(c, 570, 124, 342, 256, 26, INK, INK)
    label(c, "Quick reference", 596, 344, BLUE)
    refs = ["Display: Sora", "Body and UI: Inter", "Primary action: Orange", "Story depth: Navy and Blue", "Base spacing: 4 px", "Cards: 24 / 32 / 38 px", "Motion: restrained + optional"]
    yy = 310
    for ref in refs:
        text(c, ref, 596, yy, 11, "Inter", white); yy -= 28
    text(c, "One Chef. Infinite Worlds. Endless Creations.", 48, 84, 13, "Sora", NAVY)
    finish(c)

    c.save()
    PUBLIC.write_bytes(OUT.read_bytes())


if __name__ == "__main__":
    generate()
