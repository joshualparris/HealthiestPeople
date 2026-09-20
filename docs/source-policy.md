# Source and recommendation policy

_Last updated: 20 September 2026._

## Purpose

This repository is designed to be auditable. A reader should be able to click through from an important claim to the source that supports it.

## Quantitative personal/profile claims

Every quantitative health claim should include, wherever available:

1. person
2. date or time period
3. metric
4. value
5. unit
6. measurement method / device / laboratory
7. source URL
8. evidence grade
9. whether the value is current, historical, peak/best, calculated or self-reported
10. important confounders, such as medication or device changes

If an exact value is not publicly accessible, the repository records **unknown / image-only / gated / withheld** rather than guessing.

## Source hierarchy

### A — peer-reviewed / institutional primary measurement

Examples:
- peer-reviewed physiology paper
- NASA study
- clinical research publication

### B — original clinical document / independently reported clinical result

Examples:
- pathology PDF
- clinical imaging result
- independently reported biopsy result

### C — first-party public protocol / dashboard / self-experiment

Examples:
- Blueprint
- Michael Lustgarten's blog
- Quantified Bob
- Dave Pascoe's site

### D — interview / self-report / media summary

Useful for routines and life context, weak for declaring objective health status.

## Recommendation rule

A health recommendation in the **Josh Plan** should ideally have all three:

1. **official Australian guidance** relevant to the recommendation;
2. **at least two peer-reviewed systematic reviews, meta-analyses or similarly high-level evidence sources**, where such literature exists;
3. **a Joshua-specific reason** based on his longitudinal data and constraints.

When high-level evidence is not available, the recommendation must be labelled as:
- a practical preference;
- a measurement convention;
- a clinician-directed action;
- or an N-of-1 experiment.

It must not be presented as established clinical fact.

## Exact numbers

Exact numbers require one of four labels:

- **Guideline target** — directly specified by a guideline.
- **Evidence-supported range** — supported by high-level research, but not necessarily an official target.
- **Personal target** — selected for practicality or consistency.
- **Observed value** — measurement, not a recommendation.

Example:

**85 g protein/day for Josh is a personal target**, not an Australian RDI. The Australian RDI for a man aged 31–50 is 64 g/day. Higher protein can modestly augment resistance-training adaptations, but meta-analyses generally find the largest extra gains at considerably higher intakes than 85 g/day. Therefore the site must not claim that 85 g is “optimal”.

## Medication / disease confounding

If a person takes a medicine that directly affects the measured endpoint, the profile must say so.

Examples:
- LDL/ApoB while using PCSK9 inhibition
- glucose measurements while using glucose-lowering medication
- thyroid values during thyroid-replacement treatment

## Wearables

- Keep source/device identity.
- Never merge absolute HRV from different devices.
- Do not sum synced step sources.
- Do not treat wearable sleep stages as polysomnography.
- Wrist PPG measures pulse, not diagnostic cardiac rhythm.
- Prefer within-device longitudinal trends.

## Biological-age clocks

Always name the clock.

Do not translate:
- “PhenoAge 35”
- “DunedinPACE 0.66”
- an epigenetic-age result

into literal organ age, life expectancy or guaranteed lifespan.

## Commercial conflict

First-party claims from someone selling:
- supplements
- tests
- devices
- subscriptions
- procedures

remain usable as first-party evidence, but the commercial relationship should be disclosed.

## Link integrity

For high-value recommendations and headline profile metrics:
- prefer DOI, PubMed, institutional or official guideline URLs;
- avoid unattributed social-media snippets when an original source exists;
- preserve the original primary source alongside a readable secondary explanation when useful.

## Correcting the record

When later source-aware analysis overturns an earlier conclusion:
- update the active profile/plan;
- keep the correction visible where useful;
- do not quietly preserve the old attractive claim.

This policy applies to the website, Markdown research files and structured datasets.
