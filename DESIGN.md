# DESIGN.md — Shubham Kumar Portfolio

### Feel-spec: "A character sheet rendered in the menu system of *Final Fantasy VI* (SNES, 1994)"

> This is a feel spec, not a component library. The builder implements to it. Every decision below is anchored to a real fact about FF6's actual visuals. When in doubt, ask: *"Does this look like a screen you could have paused the SNES on in 1994?"* If not, it's wrong.

---

## 0. The single biggest fix from v1

v1 was "slop": flat, bare, generic-pixel. Three root causes, ranked:

1. **Wrong font.** v1 almost certainly reached for `Press Start 2P` (the default "retro" choice). FF6 does **NOT** use a chunky, blocky, monospaced pixel font. FF6's font is a **variable-width, near-serif, elegant pixel face with a soft drop-shadow** (technically a 1bpp glyph rendered to 2bpp via a software shadow — that shadow is the whole vibe). Press Start 2P reads as "indie jam game / EarthBound-cute." FF6 reads as "operatic / library-of-a-mage." **This is the #1 change.**
2. **Dead empty space.** FF6 menus are *dense and information-rich* — every window is packed with stats, sub-windows, and framing. v1 left big dark voids. Fill them with framing, sub-windows, and ambient detail.
3. **No window system.** FF6's identity IS the blue beveled window with the white rounded border. v1 used plain cards. Everything on this site lives inside an FF6 window.

---

## 1. Mood / North Star

**The feeling: opening a save file for a hero you respect.** Calm, dramatic, and reverent — the hush of a paused JRPG menu at 2am, blue windows glowing over a dark world map, an orchestral score holding a single sustained chord. It must feel *operatic and elegant*, never *cute or jokey*. FF6 is the gothic/steampunk "opera" Final Fantasy — magitek armor, espers, a literal opera scene — so the register is **melancholy grandeur**, not chibi whimsy. The visitor should feel they are reading the stat screen of a serious protagonist, with the quiet confidence of a game that knows it's a classic.

---

## 2. Color Palette

FF6's signature window is a **diagonal blue gradient**: brightest at top-left, darkest at bottom-right. The real SNES default window's blue channel runs **176 (TL) → 128 (TR) → 80 (BL) → 32 (BR)** across the four corners. We reproduce that exact behavior.

### Core roles

| Role | Hex | Notes |
|---|---|---|
| `--bg-void` | `#0A0A14` | Near-black blue-violet. The "world behind the menu." Never pure `#000`. |
| `--bg-void-2` | `#141022` | Slightly warmer/violet for layered backgrounds, vignette centers. |
| **Window gradient (the signature element)** | | Diagonal, 135deg, TL→BR |
| `--win-tl` | `#3858C8` | Top-left, brightest blue (blue≈200, lifted from SNES 176 for screen luminance). |
| `--win-tr` | `#2A44A8` | Top-right. |
| `--win-bl` | `#1C2E78` | Bottom-left. |
| `--win-br` | `#101A48` | Bottom-right, darkest. |
| `--win-border` | `#F4F4FC` | The white rounded border. Faintly cool, never pure white. |
| `--win-border-shadow` | `#8890C8` | Inner bevel shadow under the white border. |
| `--ink` | `#FFFFFF` | Primary text — pure white with a hard 1px drop shadow (see typography). |
| `--ink-shadow` | `#101038` | The mandatory text drop-shadow color (deep indigo, not black). |
| `--ink-dim` | `#B8C0E8` | Secondary / label text inside windows. |

### Accents (use sparingly, like FF6 status colors)

| Role | Hex | Use |
|---|---|---|
| `--gold` | `#F0C040` | Headings, the ► cursor, window-title flourishes, selected-row highlight. FF6's "important number" yellow. |
| `--gold-deep` | `#B8860B` | Gold shadow / ornament linework. |
| `--hp-green` | `#48C048` | HP bars, "online/available" states. |
| `--mp-blue` | `#48A0E8` | MP bars, links, info accents. |
| `--magic-violet` | `#B060E0` | Esper/magic accents, rare highlights (the "magicite" glow). |
| `--danger-red` | `#E04848` | Low-HP / error / destructive only. |
| `--exp-amber` | `#E89030` | Progress / "to next level" fills. |

