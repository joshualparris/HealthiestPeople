# Joshua Parris — comprehensive longitudinal health archive

_Last updated: 20 September 2026._

## Purpose

This is the long-form public health record for **Joshua Luke Parris**, born **3 August 1994**, living in Dubbo, NSW.

It exists so Joshua can compare **years of his own data** against:
- his own earlier baseline;
- highly measured public case studies in this project;
- ordinary clinical reference ranges where appropriate.

This archive intentionally keeps **source, date and method visible**. Health Connect is a hub containing several devices and synchronised copies, not one measuring instrument.

## Data sources

### Android Health Connect

The 21 August 2026 master export covered approximately **July 2024 to August 2026**.

The then-current database contained:

| Signal | Records |
|---|---:|
| Heart-rate samples | **4,414,836** |
| HR parent records | **241,872** |
| HRV / RMSSD records | **64,891** |
| Resting-HR records | **82,110** |
| Sleep sessions | **1,857** |
| Sleep-stage rows | **154,926** |
| Step records | **210,366** |
| Exercise sessions | **662** |
| Respiratory-rate records | **63,371** |
| Weight records | **189** |
| Body-fat records | **155** |
| Skin-temperature records | **125** |

Major sources represented:
- Fitbit
- Withings / Sleep Mat
- Google Fit
- Sleep as Android
- Samsung Health
- eufy Life scale
- phone step data
- earlier Welltory context

### Direct Fitbit / Google Health weekly reports

A separate longitudinal CSV in this repository stores weekly reports:

- [data/josh-weekly-wearable-history.csv](../../data/josh-weekly-wearable-history.csv)

It contains sparse Fitbit snapshots from **2022** and dense weekly records from **March–September 2026**.

## Demographics and life context

- DOB: **3 Aug 1994**
- Age: **32** in September 2026
- Sex: male
- Height: **175 cm**
- Blood type: **O negative**
- Location: Dubbo, NSW
- Married; father of two young children
- Works in school IT/library support at **0.9 FTE**
- Work is substantially computer/screen based
- Short commute
- Family/children's bedtime significantly constrain evening exercise
- Dubbo heat makes conventional after-work outdoor exercise less practical
- Preferred structured exercise window is generally **after 8 pm and weekends**
- Major exception: regular **Monday-night Ultimate Frisbee, ~6–7 pm**
- Regular Saturday **5 km Dubbo parkrun** has also been scheduled with daughter Sylvie

The plan must fit family life rather than treating health optimisation as a second full-time job.

## Weight, BMI and body composition

### Cleaned longitudinal Health Connect trend

The August 2026 source-aware analysis found:

- **88.8 kg** on 11 Jul 2024
- **77.4 kg** on 24 Jul 2026
- total change: **−11.4 kg**
- first-90-day median: **87.8 kg**
- final-90-day median: **79.8 kg**
- approximate cleaned linear slope: **−0.28 kg/month**

The raw smart-scale feed contains implausible jumps and possible wrong-person/synchronised records; daily medians and continuity filters were used for long-term trend analysis.

### BMI history, calculated consistently from 175 cm

| Date/context | Weight | Calculated BMI |
|---|---:|---:|
| Jul 2024 | 88.8 kg | **29.0** |
| early cleaned period median | 87.8 kg | **28.7** |
| 2025 Withings snapshot | 83.7 kg | **27.3** |
| May–mid Jul 2026 | ~81.0 kg | **26.4** |
| Jul–Sep 2026 | 77.4 kg | **25.3** |

An old device/app value of BMI ~21 at ~83 kg was mathematically impossible and is treated as superseded.

### Body fat

Consumer bioimpedance trend after filtering:

- first-90-day median: **~19.8%**
- final-90-day median: **~16.3%**
- latest retained estimate in the Aug 2026 analysis: **~14.2%**

Older 2025 Withings snapshot:
- body fat **17.7%**
- muscle mass **65.8 kg**
- bone mass **3.5 kg**
- visceral-fat index **10**

Direction of change is more trustworthy than any one exact bioimpedance percentage.

## Resting heart rate

### Same-source Fitbit trend

Monthly mean Fitbit resting HR in the 21 Aug master analysis:

| Month 2026 | Mean RHR |
|---|---:|
| Apr | **62.25 bpm** |
| May | **61.52** |
| Jun | **60.97** |
| Jul | **61.55** |
| Aug through 21st | **60.86** |

Current-window means at that analysis:
- 7 days: **61.4 bpm**
- 30 days: **61.2**
- 90 days: **61.0**

This superseded an earlier mixed-device story that RHR had progressively risen by ~5 bpm.

### Late-August / September 2026 Google Health

A later short-term rise occurred:

