(() => {
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
        ["people.html", "People", "primary"]
      ]
    },
    {
      label: "My data",
      items: [
        ["data.html", "Data Explorer", "primary"],
        ["health-archive.html", "Josh Health Archive", "mobile-extra"],
        ["charts.html", "Charts", "primary"]
      ]
    },
    {
      label: "Learn",
      items: [
        ["resources.html", "Resources", "primary"],
        ["evidence.html", "Evidence Hub", "primary"]
      ]
    },
    {
      label: "Deep research",
      items: [
        ["comparison.html", "Comparison", "mobile-extra"],
        ["playbook.html", "Practical Playbook", "mobile-extra"],
        ["transferability.html", "Transferability", "mobile-extra"],
        ["methodology.html", "Evidence & Bias", "mobile-extra"],
        ["plan-rationale.html", "Plan Rationale", "mobile-extra"],
        ["plan-evidence.html", "Plan Evidence", "mobile-extra"]
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