**Rule:** background is dark, windows are blue, text is white-with-shadow, and gold is the ONLY warm accent that appears regularly. HP-green/MP-blue/magic-violet are reserved for actual bar-and-stat moments. Do not rainbow the page.

---

## 3. Typography

**THE FIX: do not use Press Start 2P or any chunky blocky monospaced pixel font.** FF6's face is elegant, variable-width, and near-serif with a soft shadow.

### Recommended Google Fonts

- **Display / headings / character name → `Cinzel`** (700/900). A refined engraved Roman serif — gives the "opera title card / esper inscription" gravitas. This is the operatic, elegant register FF6's title screen evokes. Fallback: `Spectral` (600/700).
- **UI labels, stat rows, menu text → `VT323`** OR **`Silkscreen` (sparingly)**. For the *authentic pixel menu* texture use a clean readable pixel face. Prefer **`Pixelify Sans`** (400/500/600) — it is variable-width and rounded-elegant, the closest free analog to FF6's actual glyphs. **Do not use Press Start 2P.**
- **Body / paragraphs (Lore, project descriptions) → `Spectral`** (400/500) or **`EB Garamond`**. A literary serif keeps long reading comfortable and reinforces the "ancient tome" mood. Never set long body copy in a pixel font.

> Pairing logic: `Cinzel` (engraved titles) + `Pixelify Sans` (menu chrome) + `Spectral` (readable lore). One ornate, one pixel, one literary.

### Scale & treatment

| Token | Font | Size (desktop) | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| Hero name | Cinzel | `clamp(3rem, 8vw, 6rem)` | 900 | `0.08em` | 1.0 |
| Section title | Cinzel | `2rem` | 700 | `0.12em` (UPPERCASE) | 1.1 |
| Window title bar | Pixelify Sans | `1.1rem` | 600 | `0.05em` | 1 |
| Menu / stat row | Pixelify Sans | `1rem` | 500 | `0.02em` | 1.3 |
| Numbers (HP/MP/levels) | Pixelify Sans | `1.1rem` | 600 | `0` (tabular) | 1 |
| Body / lore | Spectral | `1.05rem` | 400 | `0` | 1.65 |
| Caption / hint | Pixelify Sans | `0.8rem` | 400 | `0.03em` | 1.4 |

### The mandatory text shadow (do not skip — this IS FF6 text)

All pixel-font and white menu text gets a **hard 1px offset drop shadow**, never a soft blur:

```css
text-shadow: 1px 1px 0 var(--ink-shadow); /* #101038 */
```

Gold headings: `text-shadow: 2px 2px 0 var(--gold-deep);`

**Outline text:** use sparingly, only on the Hero name over busy backgrounds — a 2px dark stroke (`-webkit-text-stroke` or layered shadows) to keep it legible, FF6 title-card style.

---

## 4. The FF6 Window System (the core recipe)

Every content block on this site is an FF6 window. Get this one component perfect and the whole site feels right.

### 4.1 The blue beveled window

```css
.ff-window {
  position: relative;
  /* Signature diagonal blue gradient: bright TL → dark BR */
  background:
    linear-gradient(135deg,
      var(--win-tl) 0%,
      var(--win-tr) 35%,
      var(--win-bl) 70%,
      var(--win-br) 100%);
  /* White rounded border */
  border: 3px solid var(--win-border);
  border-radius: 10px;
  /* Inner bevel: light top-left, dark bottom-right (raised SNES look) */
  box-shadow:
    inset 2px 2px 0 rgba(255,255,255,0.25),   /* top-left highlight  */
    inset -2px -2px 0 rgba(16,16,56,0.55),     /* bottom-right shade  */
    0 0 0 1px var(--win-border-shadow),        /* crisp outer line    */
    0 8px 24px rgba(0,0,0,0.55);               /* drop the window off the void */
  padding: 1.25rem 1.5rem;
  color: var(--ink);
}
```

