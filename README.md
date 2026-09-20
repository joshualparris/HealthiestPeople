# HealthiestPeople

A source-first research project studying **nine unusually well-documented public case studies plus one real-world working-parent baseline** and translating the useful parts of their health, physiology and self-tracking into ordinary life.

## Website

Live site: https://joshualparris.github.io/HealthiestPeople/

The repository now includes a dependency-free website designed for a busy working parent. It provides:

- a practical plan that changes with the day of the week
- a "minimum viable health" fallback for chaotic days
- a rotating daily lesson from the project profiles
- evidence-aware "copy this / don't copy blindly" guidance
- a curated podcast and talk library for hearing the case-study subjects explain their routines and reasoning
- low-cost principles that work around full-time work, children, bills and limited time

The same static site is prepared for **GitHub Pages** and **Vercel**.

### Deployment status

- **Source + CI:** ready; static validation is green.
- **GitHub Pages:** the `gh-pages` branch is maintained automatically by GitHub Actions. GitHub still requires the repository owner to enable Pages once in **Settings → Pages → Deploy from a branch → `gh-pages` / root**.
- **Vercel:** `vercel.json` and a self-contained `standalone.html` bundle are included. Import this repository as a static project; no build command or environment variables are required.
- Vercel import: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjoshualparris%2FHealthiestPeople
- GitHub Pages settings: https://github.com/joshualparris/HealthiestPeople/settings/pages

## People in the project

### Real-world comparison baseline

- [Joshua Parris](https://joshualparris.github.io/HealthiestPeople/people/joshua-parris.html) — real-world working-parent baseline with a detailed longitudinal Health Connect / Fitbit / Withings / pathology archive
  - [Full Joshua health archive](https://joshualparris.github.io/HealthiestPeople/health-archive.html)
  - [Weekly wearable history](https://joshualparris.github.io/HealthiestPeople/data.html#wearables)
  - [Lab history](https://joshualparris.github.io/HealthiestPeople/data.html#labs)
  - [Body composition / BMI history](https://joshualparris.github.io/HealthiestPeople/data.html#body)
  - [Monday frisbee history](https://joshualparris.github.io/HealthiestPeople/data.html#frisbee)


### Health / physiology exemplars and high-value case studies

- [Bryan Johnson](https://joshualparris.github.io/HealthiestPeople/people/bryan-johnson.html) — unusually broad current whole-body measurement
- [Michael Lustgarten](https://joshualparris.github.io/HealthiestPeople/people/michael-lustgarten.html) — long-term low-cost biomarker and lifestyle tracking
- [Oskar Svendsen](https://joshualparris.github.io/HealthiestPeople/people/oskar-svendsen.html) — peer-reviewed exceptional aerobic physiology
- [Dave Pascoe](https://joshualparris.github.io/HealthiestPeople/people/dave-pascoe.html) — preserved multi-domain physical function in his 60s
- [Scott Kelly](https://joshualparris.github.io/HealthiestPeople/people/scott-kelly.html) — exceptionally rigorous NASA whole-body research under extreme stress
- [Julie Gibson Clark](https://joshualparris.github.io/HealthiestPeople/people/julie-gibson-clark.html) — unusually transferable working-parent longevity routine and a very low reported DunedinPACE

### Measurement / quantified-self case studies

- [Bob Troia](https://joshualparris.github.io/HealthiestPeople/people/bob-troia.html) — years of practical N-of-1 tracking across body composition, sleep and glucose
- [Michael Snyder](https://joshualparris.github.io/HealthiestPeople/people/michael-snyder.html) — peer-reviewed personal multi-omics and disease-detection research
- [Larry Smarr](https://joshualparris.github.io/HealthiestPeople/people/larry-smarr.html) — long-term biomarker tracking that helped surface persistent inflammation before Crohn's diagnosis

Snyder and Smarr are deliberately included as **measurement lessons, not "healthiest person" claims**. Being deeply measured and being disease-free are different things.

## Country-level health lessons

- [Healthy Countries](https://joshualparris.github.io/HealthiestPeople/healthy-countries.html) — evidence-aware lessons from Japan, Spain, Switzerland, Iceland, Singapore, South Korea and Australia
- [Country research notes](https://joshualparris.github.io/HealthiestPeople/document.html?doc=healthy-countries) — official statistics, peer-reviewed evidence, caveats and Josh-specific translation
- [Country metrics dataset](https://joshualparris.github.io/HealthiestPeople/data.html#countries)

## Research documents

- [Product roadmap](https://joshualparris.github.io/HealthiestPeople/roadmap.html) — UX, health-literacy, accessibility, charts, evidence and maintenance plan
- [Metric-by-metric comparison](https://joshualparris.github.io/HealthiestPeople/comparison.html)
- [Low-cost working-family playbook](https://joshualparris.github.io/HealthiestPeople/playbook.html)
- [Time/cost/family transferability matrix](https://joshualparris.github.io/HealthiestPeople/transferability.html)
- [Research backlog / known data gaps](https://joshualparris.github.io/HealthiestPeople/document.html?doc=research-backlog)
- [Evidence quality, conflicts and interpretation](https://joshualparris.github.io/HealthiestPeople/methodology.html)
- [Public data access audit](https://joshualparris.github.io/HealthiestPeople/document.html?doc=data-access-audit)
- [Normalised metrics dataset](https://joshualparris.github.io/HealthiestPeople/data.html#metrics)

## Purpose

This project asks three separate questions:

1. What does the best publicly available evidence actually show about each person's health or physiology?
2. What does their measurement strategy teach us, even when they are not disease-free?
3. Which parts are realistically transferable to an ordinary middle-class adult who works five days a week, has children, bills, stress, limited time, and no private medical team?

The project does **not** claim the public case studies are literally the healthiest humans alive. Public datasets are incomplete, collected at different ages and dates, and often use different methods.

## Evidence rules

Every specific health claim should be classified by source quality:

- **A — independent peer-reviewed / institutional measurement**
- **B — independently reported clinical or laboratory result**
- **C — first-party published measurement or protocol**
- **D — self-report / interview**
- **Unknown — insufficient provenance**

We prefer current measurements over historical peak values, but preserve both when useful.

## Practical translation

For each person, separate:

- **High-value / low-cost:** behaviours an ordinary family can realistically copy.
- **Useful but optional:** measurements or equipment that may help but are not necessary.
- **Expensive / low-transferability:** concierge medicine, frequent imaging, experimental therapies, elaborate testing and other interventions that should not be presented as prerequisites for good health.

## Website files

- `index.html` — homepage and daily dashboard
- `styles.css` — responsive design
- `site-data.js` — evidence-aware case-study + working-parent lesson dataset, curated listening library and weekly routine
- `app.js` — Sydney-time daily rotation and filters
- `vercel.json` — Vercel static-site configuration
- `.github/workflows/pages.yml` — keeps the `gh-pages` publishing branch current
- `.github/workflows/validate.yml` — checks JavaScript syntax and page wiring on every push
- `standalone.html` — portable self-contained copy of the current site

No framework, database, tracking script or paid API is required.

## Safety and interpretation

This repository is educational research, not personalised medical advice. Association is not causation, exceptional individuals are not universal templates, and a biomarker that is unusual is not automatically desirable.

_Last updated: 21 September 2026._
