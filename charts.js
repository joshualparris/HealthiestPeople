(() => {
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function bars(id, items, max, suffix = "") {
    const root = document.getElementById(id);
    if (!root) return;
    root.innerHTML = items.map(item => {
      const width = Math.max(2, Math.min(100, item.value / max * 100));
      return '<div class="bar-row">' +
        '<div class="bar-label"><b>' + esc(item.label) + '</b><span>' + esc(item.note || "") + '</span></div>' +
        '<div class="bar-track"><span style="width:' + width.toFixed(1) + '%"></span></div>' +
        '<strong>' + esc(item.display ?? item.value) + esc(suffix) + '</strong>' +
      '</div>';
    }).join("");
  }

  function lineChart(id, points, options = {}) {
    const root = document.getElementById(id);
    if (!root || !points.length) return;

    const values = points.map(p => p.value);
    const minValue = options.yMin ?? Math.min(...values);
    const maxValue = options.yMax ?? Math.max(...values);
    const rawSpan = Math.max(1, maxValue - minValue);
    const padding = options.padYValue ?? rawSpan * 0.14;
    const yMin = options.yMin ?? Math.max(0, minValue - padding);
    const yMax = options.yMax ?? (maxValue + padding);

    const width = 820, height = options.height || 310, padX = 58, padY = 38;
    const plotW = width - padX * 2, plotH = height - padY * 2;
    const xs = points.map((_, i) => padX + (points.length === 1 ? plotW/2 : i * plotW/(points.length-1)));
    const ys = points.map(p => padY + (yMax - p.value) / (yMax - yMin) * plotH);
    const poly = xs.map((x,i) => x.toFixed(1)+","+ys[i].toFixed(1)).join(" ");
    const tickValues = [yMax, (yMax+yMin)/2, yMin];
    const formatY = options.formatY || (v => Number(v).toFixed(options.decimals ?? 0));
    const formatValue = options.formatValue || (v => formatY(v) + (options.unit ? " " + options.unit : ""));
    const labelEvery = options.labelEvery || 1;

    const sourceBreak = Number.isInteger(options.sourceBreakAfter) && options.sourceBreakAfter < points.length - 1
      ? (() => {
          const x = (xs[options.sourceBreakAfter] + xs[options.sourceBreakAfter + 1]) / 2;
          return '<line x1="'+x+'" y1="'+padY+'" x2="'+x+'" y2="'+(height-padY)+'" class="chart-source-break"/>' +
            '<text x="'+(x+7)+'" y="'+(padY+14)+'" class="chart-source-label">'+esc(options.sourceBreakLabel || "source change")+'</text>';
        })()
      : "";

    root.innerHTML =
      '<svg class="line-svg personal-line-svg" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+esc(options.ariaLabel || "Trend chart")+'">' +
      tickValues.map(v => {
        const y = padY + (yMax-v)/(yMax-yMin)*plotH;
        return '<line x1="'+padX+'" y1="'+y+'" x2="'+(width-padX)+'" y2="'+y+'" class="chart-gridline"/>' +
          '<text x="6" y="'+(y+5)+'" class="chart-axis-label">'+esc(formatY(v))+'</text>';
      }).join("") +
      sourceBreak +
      '<polyline points="'+poly+'" class="chart-line"/>' +
      points.map((p,i) => {
        const showLabel = i % labelEvery === 0 || i === points.length - 1;
        const pointLabel = p.display ?? formatValue(p.value);
        return '<circle cx="'+xs[i]+'" cy="'+ys[i]+'" r="5" class="chart-point"><title>'+esc(p.label+': '+pointLabel+(p.note ? " — "+p.note : ""))+'</title></circle>' +
          (showLabel ? '<text x="'+xs[i]+'" y="'+(height-10)+'" text-anchor="middle" class="chart-axis-label">'+esc(p.label)+'</text>' : '') +
          ((options.showValues === false || (!showLabel && points.length > 8)) ? '' :
            '<text x="'+xs[i]+'" y="'+(ys[i]-13)+'" text-anchor="middle" class="chart-value-label">'+esc(pointLabel)+'</text>');
      }).join("") +
      '</svg>';
  }

  function dataTable(id, headers, rows) {
    const root = document.getElementById(id);
    if (!root) return;
    root.innerHTML = '<div class="table-scroll"><table class="data-table"><thead><tr>' +
      headers.map(h => '<th scope="col">'+esc(h)+'</th>').join("") +
      '</tr></thead><tbody>' +
      rows.map(row => '<tr>'+row.map(cell => '<td>'+esc(cell)+'</td>').join("")+'</tr>').join("") +
      '</tbody></table></div>';
  }

  function changeCards(id, items) {
    const root = document.getElementById(id);
    if (!root) return;
    root.innerHTML = items.map(item => {
      const change = item.to - item.from;
      const pct = item.from ? change / item.from * 100 : 0;
      const direction = change < 0 ? "down" : change > 0 ? "up" : "flat";
      return '<article class="change-card">' +
        '<span>'+esc(item.label)+'</span>' +
        '<div class="change-values"><b>'+esc(item.from)+' → '+esc(item.to)+' '+esc(item.unit)+'</b><strong class="'+direction+'">'+(change > 0 ? "+" : "")+change.toFixed(item.decimals ?? 1)+' ('+(pct > 0 ? "+" : "")+pct.toFixed(1)+'%)</strong></div>' +
        '<small>'+esc(item.period)+'</small>' +
      '</article>';
    }).join("");
  }

  const weight = [
    {label:"Jul 2024", value:88.8, display:"88.8 kg", note:"Health Connect cleaned trend"},
    {label:"2025", value:83.7, display:"83.7 kg", note:"Withings snapshot"},
    {label:"May 2026", value:81.0, display:"81.0 kg", note:"Health Connect / scale"},
    {label:"Jul 2026", value:77.4, display:"77.4 kg", note:"Health Connect cleaned trend"}
  ];

  lineChart("josh-weight-line", weight, {
    unit:"kg", decimals:1, ariaLabel:"Josh body weight trend from July 2024 to July 2026",
    formatY:v=>Number(v).toFixed(0)
  });
  dataTable("josh-weight-table",
    ["Date","Weight","Source/context","Interpretation note"],
    [
      ["11 Jul 2024","88.8 kg","Health Connect cleaned trend","Earliest retained weight in the cleaned trend"],
      ["2025 snapshot","83.7 kg","Withings consumer scale","Body-fat and muscle estimates are hydration-sensitive"],
      ["21 May 2026","81.0 kg","Health Connect / scale","Approximate later trend point"],
      ["24 Jul 2026","77.4 kg","Health Connect cleaned trend","Latest retained weight in the dataset"]
    ]
  );

  changeCards("josh-lipids-changes", [
    {label:"LDL-C", from:3.2, to:2.8, unit:"mmol/L", period:"Jun 2023 → Feb 2026"},
    {label:"Total cholesterol", from:5.3, to:4.6, unit:"mmol/L", period:"Jun 2023 → Feb 2026"}
  ]);

  lineChart("josh-ferritin-line", [
    {label:"Jan 2025", value:35, display:"35 µg/L"},
    {label:"Feb 2026", value:41, display:"41 µg/L"}
  ], {
    unit:"µg/L", yMin:25, yMax:50, ariaLabel:"Josh ferritin trend from January 2025 to February 2026"
  });

  const weekly = [
    ["Mar 9",7.17,14196,null,"Fitbit"],
    ["Mar 16",6.80,16614,null,"Fitbit"],
    ["Mar 23",6.48,17151,null,"Fitbit"],
    ["Mar 30",6.43,18153,null,"Fitbit"],
    ["Apr 6",6.30,16905,null,"Fitbit"],
    ["Apr 13",5.47,15958,null,"Fitbit"],
    ["Apr 20",6.45,11599,null,"Fitbit"],
    ["Apr 27",5.97,12609,null,"Fitbit"],
    ["May 4",6.02,13170,null,"Fitbit"],
    ["May 11",6.08,12388,null,"Fitbit"],
    ["May 17",7.75,13052,60,"Google Health"],
    ["May 23",8.88,14333,60,"Google Health"],
    ["May 30",7.48,11774,62,"Google Health"],
    ["Jun 6",8.05,13714,60,"Google Health"],
    ["Jun 13",8.15,10662,62,"Google Health"],
    ["Jun 20",8.52,13492,60,"Google Health"],
    ["Jun 27",8.47,14856,62,"Google Health"],
    ["Jul 4",8.42,12876,60,"Google Health"],
    ["Jul 11",9.20,7307,57,"Google Health"],
    ["Jul 18",6.93,11345,61,"Google Health"],
    ["Jul 25",8.72,16540,61,"Google Health"],
    ["Aug 1",8.08,13686,61,"Google Health"],
    ["Aug 8",8.15,14931,61,"Google Health"],
    ["Aug 15",7.85,16640,61,"Google Health"],
    ["Aug 22",8.12,12485,63,"Google Health"],
    ["Aug 29",7.70,13930,64,"Google Health"],
    ["Sep 5",8.20,15775,66,"Google Health"]
  ];

  const sleepPoints = weekly.map(row => ({
    label:row[0], value:row[1],
    display:(Math.floor(row[1])+"h "+String(Math.round((row[1]%1)*60)).padStart(2,"0")+"m"),
    note:row[4]
  }));
  lineChart("josh-sleep-line", sleepPoints, {
    yMin:5, yMax:10, labelEvery:3, showValues:false,
    formatY:v=>Number(v).toFixed(1)+"h",
    ariaLabel:"Weekly average restful sleep from March to September 2026",
    sourceBreakAfter:9, sourceBreakLabel:"data source changes"
  });
  dataTable("josh-sleep-table",
    ["Week","Average restful sleep","Source"],
    sleepPoints.map((p,i)=>[p.label,p.display,weekly[i][4]])
  );

  lineChart("josh-steps-line", weekly.slice(10).map(row => ({
    label:row[0], value:row[2], display:Math.round(row[2]).toLocaleString("en-AU")
  })), {
    yMin:6000, yMax:18000, labelEvery:2, showValues:false,
    formatY:v=>Math.round(v/1000)+"k",
    ariaLabel:"Weekly average steps per day from May to September 2026"
  });

  lineChart("josh-rhr-line", weekly.filter(row => row[3] !== null).map(row => ({
    label:row[0], value:row[3], display:row[3]+" bpm"
  })), {
    yMin:54, yMax:68, labelEvery:2, showValues:false,
    formatY:v=>Math.round(v),
    ariaLabel:"Weekly resting heart rate from May to September 2026"
  });

  // Public case-study charts.
  bars("vo2-bars", [
    {label:"Bryan Johnson", value:58.7, display:"58.7", note:"2025 · first-party (C)"},
    {label:"Oskar Svendsen", value:96.7, display:"96.7", note:"2012 peak · peer-reviewed (A)"}
  ], 105, "");

  bars("evidence-bars", [
    {label:"A — independent", value:25, note:"peer-reviewed / institutional"},
    {label:"B — independently reported", value:31, note:"clinical / laboratory reporting"},
    {label:"C — first-party", value:111, note:"published by the person or programme"},
    {label:"D — interview / self-report", value:8, note:"useful context, weaker evidence"},
    {label:"Derived", value:1, note:"calculated from cited source data"}
  ], 120, "");

  bars("measurement-bars", [
    {label:"Bryan Johnson", value:29},
    {label:"Michael Lustgarten", value:18},
    {label:"Oskar Svendsen", value:13},
    {label:"Dave Pascoe", value:21},
    {label:"Scott Kelly", value:9},
    {label:"Julie Gibson Clark", value:6},
    {label:"Bob Troia", value:10},
    {label:"Michael Snyder", value:7},
    {label:"Larry Smarr", value:5}
  ], 30, "");

  lineChart("oskar-line", [
    {label:"2010", value:74.6, display:"74.6 mL/kg/min"},
    {label:"2012", value:96.7, display:"96.7 mL/kg/min"},
    {label:"2015", value:77.0, display:"77.0 mL/kg/min"}
  ], {
    yMin:65, yMax:105, unit:"mL/kg/min",
    formatY:v=>Math.round(v),
    ariaLabel:"Oskar Svendsen VO2max over time"
  });
})();