# Public data access audit

This project distinguishes **being measured** from **having auditable public data**.

A person may have thousands of tests while publishing only selected summaries. Conversely, a narrow academic case study may expose fewer health domains but with far stronger methods and numerical detail.

## Access labels

- **Open numeric** — exact values are available in accessible text/tables/papers.
- **Open visual** — results are public but mainly embedded in charts/images/video frames.
- **Summarised** — only selected values, percentile claims or narrative summaries are public.
- **Gated** — material exists behind Patreon/subscription/member access.
- **Withheld** — the person has explicitly chosen not to publish a result.
- **Controlled research data** — underlying research exists but access is restricted/de-identified for privacy or governance.

## Audit by person

| Person | Open numeric data | Open visual data | Gated / controlled | Key limitation |
|---|---|---|---|---|
| **Bryan Johnson** | High for selected metrics and protocol details | High | Some underlying clinical records not public | Many current organ/fitness claims are percentile summaries rather than raw values; first-party commercial ecosystem |
| **Michael Lustgarten** | High for many historical posts | High | Some newer deep-dive analyses use paid/gated channels | Large longitudinal record, but raw current values are often distributed across posts/videos rather than one stable table |
| **Oskar Svendsen** | **Very high quality but narrow** in peer-reviewed physiology | Low | No major paywall needed for core paper | Current VO2max retest number is explicitly withheld |
| **Dave Pascoe** | Moderate | **High** — many testing/DEXA/ageing results are images | Some detailed analyses/interviews are gated or video-only | Broad testing programme, but many exact current values are not machine-readable text |
| **Scott Kelly** | High in peer-reviewed/institutional papers for study outcomes | Moderate | Underlying human-subject data may be controlled/de-identified | Dataset is older and answers spaceflight questions, not a current health dashboard |
| **Julie Gibson Clark** | Low–moderate | Moderate | Commercial test reports are not comprehensively public | Best-known DunedinPACE values are publicly reported but not a full open laboratory record |
| **Bob Troia** | **High for a self-tracker** — blog tables and calculated annual summaries | High | Little formal gating in core archive | Device/method changes across years complicate direct comparison |
| **Michael Snyder** | **High in peer-reviewed literature** | Moderate | Large omics datasets may require repositories/controlled access depending on layer | Personal data and cohort research must be kept separate |
| **Larry Smarr** | Moderate–high through talks, institutional reports and papers | High | Some research datasets are not direct personal downloads | Disease-focused data are richer than general healthy-ageing metrics |
| **Joshua Parris** | High for the deliberately published baseline metrics | Low | Sensitive diagnoses/medications intentionally excluded | Ordinary clinical + wearable data; not an externally audited research subject |

## Bryan Johnson

### What is genuinely open

Public text includes exact values such as:

- VO2max 58.7 mL/kg/min
- resting heart rate around 42 bpm
- CAC score 0
- hs-CRP 0.1 mg/dL
- disclosed exercise volume and macronutrients
- multiple prescription medicines and doses

### What is often only summarised

His 2026 protocol frequently reports statements such as:

- blood pressure lower than a specified percentile/reference group
- bone mineral density percentile
- grip-strength percentile
- glucose-control percentile

Those are useful signals, but they are **not interchangeable with exact raw values plus measurement date/method**.

Source:
- https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol

## Michael Lustgarten

His blog contains years of numerical biomarker discussion, RHR/HRV values and exercise/diet experiments.

The 2026 tracking platform states that he tracks **40+ biomarkers across 13 categories monthly**, but not every current raw value is exposed as simple crawlable text.

Sources:
- https://michaellustgarten.com/
- https://conqueragingordietrying.ai/

## Oskar Svendsen

This is almost the ideal opposite of Johnson:

- comparatively narrow measurement breadth
- unusually high-quality exact peer-reviewed exercise-physiology data
- clear dates, training exposure and test context

His 2025 retest is known to have happened, but *Cycling Weekly* reports that he declined to publish the number.