Notes:
- Border is **3px white, ~10px corner radius** — FF6 windows are rounded rectangles, NOT sharp boxes.
- The **inset highlight/shade pair** is what makes it read as a beveled, glassy SNES window. Don't omit it.
- Optional faint **inner glow** for hero/feature windows: add `inset 0 0 30px rgba(120,160,255,0.15)`.

### 4.2 The ► selection cursor

FF6's hand/arrow cursor sits to the LEFT of the selected row and bobs.

```css
.ff-row { position: relative; padding-left: 1.6rem; }
.ff-row.is-active::before {
  content: "\25BA";              /* ► */
  position: absolute; left: 0.2rem; top: 50%;
  transform: translateY(-50%);
  color: var(--gold);
  text-shadow: 1px 1px 0 var(--gold-deep);
  animation: cursor-bob 0.6s steps(2) infinite;
}
@keyframes cursor-bob { 0%,100%{ left:0.2rem } 50%{ left:0.45rem } }
```

Selected row also gets a subtle highlight band: `background: rgba(240,192,64,0.12);` (gold wash).

### 4.3 Dialogue / message box

A wider, shorter window pinned visually "lower." Same gradient/border, plus:
- A blinking ▼ "more text" indicator (gold) in the bottom-right corner.
- Text reveals via typewriter (see Motion §6).
- Optionally a small portrait sub-window on the left (use it for the Hero intro and Save Point/contact).

### 4.4 Menu list rows

- Rows are dense: label left, value right-aligned (e.g. `LV` ........ `27`), leader behavior optional.
- Row height ~`2.2rem`, separated by a faint divider `border-bottom: 1px solid rgba(255,255,255,0.08)`.
- Numbers right-aligned and gold; labels white/dim.
- Group rows under tiny **title sub-bars** (gold uppercase, e.g. `— EQUIPMENT —`).

### 4.5 Window title tab

FF6 often labels a window with a small header. Render section windows with a **title chip** overlapping the top border: gold Cinzel text on a darker inset strip, e.g. `❖ QUEST LOG ❖`. Flank titles with a small diamond/❖ glyph for ornament.

---

## 5. Layout System

**Directly addressing the "bare/empty" failure: density is the aesthetic.** FF6 fills the frame.

- **Grid:** 12-col, max content width ~`1100px`, generous outer gutter so the dark void frames the windows (the void is intentional *around* windows, never *inside* them).
- **Spacing scale (8px base):** `4, 8, 12, 16, 24, 32, 48, 64`. Inside windows, keep it tight (12–16px); between windows, breathe (32–48px).
- **Window-in-window:** the hallmark. A section is a big window containing smaller windows (stat panels, a portrait box, a mini-map). Nest at least one sub-window per major section so nothing reads as a flat card.
- **Asymmetry:** FF6's main menu = tall narrow command list on the left + wide party/status panel on the right. Use that 1/3 + 2/3 split for Stats and Quest Log instead of centered symmetry.
- **Focal hierarchy:** gold draws the eye → use it only on the one thing per screen that matters most (active row, key stat, section title). Everything else is white/dim.
- **Ambient fill (kills dead space):** faint scanline overlay, a low-opacity Mode-7-style perspective grid or starfield behind windows, corner ornaments (❖/◆), and a vignette pulling focus to center. The background should always have *something* — a dim world map, drifting magicite particles — never a flat dark rectangle.
- **Borders everywhere:** thin gold hairline dividers, double-line frames on feature blocks. FF6 never lets an edge go unadorned.

---

## 6. Motion Language (GSAP)

