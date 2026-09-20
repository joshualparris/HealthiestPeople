(() => {
  const body = document.body;
  const source = body.dataset.docSource;
  const target = document.getElementById("doc-content");
  const toc = document.getElementById("doc-toc");
  if (!source || !target) return;

  const escapeHtml = value => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const slugify = value => String(value)
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  const rawRoute = href => {
    const clean = href.replace(/^\.\//, "");
    const file = clean.split("/").pop() || clean;
    const map = {
      "comparison.md": "comparison.html",
      "practical-playbook.md": "playbook.html",
      "transferability.md": "transferability.html",
      "evidence-and-bias.md": "methodology.html",
      "josh-plan.md": "plan-rationale.html",
      "joshua-parris-full-health-archive.md": "health-archive.html",
      "josh-weekly-wearable-history.csv": "data.html#wearables",
      "josh-labs-history.csv": "data.html#labs",
      "josh-body-composition-history.csv": "data.html#body",
      "josh-frisbee-history.csv": "data.html#frisbee",
      "josh-cardiac-history.csv": "data.html#cardiac",
      "metrics.csv": "data.html#metrics"
    };
    return map[file] || href;
  };

  const inline = input => {
    let s = escapeHtml(input);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const routed = rawRoute(href);
      const external = /^https?:\/\//i.test(routed);
      return '<a href="' + escapeHtml(routed) + '"' + (external ? ' target="_blank" rel="noreferrer"' : '') + '>' + label + (external ? ' ↗' : '') + '</a>';
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    s = s.replace(/\x60([^\x60]+)\x60/g, "<code>$1</code>");
    return s;
  };

  const parseTable = (lines, start) => {
    const row = line => line.trim().replace(/^\||\|$/g, "").split("|").map(x => x.trim());
    const headers = row(lines[start]);
    const rows = [];
    let i = start + 2;
    while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
      rows.push(row(lines[i]));
      i++;
    }
    const html = '<div class="doc-table-wrap"><table class="doc-table"><thead><tr>' +
      headers.map(h => '<th>' + inline(h) + '</th>').join("") +
      '</tr></thead><tbody>' +
      rows.map(r => '<tr>' + headers.map((_, idx) => '<td>' + inline(r[idx] || "") + '</td>').join("") + '</tr>').join("") +
      '</tbody></table></div>';
    return { html, next: i };
  };

  const parseMarkdown = markdown => {
    const lines = markdown.replace(/\r/g, "").split("\n");
    const out = [];
    const headings = [];
    let i = 0;
    let para = [];
    let listType = null;
    let listItems = [];
    let inCode = false;
    let codeLines = [];

    const flushPara = () => {
      if (!para.length) return;
      out.push('<p>' + inline(para.join(" ")) + '</p>');
      para = [];
    };
    const flushList = () => {
      if (!listItems.length) return;
      const tag = listType === "ol" ? "ol" : "ul";
      out.push('<' + tag + ' class="doc-list">' + listItems.map(x => '<li>' + inline(x) + '</li>').join("") + '</' + tag + '>');
      listItems = [];
      listType = null;
    };

    while (i < lines.length) {
      const line = lines[i];

      if (/^\x60\x60\x60/.test(line)) {
        flushPara(); flushList();
        if (!inCode) {
          inCode = true; codeLines = [];
        } else {
          out.push('<pre><code>' + escapeHtml(codeLines.join("\n")) + '</code></pre>');
          inCode = false;
        }
        i++; continue;
      }
      if (inCode) { codeLines.push(line); i++; continue; }

      if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i+1])) {
        flushPara(); flushList();
        const parsed = parseTable(lines, i);
        out.push(parsed.html);
        i = parsed.next;
        continue;
      }

      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        flushPara(); flushList();
        const level = heading[1].length;
        const text = heading[2].replace(/\*\*/g, "");
        const id = slugify(text) || ("section-" + i);
        if (level >= 2) headings.push({ level, text, id });
        out.push('<h' + level + ' id="' + id + '">' + inline(heading[2]) + '</h' + level + '>');
        i++; continue;
      }

      if (/^\s*---+\s*$/.test(line)) {
        flushPara(); flushList(); out.push("<hr>"); i++; continue;
      }

      const quote = line.match(/^>\s?(.*)$/);
      if (quote) {
        flushPara(); flushList();
        const q = [];
        while (i < lines.length && /^>/.test(lines[i])) {
          q.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        out.push('<blockquote>' + inline(q.join(" ")) + '</blockquote>');
        continue;
      }

      const ul = line.match(/^\s*[-*]\s+(.+)$/);
      const ol = line.match(/^\s*\d+\.\s+(.+)$/);
      if (ul || ol) {
        flushPara();
        const type = ol ? "ol" : "ul";
        if (listType && listType !== type) flushList();
        listType = type;
        listItems.push((ul || ol)[1]);
        i++; continue;
      }

      if (!line.trim()) {
        flushPara(); flushList(); i++; continue;
      }

      para.push(line.trim());
      i++;
    }

    flushPara(); flushList();
    return { html: out.join("\n"), headings };
  };

  fetch(source, { cache: "no-store" })
    .then(r => {
      if (!r.ok) throw new Error("Could not load source document");
      return r.text();
    })
    .then(markdown => {
      const rendered = parseMarkdown(markdown);
      target.innerHTML = rendered.html;
      if (toc && rendered.headings.length) {
        toc.innerHTML = rendered.headings
          .filter(h => h.level <= 3)
          .map(h => '<a class="toc-level-' + h.level + '" href="#' + h.id + '">' + escapeHtml(h.text) + '</a>')
          .join("");
      }
      document.querySelectorAll(".doc-article a").forEach(a => {
        const href = a.getAttribute("href") || "";
        if (/\.md(?:$|#)|\.csv(?:$|#)/i.test(href)) a.setAttribute("href", rawRoute(href));
      });
    })
    .catch(err => {
      target.innerHTML = '<div class="doc-error"><h2>Could not load this page</h2><p>' + escapeHtml(err.message) + '.</p></div>';
    });
})();
