# Hired & Wired - Development Plan

---

## Phase 1: Foundation & Design Tokens ✅
- [x] Initialize Next.js project (TypeScript, Tailwind, ESLint)
- [x] **Config:** Setup `tailwind.config.ts` with custom tokens:
  - Colors: black, white, gray-100/200/400/500, yellow (#FFE900), gold (#D1A63B), pastels (pink, lavender, mint, lemon, peach, error-bg), status colors (green, red, purple)
  - Spacing: 2, 4, 8, 14, 20, 24, 30, 90
  - Border Radius: none (0), sm (4px), md (8px), lg (12px), full (999px)
- [x] **Fonts:** Configure `next/font/local` with:
  - Instrument Serif (Regular, Italic) → headings H1, H2
  - Akkurat LL Cyrillic (Thin → Black) → body, H3, H4, caps
  - Pixform → pixel text, Description uppercase
- [x] **Global CSS:** Define base styles, CSS variables, font-face declarations
- [x] **Git Commit:** `feat(core): setup design tokens and fonts`

---

## Phase 1.5: Component Sandbox ✅
- [x] Create `/app/sandbox/page.tsx` — development playground for testing components
- [x] Setup component preview sections (Atoms, Molecules, Organisms)
- [x] Add interactive controls for component variants/states
- [x] **Git Commit:** `feat(sandbox): create component sandbox page`

---

## Phase 2: Atoms (Base Components) ✅
- [x] **Button (`btn`):**
  - CTA big (black pill, H2 text)
  - CTA small (black pill, pixel text)
  - Secondary (gray pill)
  - On Color (white pill)
  - Node (pink block, 4px radius)
- [x] **Avatar:** Circle 30×30
- [x] **Status:** Dot + label (green/red/purple/stopped variants)
- [x] **Icons:** play, more, arrow-down, close (16×16) — используются PNG из `/assets/`
- [x] **Switch:** Toggle on/off state
- [x] **Flag:** Checkbox yes/no — используются PNG из `/assets/`
- [x] **Tag:** Control (gray + X icon), Static (yellow) — добавлены размерности sm/default
- [x] **Input:** Text field with label
- [x] **TextArea:** Multiline with label
- [x] **Dropdown:** Default/on-color, filled/empty states
- [x] **Bar:** Progress bar — варианты: default, big, double (Green/Mint кружки)
- [x] **Graph:** Mini bar chart
- [x] **Error:** Error message block (peach bg, red text)
- [x] **Avatars:** Stacked avatar group (overlap -8px)
- [x] **NodeConnector:** In (gray) / Out (black) коннекторы для нод
- [x] **Git Commit:** `feat(atoms): create core atom components`

---

## Phase 3: Molecules (UI Components) ✅
- [x] **Profile:** Long variant (avatar + name + role + status + bar), Short variant (compact)
- [x] **Node:** Automation node card (icon row + title + subtitle + In/Out коннекторы)
- [x] **Team:** Team card (name, people count, double progress bar, highlight, avatars)
- [x] **CampaignPreview:** Hiring card (title, status, stats grid 142/89/282/31/4)
- [x] **ProjectPreview:** Project card (description + tags)
- [x] **ExperiencePreview:** Job card (date, title, company, description)
- [x] **CardMetric:** Health card (title + graph + label)
- [x] **CardsMetrica:** Stat counter (title + H1 number + label)
- [x] **Notify:** Notification (mint bg, Pixform text)
- [x] **Attempt:** Salary attempt card (past/next variants)
- [x] **Git Commit:** `feat(molecules): create molecule components`

---

## Phase 4: Organisms (Layout & Complex UI) ✅
- [x] **TopMenu:** Logo "Hired & Wired" + MenuSwitch tabs + Generate report btn + Avatar/Logout
- [x] **SecondRow:** Back button + breadcrumbs / Builder variant (Back + Save + Deploy)
- [x] **Header:** TopMenu + SecondRow + Double progress bar stages
- [x] **Kanban:** Pipeline columns (Applied/Screening/Interview/Offer) — с drag-and-drop
- [x] **Task:** Task row (flag + title + error + action btn) — вертикальная компоновка
- [x] **CardTop:** Hero profile card (yellow: dropdowns, gray: switch tabs, центрированный контент)
- [x] **MenuSwitch:** Tab switch (on/off border)
- [x] **Git Commit:** `feat(organisms): create organism components`

---

## Phase 5: Data Layer (Mock Stores) ✅
- [x] **Store:** `useTeamsStore` (Zustand: teams array, CRUD operations)
- [x] **Store:** `useEmployeeStore` (employees, status updates)
- [x] **Store:** `useCampaignStore` (campaigns, pipeline columns, stats)
- [x] **Store:** `useAutomationStore` (nodes, connections for mail editor)
- [x] **Mock Data:** Initial seed data for all stores
- [x] **Git Commit:** `feat(stores): implement zustand mock stores`

---

## Phase 6: Page Assembly ✅

### 6.1 All Teams Page (`/`) ✅
- [x] Header (topmenu + tabs: All teams / All templates)
- [x] Metrics row (Health, Productivity, Dedication, Hiring)
- [x] Teams grid (team cards)
- [x] **Git Commit:** `feat(pages): create all teams page`

### 6.2 Team Detail Page (`/team/[id]`) ✅
- [x] Header with breadcrumbs
- [x] Team hero card (name, description, status)
- [x] Members list (profile rows with progress bars)
- [x] Metrics section
- [x] **Git Commit:** `feat(pages): create team detail page`

### 6.3 Candidate Profile Page (`/candidate/[id]`) ✅
- [x] Card Top hero (name, role badges, action buttons)
- [x] Achievements section (tags)
- [x] Personal Development section
- [x] Reports to / Mentoring sections (avatar chips)
- [x] **Git Commit:** `feat(pages): create candidate profile page`

### 6.4 Hiring Campaign Page (`/campaign/[id]`) ✅
- [x] Hero card (title, status, funnel stats)
- [x] Task list (checklist with flags)
- [x] Stats row (Applications, In Progress, Conversion Rate)
- [x] Pipeline Kanban (columns with profile cards)
- [x] Campaigns list page (`/campaigns`)
- [x] **Git Commit:** `feat(pages): create hiring campaign page`

### 6.5 Automation/Mail Editor Page (`/automation`) ✅
- [x] Header with builder variant (Back + Save + Deploy)
- [x] Sidebar (Node library, Templates, Properties panel)
- [x] Canvas (drag-drop flow editor)
- [x] Automation flows list page (`/automation`)
- [x] **Git Commit:** `feat(pages): create automation editor page`

---

## Phase 7: Polish & Final Touches ✅
- [x] **Typography Check:** Verify Serif/Sans/Pixel usage consistency
- [x] **Hover States:** Add transitions for buttons, cards, links (scale, shadow, opacity)
- [x] **Responsive:** Basic mobile breakpoints for typography
- [x] **Accessibility:** Focus states (focus-visible ring), aria labels, htmlFor labels, reduced motion support
- [x] **Git Commit:** `feat(polish): final styling and interactions`
- [x] **Git Tag:** `v1.0.0-mvp`

---

## Decisions Log

> *Принятые решения по проекту:*

| # | Вопрос | Решение |
|---|--------|---------|
| 1 | **Cover Images** | Использовать напрямую из `/assets/Cover Image-*.jpg`. Применяются как hero-image на страницах сервиса и в карточках кандидатов. |
| 2 | **Canvas Editor** | Кастомная реализация на canvas (без react-flow). |
| 3 | **Icons** | Используем PNG иконки из `/assets/` (icon-play.png, icon-more.png, icon-arrow-down.png, icon-close.png). |
| 4 | **Development Order** | Сначала Design System (atoms → molecules → organisms) с песочницей для тестирования, затем страницы по порядку. |
| 5 | **Additional Pages** | Будут добавлены по мере получения макетов. |
| 6 | **Progress Bar** | Используем паттерн из кружков (dot pattern) вместо сплошной полосы. Double вариант с Green/Mint цветами. |
| 7 | **Avatars** | Файлы переименованы: avatar-katya.png, avatar-petya.png, avatar-dog.png. |
| 8 | **Typography** | H1, H2, Description — font-weight: 400 (Regular). |