**Restrained, purposeful, mechanical.** FF6 motion is snappy and stepped (it's a 60fps sprite game), not slow and easeful. Favor short durations and slight "stepped" feels over long luxurious tweens.

- **Window open:** windows *expand from a thin horizontal line* — the classic SNES menu open. GSAP: animate `scaleY: 0 → 1` (transform-origin center) over `0.25s`, `ease: "power2.out"`, with a 1-frame border flash. On scroll-into-view, stagger sibling windows by `0.08s`.
- **Window close:** reverse — collapse to a line, `0.18s`.
- **Cursor bob:** the ► steps left/right (CSS `steps(2)`), not a smooth slide. Mirror in any GSAP-driven nav.
- **ATB-style bar fills:** skill/stat bars fill left→right like an ATB gauge when scrolled into view — `0.6–0.9s`, `ease: "power1.inOut"`, staggered. A tiny gold tick "pings" (scale 1→1.3→1) when a bar reaches full. This is the signature interaction; lean into it.
- **Number count-up:** stats/levels count up from 0 to value (`gsap` + `snap`), `0.5s`, settling on the gold number.
- **Typewriter text:** dialogue/lore reveals char-by-char at a steady cadence (~`35ms`/char, monospaced timing), with the blinking ▼ at the end. Provide a click-to-skip-to-full (FF6 fast-forward).
- **Scene transitions between sections:** brief FF6-style wipe — a quick fade-through-black or a "menu slide" where the outgoing window collapses and the incoming expands. Keep under `0.4s`.
- **Idle ambient:** slow drifting background particles (magicite dust), a gentle scanline shimmer. Subtle — it should feel alive, not busy.
- **Respect `prefers-reduced-motion`:** drop bobbing, typewriter, and count-ups to instant final states.

---

## 7. Per-Section Art Direction

Each section is "a real screen from the game."

### Hero / Title — *The Title Screen*
FF6's title is restrained: logo over a dark sky, a single prompt. Render the **character name in Cinzel** (engraved, gold, outlined) as the "game logo," a one-line subtitle (`Full-Stack Engineer · AI Integrations`) in pixel font, and a blinking gold **► PRESS START** / `► ENTER` prompt that scrolls to the first section. Background: dark void with a faint Mode-7 perspective grid receding to a horizon and drifting magicite particles. Small dialogue box at the bottom typewriters a one-line tagline. Restraint here makes the density below land harder.

### Stats — *The Status / Character Screen*
The most FF6 screen. Left sub-window: a "portrait" box (avatar or monogram) + name, `LV`, class (`AI MAGE / FULL-STACK`), and core attributes as menu rows. Right (wider): skills as **ATB-style labeled bars** (React, Node, Python, LLM/RAG, etc.) that fill on scroll with the count-up number. Group under gold title sub-bars (`— FRONTEND —`, `— BACKEND —`, `— MAGITEK (AI) —`). Dense, two-column, asymmetric. This screen alone must look like the FF6 status menu.

### Quest Log — *The Quest / Event List*
Experience as a chronological quest list. Each role = one menu row with a ► on the active/expandable one; selecting expands a nested dialogue window describing the "quest" (responsibilities/achievements) in Spectral body text. Show dates right-aligned in gold. A vertical gold rail connects entries like a timeline. Header chip: `❖ QUEST LOG ❖`.

### Dungeons — *The World Map / Dungeon Select*
Projects as explorable "dungeons." A grid of dungeon-entry windows, each with a name, a one-line "boss/objective," tech-stack as small tag chips (mini status icons), and a `► ENTER` link to the repo/live site. On hover: window brightens (inner glow) and the ► appears, like selecting a location on the world map. Optionally a faint Mode-7 map motif behind the grid. Make each card a real nested window, not a flat tile.

### Lore — *The Bestiary / Records Hall*
Education + trophies as "lore entries / records." Two columns: left = academic lore (degrees) as tome-style entries in Spectral; right = a **trophy/achievement case** — certifications and awards as gold-framed medallion windows with ◆ icons, like a collection screen. Treat trophies like FF6's magicite/esper collection: small ornate frames, gold accents, a sense of "things earned."

### Save Point — *The Save Screen / Contact*
FF6 save points glow and restore you. Render contact as a **save-point window**: a glowing teal/violet save-point glyph, and "save slots" = contact channels (Email, GitHub, LinkedIn) as selectable menu rows with ► cursors and small icons. The contact form (if any) styled as a dialogue input box. A blinking `► SAVE` confirm button (gold). Bottom dialogue line: a warm sign-off that typewriters in. End the page on the restorative, hopeful note FF6 save points carry.

---

## 8. DO / DON'T

**DO**
- DO use elegant near-serif + clean variable-width pixel type (`Cinzel` + `Pixelify Sans` + `Spectral`).
- DO put EVERYTHING in the blue beveled white-bordered window — that's the brand.
- DO use the diagonal blue gradient (bright TL → dark BR) on every window.
- DO give all menu text the hard 1px indigo drop shadow.
- DO fill the frame: nest sub-windows, add gold dividers, corner ornaments, ambient particles, scanlines, a vignette.
- DO reserve gold for the single most important thing per screen + the ► cursor.
- DO animate skill bars as ATB gauges with count-up numbers — the signature moment.
- DO keep motion short, snappy, slightly stepped.
- DO lean operatic/melancholy-grand (Cinzel titles, dark void, sustained mood).

**DON'T**
- DON'T use Press Start 2P or any chunky blocky monospaced pixel font. (Biggest v1 sin.)
- DON'T leave flat dark voids inside or between bare cards — fill with framing/ambient detail.
- DON'T use plain rectangular cards or soft material-design shadows; use beveled windows with hard insets.
- DON'T use soft blurred text shadows — FF6 shadows are hard 1px offsets.
- DON'T rainbow the palette; dark bg + blue windows + white text + gold accent is the whole system.
- DON'T make it cute/jokey (that's EarthBound/Chrono Trigger). Keep it elegant and dramatic.
- DON'T center everything symmetrically — use FF6's 1/3 + 2/3 asymmetric menu split.
- DON'T use pure black (`#000`) or pure white (`#fff`) for large fields — use `--bg-void` / cool-white.
- DON'T use long slow eases or parallax-heavy scrolljacking; keep it tight and game-like.

