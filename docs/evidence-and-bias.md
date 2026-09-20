# Source quality, conflicts and interpretation

This project compares people whose public health information comes from very different evidence ecosystems.

A precise-looking number is not automatically high-quality evidence. The most important questions are:

- Who measured it?
- Was the method disclosed?
- Was it independently published?
- Is it current?
- Is the person selling something connected to the claim?
- Is the value measured directly or calculated by an algorithm?
- Is it a one-off best result or a stable longitudinal trend?

## Evidence grades

### A — independent peer-reviewed / institutional

Examples:
- Oskar Svendsen's laboratory VO2max series in the *Journal of Applied Physiology*
- Scott Kelly's NASA Twins Study and independent cardiovascular research

Strengths:
- methods described
- independent research teams
- peer review or institutional oversight
- useful dates/context
- less dependent on the subject's own interpretation

Limitations:
- may be historical rather than current
- often designed to answer a narrow research question
- a case study still cannot establish universal causation

### B — independently reported clinical/laboratory result

Example:
- reporting of Bryan Johnson's biopsy-confirmed autoimmune gastritis

Strengths:
- independent medical/reporting layer

Limitations:
- full source record may not be public
- still may lack raw data/method detail

### C — first-party published measurement/protocol

Examples:
- Blueprint biomarker dashboard
- Michael Lustgarten's long-term self-tracking
- Dave Pascoe's testing pages

Strengths:
- often unusually detailed
- can be highly longitudinal
- subject can explain behaviour around each measurement

Limitations:
- selective publication is possible
- measurements may use different labs/devices over time
- interpretation may be promotional
- exact raw records may not be available

### D — self-report/interview without underlying measurement

Useful for:
- routines
- motivations
- work/family context
- qualitative function

Weak for:
- declaring someone metabolically or biologically healthier than another person

## Commercial-interest notes

### Bryan Johnson / Blueprint

Johnson is both the research subject and the founder/public face of Blueprint, which sells supplements, foods, devices and biomarker/testing-related products.

Therefore:
- his protocol is valuable as a public N-of-1 dataset;
- product/protocol claims should not be treated as independent validation;
- biomarker values should be separated from claims that a specific Blueprint product caused them.

Sources:
- https://blueprint.bryanjohnson.com/
- https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol

### Michael Lustgarten

Many Lustgarten posts disclose affiliate/discount links for:
- laboratory testing
- epigenetic/telomere tests
- metabolomics
- NAD testing
- microbiome testing
- food/supplement products

That disclosure is preferable to hidden sponsorship, but it means recommendations connected to commercial services require extra scrutiny.

Source example:
- https://michaellustgarten.com/2025/04/18/22y-younger-biological-age-full-lab-results-and-analysis/

### Dave Pascoe

Pascoe's site documents products, supplements, devices, testing providers and public appearances. Some linked products/services may create affiliate or promotional relationships.

His self-published results remain useful but should be separated from:
- commercial claims,
- media labels such as "reversing ageing",
- product-specific causal claims.

Sources:
- https://www.davepascoe.net/
- https://sites.google.com/view/davepascoe/home/my-supplement-list
- https://www.davepascoe.net/home/online-appearances

### Oskar Svendsen

The core physiology evidence used here is a peer-reviewed longitudinal case study rather than a commercial longevity programme.

Primary source:
- https://doi.org/10.1152/japplphysiol.00798.2018

This gives the VO2max/training data unusually strong provenance, but the dataset is narrow and largely historical.

### Scott Kelly

The core evidence comes from NASA-funded/institutional research and peer-reviewed studies.

Primary sources:
- https://www.nasa.gov/humans-in-space/twins-study/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7580864/

This provides strong independent evidence, but the study asks how a human adapts to long-duration spaceflight — not whether Kelly had the world's best health profile.

## Common interpretation traps

### 1. Survivor / selection bias

These people became interesting because they were exceptional, highly measured, highly motivated, or willing to publish.

They are not a random sample of humans.

### 2. Healthy-user bias

A person who exercises, tracks food, pays for testing, sleeps deliberately and seeks medical care differs from average people in many ways simultaneously.

It is difficult to attribute an outcome to one intervention.

### 3. Medication confounding

Examples already documented in this repository:

- Bryan Johnson uses thyroid replacement, metformin, empagliflozin, Repatha and other prescriptions.
- Dave Pascoe uses thyroid replacement plus rosuvastatin/ezetimibe.

When a drug directly affects glucose, lipids or another endpoint, it is inappropriate to attribute the endpoint entirely to diet, supplements or exercise.

### 4. Age confounding

Comparing:
- Svendsen's peak fitness at 18,
- Johnson in his late 40s,
- Pascoe in his early 60s,
- Kelly during a mission in his early 50s

as though they were contemporaneous competitors is not valid.

Age-specific normative comparisons are more meaningful.

### 5. Measurement-method changes

Wearables, laboratory assays and ageing clocks can change.

A trend is strongest when:
- same assay,
- same laboratory/device,
- same collection conditions,
- similar time of day/fasting state,
- repeated enough to distinguish signal from noise.

### 6. Biological-age overreach

Epigenetic and clinical biological-age algorithms can be useful research tools, but a result of "age 38" does not mean every organ belongs to a typical 38-year-old or that remaining lifespan is known.

A 2025 *Physiological Reviews* review notes that:

