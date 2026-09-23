# PortafolioValen — Project Index

_Indexed 2026-09-22 from `C:\Users\valea\Documents\projecto prueba\PortafolioValen`_

## What it is

Design portfolio website for **Valentina Arbeláez** (graphic designer). Single-page React app, Spanish-language UI, deployed to GitHub Pages at https://valenarb8.github.io/Portafolio/. Credits: Valentina Arbeláez Durango and Daniel Cardona Gonzalez.

## Stack

| Piece | Detail |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 (`base: '/Portafolio/'`) |
| Animation | framer-motion 12 |
| Lint | ESLint 9 + typescript-eslint, react-hooks, react-refresh |
| Routing | None — page state held in `App.tsx` and persisted in `sessionStorage` (`activePage`, `activeCategory`, `activeProjectId`) |
| Deploy | `.github/workflows/deploy.yml` — on push to `master`: Node 20, `npm install`, `npm run build`, upload `dist/` to GitHub Pages |

Scripts: `npm run dev` · `npm run build` (`tsc -b && vite build`) · `npm run lint` · `npm run preview`

## Folder map

```
PortafolioValen/
├── index.html                 Entry; body bg #8b0d21; favicon LogoBlanco.svg; title "Valen"
├── vite.config.ts / tsconfig*.json / eslint.config.js
├── .github/workflows/deploy.yml
├── public/                    Served as-is
│   ├── LogoBlanco.svg, LogoRojo.svg, vite.svg
│   └── PortafolioValentinaArbelaez2026.pdf   (14 MB downloadable portfolio)
├── src/
│   ├── main.tsx               Mounts <App/>
│   ├── App.tsx / App.css      Shell: nav, page switching, About ("Sobre mí"), Contact, preloader
│   ├── index.css              @font-face declarations + CSS variables (fonts)
│   ├── components/
│   │   ├── HomePage.tsx/.css         Landing: hero, category "doors", featured projects
│   │   ├── ProjectsPage.tsx/.css     Stacked sticky cards per category
│   │   ├── ProjectDetailPage.tsx/.css Project case page (image grid, video, carousel, hero logo)
│   │   ├── Preloader.tsx             framer-motion intro animation
│   │   └── Decorations.tsx/.css      SVG shapes: sparkle, asterisk, flower, starburst, burst, horseshoe…
│   ├── data/projects.ts       ★ All portfolio content (edit here to add/change projects)
│   └── assets/
│       ├── fonts/             Ambit, Bookmania (10 weights), MV Boli
│       ├── images/            ~120 images/videos (mockups, stamps, keys, locks, doors, logos)
│       └── Referencias/       Screen-recording reference
├── Carpeta página de presentación/   InDesign source for the presentation page
│   ├── página de presentación.indd / .idml / .pdf
│   ├── Document fonts/        Same fonts as src/assets/fonts
│   └── Links/                 Linked images (stamps, keys, locks, photo)
├── dist/                      Local build output (gitignored)
└── node_modules/              (gitignored)
```

## Site structure

- **INICIO (HOME)** — landing with Valen illustration (desktop / mobile variants), three doors (pink/blue/green) leading to the categories, decorative flower/ladybug/apple.
- **SOBRE MÍ (ABOUT)** — profile photo with illustrated hover variants, keys, stamps and padlocks as decoration.
- **PROYECTOS** — category list (sticky stacked cards), colors: Editorial `#FFD0DF`, Ilustración `#DFDBFF`, Branding `#F1F5BA`.
- **Project detail** — per-project page driven by `projects.ts`; Branding projects can set `primaryColor`, `navBgColor`, `navTextColor`.
- **CONTACTO**

## Content inventory (`src/data/projects.ts`)

| id | Title | Subtitle | Category | Type / Year |
|---|---|---|---|---|
| 1 | Jardin del Tiempo | Mapa de Laureles | Editorial | Académico 2025 (team) |
| 2 | Conmigo, siempre | Cuento ilustrado | Editorial | Académico 2025 |
| 3 | Retro Motion | Revista de cine | Editorial | Académico 2025 (team) |
| 5 | Ideas Al Azar | Abraza lo cotidiano | Ilustración | Académico 2024 |
| 6 | Hogar | Ilustraciones | Ilustración | Personal 2025 |
| 7 | Alma cotidiana | Agenda | Ilustración | Personal 2024 |
| 8 | Corcovado | Licores artesanales | Branding | Comercial 2025 |
| 9 | Casa Oculta | Casa de culto al diseño | Branding | Personal 2026 |
| 10 | Agua con sal | Universo de agua salada | Branding | Personal 2026 (team) |
| 11 | Cuarzo Café | Café de especialidad | Branding | Comercial 2025 |

(id 4 is unused.) Image flags available per item: `halfWidth`, `thirdWidth`, `quarterWidth`, `autoHeight`, `hideOnMobile`, `scaleDown`, `isCarousel`, `isHeroLogo`. Project flags: `noFeatured`, `singleFeatured`.

## Design tokens

- Brand red `#8b0d21` (page background on Home); logos in white and red.
- Fonts: **Ambit** (sans), **Bookmania** (display serif), **MV Boli** (handwritten accents).

## Issues found while indexing

1. **Case mismatch will break the CI build.** `projects.ts` imports `../assets/images/mapa_2.png`, but the file is `Mapa_2.png`. Works on Windows, fails on GitHub Actions (Linux is case-sensitive).
2. **`VideoCuarzo.mp4` is ~680 MB.** GitHub rejects files over 100 MB, and it's far too heavy for a web page. Compress it (target < 10 MB) or host it externally.
3. **Other heavy assets:** `IdeasAlAzar.png` ~39 MB, `Mapa_1.png`/`Mapa_2.png` ~7.5–8 MB, several 3–5 MB PNGs. Converting to WebP/JPG would speed up loading a lot.
4. **Missing fonts:** `index.css` references `MinionPro-Regular.otf` and `MAIAN.TTF`, which aren't in `src/assets/fonts` (used by `--font-serif` and `--font-tools`). They fall back to generic fonts.
5. **Probably unused assets** (not referenced in any .tsx/.ts/.css): AlmaCotidianaPostal, ArchivosMockup, Artesanocartas, ArtesanoRetiroNuevo, Conejo, Corazón(1).tiff, EtiquetasAguaConSal, Florblanca, Fondo.tiff, FosforosArtesano, fotico mia.jpg/.psd (10 MB), Furoshiki, FuroshikiEnUso, HogarModeloPapel, HojaGusanitos, HolaRojoSVG, JardindeltiempoCabezote, KnelaDelantal, LandingInicio, Llavero.png/.tiff, Mantel, Marcos.tiff, Menu1, PostalRetiroMockup, Puertica de conoceme mas, Rosado.tiff, SoyArtesanoPoster, TiroMockupPostal, TrabajemosJuntos, ValenBlanco(.png/SVG), ValenRojo. Some may be leftovers from earlier projects (e.g. "Soy Artesano", "Furoshiki").
6. `Casa Oculta` imports `CasaOcultaCarrusel-03.png` but doesn't display it; `Agua con sal` reuses the Knela images.
7. Minor: `<html lang="en">` should be `lang="es"`; `react.svg` and `public/vite.svg` are template leftovers.