- Aug 1–7: **61 bpm**
- Aug 8–14: **61**
- Aug 15–21: **61**
- Aug 22–28: **63**
- Aug 29–Sep 4: **64**
- Sep 5–11: **66**

Past chats placed this rise in illness/stress/recovery context rather than treating it as a new long-term baseline.

## Heart-rate variability

### Fitbit

Strongest source-specific August analysis:

- 90-day mean RMSSD: **~37.0 ms**
- 30-day mean: **~36.3 ms**
- Apr–Aug long-term slope essentially flat
- 23–29 Jul mean: **33.6 ms**
- 30 Jul–5 Aug mean: **36.9 ms**
- short low around 26 Jul: **~31 ms**
- early August high: **~39.3 ms**

### Withings comparison

Across 95 overlapping dense days:
- Fitbit vs Withings daily HRV Pearson correlation: **~0.52**
- Spearman: **~0.57**
- Withings averaged **~14.53 ms higher**
- direction of daily change agreed ~**71%**

Therefore Fitbit and Withings HRV must never be merged into one absolute series.

### Earlier spot values

Historical examples from earlier apps/reports include:
- RMSSD **46 ms**
- RMSSD **53.7 ms**
- SDNN **113 ms**

These came from different devices/methods and remain contextual only.

## Sleep

### Longitudinal Health Connect view

By Aug 2026:
- full-export main-night median: **~8 h 42 min**
- mean: **~8 h 38 min**
- recent Fitbit 30-day main-session window: **8.44 h**
- recent Fitbit stage-derived asleep: **7.73 h**

Source medians:
- Google Fit sleep window: **8.65 h**
- Sleep as Android: **8.65 h**
- Withings: **8.52 h**
- Fitbit: **8.38 h**

Device sleep stages disagree substantially; total sleep/session time is more comparable.

### 2026 weekly evolution

March–May contained several shorter-sleep weeks:
- Mar 16–22: **6 h 48 min**
- Mar 23–29: **6 h 29**
- Mar 30–Apr 5: **6 h 26**
- Apr 13–19: **5 h 28**
- Apr 27–May 3: **5 h 58**
- May 4–10: **6 h 01**
- May 11–17: **6 h 05**

Sleep improved strongly later.

Recent six Google Health weeks, Aug 1–Sep 11:
- **8:05**
- **8:09**
- **7:51**
- **8:07**
- **7:42**
- **8:12**

Six-week mean: approximately **8 h 01 min/night**.

The website should therefore no longer describe ~6.5 h as Joshua's current sleep baseline.

## Steps and ordinary activity

The source-aware master report found:
- current 30-day Fitbit mean: **~14,691 steps/day**
- 90-day mean: **~12,888/day**
- weekend mean: **~14,897/day**
- weekday mean: **~12,372/day**

Recent six Google Health weeks Aug 1–Sep 11 averaged approximately:
- **14,575 steps/day**

Examples:
- Mar 30–Apr 5: **18,153/day**
- Jul 11–17: **7,307/day**
- Aug 15–21: **16,640/day**
- Sep 5–11: **15,775/day**

This makes "add lots more walking" a low-priority intervention compared with strength, recovery and preserving enjoyable sport.

## Monday-night Ultimate Frisbee

Frisbee is a **current recurring activity**, not an old historical anecdote.

### Schedule and role

- regular Monday night
- about **6–7 pm**
- Dubbo, NSW
- one-hour recreational/competition-style Ultimate session
- user registered with Dubbo Ultimate Frisbee Federation in May 2026
- participated in A-Team mixed-division winter indoor Ultimate during May–June 2026

It is valuable not only as exercise but as:
- social connection
- play
- stress transition after work/family mode
- recurring weekly identity/community habit

### Documented May 2026 Fitbit session

- calories: **310 kcal**
- average HR: **124 bpm**
- Active Zone Minutes: **49**
- vigorous/peak time: **21 min**
- zone breakdown:
  - light: 32 min
  - moderate: 7
  - vigorous: 9
  - peak: 12

### Harder August session

A later Monday session around 17 Aug 2026 was substantially harder:
- duration: **~69 min**
- average HR: **~149 bpm**
- roughly **50 min vigorous**
- cardio load: **154**
- personalised target at the time: **75**
- approximately **204% of target**

The useful conclusion is that Monday frisbee sometimes functions as the week's hard cardiovascular session.

A strength workout should **not** automatically be stacked on the same evening.

### Health Connect likely-session audit

Likely Monday frisbee HR patterns were identified on multiple dates including:
- 20 Apr
- 4 May
- 11 May
- 18 May
- 25 May
- 1 Jun
- late Jul
- 17 Aug
- 24 Aug
- 31 Aug
- 7 Sep

