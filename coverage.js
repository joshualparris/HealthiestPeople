(() => {
  const people = ["Joshua Parris","Bryan Johnson","Michael Lustgarten","Oskar Svendsen","Dave Pascoe","Scott Kelly","Julie Gibson Clark","Bob Troia","Michael Snyder","Larry Smarr"];
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function rowsFromTable(lines, start) {
    const rows=[]; let i=start;
    const split=line=>line.trim().replace(/^\||\|$/g,"").split("|").map(x=>x.trim());
    while(i<lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
      if(!/^\s*\|?\s*:?-{3,}/.test(lines[i])) rows.push(split(lines[i]));
      i++;
    }
    return rows;
  }

  function bucket(status) {
    const s=String(status||"").toUpperCase();
    if(s.includes("NOT-LOCATED") || /(^|\W)GAP(\W|$)/.test(s)) return "missing";
    if(s.includes("SUMMARY") || s.includes("PARTIAL") || s.includes("GATED") || s.includes("WITHHELD") || s.includes("COHORT") || s.includes("DISPERSED") || s.includes("SENSITIVE")) return "limited";
    if(s.includes("OPEN")) return "available";
    return "limited";
  }

  function parseGapMatrix(markdown) {
    const lines=markdown.replace(/\r/g,"").split("\n");
    const out={}; let current=null;
    for(let i=0;i<lines.length;i++) {
      const h=lines[i].match(/^##\s+(.+)$/);
      if(h) current=people.includes(h[1].trim()) ? h[1].trim() : null;
      if(current && /^\s*\|/.test(lines[i]) && i+1<lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i+1])) {
        const rows=rowsFromTable(lines,i);
        const headers=rows.shift()||[];
        const domainIndex=headers.findIndex(h=>/domain/i.test(h));
        const statusIndex=headers.findIndex(h=>/status/i.test(h));
        if(domainIndex>=0 && statusIndex>=0) {
          out[current]=(out[current]||[]).concat(rows.map(r=>({domain:r[domainIndex]||"",status:r[statusIndex]||"",bucket:bucket(r[statusIndex]||"")})));
        }
      }
    }
    return out;
  }

  function renderCoverage(matrix) {
    const summary=document.getElementById("coverage-summary");
    const grid=document.getElementById("coverage-grid");
    const totals={available:0,limited:0,missing:0};
    const cards=people.map(person=>{
      const rows=matrix[person]||[];
      const counts={available:0,limited:0,missing:0};
      rows.forEach(r=>{counts[r.bucket]++;totals[r.bucket]++;});
      const total=Math.max(rows.length,1);
      const missing=rows.filter(r=>r.bucket==="missing").slice(0,5);
      const slug=person.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
      return '<article class="coverage-card">'+
        '<div class="coverage-card-head"><div><h3>'+esc(person)+'</h3><span>'+rows.length+' tracked domains</span></div><a href="people/'+esc(slug)+'.html">Profile →</a></div>'+
        '<div class="coverage-stack" aria-label="'+esc(person)+' coverage"><span class="available" style="width:'+(counts.available/total*100).toFixed(1)+'%"></span><span class="limited" style="width:'+(counts.limited/total*100).toFixed(1)+'%"></span><span class="missing" style="width:'+(counts.missing/total*100).toFixed(1)+'%"></span></div>'+
        '<div class="coverage-counts"><span><b>'+counts.available+'</b> available</span><span><b>'+counts.limited+'</b> limited</span><span><b>'+counts.missing+'</b> missing</span></div>'+
        (missing.length?'<details><summary>Missing / not located</summary><ul>'+missing.map(x=>'<li>'+esc(x.domain)+'</li>').join('')+'</ul></details>':'<p class="coverage-note">No missing domains are currently listed in the matrix.</p>')+
      '</article>';
    }).join("");
    const all=totals.available+totals.limited+totals.missing;
    summary.innerHTML=
      '<article><span>Tracked domains</span><strong>'+all+'</strong><p>Across all ten profiles.</p></article>'+
      '<article><span>Usable / open</span><strong>'+totals.available+'</strong><p>Domains with usable public or repository data.</p></article>'+
      '<article><span>Limited</span><strong>'+totals.limited+'</strong><p>Partial, summary-only, gated, controlled or otherwise constrained.</p></article>'+
      '<article><span>Missing</span><strong>'+totals.missing+'</strong><p>Not located or explicitly identified as a gap.</p></article>';
    grid.innerHTML=cards;
  }

  function parseBacklog(markdown) {
    const lines=markdown.replace(/\r/g,"").split("\n");
    let current=null; const byPerson={}; let total=0,done=0;
    for(const line of lines) {
      const h2=line.match(/^##\s+/);
      if(h2) current=null;
      const h3=line.match(/^###\s+(.+)$/);
      if(h3) current=people.includes(h3[1].trim()) ? h3[1].trim() : null;
      const box=line.match(/^\s*-\s*\[([ xX])\]\s+(.+)/);
      if(!box) continue;
      total++; const complete=/x/i.test(box[1]); if(complete) done++;
      if(current) {
        byPerson[current]=byPerson[current]||{done:0,total:0,pending:[]};
        byPerson[current].total++;
        if(complete) byPerson[current].done++;
        else byPerson[current].pending.push(box[2]);
      }
    }
    return {total,done,byPerson};
  }

  function renderBacklog(data) {
    const summary=document.getElementById("backlog-summary");
    const grid=document.getElementById("backlog-grid");
    const pct=data.total?Math.round(data.done/data.total*100):0;
    summary.innerHTML=
      '<article><span>Research tasks</span><strong>'+data.total+'</strong><p>Checkbox items currently tracked.</p></article>'+
      '<article><span>Completed</span><strong>'+data.done+'</strong><p>Explicitly marked done in the repository.</p></article>'+
      '<article><span>Still open</span><strong>'+(data.total-data.done)+'</strong><p>Questions still waiting for evidence or extraction.</p></article>'+
      '<article><span>Backlog completion</span><strong>'+pct+'%</strong><p>This is research progress, not a health score.</p></article>';
    grid.innerHTML=people.map(person=>{
      const d=data.byPerson[person];
      if(!d) return "";
      return '<article class="backlog-card"><div><h3>'+esc(person)+'</h3><span>'+d.done+' / '+d.total+' complete</span></div>'+
        '<div class="backlog-progress"><span style="width:'+(d.total?d.done/d.total*100:0).toFixed(1)+'%"></span></div>'+
        (d.pending.length?'<details><summary>Next '+Math.min(5,d.pending.length)+' research tasks</summary><ul>'+d.pending.slice(0,5).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></details>':'<p>Nothing open in this person-specific section.</p>')+
      '</article>';
    }).join("");
  }

  function parseAccess(markdown) {
    const lines=markdown.replace(/\r/g,"").split("\n");
    const idx=lines.findIndex(l=>/^##\s+Audit by person/.test(l));
    if(idx<0) return [];
    let tableStart=-1;
    for(let i=idx+1;i<lines.length;i++){ if(/^\s*\|/.test(lines[i])){tableStart=i;break;} if(/^##\s+/.test(lines[i]))break; }
    if(tableStart<0) return [];
    const rows=rowsFromTable(lines,tableStart); const headers=rows.shift()||[];
    return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h.replace(/\*\*/g,""),r[i]||""])));
  }

  function renderAccess(rows) {
    const root=document.getElementById("access-grid");
    root.innerHTML=rows.map(r=>
      '<article class="access-card"><h3>'+esc((r.Person||"").replace(/\*\*/g,""))+'</h3>'+
      '<dl><div><dt>Numeric data</dt><dd>'+esc(r["Open numeric data"])+'</dd></div><div><dt>Visual data</dt><dd>'+esc(r["Open visual data"])+'</dd></div><div><dt>Gated / controlled</dt><dd>'+esc(r["Gated / controlled"])+'</dd></div></dl>'+
      '<p><b>Key limitation:</b> '+esc(r["Key limitation"])+'</p></article>'
    ).join("");
  }

  async function get(url) {
    const r=await fetch(url,{cache:"no-store"});
    if(!r.ok) throw new Error(url+" returned "+r.status);
    return r.text();
  }

  Promise.all([
    get("docs/gap-matrix.md"),
    get("docs/research-backlog.md"),
    get("docs/data-access-audit.md")
  ]).then(([gap,backlog,access])=>{
    renderCoverage(parseGapMatrix(gap));
    renderBacklog(parseBacklog(backlog));
    renderAccess(parseAccess(access));
  }).catch(err=>{
    const root=document.getElementById("coverage-grid");
    if(root) root.innerHTML='<div class="doc-error"><h2>Could not load research coverage</h2><p>'+esc(err.message)+'</p></div>';
  });
})();