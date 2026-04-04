# Renato HUB — Agent Reference Documentation

> **Last updated:** 2026-04-03  
> **Purpose:** This document is the single source of truth for any AI agent working on this codebase. Read this file **before** making any changes.

---

## 1. Project Overview

**Renato HUB** is a personal dashboard hosted on **GitHub Pages** at:  
`https://azidales.github.io/Renato-HUB/`

It is a **single-page hub** (`index.html`) that links to **self-contained HTML apps**. All apps live as flat `.html` files in the repository root — there are **no subfolders, no build tools, no bundlers, and no `node_modules`**.

### Repository
- **GitHub:** `Azidales/Renato-HUB`
- **Branch:** `master`
- **Deploy:** GitHub Pages reads from `master` root (`/`)

---

## 2. File Structure

```
Renato HUB/
├── .git/
├── .gitignore
├── README.md               ← Public-facing project README
├── AGENTS.md               ← THIS FILE (agent reference)
├── index.html              ← Hub Central (landing page)
├── academic-flow.html      ← Academic Flow app
└── poke-strategy.html      ← Poké Strategy app
```

> **IMPORTANT:** All app files are **flat in the root directory**. Do NOT create subfolders for new apps. Each app is a single, self-contained `.html` file.

---

## 3. Technology Stack (MANDATORY for all apps)

Every app **must** use the exact same stack and CDN versions to maintain visual and behavioral consistency:

| Layer | Technology | CDN / Version |
|---|---|---|
| **CSS Framework** | Tailwind CSS (CDN) | `https://cdn.tailwindcss.com?v=3.4.17` |
| **Icons** | Lucide Icons (CDN) | `https://unpkg.com/lucide@0.469.0` |
| **Typography** | Google Fonts — Inter | `wght@400;600;800` |
| **Backend (optional)** | Firebase Firestore | `10.8.0` (ES module CDN) |

### Critical: Do NOT
- Use React, Vue, Svelte, or any JS framework
- Use npm, Vite, Webpack, or any build tool
- Create `.css` or `.js` external files (everything is inline per HTML file)
- Change CDN versions without updating ALL files simultaneously

---

## 4. Shared Design System

All apps follow a **strict visual language** derived from the Academic Flow app:

### 4.1 Layout
```
Body:          bg-slate-50 text-slate-900 pb-24 md:pb-10
Container:     max-w-4xl (or max-w-6xl) mx-auto px-4 (or px-6) pt-6 md:pt-12
```

### 4.2 Typography
```css
body { font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }
```
- **Titles:** `text-2xl md:text-4xl font-800 tracking-tighter italic uppercase`
- **Title branding:** First word = `text-slate-900`, second word = colored `<span>` (brand color)
- **Section labels:** `text-[10px] font-black uppercase tracking-widest text-slate-400`
- **Body text:** `text-xs font-semibold text-slate-400`

### 4.3 Color Assignments (per app)
| App | Brand Color | Tailwind Prefix |
|---|---|---|
| Hub Central | `blue-600` | `blue-` |
| Academic Flow | `blue-600` | `blue-` |
| Poké Strategy | `purple-600` | `purple-` |

When creating a new app, pick a **unique** Tailwind color prefix.

### 4.4 Card Style
```
bg-white p-5 (or p-6 or p-8) rounded-[2rem] (or rounded-3xl)
border border-white shadow-xl shadow-slate-200/50
```
Glass variant: `background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); border: 1px solid white;`

### 4.5 Header Pattern (every app page)
```html
<header class="flex justify-between items-center mb-8 md:mb-12">
    <div class="flex items-center gap-4">
        <!-- Back button (all apps except hub) -->
        <a href="index.html" class="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-{BRAND_COLOR} transition shrink-0">
            <i data-lucide="arrow-left" class="w-6 h-6"></i>
        </a>
        <!-- Title block -->
        <div>
            <h1 class="text-2xl md:text-4xl font-800 tracking-tighter italic uppercase text-slate-900 leading-none">
                App<span class="text-{BRAND_COLOR}">Name</span>
            </h1>
            <p class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                Subtítulo • Renato
            </p>
        </div>
    </div>
    
    <!-- User Avatar or Action Buttons (Right side - optional) -->
    <div class="h-10 w-10 rounded-full bg-{BRAND_COLOR} flex items-center justify-center text-white shadow-lg shrink-0">
        <i data-lucide="{ICON}" class="w-5 h-5"></i>
    </div>
</header>
```