Exact classification varies depending on strict HR/time-window criteria.

## Running and parkrun

- 5 km running was restarted on **28 Feb 2026** after a 68-day gap
- recurring Saturday **5 km Dubbo parkrun** has been scheduled with Sylvie
- example 10 Aug 2026 run:
  - **3.11 km**
  - **24:59**
  - pace **~8:02/km**
  - HR roughly **121–133 bpm**

### High exercise heart-rate audit

In the Aug 21 master dataset:
- ≥170 bpm occurred on **9 days**
- ≥180 on **6**
- ≥190 on **one day**
- peak **195 bpm** on **29 Jul 2026 at 17:19:42 AEST**
- that peak occurred during running/walking activity

All 139 audited minutes containing a ≥170 reading had step activity; 138/139 had at least 60 steps/min.

A strict inactive screen found:
- 12 events ≥120
- 5 ≥130
- **0 ≥140**

Wearable pulse cannot determine cardiac rhythm; ECG-quality recording is needed for rhythm diagnosis.

## Exercise load and recovery

Fitbit-era analysis covered:
- **117 exercise sessions**
- **62 exercise days**
- 5 Apr–17 Aug 2026

On 13 complete objectively high-load transitions:
- mean next-morning HRV change: **−4.9%**
- median: **−5.0%**
- range: **−18.4% to +8.4%**

No-exercise transitions averaged **+4.5%**, but ordinary variability was very wide.

Large HRV drops were more frequent after hard exercise, but not inevitable.

Day +2 often rebounded:
- HRV rose on **9 of 14** complete windows
- average D+2 vs D+1 change: **+6.9%**

This supports using HRV as context, not as a rule that cancels exercise whenever one morning is low.

## Respiratory / oxygen / temperature wearable context

- respiratory rate is available densely from Withings and more sparsely from Fitbit
- one cleaned June week was about **11.8 breaths/min**
- later September Fitbit values in prior chats were around **11.4–12.6/min**, baseline ~12.2

One early direct Fitbit overnight SpO2 series:
- average roughly **95.2%**
- most valid samples ~**94.8–95.5%**
- some low values and invalid 50% readings
- insufficient for diagnosis or trend

Fitbit AFib-screen history in the early export:
- **57 screening windows**
- **0 positive detections**

Negative consumer screening does not exclude an intermittent arrhythmia.

## Conventional blood pressure

Recorded clinic/donation readings have generally fallen around:
- systolic **122–136 mmHg**
- diastolic **70–87**
- commonly referenced reading **135/80**

A proper repeated home average remains more useful than one reading.

## Pathology timeline

### 2022

- HbA1c: **~5.0%** in previously shared pathology

### June 2023

- total cholesterol **5.3 mmol/L**
- LDL-C **3.2**
- HDL-C **1.6**
- triglycerides **1.1**
- total/HDL ratio **3.3**
- CRP **<1 mg/L**
- TSH around **1.45 mIU/L** in previously shared records

### January 2025

- haemoglobin **148 g/L**
- ferritin **35 µg/L**
- creatinine **86 µmol/L**
- eGFR **>90**
- glucose **5.3 mmol/L**
- total protein **66 g/L**
- CRP **<1 mg/L**

### February 2026

| Marker | Result |
|---|---:|
| Fasting glucose | **5.0 mmol/L** |
| HbA1c | **5.3% / 34 mmol/mol** |
| Total cholesterol | **4.6 mmol/L** |
| LDL-C | **2.8 mmol/L** |
| HDL-C | **1.3 mmol/L** |
| Triglycerides | **1.1 mmol/L** |
| Ferritin | **41 µg/L** |
| Iron | **26.0 µmol/L** |
| Transferrin saturation | **45%** |
| Haemoglobin | **158 g/L** |
| CRP | **<0.4 mg/L** |
| TSH | **0.99 mIU/L** |
| Vitamin D | **78 nmol/L** |
| Vitamin B12 | **338 pmol/L** |
| Magnesium | **0.82 mmol/L** |
| Creatinine | **80 µmol/L** |
| eGFR | **>90 mL/min/1.73m²** |

## Iron / donation context

- ferritin was **35 µg/L** in Jan 2025
- **41 µg/L** in Feb 2026
- low iron stores have been discussed in relation to frequent blood donation
- clinician instruction recorded previously: one iron tablet **every two days** to rebuild stores

## Cardiovascular investigation history

Previously shared records/history include:
- normal ECG/troponin/bloodwork during a 2022 chest-pain episode, with costochondritis considered
- prior normal ECG / chest imaging
- historical echocardiogram reported **LVEF 69%**
- historical QTc reported **414 ms**
- prior Holter reported as normal

