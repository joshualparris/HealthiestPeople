(() => {
  const id = document.body.dataset.personId;
  const people = window.HEALTHIEST_PEOPLE || [];
  const podcasts = window.HEALTH_PODCASTS || [];
  const resources = window.HEALTH_RESOURCES || [];
  const config = (window.PROFILE_CONFIG || {})[id] || {};
  const person = people.find(p => p.id === id);
  if (!person) return;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const external = url => /^https?:\/\//.test(url || "");
  const hrefFor = url => external(url) || String(url || "").startsWith("../") ? url : "../" + url;
  const linkAttrs = url => external(url) ? ' target="_blank" rel="noreferrer"' : "";

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "";
  }

  function parseCSV(text) {
    const rows = [];
    let row = [], field = "", quoted = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quoted) {
        if (ch === '"' && text[i+1] === '"') { field += '"'; i++; }
        else if (ch === '"') quoted = false;
        else field += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ',') { row.push(field); field = ""; }
      else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
      else if (ch !== '\r') field += ch;
    }
    if (field || row.length) { row.push(field); rows.push(row); }
    const headers = rows.shift() || [];
    return rows.filter(r => r.length > 1).map(r => Object.fromEntries(headers.map((h,i)=>[h,r[i] ?? ""])));
  }

  function evidenceName(grade) {
    return ({A:"Independent peer-reviewed / institutional",B:"Independently reported clinical / lab",C:"First-party published",D:"Self-report / interview",derived:"Derived calculation"})[grade] || grade || "Unknown";
  }

  function renderHero() {
    document.title = person.name + " — HealthiestPeople";
    setText("profile-kicker", config.kicker || "Case study");
    setText("profile-name", person.name);
    setText("profile-lens", person.lens);
    setText("profile-summary", person.summary);
    setText("profile-evidence", person.evidence);
    setText("profile-why", config.why || person.lesson);
    setText("profile-lesson", person.lesson);
    const research = document.getElementById("profile-research-link");
    if (research && config.researchNote) research.href = config.researchNote;
    const archive = document.getElementById("profile-archive-link");
    if (archive) {
      if (config.fullArchive) { archive.href = config.fullArchive; archive.hidden = false; }
      else archive.hidden = true;
    }
  }

  function metricMatch(rows, spec) {
    const matches = rows.filter(r => r.metric === spec.metric);
    if (!matches.length) return null;
    if (spec.context) return matches.find(r => r.date_context === spec.context) || matches[0];
    return matches[0];
  }

  function metricCard(row) {
    if (!row) return "";
    const source = hrefFor(row.source_url);
    return '<article class="profile-metric">' +
      '<div class="profile-metric-top"><span>' + esc(row.metric) + '</span><b class="grade grade-' + esc(row.evidence_grade) + '">' + esc(row.evidence_grade) + '</b></div>' +
      '<strong>' + esc(row.value) + (row.unit && row.unit !== "qualitative" ? ' <small>' + esc(row.unit) + '</small>' : '') + '</strong>' +
      '<p>' + esc(row.date_context) + '</p>' +
      '<small>' + esc(row.notes) + '</small>' +
      (row.source_url ? '<a href="' + esc(source) + '"' + linkAttrs(source) + '>Source ↗</a>' : '') +
    '</article>';
  }

  function renderTrend(chart) {
    const root = document.getElementById("profile-chart");
    if (!root) return;
    if (!chart || !chart.points?.length) {
      root.innerHTML = '<p class="empty-state">No honest like-for-like trend is available for this profile yet.</p>';
      return;
    }
    setText("profile-chart-title", chart.title);
    setText("profile-chart-note", chart.subtitle);

    if (chart.type === "line") {
      const values = chart.points.map(p=>p.value);
      let min = Math.min(...values), max = Math.max(...values);
      const span = Math.max(1, max-min);
      min -= span * .18; max += span * .18;
      const W=720,H=300,pX=54,pY=44,plotW=W-pX*2,plotH=H-pY*2;
      const xs=chart.points.map((_,i)=>pX+(chart.points.length===1?plotW/2:i*plotW/(chart.points.length-1)));
      const ys=chart.points.map(p=>pY+(max-p.value)/(max-min)*plotH);
      const poly=xs.map((x,i)=>x.toFixed(1)+','+ys[i].toFixed(1)).join(' ');
      root.innerHTML='<div class="responsive-chart"><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(chart.title)+'">' +
        [max,(max+min)/2,min].map(v=>{const y=pY+(max-v)/(max-min)*plotH;return '<line x1="'+pX+'" y1="'+y+'" x2="'+(W-pX)+'" y2="'+y+'" class="chart-gridline"/><text x="6" y="'+(y+4)+'" class="chart-axis-label">'+esc((Math.round(v*10)/10))+'</text>';}).join('') +
        '<polyline points="'+poly+'" class="chart-line"/>' +
        chart.points.map((p,i)=>'<circle cx="'+xs[i]+'" cy="'+ys[i]+'" r="6" class="chart-point"/><text x="'+xs[i]+'" y="'+(H-12)+'" text-anchor="middle" class="chart-axis-label">'+esc(p.label)+'</text><text x="'+xs[i]+'" y="'+(ys[i]-14)+'" text-anchor="middle" class="chart-value-label">'+esc(p.display ?? p.value)+'</text>').join('') +
        '</svg></div><p class="chart-unit">Unit: '+esc(chart.unit)+'</p>';
      return;
    }

    const signed = chart.type === "signedBar";
    const maxAbs = Math.max(...chart.points.map(p=>Math.abs(p.value)), 1);
    root.innerHTML='<div class="profile-bars">' + chart.points.map(p=>{
      const pct=Math.max(3,Math.abs(p.value)/maxAbs*100);
      return '<div class="profile-bar-row"><div class="profile-bar-label"><b>'+esc(p.label)+'</b><span>'+esc(p.display ?? p.value)+' '+esc(chart.unit)+'</span></div>' +
        '<div class="profile-bar-track '+(signed && p.value<0?'negative':'')+'"><span style="width:'+pct.toFixed(1)+'%"></span></div></div>';
    }).join('') + '</div>';
  }

  function renderEvidence(rows) {
    const root=document.getElementById("profile-evidence-chart");
    if (!root) return;
    const grades=["A","B","C","D","derived"];
    const counts=Object.fromEntries(grades.map(g=>[g,rows.filter(r=>r.evidence_grade===g).length]));
    const max=Math.max(...Object.values(counts),1);
    root.innerHTML=grades.filter(g=>counts[g]).map(g=>
      '<div class="evidence-count-row"><div><b>'+esc(g)+'</b><span>'+esc(evidenceName(g))+'</span></div><div class="bar-track"><span style="width:'+(counts[g]/max*100).toFixed(1)+'%"></span></div><strong>'+counts[g]+'</strong></div>'
    ).join('');
  }

  function renderAllMetrics(rows) {
    const root=document.getElementById("all-metrics");
    if (!root) return;
    root.innerHTML=rows.map(r=>{
      const source=hrefFor(r.source_url);
      return '<details class="metric-row"><summary><span><b>'+esc(r.metric)+'</b><small>'+esc(r.date_context)+'</small></span><strong>'+esc(r.value)+' '+esc(r.unit)+'</strong></summary>' +
        '<div><p>'+esc(r.notes)+'</p><span class="evidence-chip">'+esc(r.evidence_grade)+' · '+esc(evidenceName(r.evidence_grade))+'</span>' +
        (r.source_url?'<a href="'+esc(source)+'"'+linkAttrs(source)+'>Open source ↗</a>':'')+'</div></details>';
    }).join('');
  }

  function mediaCard(item, type) {
    return '<a class="profile-media-card" href="'+esc(item.url)+'" target="_blank" rel="noreferrer">' +
      '<span>'+esc(type)+'</span><h3>'+esc(item.title)+'</h3><p>'+esc(item.focus || item.note || "")+'</p>' +
      '<small>'+esc(item.show || item.publisher || "")+(item.duration?' · '+esc(item.duration):'')+'</small></a>';
  }

  function renderMedia() {
    const personPodcasts=podcasts.filter(p=>p.person===person.name);
    const personResources=resources.filter(r=>r.personId===id);
    const featured=personResources.find(r=>r.youtubeId);
    const embed=document.getElementById("profile-featured-video");
    if (embed) {
      if (featured) embed.innerHTML='<div class="profile-video"><iframe src="https://www.youtube-nocookie.com/embed/'+esc(featured.youtubeId)+'" title="'+esc(featured.title)+'" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div><span class="tag">Featured video</span><h3>'+esc(featured.title)+'</h3><p>'+esc(featured.note)+'</p></div>';
      else embed.hidden=true;
    }
    const grid=document.getElementById("profile-media-grid");
    const items=[
      ...personPodcasts.map(p=>({item:p,type:"Podcast"})),
      ...personResources.filter(r=>!featured || r.id!==featured.id).map(r=>({item:r,type:(r.type==="watch"?"Video":r.type==="listen"?"Audio":"Read")}))
    ];
    if (grid) grid.innerHTML=items.length?items.map(x=>mediaCard(x.item,x.type)).join(''):'<p class="empty-state">No extra media has been curated for this profile yet; use the source library below.</p>';
  }

  function renderLibrary() {
    const root=document.getElementById("profile-library");
    if (!root) return;
    const base=(config.library||[]).map(x=>x);
    const seen=new Set(base.map(x=>x.url));
    person.sources.forEach(([title,url])=>{if(!seen.has(url)){base.push({kind:"Source",title,url,note:"Source listed in the core case-study profile."});seen.add(url);}});
    root.innerHTML=base.map(item=>{
      const url=hrefFor(item.url);
      return '<a class="library-card" href="'+esc(url)+'"'+linkAttrs(url)+'><span>'+esc(item.kind)+'</span><h3>'+esc(item.title)+'</h3><p>'+esc(item.note||"")+'</p><b>Open ↗</b></a>';
    }).join('');
  }

  function renderLessons() {
    const copy=document.getElementById("copy-list"), skip=document.getElementById("skip-list");
    if(copy) copy.innerHTML=person.do.map(x=>'<li>'+esc(x)+'</li>').join('');
    if(skip) skip.innerHTML=person.skip.map(x=>'<li>'+esc(x)+'</li>').join('');
  }

  async function loadMetrics() {
    try {
      const response=await fetch("../data/metrics.csv");
      if(!response.ok) throw new Error("metrics.csv "+response.status);
      const all=parseCSV(await response.text());
      const rows=all.filter(r=>r.person===person.name);
      const spot=(config.spotlights||[]).map(s=>metricMatch(rows,s)).filter(Boolean);
      const grid=document.getElementById("spotlight-metrics");
      if(grid) grid.innerHTML=spot.map(metricCard).join('');
      renderTrend(config.chart);
      renderEvidence(rows);
      renderAllMetrics(rows);
      setText("metric-count", rows.length + " structured metric rows");
    } catch (error) {
      const grid=document.getElementById("spotlight-metrics");
      if(grid) grid.innerHTML='<p class="empty-state">Metric data could not be loaded. The source links and research notes are still available.</p>';
    }
  }

  renderHero();
  renderLessons();
  renderMedia();
  renderLibrary();
  loadMetrics();
})();