---

## 9. References (studied)

- **Game UI Database — Final Fantasy VI** — https://www.gameuidatabase.com/gameData.php?id=1901 — primary source for actual screenshots of FF6's windows, status screen density, battle/ATB UI, and menu layout. Mine this for exact screen composition.
- **Final Fantasy Wiki — Menu (Final Fantasy VI)** — https://finalfantasy.fandom.com/wiki/Menu_(Final_Fantasy_VI) — the menu/window structure, status screen contents, and that windows are user-recolorable (default = blue).
- **Final Fantasy Forums — Default window colors** — https://www.finalfantasyforums.net/threads/default-window-colors.30391/ — the concrete default window blue gradient values (blue channel TL 176 → TR 128 → BL 80 → BR 32); the basis for our diagonal-gradient palette.
- **NESdev — How did FF6 do a non-fixed-width font?** — https://forums.nesdev.org/viewtopic.php?t=12865 — confirms the font is variable-width with a software drop-shadow (1bpp→2bpp), i.e. NOT a blocky monospace face. Basis for the typography fix.
- **RPG Site / Gameranx — "fix that awful font" (Pixel Remaster)** — https://www.rpgsite.net/feature/11522 , https://gameranx.com/features/id/290283/ — community consensus on what the FF6 font should feel like (elegant, shadowed) vs. generic substitutes; reinforces the anti-Press-Start-2P stance.
- **Sabukaru — Yoshitaka Amano: A Lasting Legacy** — https://sabukaru.online/articles/yoshitaka-amano-final-fantasy-a-lasting-legacy — Amano's ukiyo-e/printmaking, watercolor-on-white, ethereal-yet-armored art direction; source of the "elegant, operatic, melancholy-grand" register.
- **The Absolute Mag — Amano's Art for FFVI** — https://theabsolutemag.com/21586/games/yoshitaka-amanos-art-for-final-fantasy-vi/ — the industrial-revolution "steampunk," esper/magitek world and its grotesque-grand cities; basis for steampunk-opera mood and esper/magicite motifs.
