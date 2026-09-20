# HealthiestPeople — Product Roadmap

_Last reviewed: 20 September 2026_

## Product goal

Build the clearest, most useful evidence-aware health website for an ordinary working adult who wants to improve health without turning life into a full-time optimisation project.

The site should answer four questions quickly:

1. **What should I do today?**
2. **Why does it matter?**
3. **What do my numbers mean in plain English?**
4. **What is the evidence, and how confident should I be?**

It should work particularly well on a phone, during a busy week, when the user has little attention to spare.

## Professional lenses

This roadmap treats the product through several roles at once:

- **Product / UX designer:** information architecture, navigation, cognitive load, mobile usability.
- **Health-literacy editor:** plain English, terminology, interpretation, practical instructions.
- **Evidence / clinical-content reviewer:** provenance, uncertainty, dates, appropriate escalation to clinicians.
- **Data-visualisation designer:** trends, comparisons, context and honest visual scales.
- **Accessibility engineer:** keyboard access, semantic HTML, focus states, reduced motion, WCAG 2.2 AA.
- **Frontend / performance engineer:** fast static pages, resilient JavaScript, low dependency burden.
- **SEO / content strategist:** useful page titles, descriptions, structured content and discoverability.
- **Privacy / safety reviewer:** minimise unnecessary sensitive data exposure and clearly distinguish education from clinical advice.
- **Research-operations editor:** source freshness, reproducibility, automated checks and auditable updates.

---

## Progress update — first implementation tranche

Implemented in the first roadmap pass:

- unified multi-page navigation on the homepage
- mobile burger navigation styling and accessible focus states
- shorter dashboard-style homepage with weekly anchors
- skip-to-content links across the site
- expandable “what this means for me” interpretation on personal headline metrics
- exact home blood-pressure and waist-measurement instructions with Australian sources
- corrected the BP tracking plan so it no longer implies an arbitrary three-month medical requirement
- exact Strength A / Strength B instructions on the Plan page
- clearer Australian vegetable/protein target explanations
- plain-English glossary and inline health-term explanations

---

# Phase 1 — Make it effortless to understand and navigate

**Priority: now**

### Information architecture
- [x] Separate pages for Plan, People, Charts, Resources and Evidence.
- [x] Mobile burger menu on secondary pages.
- [x] Make the homepage use the same global navigation.
- [x] Reduce the homepage's role from “everything” to **daily dashboard + clear routes into deeper pages**.
- [x] Add an “Explore” panel showing where to go for Plan / People / Charts / Resources / Evidence.
- [x] Add consistent current-page highlighting and page-level tabs where helpful.

### Health literacy
- [x] Plain-English glossary.
- [x] Inline jargon explanations.
- [x] Headline personal metrics now answer:
  - **What is this?**
  - **Why do I care?**
  - **What does this result tell me — and what does it not tell me?**
  - **What, if anything, should I do next?**
- [ ] Replace unexplained abbreviations wherever possible on first use.
- [ ] Explain units such as mmol/L, bpm and ms beside the first relevant value.
- [x] Add “How to do this” instructions to measurements such as home blood pressure and waist circumference.

### Accessibility
- [x] Add skip-to-content links.
- [x] Strong visible keyboard focus.
- [ ] Ensure interactive elements have clear accessible names/states.
- [ ] Review colour contrast and text size.
- [x] Ensure charts have meaningful text alternatives.

**Definition of done:** a first-time visitor can understand the site on mobile without already knowing health jargon.

---

# Phase 2 — Make the site genuinely useful every day

**Priority: next**

### Daily dashboard
- [x] Make “Today” the primary homepage experience.
- [x] Add a compact “This week” preview.
- [ ] Show the minimum version beside each planned behaviour.
- [ ] Add “why this is in your plan” under each action.
- [ ] Show time cost and equipment needed.
- [ ] Clearly distinguish:
  - required / foundational
  - optional
  - skip for now

### Practical instructions
- [x] Strength A / Strength B list exact exercises, sets/reps and practical effort guidance.
- [ ] “Conversational pace” should include a simple talk-test explanation.
- [ ] Measurements should include preparation and technique.
- [x] Nutrition targets include ordinary-food explanations rather than only gram targets.

### Progress without gamification pressure
- [ ] Weekly review: “What happened?” rather than streaks or points.
- [ ] Use neutral states such as **done / adapted / missed / not needed**.
- [ ] Make disrupted weeks easy to restart.

**Definition of done:** the site can replace a separate weekly health to-do list.

---

## Progress update — personal trends and diagrams

Implemented in the second roadmap pass:

- personal charts now read the repository CSV datasets directly, so future data updates flow into the visualisations
- weight, LDL/total cholesterol, ferritin, sleep, steps and resting-heart-rate trends added
- each chart includes interpretation rather than only a line
- source changes are called out instead of silently joining incompatible data
- mixed Fitbit/Withings HRV is intentionally **not** merged into a misleading chart
- underlying-data tables are available for key charts
- chart SVGs have meaningful accessible labels
- mobile charts no longer require a desktop-width canvas
- new diagrams explain the measurement ladder, N-of-1 evidence, clinical handoff and the aerobic/strength/sleep foundation

---

# Phase 3 — Turn personal data into useful interpretation

**Priority: high**

