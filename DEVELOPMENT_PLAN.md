# Hired & Wired - Development Plan

---

## Phase 1: Foundation & Design Tokens
- [ ] Initialize Next.js project (TypeScript, Tailwind, ESLint)
- [ ] **Config:** Setup `tailwind.config.ts` with custom tokens:
  - Colors: black, white, gray-100/200/400/500, yellow (#FFE900), gold (#D1A63B), pastels (pink, lavender, mint, lemon, peach, error-bg), status colors (green, red, purple)
  - Spacing: 2, 4, 8, 14, 20, 24, 30, 90
  - Border Radius: none (0), sm (4px), md (8px), lg (12px), full (999px)
- [ ] **Fonts:** Configure `next/font/local` with:
  - Instrument Serif (Regular, Italic) → headings H1, H2
  - Akkurat LL Cyrillic (Thin → Black) → body, H3, H4, caps
  - Pixform → pixel text, Description uppercase
- [ ] **Global CSS:** Define base styles, CSS variables, font-face declarations
- [ ] **Git Commit:** `feat(core): setup design tokens and fonts`

---

## Phase 1.5: Component Sandbox
- [ ] Create `/app/sandbox/page.tsx` — development playground for testing components
- [ ] Setup component preview sections (Atoms, Molecules, Organisms)
- [ ] Add interactive controls for component variants/states
- [ ] **Git Commit:** `feat(sandbox): create component sandbox page`

---

## Phase 2: Atoms (Base Components)
- [ ] **Button (`btn`):**
  - CTA big (black pill, H2 text)
  - CTA small (black pill, pixel text)
  - Secondary (gray pill)
  - On Color (white pill)
  - Node (pink block, 4px radius)
- [ ] **Avatar:** Circle 30×30
- [ ] **Status:** Dot + label (green/red/purple/stopped variants)
- [ ] **Icons:** play, more, arrow-down, close (16×16)
- [ ] **Switch:** Toggle on/off state
- [ ] **Flag:** Checkbox yes/no
- [ ] **Tag:** Control (gray + X icon), Static (yellow)
- [ ] **Input:** Text field with label
- [ ] **TextArea:** Multiline with label
- [ ] **Dropdown:** Default/on-color, filled/empty states
- [ ] **Bar:** Progress bar (variable width)
- [ ] **Graph:** Mini bar chart
- [ ] **Error:** Error message block (peach bg, red text)
- [ ] **Avatars:** Stacked avatar group (overlap -8px)
- [ ] **Git Commit:** `feat(atoms): create core atom components`

---

## Phase 3: Molecules (UI Components)
- [ ] **Profile:** Long variant (avatar + name + role + status + bar), Short variant (compact)
- [ ] **Node:** Automation node card (icon row + title + subtitle)
- [ ] **Team:** Team card (name, people count, productivity bar, highlight, avatars)
- [ ] **CampaignPreview:** Hiring card (title, status, stats grid 142/89/282/31/4)
- [ ] **ProjectPreview:** Project card (description + tags)
- [ ] **ExperiencePreview:** Job card (date, title, company, description)
- [ ] **CardMetric:** Health card (title + graph + label)
- [ ] **CardsMetrica:** Stat counter (title + H1 number + label)
- [ ] **Notify:** Notification (mint bg, Pixform text)
- [ ] **Attempt:** Salary attempt card (past/next variants)
- [ ] **Git Commit:** `feat(molecules): create molecule components`

---

## Phase 4: Organisms (Layout & Complex UI)
- [ ] **TopMenu:** Logo "Hired & Wired" + menu switches + Generate report btn + Profile/Logout
- [ ] **SecondRow:** Back button + breadcrumbs / Builder variant (Back + Save + Deploy)
- [ ] **Header:** TopMenu + SecondRow + Progress bar stages
- [ ] **Kanban:** Pipeline columns (Applied/Screening/Interview/Offer)
- [ ] **Task:** Task row (flag + title + error? + action btn)
- [ ] **CardTop:** Hero profile card (yellow/gray, Cover Image bg, name, role, action buttons)
- [ ] **MenuSwitch:** Tab switch (on/off border)
- [ ] **Git Commit:** `feat(organisms): create organism components`

---

## Phase 5: Data Layer (Mock Stores)
- [ ] **Store:** `useTeamsStore` (Zustand: teams array, CRUD operations)
- [ ] **Store:** `useEmployeeStore` (employees, status updates)
- [ ] **Store:** `useCampaignStore` (campaigns, pipeline columns, stats)
- [ ] **Store:** `useAutomationStore` (nodes, connections for mail editor)
- [ ] **Mock Data:** Initial seed data for all stores
- [ ] **Git Commit:** `feat(stores): implement zustand mock stores`

---

## Phase 6: Page Assembly

### 6.1 All Teams Page (`/`)
- [ ] Header (topmenu + tabs: All teams / All templates)
- [ ] Metrics row (Health, Productivity, Dedication, Hiring)
- [ ] Teams grid (team cards)
- [ ] **Git Commit:** `feat(pages): create all teams page`

### 6.2 Team Detail Page (`/team/[id]`)
- [ ] Header with breadcrumbs
- [ ] Team hero card (name, description, status)
- [ ] Members list (profile rows with progress bars)
- [ ] Metrics section
- [ ] **Git Commit:** `feat(pages): create team detail page`

### 6.3 Candidate Profile Page (`/candidate/[id]`)
- [ ] Card Top hero (name, role badges, action buttons)
- [ ] Achievements section (tags)
- [ ] Personal Development section
- [ ] Reports to / Mentoring sections (avatar chips)
- [ ] **Git Commit:** `feat(pages): create candidate profile page`

### 6.4 Hiring Campaign Page (`/campaign/[id]`)
- [ ] Hero card (title, status, funnel stats)
- [ ] Task list (checklist with flags)
- [ ] Stats row (Applications, In Progress, Conversion Rate)
- [ ] Pipeline Kanban (columns with profile cards)
- [ ] **Git Commit:** `feat(pages): create hiring campaign page`

### 6.5 Automation/Mail Editor Page (`/automation`)
- [ ] Header with builder variant (Back + Save + Deploy)
- [ ] Sidebar (Node library, Templates, Properties panel)
- [ ] Canvas (drag-drop flow editor)
- [ ] **Git Commit:** `feat(pages): create automation editor page`

---

## Phase 7: Polish & Final Touches
- [ ] **Typography Check:** Verify Serif/Sans/Pixel usage consistency
- [ ] **Hover States:** Add transitions for buttons, cards, links
- [ ] **Responsive:** Basic mobile breakpoints (optional for MVP)
- [ ] **Accessibility:** Focus states, aria labels
- [ ] **Git Commit:** `feat(polish): final styling and interactions`
- [ ] **Git Tag:** `v1.0.0-mvp`

---

## Decisions Log

> *Принятые решения по проекту:*

| # | Вопрос | Решение |
|---|--------|---------|
| 1 | **Cover Images** | Использовать напрямую из `/assets/Cover Image-*.jpg`. Применяются как hero-image на страницах сервиса и в карточках кандидатов. |
| 2 | **Canvas Editor** | Кастомная реализация на canvas (без react-flow). |
| 3 | **Icons** | Экспортировать кастомные SVG из Figma (play, more, arrow-down, close). |
| 4 | **Development Order** | Сначала Design System (atoms → molecules → organisms) с песочницей для тестирования, затем страницы по порядку. |
| 5 | **Additional Pages** | Будут добавлены по мере получения макетов. |