### 4.6 Loading Screen (Firebase apps only)
```html
<div id="loader" class="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500">
    <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-{BRAND_COLOR} mb-4"></div>
    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Sincronizando Cloud...</p>
</div>
```
Dismiss with: `loader.style.opacity = '0'; setTimeout(() => loader.style.display = 'none', 500);`

---

## 5. Firebase Configuration

Two apps use the same Firebase project and document:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC9W4W6bDdH6p2GLi_TwG2XDd0yPNH8SEQ",
    authDomain: "academic-flow-3a2ef.firebaseapp.com",
    projectId: "academic-flow-3a2ef",
    storageBucket: "academic-flow-3a2ef.firebasestorage.app",
    messagingSenderId: "469639047695",
    appId: "1:469639047695:web:358d524690e08be504917a"
};
```

### Data Model (`Firestore → users/renato`)
```json
{
  "absences": {
    "2026-03-15": {
      "SE616": "present",
      "SE619": "absent"
    }
  }
}
```

| Key | Used By | Description |
|---|---|---|
| `absences` | Academic Flow | Keyed by `YYYY-MM-DD`, values are `{subjectCode: status}`. Status values: `'present'`, `'absent'`, `'cancelled'` |

### Shared Subject Codes
Academic Flow references the following academic subjects:

```javascript
const subjects = {
    "SE616": { name: "Economia Internacional I" },
    "SE619": { name: "Teoria Macroeconômica II" },
    "SE615": { name: "Elaboração e Análise de Projetos I" }
};
```

Academic Flow extends these with schedule info:
```javascript
"SE616": { name: "...", days: [1, 3], start: {1: "21:00", 3: "19:00"} }
// days: 0=Sun, 1=Mon, ..., 6=Sat
```

> **If the user adds or removes a subject**, update the `subjects` object in `academic-flow.html`.

---

## 6. App Details

### 6.1 Hub Central (`index.html`)
- **Purpose:** Landing page with cards linking to each app.
- **No Firebase.** Pure static HTML with inline JS for greeting (Bom dia/Boa tarde/Boa noite).
- **To add a new app card**, copy an existing `<!-- App Card -->` block and update:
  - `href` → new app filename (e.g., `new-app.html`)
  - Brand color classes
  - Lucide icon name
  - Title and description text

### 6.2 Academic Flow (`academic-flow.html`)
- **Purpose:** Attendance tracker with calendar view.
- **Firebase key:** `absences`
- **Features:**
  - Summary cards showing accumulated absences per subject (red if > 4)
  - Interactive calendar with color-coded days (present/absent/cancelled/mixed)
  - Day detail sidebar to set attendance status per subject
  - Mobile bottom nav with tab switching (Summary / Calendar / Details)
- **Key functions:** `renderAll()`, `showDay()`, `setStatus()`, `getDayClass()`, `changeMonth()`

### 6.3 Poké Strategy (`poke-strategy.html`)
- **Purpose:** Calculadora de captura e Matriz de danos bi-funcional (Gen 9).
- **No Firebase.** Uses [PokéAPI](https://pokeapi.co/) REST API for data.
- **Features:**
  - Aba de Captura (Catch Rate): Matemática estatística de Insígnias, HP em 4 estados, e Críticos Bayesianos.
  - Aba de Estratégia (Matchup): Matriz defensiva 18x18 estática revelando fraquezas/resistências instantâneas, suportando cálculo isolado de *Terastallization*.
  - Navegação Mobile Inferior (Bottom Nav Tab Pattern).

---

## 7. How to Add a New App

Follow this checklist exactly:

1. **Create the file** in root: `new-app.html`
2. **Copy the boilerplate** from any existing app (same `<head>` block with CDN links)
3. **Choose a unique brand color** (e.g., `emerald-600`, `amber-600`, `rose-600`)
4. **Include the "Voltar ao Hub"** back link pointing to `index.html`
5. **Follow the header pattern** from Section 4.5
6. **If using Firebase**, reuse the exact same config and `users/renato` document, adding a **new top-level key** (do NOT reuse `absences` or `deadlines`)
7. **Register the app in `index.html`**: Add a new card in the `<section class="grid ...">` block
8. **Commit and push** — GitHub Pages auto-deploys from `master`

---

## 8. Deployment Workflow

```bash
git add .
git commit -m "feat: description of changes"
git push
```

GitHub Pages will auto-deploy within 1-2 minutes. No build step required.

---

## 9. Language & Locale

- **UI Language:** Brazilian Portuguese (`pt-br`)
- **Date format:** `DD/MM/YYYY` for display, `YYYY-MM-DD` for storage
- **Timezone:** User's local timezone (no server-side dates)
