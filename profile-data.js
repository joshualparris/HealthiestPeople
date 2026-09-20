window.PROFILE_CONFIG = {
  "joshua-parris": {
    kicker: "Real-world baseline",
    why: "A deliberately ordinary comparison case: routine pathology, wearables, exercise records and longitudinal trends from a working parent rather than a professional athlete or full-time biohacker.",
    researchNote: "../docs/people/joshua-parris.md",
    fullArchive: "../docs/people/joshua-parris-full-health-archive.md",
    spotlights: [
      { metric: "Cleaned weight", context: "2026-07-24" },
      { metric: "Fitbit stage-derived asleep 30-day mean" },
      { metric: "Fitbit resting heart rate 30-day mean" },
      { metric: "Fitbit HRV RMSSD 30-day mean" },
      { metric: "Fitbit steps 30-day mean" },
      { metric: "Total cholesterol", context: "Feb 2026" },
      { metric: "LDL-C", context: "Feb 2026" },
      { metric: "Ferritin", context: "Feb 2026" }
    ],
    chart: {
      type: "line", title: "Body-weight trend", subtitle: "Same person, two retained Health Connect measurements. Useful as a trend, not a complete body-composition story.", unit: "kg",
      points: [{label:"Jul 2024",value:88.8},{label:"Jul 2026",value:77.4}]
    },
    library: [
      {kind:"Research notes",title:"Joshua Parris comparison profile",url:"../docs/people/joshua-parris.md",note:"The source-by-source comparison profile used by this website."},
      {kind:"Longitudinal archive",title:"Full health archive",url:"../docs/people/joshua-parris-full-health-archive.md",note:"The larger source-specific longitudinal archive."},
      {kind:"Dataset",title:"All structured metrics",url:"../data/metrics.csv",note:"The metric rows used throughout the visualisations."}
    ]
  },
  "bryan-johnson": {
    kicker: "High-intensity self-measurement",
    why: "Johnson is useful because unusually large amounts of health data and protocol detail are public. The strongest lesson is not to copy the medical stack; it is to separate broadly useful fundamentals from expensive or medically supervised interventions.",
    researchNote: "../docs/people/bryan-johnson.md",
    spotlights: [
      {metric:"VO2max"},{metric:"Resting heart rate"},{metric:"Coronary artery calcium score"},{metric:"HbA1c",context:"Apr 2025"},{metric:"ApoB"},{metric:"Ferritin"},{metric:"Exercise volume"},{metric:"Protein intake"}
    ],
    chart: {
      type:"bar", title:"Published daily macronutrient intake", subtitle:"First-party 2026 protocol numbers. These are Johnson's reported intake, not targets for everyone.", unit:"g/day",
      points:[{label:"Protein",value:130},{label:"Carbohydrate",value:206},{label:"Fat",value:101}]
    },
    library: [
      {kind:"Protocol",title:"Bryan Johnson's Protocol",url:"https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol",note:"Primary source for exercise, diet, prescriptions and testing."},
      {kind:"Independent reporting",title:"Autoimmune gastritis diagnosis — STAT",url:"https://www.statnews.com/2026/07/08/bryan-johnson-autoimmune-gastritis-diagnosis-explained/",note:"Independent context for a documented health problem despite intensive optimisation."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/bryan-johnson.md",note:"The project's detailed evidence-aware profile."}
    ]
  },
  "michael-lustgarten": {
    kicker: "Longitudinal N-of-1 tracking",
    why: "Lustgarten is valuable for method: repeated blood tests, food and activity data, long time horizons, and willingness to change hypotheses when the numbers change.",
    researchNote: "../docs/people/michael-lustgarten.md",
    spotlights: [
      {metric:"Resting heart rate",context:"Dec 2019"},{metric:"HRV",context:"Dec 2019"},{metric:"Walking"},{metric:"Structured exercise"},{metric:"Overhead press"},{metric:"Pull-ups"},{metric:"Biomarkers tracked"},{metric:"Levine PhenoAge",context:"2026-09-09"}
    ],
    chart: {
      type:"line", title:"Levine PhenoAge variability in 2026", subtitle:"A useful reminder that algorithmic biological-age scores can move between tests and should not be treated as literal age.", unit:"years",
      points:[{label:"Mar",value:35.0},{label:"Jun",value:34.8},{label:"Sep",value:37.5}]
    },
    library: [
      {kind:"Primary archive",title:"Conquer Aging or Die Trying",url:"https://michaellustgarten.com/",note:"Long-running first-party archive of biomarkers, diet, exercise and self-experiments."},
      {kind:"Open paper",title:"Biomarkers of ageing — validation review",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11088934/",note:"Open-access review useful for interpreting biological-age claims."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/michael-lustgarten.md",note:"Detailed profile and limitations."}
    ]
  },
  "oskar-svendsen": {
    kicker: "Exceptional aerobic physiology",
    why: "Svendsen's case is unusually strong because the central measurements are peer-reviewed and longitudinal. It shows both exceptional physiology and the limits of treating an elite number as a life goal.",
    researchNote: "../docs/people/oskar-svendsen.md",
    spotlights: [
      {metric:"VO2max",context:"Aug 2012"},{metric:"Absolute VO2max"},{metric:"Body weight",context:"Aug 2012"},{metric:"Haematocrit"},{metric:"Annual endurance training volume",context:"age 18 training year"},{metric:"Power at 4 mmol lactate"}
    ],
    chart: {
      type:"line", title:"VO₂max trajectory", subtitle:"Peer-reviewed laboratory values before bike-specific training, at peak, and after roughly 15 months with almost no structured exercise.", unit:"mL/kg/min",
      points:[{label:"2010",value:74.6},{label:"2012",value:96.7},{label:"2015",value:77.0}]
    },
    library: [
      {kind:"Peer-reviewed paper",title:"Temporal changes in determinants of aerobic performance",url:"https://journals.physiology.org/doi/full/10.1152/japplphysiol.00798.2018",note:"Primary scientific source for the VO₂max and training trajectory."},
      {kind:"Current interview",title:"Cycling Weekly — where Svendsen is now",url:"https://www.cyclingweekly.com/news/its-almost-12-years-since-i-quit-i-still-dont-regret-it-we-tracked-down-cyclings-lost-world-champion-and-vo2-max-record-holder",note:"Independent 2026 profile and life-context update."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/oskar-svendsen.md",note:"Detailed physiology, controversy and transferability notes."}
    ]
  },
  "dave-pascoe": {
    kicker: "Broad functional longevity",
    why: "Pascoe's public data mix is interesting because strong physical function sits alongside a very large supplement/testing burden. The transferable part is breadth of movement and consistency, not the size of the stack.",
    researchNote: "../docs/people/dave-pascoe.md",
    spotlights: [
      {metric:"Body weight"},{metric:"BMI"},{metric:"Left grip strength"},{metric:"Right grip strength"},{metric:"Individual supplements"},{metric:"Capsules"},{metric:"Coronary plaque"},{metric:"Occupation"}
    ],
    chart: {
      type:"bar", title:"Published grip strength", subtitle:"Converted from Pascoe's reported pound values. A useful functional metric; still first-party data.", unit:"kg-force",
      points:[{label:"Left hand",value:52.1},{label:"Right hand",value:56.0}]
    },
    library: [
      {kind:"Testing",title:"My Regular Testing and Results",url:"https://sites.google.com/view/davepascoe/home/my-testing-results",note:"Primary source for many published measurements."},
      {kind:"Protocol context",title:"My Supplement List",url:"https://sites.google.com/view/davepascoe/home/my-supplement-list",note:"Shows the scale of prescriptions and supplement use."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/dave-pascoe.md",note:"Detailed profile with cost and transferability context."}
    ]
  },
  "scott-kelly": {
    kicker: "Peer-reviewed extreme-environment physiology",
    why: "Kelly is not a longevity influencer. He is useful because the NASA Twins Study created a rare, deeply measured longitudinal record before, during and after a 340-day spaceflight.",
    researchNote: "../docs/people/scott-kelly.md",
    spotlights: [
      {metric:"Body mass change"},{metric:"Energy intake vs anticipated"},{metric:"Average telomere length change"},{metric:"Gene expression returned to baseline"},{metric:"Cardiac output change"},{metric:"Cognitive performance during flight"}
    ],
    chart: {
      type:"signedBar", title:"Selected percentage findings during / after spaceflight", subtitle:"These percentages describe different biological outcomes, so compare direction and scale only — they are not one health score.", unit:"%",
      points:[{label:"Body mass",value:-7},{label:"Energy intake vs expected",value:-30},{label:"Telomere length in flight",value:14.5},{label:"Gene expression back to baseline",value:91.3}]
    },
    library: [
      {kind:"PDF",title:"NASA biography — Scott J. Kelly",url:"https://www.nasa.gov/wp-content/uploads/2021/11/kellysj.pdf",note:"NASA biography PDF."},
      {kind:"Open manuscript",title:"The NASA Twins Study — Science manuscript",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC7580864/",note:"Open-access manuscript of the integrated Twins Study."},
      {kind:"NASA research hub",title:"NASA Twins Study",url:"https://www.nasa.gov/humans-in-space/twins-study/",note:"Institutional overview and linked findings."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/scott-kelly.md",note:"Detailed physiological findings and ordinary-life lessons."}
    ]
  },
  "julie-gibson-clark": {
    kicker: "Low-cost longevity translation",
    why: "Clark is useful because her public routine is much closer to ordinary family life: strength, aerobic work, walking, vegetables, protein, sleep and stress management rather than a laboratory-sized protocol.",
    researchNote: "../docs/people/julie-gibson-clark.md",
    spotlights: [
      {metric:"DunedinPACE"},{metric:"Sleep duration"},{metric:"Evening walk steps"},{metric:"Vegetable intake"},{metric:"Cooked greens"},{metric:"Protein target"}
    ],
    chart: {
      type:"referenceBar", title:"Reported DunedinPACE result", subtitle:"Her first-party commercial result is shown against a 1.0 pace reference. It is a biomarker model, not a promise of lifespan or literal calendar ageing.", unit:"pace ratio",
      points:[{label:"Julie reported",value:0.665},{label:"1.0 reference",value:1.0}]
    },
    library: [
      {kind:"Peer-reviewed paper",title:"DunedinPACE validation paper — eLife",url:"https://elifesciences.org/articles/73420",note:"Peer-reviewed paper explaining the biomarker used in Clark's headline result."},
      {kind:"Primary routine",title:"Julie Gibson Clark — routine",url:"https://www.juliegibsonclark.com/",note:"First-party routine and public results."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/julie-gibson-clark.md",note:"Detailed context and cautions."}
    ]
  },
  "bob-troia": {
    kicker: "Minimum effective quantification",
    why: "Troia's strongest contribution is not any single biomarker. It is a decade-plus example of measuring many things, discovering device and experiment limitations, and arguing for a much smaller set of measurements that actually change decisions.",
    researchNote: "../docs/people/bob-troia.md",
    spotlights: [
      {metric:"Body composition tracking duration"},{metric:"Usable sleep nights"},{metric:"Average total sleep"},{metric:"Deep sleep"},{metric:"REM sleep"},{metric:"Fasting glucose average"},{metric:"Fasting glucose",context:"contemporary blood test"}
    ],
    chart: {
      type:"line", title:"Fasting glucose: self-tracking vs conventional blood test", subtitle:"Different methods and contexts, so the gap should not be over-interpreted. The point is methodological caution.", unit:"mg/dL",
      points:[{label:"30-day self-track",value:93.5},{label:"Blood test",value:85}]
    },
    library: [
      {kind:"Talk",title:"Minimum Effective Quantification",url:"https://www.quantifiedbob.com/minimum-effective-quantification-my-superhuman-summit-talk/",note:"Troia's most transferable idea for avoiding measurement overload."},
      {kind:"Primary analysis",title:"Oura sleep tracking analysis",url:"https://www.quantifiedbob.com/sleep-tracking-analysis-oura/",note:"A useful example of cleaning and interpreting consumer wearable data."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/bob-troia.md",note:"Detailed N-of-1 examples and limitations."}
    ]
  },
  "michael-snyder": {
    kicker: "Research-grade longitudinal biology",
    why: "Snyder's personal iPOP work is one of the strongest examples of longitudinal measurement detecting a meaningful change from baseline. The ordinary-person lesson is to know useful baselines, not to reproduce multi-omics.",
    researchNote: "../docs/people/michael-snyder.md",
    spotlights: [
      {metric:"Type 2 diabetes transition"},{metric:"Triglycerides",context:"2012 iPOP baseline"},{metric:"Triglycerides",context:"2012 after simvastatin"},{metric:"HbA1c",context:"diabetes onset"},{metric:"HbA1c",context:"~6 months after lifestyle change"},{metric:"Longitudinal blood samples"}
    ],
    chart: {
      type:"line", title:"Reported HbA1c chronology", subtitle:"The middle value was reported as below 5%; 4.9 is plotted only to show the direction and is labelled as <5 on the page.", unit:"%",
      points:[{label:"Onset",value:6.7,display:"6.7"},{label:"~6 months",value:4.9,display:"<5"},{label:"Later",value:7.0,display:"7.0"}]
    },
    library: [
      {kind:"Peer-reviewed paper",title:"Personal omics profiling — Cell 2012",url:"https://pubmed.ncbi.nlm.nih.gov/22424236/",note:"The original peer-reviewed iPOP study."},
      {kind:"Institutional summary",title:"NHGRI — personal omics profile",url:"https://www.genome.gov/27548552/genome-advance-of-the-month-harnessing-the-full-omics-potential-of-personalized-medicine",note:"Accessible institutional explanation of the study."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/michael-snyder.md",note:"Detailed metabolic chronology and transferability notes."}
    ]
  },
  "larry-smarr": {
    kicker: "Persistent signals and clinical follow-up",
    why: "Smarr's case is a useful reminder that longitudinal self-tracking matters most when it leads to an appropriate next question and clinical follow-up, not when it simply produces more dashboards.",
    researchNote: "../docs/people/larry-smarr.md",
    spotlights: [
      {metric:"Persistent inflammatory signal"},{metric:"CRP peak"},{metric:"Stool lactoferrin"},{metric:"Healthy lactoferrin upper limit"},{metric:"Sigmoid colon resection"}
    ],
    chart: {
      type:"bar", title:"Inflammatory signals relative to the healthy upper limit", subtitle:"Published chronology reported CRP at about 27× and stool lactoferrin at about 124–125× the healthy upper limit.", unit:"× upper limit",
      points:[{label:"CRP",value:27},{label:"Stool lactoferrin",value:125}]
    },
    library: [
      {kind:"PDF",title:"Larry Smarr CV",url:"https://lsmarr.net/wp-content/uploads/2024/07/Smarr_CV_Aug_2023.final_.pdf",note:"Public CV PDF containing research and career context."},
      {kind:"Institutional case history",title:"UC San Diego — Crohn's visualisation case",url:"https://cse.ucsd.edu/about/news/cse-professor-lecturer-team-with-uc-san-diego-health-to-bring-3d-visualization-to-abdomenal-surgery",note:"Institutional account of the longitudinal inflammatory signal and clinical work-up."},
      {kind:"Research notes",title:"Full project research note",url:"../docs/people/larry-smarr.md",note:"Detailed chronology, evidence grades and cautions."}
    ]
  }
};
