# Context: Hired & Wired (Frontend MVP & Custom Design System)

## Project Overview
**Hired & Wired** — high-fidelity frontend-прототип HR-платформы. Цель: создать "Pixel Perfect" MVP на основе кастомной "Editorial" Design System для тестирования user flows (Hiring, Onboarding, Team Management) в реальных сценариях.

## Architecture Strategy
* **Framework:** Next.js 14+ (App Router)
* **Rendering Strategy:** Client-Side Heavy (SPA approach). Приоритет интерактивности над SSR для этого MVP.
* **Data Source:** Client-side Mock Data Store (Zustand + Mock Arrays). БЕЗ Backend/Database на данном этапе.
* **Design Implementation:** Кастомная Design System с нуля по принципам Atomic Design. БЕЗ внешних UI-библиотек (shadcn/ui, MUI).

---

## Design System & Visual Identity

### Typography (из Figma)

| Token | Font | Size | Weight | Line-Height | Letter-Spacing | Case |
|-------|------|------|--------|-------------|----------------|------|
| **H1** | Instrument Serif | 84px | 400 (Regular) | 0.9em (76px) | -1% | — |
| **H2** | Instrument Serif | 40px | 400 (Regular) | 0.9em (36px) | -1% | — |
| **Description** | Pixform | 30px | 400 (Regular) | 0.9em (27px) | -3% | UPPERCASE |
| **H3** | Akkurat LL Cyrillic | 20px | 600 (Semibold) | 0.9em (18px) | -2% | — |
| **H4** | Akkurat LL Cyrillic | 15px | 600 (Semibold) | 0.9em (14px) | -2% | — |
| **text-pixel** | Pixform | 10px | 400 | 0.9em (9px) | 20% | UPPERCASE |
| **text-grotesk** | Akkurat LL Cyrillic | 11px | 400 | 0.9em (10px) | — | — |
| **text-bold** | Akkurat LL Cyrillic | 11px | 700 (Bold) | 0.9em (10px) | — | — |
| **caps** | Akkurat LL Cyrillic | 8px | 500 | 0.9em (7px) | 20% | UPPERCASE |

### Font Files (в `/fonts/`)
- **Instrument Serif** — InstrumentSerif-Regular.ttf, InstrumentSerif-Italic.ttf
- **Akkurat LL Cyrillic** — AkkuratLLCyr-*.otf (Thin → Black)
- **Pixform** — Pixform.ttf

### Colors (из Figma)

| Token | Hex | Usage |
|-------|-----|-------|
| `black` | `#000000` | Primary text, CTA buttons |
| `white` | `#FFFFFF` | Backgrounds, button text |
| `gray-100` | `#F2F2F2` | Page backgrounds |
| `gray-200` | `#EAEAEA` | Secondary buttons, inputs |
| `gray-400` | `#CBCBCB` | Muted text, disabled |
| `gray-500` | `#979797` | Placeholder text |
| `yellow` | `#FFE900` | Primary accent (Switch active) |
| `gold` | `#D1A63B` | Secondary accent (Tags, highlights) |
| `pink-soft` | `#F5CFCA` | Pastel - Node cards |
| `pink` | `#FAD5E7` | Pastel |
| `lavender` | `#DDD6EF` | Pastel |
| `mint` | `#D4EEE7` | Pastel - Notifications |
| `yellow-green` | `#E0E2A4` | Pastel |
| `peach` | `#F5DEDB` | Pastel |
| `lemon` | `#FFFD9E` | Pastel - Tags |
| `error-bg` | `#F7E0DD` | Error background |
| `green` | `#00867B` | Status - On Track |
| `red` | `#CC0000` | Status - Error, Failing |
| `purple` | `#9747FF` | Status - Rocket Growth |

### Spacing Scale (из Figma)

| Token | Value | Usage |
|-------|-------|-------|
| `xxs` | 2px | Micro gaps |
| `xs` | 4px | Icon gaps |
| `sm` | 8px | Small padding |
| `md` | 14px | Inner padding (cards, inputs) |
| `lg` | 20px | Component gaps |
| `xl` | 24px | Section gaps |
| `2xl` | 30px | Large padding (cards, sections) |
| `3xl` | 90px | Hero spacing, major sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | — |
| `sm` | 4px | Tags, inputs, small elements |
| `md` | 8px | Switch groups |
| `lg` | 12px | Cards |
| `full` | 999px | Pill buttons |

