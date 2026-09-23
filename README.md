# Bhumireddy Hemanth Reddy — Portfolio

React + TypeScript + Vite + Tailwind CSS v4 + Motion. Every fact on the site comes from the resume and lives in one file: `src/data/portfolio.ts`.

## Run it

Requires Node.js 18.18+ (Node 20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run preview    # serves the production build locally
```

## Where to edit things

| What | Where |
| --- | --- |
| Name, intro, typed roles, email, location, GitHub, LinkedIn | `profile` in `src/data/portfolio.ts` |
| Hero numbers (6,435+, 1M+, 2, 8.08) | `highlights` |
| About text and the four cards | `about` |
| Skills and categories | `skillGroups` |
| Projects (text, tech, results, links) | `projects` |
| Internships | `experience` |
| Degree, institution, CGPA | `education` |
| Certifications (add `year` / `credentialUrl` when you have them) | `certifications` |
| Contact heading and blurb | `contact` |
| Resume download | replace `public/resume.pdf` (keep the file name, or change `profile.resumeFile`) |
| Colors and fonts | `src/index.css` (CSS variables at the top) |
| Title, description, canonical URL, social tags | `index.html` |
| Favicon | `public/favicon.svg` |

A section disappears from the page and the navigation automatically if its array in `portfolio.ts` is empty.

### Project links and screenshots

The resume gives your GitHub profile but not a repository URL per project, so project cards link to your profile ("More on GitHub"). Once a repo exists, add it and the card and modal switch to "Source code":

```ts
{ id: "walmart-sales", /* ... */ repoUrl: "https://github.com/hemant350/walmart-sales", demoUrl: "https://..." }
```

To show screenshots in the project modal, put images in `public/screens/` and add:

```ts
screenshots: [{ src: "screens/walmart-dashboard.png", alt: "Power BI dashboard showing sales by store" }]
```

### Contact form

The form works without a backend: it opens the visitor's email app with the message filled in. To receive messages directly instead:

1. Create a free form at Formspree, Getform or Web3Forms and copy its endpoint URL.
2. Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT=<your endpoint>`.
3. On Vercel/Netlify, add the same variable in the project's environment settings.

Your phone number is on the resume but is deliberately not shown on the public site. Add it to `Contact.tsx` if you want it there.

## Deploy

**Vercel** — push to GitHub, click *Add New → Project*, import the repo. Vite is detected automatically (build `npm run build`, output `dist`).

**Netlify** — *Add new site → Import from Git*. Build command `npm run build`, publish directory `dist`.

**GitHub Pages**

- User site (`<user>.github.io` repo): nothing special, publish `dist`.
- Project site (`<user>.github.io/<repo>/`): build with the base path, e.g. `VITE_BASE=/<repo>/ npm run build`.

Minimal workflow, saved as `.github/workflows/deploy.yml` (enable *Settings → Pages → Source: GitHub Actions*):

```yaml
name: Deploy
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
        env:
          VITE_BASE: /${{ github.event.repository.name }}/
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages }
    steps:
      - uses: actions/deploy-pages@v4
```

(For a `<user>.github.io` repo, remove the `VITE_BASE` line.)

After deploying, replace `https://your-domain.example/` in `index.html` (canonical and `og:url`) with your real URL.

## Structure

```
src/
├── components/      Navbar, Hero, About, Skills, Projects, Experience, Education,
│   │                Certifications, Contact, Footer, DataField (hero canvas), ...
│   └── ui/          Reveal, Magnetic, TiltCard, Timeline, ButtonLink, Section, ...
├── data/portfolio.ts
├── hooks/           useTheme, useActiveSection, useMediaQuery
├── lib/utils.ts
├── App.tsx  main.tsx  index.css
```

## Notes

- Animations respect `prefers-reduced-motion` (Motion's `MotionConfig`, the canvas, the typing effect and CSS).
- The hero query panel and the project artwork are decorative illustrations, not real results, and are labelled or hidden from assistive tech accordingly.
- The project modal is lazy-loaded; the hero canvas pauses when off-screen or when the tab is hidden.