2026 included:
- recurrent chest discomfort assessed clinically as costochondritis
- episodes of palpitations / rapid heart rate
- prolonged tachycardia episode in mid-May that was not adequately captured by the wearable export
- late-July/ED tachycardia context discussed in prior chats
- later cardiology advice reportedly allowed return to/maximal exercise

The public archive should distinguish clinician records from consumer wearable observations and avoid treating a Fitbit rate as a rhythm diagnosis.

## Medical / functional context affecting health planning

### Musculoskeletal
- complete **left ACL tear** on MRI, 22 Dec 2020
- minor/possible partial PCL injury
- no meniscal tear
- managed with rehabilitation rather than reconstruction
- chronic low-back pain for >10 years
- recurrent chest-wall/costochondral pain
- joint-injury / muscle-damage susceptibility noted in consumer genetic context

### Respiratory
- mild intermittent asthma
- more likely with viral illness / cold night air
- inhalers previously listed include Symbicort and Ventolin/salbutamol

### Headache
- longstanding recurrent tension/headache pattern, often weekly historically

### Neurodevelopment / stress
- ADHD diagnosed 2020
- autism has been part of the user's self-described/clinical context
- anxiety / rejection-sensitivity / overstimulation history
- screen hyperfocus and switching difficulty can affect bedtime, recovery and routine adherence

These are relevant because an ideal plan must reduce friction and cognitive load rather than require continuous manual tracking.

## Nutrition context

- dairy-free because dairy exposure causes stomach pain
- caffeine-sensitive; generally caffeine-free / rooibos-oriented, with occasional small exposure
- alcohol-sensitive
- preferred dietary pattern: Mediterranean-ish, plant-forward, low saturated fat
- fish, eggs and legumes are acceptable
- does not like tuna
- current self-set protein approach has often been **~65 g/day on ordinary days and ~85 g on more active days**
- health plan should use ordinary groceries rather than branded longevity food

## Equipment / access

Known home/available activity equipment includes:
- e-bike
- small kettlebells
- dumbbells
- trampoline
- massage chair
- yoga nidra / breathing practices

Later planning has considered adjustable dumbbells, bench, pull-up bar and bands, but the programme should not assume new purchases are required.

## Current family-compatible weekly structure

The earlier website plan was wrong to prescribe Monday strength and extra lunch walks.

A better fit is:

### Monday
**6–7 pm Ultimate Frisbee**
- count this as the main hard cardiovascular session
- no separate strength workout required

### Tuesday
**after 8 pm: 25-minute strength session**

### Wednesday
No mandatory formal exercise.
- every-second-Wednesday evening commitments already exist
- ordinary movement is enough

### Thursday
**after 8 pm: 25-minute strength session**

### Friday
No mandatory exercise.

### Saturday
**5 km parkrun / run-walk with Sylvie** when attending.
- keep it conversational/easy on weeks where Monday was very hard or recovery is poor

### Sunday
Family movement / mobility as convenient, not another required training session.

Given recent activity levels around 12,000–16,000 steps/day, no additional step target is needed.

## What is currently worth improving

Based on the complete context rather than the old snapshot:

### Higher priority
1. maintain two short strength sessions weekly
2. preserve Monday frisbee because it combines cardiovascular, social and enjoyment value
3. preserve current improved sleep rather than trying to add more
4. monitor the short-term late-Aug/Sep RHR rise in illness/recovery context
5. build a repeatable fitness benchmark without chasing Oskar-level VO2max
6. continue ordinary BP/lipid/glucose/iron follow-up

### Lower priority
- adding more walking for its own sake
- buying more sensors
- biological-age testing
- extreme supplement stacks
- daily BMI checking
- chasing a fixed HRV number such as 65 ms

## Data-quality rules for future years

1. Keep Fitbit, Withings and other HRV sources separate.
2. Do not sum steps from multiple synced apps.
3. Use date-stamped weekly/monthly source-specific summaries.
4. Keep raw outliers in an audit file but flag them before trend analysis.
5. Use the same height (**175 cm**) for BMI calculations.
6. Treat body-fat direction as more reliable than exact consumer-scale percentage.
7. Treat sleep-stage percentages as device-specific estimates.
8. Do not infer arrhythmia type from wearable pulse.
9. Add symptoms/illness context to unusual HR/RHR/HRV periods.
10. Keep health tracking subordinate to sleep, family, work and ordinary life.

## Known gaps worth filling

- exact current waist circumference
- validated home-BP 7-day average
- consistent current strength benchmarks
- repeatable current 5 km/parkrun time
- newer pathology after Feb 2026
- direct Health Connect data after the latest available export
- exact current medication list and supplement list, if Joshua wants that tracked longitudinally
- complete GP/specialist document dates for historical cardiac testing