### Metric cards
Each metric should show:
- value
- date
- source/device/lab
- plain-English meaning
- trend direction where valid
- what can influence it
- what decision it could change
- confidence / limitations

### Trends
- [x] Separate data from different devices or methods.
- [x] Never imply a change is meaningful when measurement error could explain it.
- [ ] Mark “historical peak”, “current”, and “single measurement” clearly.
- [ ] Add clinician/lab reference ranges only when sourced and appropriate.
- [ ] Never substitute a generic range for personalised medical interpretation.

### Clinical handoff
- [ ] Add “Questions worth asking your GP” where a measurement genuinely warrants follow-up.
- [ ] Distinguish routine tracking from diagnostic testing.
- [ ] Add explicit red-flag advice only from authoritative clinical sources.

**Definition of done:** numbers produce understanding rather than anxiety or optimisation noise.

---

# Phase 4 — Best-in-class charts and diagrams

**Priority: high**

### Personal charts
- [x] Weight trend over time.
- [x] Lipids over time.
- [x] Ferritin / iron trend.
- [x] Resting heart rate + sleep trends; HRV intentionally withheld until a clean same-device series exists.
- [ ] Weekly activity and exercise mix.
- [ ] 5 km benchmark progress once enough comparable data exists.

### Case-study charts
- [ ] Separate historical elite peaks from current measures.
- [ ] Show evidence grade and measurement date directly on charts.
- [x] Add “apples vs oranges” warnings when methods differ.
- [x] Avoid pseudo-precision and fake composite “health scores”.

### Explanatory diagrams
- [x] What aerobic + strength + sleep each contribute.
- [x] Measurement ladder: free → useful → optional → research-grade.
- [x] “Signal → repeat/context → clinician” pathway.
- [x] How an N-of-1 experiment differs from a clinical trial.

**Definition of done:** every chart communicates a conclusion correctly without requiring the accompanying prose.

---

# Phase 5 — Make the people research much easier to explore

**Priority: medium**

- [ ] Person detail pages rather than only summary cards.
- [ ] Compare by domain: sleep / cardio / strength / metabolic / measurement strategy.
- [ ] Filter by:
  - evidence strength
  - cost
  - family/time compatibility
  - intervention type
- [ ] “Most transferable lessons” view.
- [ ] “Interesting but not worth copying” view.
- [ ] Source timeline showing how current each claim is.
- [ ] Clear commercial/conflict disclosures beside relevant claims.

**Definition of done:** users can learn from a person without confusing their routine with evidence.

---

# Phase 6 — Resources that teach rather than overwhelm

**Priority: medium**

- [ ] Search and filter podcasts, videos and articles.
- [ ] Show duration / reading time.
- [ ] Add “Why watch/read this?” and “Key lesson”.
- [ ] Mark first-party vs independent sources.
- [ ] Add a curated “Start here” path of 5–10 resources.
- [ ] Periodically test links automatically.

**Definition of done:** resources are a learning pathway, not a bookmark dump.

---

# Phase 7 — Accessibility, performance and trust

**Priority: medium**

### Accessibility
- [ ] WCAG 2.2 AA review.
- [ ] Keyboard-only pass.
- [ ] Screen-reader landmark/heading audit.
- [ ] 200% zoom/mobile reflow test.
- [ ] Reduced-motion support across all interactive elements.

### Performance
- [ ] No unnecessary framework or client bundle.
- [ ] Minimise render-blocking resources.
- [ ] Lazy-load embeds.
- [ ] Cache static assets sensibly.
- [ ] Target strong Lighthouse scores.

### Trust
- [ ] “How this site works” page.
- [ ] Content freshness dates.
- [ ] Evidence-policy link near claims.
- [ ] Correction / changelog process.
- [ ] Privacy explanation for personal-data sections.

**Definition of done:** the site feels careful, fast and trustworthy.

---

# Phase 8 — Discoverability and resilience

**Priority: later**

- [ ] Open Graph / social preview metadata.
- [ ] Sitemap and robots metadata.
- [ ] Structured data where appropriate.
- [ ] Better page titles and descriptions.
- [ ] PWA/offline support only if it genuinely improves daily use.
- [ ] Print-friendly plan / GP-summary views.
- [ ] Export selected personal trends to CSV/PDF without exposing unrelated private data.

---

# Phase 9 — Research maintenance

**Ongoing**

- [x] Automated static validation.
- [ ] Broken-link checker.
- [ ] Source freshness checker.
- [ ] Dataset-schema validation.
- [ ] Flag claims that have no date or evidence grade.
- [ ] Annual review against Australian health guidance.
- [ ] Keep a public changelog of material evidence corrections.

---

# Immediate implementation order

1. **Unify homepage navigation with the multi-page structure.**
2. **Add an “Explore” hub to the homepage.**
3. **Upgrade personal metric cards from raw numbers to interpretation cards.**
4. **Add exact “how to measure it” guidance for BP, waist and fitness/strength benchmarks.**
5. **Add skip links and visible keyboard focus.**
6. **Improve charts with context and text alternatives.**
7. **Then simplify the homepage by moving duplicated deep content to its dedicated pages.**

The governing product rule is:

> **Every screen should either help the user act, understand, or verify. If it does none of those, it is probably clutter.**
