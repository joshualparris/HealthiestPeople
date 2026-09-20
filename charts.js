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

  function lineChart(id, points, yMin, yMax, unit) {
    const root = document.getElementById(id);
    if (!root) return;
    const width = 760, height = 300, padX = 56, padY = 38;
    const plotW = width - padX * 2, plotH = height - padY * 2;
    const xs = points.map((_, i) => padX + (points.length === 1 ? plotW/2 : i * plotW/(points.length-1)));
    const ys = points.map(p => padY + (yMax - p.value) / (yMax - yMin) * plotH);
    const poly = xs.map((x,i) => x.toFixed(1)+","+ys[i].toFixed(1)).join(" ");
    const ticks = [yMax, (yMax+yMin)/2, yMin];
    root.innerHTML =
      '<svg class="line-svg" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="Oskar Svendsen VO2max over time">' +
      ticks.map(v => {
        const y = padY + (yMax-v)/(yMax-yMin)*plotH;
        return '<line x1="'+padX+'" y1="'+y+'" x2="'+(width-padX)+'" y2="'+y+'" class="chart-gridline"/>' +
          '<text x="8" y="'+(y+5)+'" class="chart-axis-label">'+Math.round(v)+'</text>';
      }).join("") +
      '<polyline points="'+poly+'" class="chart-line"/>' +
      points.map((p,i) =>
        '<circle cx="'+xs[i]+'" cy="'+ys[i]+'" r="6" class="chart-point"/>' +
        '<text x="'+xs[i]+'" y="'+(height-10)+'" text-anchor="middle" class="chart-axis-label">'+esc(p.year)+'</text>' +
        '<text x="'+xs[i]+'" y="'+(ys[i]-14)+'" text-anchor="middle" class="chart-value-label">'+esc(p.value)+' '+esc(unit)+'</text>'
      ).join("") +
      '</svg>';
  }

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
    {year:"2010", value:74.6},
    {year:"2012", value:96.7},
    {year:"2015", value:77.0}
  ], 65, 105, "mL/kg/min");
})();
