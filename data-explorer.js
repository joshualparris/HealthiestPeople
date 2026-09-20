(() => {
  const datasets = {
    metrics: {title:"Master metrics archive",description:"Structured measurements across all public case studies and Josh.",file:"data/metrics.csv"},
    wearables: {title:"Josh weekly wearables",description:"Weekly Fitbit / Google Health steps, sleep, resting heart rate, active minutes and weight history.",file:"data/josh-weekly-wearable-history.csv"},
    labs: {title:"Josh pathology history",description:"Date-stamped pathology and ECG values recovered from clinical records and prior reports.",file:"data/josh-labs-history.csv"},
    body: {title:"Josh body composition",description:"Cleaned weight, calculated BMI and consumer body-composition history.",file:"data/josh-body-composition-history.csv"},
    frisbee: {title:"Josh Monday Frisbee",description:"Documented and likely Monday-night Ultimate sessions with heart-rate and training-load context.",file:"data/josh-frisbee-history.csv"},
    cardiac: {title:"Josh cardiac history",description:"Cardiac-test and symptom-history archive where dates and source quality are available.",file:"data/josh-cardiac-history.csv"},
    countries: {title:"Healthy-country outcomes",description:"Official population-health metrics used in the Japan / Spain / Switzerland / Iceland / Singapore / Korea / Australia comparison.",file:"data/country-health-lessons.csv"}
  };

  const tabs = document.getElementById("dataset-tabs");
  const search = document.getElementById("data-search");
  const title = document.getElementById("dataset-title");
  const desc = document.getElementById("dataset-description");
  const count = document.getElementById("data-count");
  const tableRoot = document.getElementById("data-table");
  const cardRoot = document.getElementById("data-cards");
  let active = "metrics";
  let headers = [];
  let rows = [];

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function parseCsv(text) {
    const out=[]; let row=[]; let cell=""; let quoted=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i], next=text[i+1];
      if(ch === '"' && quoted && next === '"'){ cell+='"'; i++; continue; }
      if(ch === '"'){ quoted=!quoted; continue; }
      if(ch === ',' && !quoted){ row.push(cell); cell=""; continue; }
      if((ch === '\n' || ch === '\r') && !quoted){
        if(ch === '\r' && next === '\n') i++;
        row.push(cell); cell="";
        if(row.some(v=>v!=="")) out.push(row);
        row=[]; continue;
      }
      cell+=ch;
    }
    if(cell || row.length){ row.push(cell); if(row.some(v=>v!=="")) out.push(row); }
    return out;
  }

  function currentKey() {
    const hash=(location.hash||"").replace("#","");
    return datasets[hash] ? hash : "metrics";
  }

  function renderTabs(){
    tabs.innerHTML=Object.entries(datasets).map(([key,d]) =>
      '<button class="dataset-tab'+(key===active?' active':'')+'" data-dataset="'+key+'" type="button">'+esc(d.title)+'</button>'
    ).join("");
    tabs.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
      location.hash = btn.dataset.dataset;
    }));
  }

  function filteredRows(){
    const q=(search.value||"").trim().toLowerCase();
    if(!q) return rows;
    return rows.filter(r => r.some(v => String(v).toLowerCase().includes(q)));
  }

  function render(){
    const visible=filteredRows();
    count.textContent=visible.length.toLocaleString("en-AU");
    const th=headers.map(h=>'<th>'+esc(h.replace(/_/g," "))+'</th>').join("");
    const trs=visible.map(r=>'<tr>'+headers.map((_,i)=>'<td>'+esc(r[i]||"")+'</td>').join("")+'</tr>').join("");
    tableRoot.innerHTML='<div class="data-table-scroll"><table class="data-table"><thead><tr>'+th+'</tr></thead><tbody>'+trs+'</tbody></table></div>';

    cardRoot.innerHTML=visible.map(r=>{
      const pairs=headers.map((h,i)=>[h,r[i]]).filter(([,v])=>String(v||"").trim()!=="");
      const titlePair=pairs[0]||["Row",""];
      return '<article class="data-row-card"><h3>'+esc(titlePair[1])+'</h3><dl>'+
        pairs.slice(1).map(([h,v])=>'<div><dt>'+esc(h.replace(/_/g," "))+'</dt><dd>'+esc(v)+'</dd></div>').join("")+
        '</dl></article>';
    }).join("");
  }

  async function load(){
    active=currentKey();
    renderTabs();
    const d=datasets[active];
    title.textContent=d.title;
    desc.textContent=d.description;
    tableRoot.innerHTML='<div class="doc-loading">Loading data…</div>';
    cardRoot.innerHTML="";
    try{
      const res=await fetch(d.file,{cache:"no-store"});
      if(!res.ok) throw new Error("Could not load dataset");
      const parsed=parseCsv(await res.text());
      headers=parsed.shift()||[];
      rows=parsed;
      render();
    }catch(err){
      tableRoot.innerHTML='<div class="doc-error"><h2>Could not load this dataset</h2><p>'+esc(err.message)+'</p></div>';
    }
  }

  search.addEventListener("input",render);
  window.addEventListener("hashchange",load);
  load();
})();