Sources:
- https://doi.org/10.1152/japplphysiol.00798.2018
- https://www.cyclingweekly.com/news/its-almost-12-years-since-i-quit-i-still-dont-regret-it-we-tracked-down-cyclings-lost-world-champion-and-vo2-max-record-holder

## Dave Pascoe

Pascoe publishes an unusually broad testing menu and selected exact values, including:

- beta-2 microglobulin
- BUN
- cystatin C
- homocysteine
- RDW
- grip strength

However, major sections such as DEXA and ageing-test results are often represented as **images**, not accessible text tables.

His public appearances index also points to a 2025 Michael Lustgarten series auditing roughly 41 of his biomarkers, but some detailed content is distributed across video/paid platforms.

Therefore, this repository should record a value only when it can be traced to an accessible source rather than reverse-engineering numbers from inaccessible/gated material.

Source:
- https://sites.google.com/view/davepascoe/home/my-testing-results

## Scott Kelly

The NASA Twins Study gives exceptionally strong institutional and peer-reviewed access to:

- body-mass change
- energy-intake context
- telomere dynamics
- gene-expression changes
- cognition
- immune response
- inflammation
- vascular/ocular adaptation

However, human-subject omics data are not equivalent to a celebrity dashboard where every raw value is tied publicly to a named person.

NASA explicitly frames the work as a multidimensional study of long-duration spaceflight adaptation.

Sources:
- https://www.nasa.gov/humans-in-space/twins-study/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7580864/

## Julie Gibson Clark

Clark's public record is strongest for:

- self-described routine and budget
- commercial biological-age results
- interviews documenting protocol changes

It is weaker for a complete open set of conventional blood pressure, lipids, glucose, body composition and fitness measurements.

Her reported 0.665 DunedinPACE should therefore be presented as a **reported commercial biomarker result**, not a comprehensive health record.

## Bob Troia

Troia's blog is unusually useful because posts often contain:

- actual durations/sample counts
- annual averages
- charts
- explanation of exclusions and device limitations

For example, his 2019 Oura analysis states the usable-night count and adjusted annual sleep averages.

That transparency makes some of his self-tracking more auditable than higher-profile programmes, despite lower clinical evidence quality.

Source:
- https://www.quantifiedbob.com/sleep-tracking-analysis-oura/

## Michael Snyder

Snyder's strongest publicly auditable material is peer-reviewed:

- longitudinal iPOP paper
- institutional summaries
- later cohort studies

The challenge is **identity separation**: later Stanford studies include many participants, and cohort-level findings must not be accidentally attributed to Snyder personally.

Source:
- https://pubmed.ncbi.nlm.nih.gov/22424236/

## Larry Smarr

Smarr's health story is distributed across:

- UC San Diego institutional histories
- Quantified Self talks
- presentations
- microbiome/inflammatory-disease research
- surgical/clinical reporting

Several striking numerical values are public, but the record is much richer for Crohn's/inflammation than for whole-body healthy ageing.

## Repository rule

When a source says a test exists but the exact result is not auditable:

**record the existence of the test, not an invented value.**

When a result appears only in a gated source:

**do not reproduce or infer it from secondary snippets unless an independent accessible source confirms it.**

When a person explicitly withholds a result:

**mark it withheld.**

This protects the project from a subtle but serious error: treating the *number of tests someone has taken* as the *amount of evidence the public actually possesses*.


## Joshua Parris

Joshua's profile is intentionally different from the external case studies.

The repository openly publishes selected:

- ordinary pathology results
- weight/body-composition history
- blood-pressure range
- sleep summaries
- RHR/HRV examples
- activity measurements

It intentionally does **not** publish diagnoses, medications or other sensitive medical history.

The purpose is not maximal openness. It is to test whether the project's lessons can improve an ordinary working parent's health using a **minimum useful dataset**.

Source:
- https://github.com/joshualparris/HealthiestPeople/blob/main/docs/people/joshua-parris.md
