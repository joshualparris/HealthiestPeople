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

  function parseCsv(text) {
    const rows = [];
    let row = [], cell = "", quoted = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i], next = text[i + 1];
      if (ch === '"' && quoted && next === '"') { cell += '"'; i++; continue; }
      if (ch === '"') { quoted = !quoted; continue; }
      if (ch === "," && !quoted) { row.push(cell); cell = ""; continue; }
      if ((ch === "\n" || ch === "\r") && !quoted) {
        if (ch === "\r" && next === "\n") i++;
        row.push(cell); cell = "";
        if (row.some(v => v !== "")) rows.push(row);
        row = [];
        continue;
      }
      cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return [];
    const headers = rows[0].map(h => h.trim());
    return rows.slice(1).map(values => Object.fromEntries(headers.map((h,i) => [h, values[i] ?? ""])));
  }

  async function loadCsv(path) {
    const response = await fetch(path, {cache:"no-cache"});
    if (!response.ok) throw new Error("Could not load " + path);
    return parseCsv(await response.text());
  }

  function numberValue(value) {
    const n = Number(String(value ?? "").replace(/[^0-9.+-]/g, ""));
    return Number.isFinite(n) ? n : null;
  }

  function sleepHours(hhmm) {
    if (!hhmm) return null;
    const match = String(hhmm).match(/^(\d+):(\d{2})$/);
    if (!match) return null;
    return Number(match[1]) + Number(match[2]) / 60;
  }

  function shortDate(dateOrContext) {
    const s = String(dateOrContext || "");
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return new Intl.DateTimeFormat("en-AU",{month:"short",year:"numeric"}).format(new Date(Number(m[1]),Number(m[2])-1,Number(m[3])));
    return s.replace(" snapshot","").replace(" final 90d median"," median").replace(" first 90d median"," median");
  }

  function showChartError(ids) {
    ids.forEach(id => {
      const root = document.getElementById(id);
      if (root) root.innerHTML = '<p class="chart-load-error">This chart could not load its source dataset. The CSV remains available from the repository.</p>';
    });
  }

  async function renderPersonalCharts() {
    try {
      const [body, labs, wearable] = await Promise.all([
        loadCsv("data/josh-body-composition-history.csv"),
        loadCsv("data/josh-labs-history.csv"),
        loadCsv("data/josh-weekly-wearable-history.csv")
      ]);

      const weightRows = body.filter(row => numberValue(row.weight_kg) !== null && !row.date_context.includes("median"));
      const weightPoints = weightRows.map(row => ({
        label:shortDate(row.date_context),
        value:numberValue(row.weight_kg),
        display:Number(row.weight_kg).toFixed(1)+" kg",
        note:row.source
      }));
      lineChart("josh-weight-line", weightPoints, {
        unit:"kg", decimals:1, ariaLabel:"Josh body weight trend from the retained body composition dataset",
        formatY:v=>Number(v).toFixed(0)
      });
      dataTable("josh-weight-table",
        ["Date/context","Weight","Source","Interpretation note"],
        weightRows.map(row => [row.date_context,row.weight_kg+" kg",row.source,row.notes || ""])
      );

      const latestLab = (marker, datePrefix) => labs.find(row => row.marker === marker && row.date.startsWith(datePrefix));
      const ldl2023 = latestLab("LDL-C","2023-06");
      const ldl2026 = latestLab("LDL-C","2026-02");
      const chol2023 = latestLab("Total cholesterol","2023-06");
      const chol2026 = latestLab("Total cholesterol","2026-02");
      const lipidItems = [];
      if (ldl2023 && ldl2026) lipidItems.push({label:"LDL-C",from:Number(ldl2023.value),to:Number(ldl2026.value),unit:"mmol/L",period:"Jun 2023 → Feb 2026"});
      if (chol2023 && chol2026) lipidItems.push({label:"Total cholesterol",from:Number(chol2023.value),to:Number(chol2026.value),unit:"mmol/L",period:"Jun 2023 → Feb 2026"});
      changeCards("josh-lipids-changes", lipidItems);

      const ferritin = labs.filter(row => row.marker === "Ferritin" && numberValue(row.value) !== null)
        .sort((a,b) => String(a.date).localeCompare(String(b.date)));
      lineChart("josh-ferritin-line", ferritin.map(row => ({
        label:shortDate(row.date), value:numberValue(row.value), display:row.value+" µg/L"
      })), {
        unit:"µg/L", yMin:25, yMax:50, ariaLabel:"Josh ferritin trend from the pathology dataset"
      });

      const usefulWearable = wearable.filter(row => row.period && row.report_date >= "2026-03-17");
      const sleepRows = usefulWearable.filter(row => sleepHours(row.avg_restful_sleep_hhmm) !== null);
      const sourceBreakIndex = sleepRows.findIndex((row,i) => i < sleepRows.length-1 && row.source !== sleepRows[i+1].source);
      const sleepPoints = sleepRows.map(row => ({
        label:row.period.split("-")[0].trim().replace("Mar ","Mar ").replace("Apr ","Apr ").replace("May ","May "),
        value:sleepHours(row.avg_restful_sleep_hhmm),
        display:row.avg_restful_sleep_hhmm.replace(":","h ")+"m",
        note:row.source
      }));
      lineChart("josh-sleep-line", sleepPoints, {
        yMin:5, yMax:10, labelEvery:3, showValues:false,
        formatY:v=>Number(v).toFixed(1)+"h",
        ariaLabel:"Weekly average restful sleep from the wearable history dataset",
        sourceBreakAfter:sourceBreakIndex >= 0 ? sourceBreakIndex : undefined,
        sourceBreakLabel:"data source changes"
      });
      dataTable("josh-sleep-table",
        ["Week","Average restful sleep","Source","Context"],
        sleepRows.map(row => [row.period,row.avg_restful_sleep_hhmm,row.source,row.notes || ""])
      );

      const recent = usefulWearable.filter(row => row.source === "Google Health");
      lineChart("josh-steps-line", recent.filter(row => numberValue(row.avg_steps_per_day) !== null).map(row => ({
        label:row.period.split("-")[0].trim(),
        value:numberValue(row.avg_steps_per_day),
        display:Number(row.avg_steps_per_day).toLocaleString("en-AU")
      })), {
        yMin:6000, yMax:18000, labelEvery:2, showValues:false,
        formatY:v=>Math.round(v/1000)+"k",
        ariaLabel:"Weekly average steps per day from the Google Health history"
      });

      lineChart("josh-rhr-line", recent.filter(row => numberValue(row.avg_resting_hr_bpm) !== null).map(row => ({
        label:row.period.split("-")[0].trim(),
        value:numberValue(row.avg_resting_hr_bpm),
        display:row.avg_resting_hr_bpm+" bpm",
        note:row.notes || ""
      })), {
        yMin:54, yMax:68, labelEvery:2, showValues:false,
        formatY:v=>Math.round(v),
        ariaLabel:"Weekly resting heart rate from the Google Health history"
      });
    } catch (error) {
      showChartError(["josh-weight-line","josh-lipids-changes","josh-ferritin-line","josh-sleep-line","josh-steps-line","josh-rhr-line"]);
    }
  }

  renderPersonalCharts();

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