(() => {
  const scriptUrl = new URL(document.currentScript?.src || "nav.js", window.location.href);
  const siteRoot = new URL("./", scriptUrl);

  const prettyDocMap = {
    "comparison.md": "comparison.html",
    "practical-playbook.md": "playbook.html",
    "transferability.md": "transferability.html",
    "evidence-and-bias.md": "methodology.html",
    "josh-plan.md": "plan-rationale.html",
    "josh-morning-routine.md": "morning.html",
    "josh-plan-evidence.md": "plan-evidence.html",
    "source-policy.md": "source-policy.html",
    "joshua-parris-full-health-archive.md": "health-archive.html",
    "healthy-countries.md": "healthy-countries.html",
    "blue-zones.md": "blue-zones.html"
  };

  function prettyInternalUrl(href) {
    if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:)/i.test(href)) return href;

    let url;
    try { url = new URL(href, window.location.href); }
    catch { return href; }

    if (url.origin !== window.location.origin || !/\.md$/i.test(url.pathname)) return href;
    if (!url.pathname.startsWith(siteRoot.pathname)) return href;

    const relativePath = decodeURIComponent(url.pathname.slice(siteRoot.pathname.length)).replace(/^\/+/, "");
    const file = relativePath.split("/").pop() || relativePath;
    const hash = url.hash || "";

    if (prettyDocMap[file]) {
      const pretty = new URL(prettyDocMap[file], siteRoot);
      pretty.hash = hash;
      return pretty.href;
    }

    if (/^docs\/[A-Za-z0-9._\/-]+\.md$/i.test(relativePath) && !relativePath.includes("..")) {
      const pretty = new URL("document.html", siteRoot);
      const slug = relativePath.replace(/^docs\//, "").replace(/\.md$/i, "");
      pretty.searchParams.set("doc", slug);
      pretty.hash = hash;
      return pretty.href;
    }

    return href;
  }

  window.prettyInternalUrl = prettyInternalUrl;

  function rewriteMarkdownLinks(root = document) {
    const anchors = root.matches?.("a[href]") ? [root] : [...(root.querySelectorAll?.("a[href]") || [])];
    anchors.forEach(anchor => {
      const href = anchor.getAttribute("href") || "";
      if (!/\.md(?:$|#|\?)/i.test(href)) return;
      const routed = prettyInternalUrl(href);
      if (routed !== href) anchor.setAttribute("href", routed);
    });
  }

  rewriteMarkdownLinks(document);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) rewriteMarkdownLinks(node);
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;

  const inPeopleFolder = /\/people\//.test(window.location.pathname);
  const prefix = inPeopleFolder ? "../" : "";

  const groups = [
    {
      label: "Main",
      items: [
        ["index.html", "Home", "primary"],
        ["plan.html", "My Plan", "primary"],
        ["morning.html", "Morning Routine", "primary"],
        ["people.html", "People", "primary"]
      ]
    },
    {
      label: "My data",
      items: [
        ["data.html", "Data Explorer", "primary"],
        ["health-archive.html", "Josh Health Archive", "primary"],
        ["charts.html", "Charts", "primary"]
      ]
    },
    {
      label: "Learn",
      items: [
        ["principles.html", "Principles", "primary"],
        ["blue-zones.html", "Blue Zones", "primary"],
        ["resources.html", "Resources", "primary"],
        ["evidence.html", "Evidence Hub", "primary"]
      ]
    },
    {
      label: "Research & methods",
      items: [
        ["comparison.html", "Comparison", "mobile-extra"],
        ["playbook.html", "Practical Playbook", "mobile-extra"],
        ["transferability.html", "Transferability", "mobile-extra"],
        ["methodology.html", "Evidence & Bias", "mobile-extra"],
        ["plan-rationale.html", "Plan Rationale", "mobile-extra"],
        ["plan-evidence.html", "Plan Evidence", "mobile-extra"],
        ["source-policy.html", "Source Policy", "mobile-extra"],
        ["fact-check.html", "Fact-check Audit", "mobile-extra"],
        ["coverage.html", "Research Coverage", "mobile-extra"],
        ["roadmap.html", "Roadmap", "mobile-extra"]
      ]
    }
  ];

  const currentFile = (() => {
    const raw = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
    if (!raw.includes(".")) return "index.html";
    return raw;
  })();

  const currentTarget = inPeopleFolder ? "people.html" : currentFile;

  nav.innerHTML = groups.map(group => {
    const links = group.items.map(([href, label, tier]) => {
      const current = href === currentTarget ? ' aria-current="page"' : "";
      return `<a class="nav-link nav-${tier}" href="${prefix}${href}"${current}>${label}</a>`;
    }).join("");
    return `<div class="nav-group"><span class="nav-group-label">${group.label}</span>${links}</div>`;
  }).join("");

  const close = () => {
    nav.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };

  button.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", open);
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });

  document.addEventListener("click", event => {
    if (!nav.classList.contains("open")) return;
    if (nav.contains(event.target) || button.contains(event.target)) return;
    close();
  });
})();