- there is currently **no consensus ageing clock that serves as a standard human ageing biomarker**
- physiological/functional relevance is unclear for many clocks
- different clock types can disagree
- even technical replicates from the same samples can differ materially; the review cites one study with median deviation around **3 years** and maximum deviation around **8 years**
- another comparison of six epigenetic clocks on the same samples found differences up to **9 years**

A 2024 *Aging Cell* perspective similarly argues that scientists should describe the output by the specific clock rather than casually treating it as whole-body "biological age", because ageing is tissue-specific and multidimensional.

Clinical PhenoAge is itself a **mortality-risk model derived from routine biomarkers and chronological age**. It is not a direct measurement of ageing tissue.

This project therefore:

- names the specific clock/method;
- date-stamps each result;
- keeps best-ever and current results separate;
- shows repeat-test variability;
- and does not translate a clock result directly into promised lifespan.

Sources:
- Furrer & Handschin, *Physiological Reviews* 2025: https://doi.org/10.1152/physrev.00045.2024
- Johnson et al., *Aging Cell* 2024: https://onlinelibrary.wiley.com/doi/10.1111/acel.14377
- BioAge toolkit / PhenoAge method: https://pmc.ncbi.nlm.nih.gov/articles/PMC8602613/

### 7. Athletic-performance overreach

An extraordinary VO2max demonstrates exceptional aerobic capacity.

It does **not** establish:
- normal LDL/ApoB,
- normal blood pressure,
- absence of cancer,
- good sleep,
- healthy relationships,
- mental wellbeing,
- low all-cause disease burden.

### 8. More testing is not automatically better health

Dense measurement can:
- detect real problems,
- create false positives,
- generate incidental findings,
- increase cost/anxiety,
- invite optimisation of weak surrogate markers.

The project therefore asks whether a measurement changes a meaningful decision.

## Project rule for conclusions

Strong conclusions require **convergence**.

For example, cardiovascular health is more convincing when several independent signals agree:

- blood pressure
- ApoB/lipids
- glucose/metabolic status
- smoking status
- aerobic capacity
- body composition
- imaging where clinically meaningful
- longitudinal stability

One spectacular number is never enough.

## Project rule for ordinary-family recommendations

A practice gets promoted into the practical playbook only when:

1. it has reasonable evidence beyond one individual;
2. expected benefit is meaningful;
3. risk is low;
4. cost/time is proportionate;
5. it can coexist with ordinary family/work responsibilities.

This is why exercise, sleep, whole-food dietary patterns, not smoking, sensible alcohol limits and primary-care risk-factor management outrank epigenetic clocks, supplement stacks and experimental procedures.


---

# Evidence notes for the four added profiles

## Julie Gibson Clark

Two different claims must stay separate:

1. **DunedinPACE is a scientifically published biomarker.** Belsky and colleagues validated DunedinPACE against healthspan-related outcomes in multiple cohorts.
2. **Clark's personal result and routine are not a randomised trial.** Her reported ~0.665 result does not prove that her routine caused the score or that the score predicts a fixed percentage extension in her lifespan.

Potential conflicts/selective-reporting issues:
- longevity media often frame leaderboard positions competitively
- commercial biological-age testing encourages repeat testing
- later intervention changes can make the personal protocol a moving target

Project rule: report the measurement, explain the biomarker, and **do not translate it into guaranteed years of life**.

## Bob Troia

Troia is a classic N-of-1 source.

Strengths:
- long time horizon
- unusually transparent experiments
- emphasis on raw data and trends
- often explicitly frames conclusions as personal experiments

Limitations:
- no control group
- many variables change across years
- device accuracy changes
- self-selection and publication bias
- an intervention that changes his glucose/sleep/body composition may not generalise

Project rule: learn from the **experimental method and tracking discipline** more than from any single intervention result.

## Michael Snyder

Snyder's central personal-omics work has high scientific provenance because it was published in peer-reviewed research and embedded in a broader research programme.

Strengths:
- multi-layer longitudinal measurement
- documented methods
- clinically meaningful disease-transition example
- later work expanded into larger cohorts

Limitations:
- the original personal profile is still one individual
- research infrastructure is radically unlike ordinary primary care
- intensive measurement increases incidental findings and interpretation burden

Project rule: translate the principle of **personal baseline + meaningful deviation**, not the laboratory stack.

## Larry Smarr

Smarr's public story combines institutional reporting, self-tracking and a diagnosed inflammatory bowel disease.

Strengths:
- unusually long longitudinal record
- persistent inflammatory signal linked to subsequent clinical investigation
- valuable example of moving from self-tracking to formal medical assessment

Limitations:
- retrospective storytelling can overstate how obvious the signal was in real time
- extensive testing raises false-positive/incidental-finding risk
- microbiome interpretation remains complex and context dependent

Project rule: treat Smarr as a **disease-detection / longitudinal-follow-up case**, not as evidence that broad untargeted testing is beneficial for healthy people.

# Biological-age leaderboard caution

Leaderboard positions are especially vulnerable to overinterpretation.

Reasons include:

- different clocks measure different constructs
- technical/lab variation
- regression to the mean
- selective timing or publication
- uncertain clinical meaning for an individual
- a biomarker can be associated with outcomes without being a validated surrogate endpoint for treatment

Therefore this repository never converts an ageing-clock result directly into "years added", "years younger" or a certainty about future lifespan.