---

## Component Library (Atomic Design)

### Atoms (из Figma: ds-atoms)
- **btn** — Buttons (CTA big/small: black pill, Secondary: gray pill, On Color: white pill, Node: pink block)
- **avatar** — Circle avatar (30×30)
- **status** — Status indicator (green/red/purple/stopped + label)
- **icons** — play, more, arrow-down, close (16×16)
- **switch** — Toggle switch (on/off)
- **flag** — Checkbox flag (yes/no)
- **tag** — Tag/chip (control: gray + close icon, static: yellow)
- **input** — Text input field
- **text_area** — Multiline textarea
- **dropdown** — Select dropdown (default, on color, filled/empty states)
- **bar** — Progress bar (75%, 20% variants)
- **graph** — Mini bar graph
- **error** — Error message block
- **avatars** — Stacked avatar group

### Molecules (из Figma: ds-molecules)
- **profile** — Profile card (long: with status + bar, short: compact)
- **node** — Automation node card (icon + title + subtitle)
- **team** — Team overview card (name, people count, productivity bar, highlight, avatars)
- **campaign_preview** — Hiring campaign card (title, status, stats: 142/89/282/31/4)
- **project_preview** — Project card (description + tech tags)
- **experience_preview** — Work experience card (date, title, company, description)
- **card_metric** — Health/metric card (title + graph + label)
- **cards_metrica** — Big number stat card (title + H1 number + label)
- **notify** — Notification banner (green mint bg, Pixform description text)
- **attempt** — Salary attempt card (past/next: $amount + perks list + status)

### Organisms (из Figma: ds-organisms)
- **topmenu** — Top navigation (logo "Hired & Wired", menu switches, Generate report btn, Profile/Logout)
- **second-row** — Breadcrumb row (Back btn + breadcrumbs) / Builder variant (Back + Save + Deploy)
- **header** — Full header (topmenu + second-row + progress bar stages)
- **canban** — Kanban board (Pipeline columns: Applied/Screening/Interview/Offer)
- **task** — Task item row (flag + title + error? + btn)
- **card top** — Hero profile card (yellow/gray variant, Cover Image bg, name H1, role Description, action buttons)
- **menu_switch** — Tab switch item (on/off border state)

---

## Functional Scope (Mocked Flows)

### 1. All Teams Page
- **Overview:** Grid of team cards (card: name, people count, productivity %, highlight text, avatars)
- **Metrics:** Health, Productivity, Dedication, Hiring stats
- **Navigation:** "All teams" / "All templates" tabs

### 2. Team Detail Page (Engineering Team)
- **Header:** Team name (H2), description (Pixform), status badge
- **Members List:** profile rows with avatar, name, role, progress bar
- **Metrics:** Big numbers for productivity

### 3. Candidate Profile Page
- **Hero Card:** name (H1), role badges, action buttons (promote, negotiate, suspend, fire)
- **Sections:** Achievements (tags), Personal Development (title + date), Reports to (avatar chips), Mentoring (avatar chips)

### 4. Hiring Campaign Page
- **Hero Card:** Campaign title (H2), status, funnel stats (142 → 89 → 282 → 31 → 4)
- **Task List:** Checklist tasks with flags and buttons
- **Pipeline Kanban:** Columns (Applied/Screening/Interview/Offer) with candidate profile cards
- **Stats Row:** Applications, In Progress, Conversion Rate counters

### 5. Automation/Mail Editor Page
- **Canvas:** Flow editor with nodes library, drag-drop nodes
- **Sidebar:** Node properties panel, Templates list
- **Toolbar:** Back, Save, Deploy buttons

---

## Tech Stack
* **Core:** Next.js 14+, TypeScript, Tailwind CSS
* **State Management:** Zustand (Global mock stores)
* **Icons:** Lucide React (fallback for missing custom icons)
* **Fonts:** `next/font/local` (load from `/fonts/`)
* **Animations:** CSS transitions, optional Framer Motion
