(() => {
  const people = window.HEALTHIEST_PEOPLE || [];
  const podcasts = window.HEALTH_PODCASTS || [];
  const resources = window.HEALTH_RESOURCES || [];
  const resourceTypes = window.RESOURCE_TYPES || {};
  const baseline = window.JOSH_BASELINE || null;
  const joshPlan = window.JOSH_PLAN || null;
  const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

  function sydneyParts() {
    const fmt = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    const now = new Date();
    const parts = fmt.formatToParts(now);
    const get = type => parts.find(p => p.type === type)?.value || "";
    return {
      weekday: get("weekday"),
      label: fmt.format(now),
      dateKey: new Intl.DateTimeFormat("en-CA", {
        timeZone: "Australia/Sydney",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(now)
    };
  }

  function stableIndex(key, length) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = ((hash << 5) - hash) + key.charCodeAt(i);
    return Math.abs(hash) % length;
  }

  function renderToday() {
    const { weekday, label, dateKey } = sydneyParts();
    const day = window.DAILY_FOUNDATIONS[weekday.toLowerCase()] || window.DAILY_FOUNDATIONS.monday;
    document.getElementById("today-title").textContent = weekday;
    document.getElementById("today-date").textContent = label.replace(weekday + ", ", "");
    document.getElementById("daily-theme").textContent = day.theme;
    document.getElementById("daily-movement").textContent = day.movement;
    document.getElementById("daily-food").textContent = day.food;
    document.getElementById("daily-recovery").textContent = day.recovery;
    document.getElementById("daily-tiny").textContent = day.tiny;

    const person = people[stableIndex(dateKey, people.length)];
    document.getElementById("lesson-name").textContent = person.name;
    document.getElementById("lesson-lens").textContent = person.lens;
    document.getElementById("lesson-text").textContent = person.lesson;
    const link = document.getElementById("lesson-link");
    link.href = "#person-" + person.id;
  }

  function evidenceGroup(person) {
    return /A|B/.test(person.evidence) && !/Mostly C|Mostly C-D/.test(person.evidence) ? "strong" : "self";
  }

  function personCard(person) {
    const sources = person.sources.map(([label,url]) =>
      `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`
    ).join("");

    const doItems = person.do.map(x => `<li>${x}</li>`).join("");
    const skipItems = person.skip.map(x => `<li>${x}</li>`).join("");

    return `
      <article class="person-card" id="person-${person.id}" data-group="${evidenceGroup(person)}">
        <div class="person-top">
          <h3>${person.name}</h3>
          <span class="person-badge">${person.evidence}</span>
        </div>
        <p class="lens">${person.lens}</p>
        <p class="summary">${person.summary}</p>
        <p class="person-lesson">${person.lesson}</p>
        <p class="mini-head">Copy this</p>
        <ul>${doItems}</ul>
        <p class="mini-head">Don't copy blindly</p>
        <ul>${skipItems}</ul>
        <div class="person-sources">${sources}</div>
        <a class="person-media-link" href="#resources">Watch & read ↓</a>
      </article>
    `;
  }

  function renderPeople(filter = "all") {
    const visible = people.filter(p => filter === "all" || evidenceGroup(p) === filter);
    document.getElementById("people-grid").innerHTML = visible.map(personCard).join("");
  }


  function podcastCard(item) {
    const featured = item.featured ? '<span class="podcast-pick">Start here</span>' : "";
    return '<article class="podcast-card">' +
      '<div class="podcast-meta"><span class="podcast-person">' + item.person + '</span>' + featured + '</div>' +
      '<h3>' + item.title + '</h3>' +
      '<p class="podcast-show">' + item.show + '</p>' +
      '<p class="podcast-focus">' + item.focus + '</p>' +
      '<div class="podcast-bottom"><span>' + item.duration + ' · ' + item.platform + '</span>' +
      '<a href="' + item.url + '" target="_blank" rel="noreferrer">Listen ↗</a></div>' +
      '</article>';
  }

  function renderPodcasts() {
    const grid = document.getElementById("podcast-grid");
    if (!grid) return;
    grid.innerHTML = podcasts.map(podcastCard).join("");
  }

  function renderJoshPlan() {
    if (!joshPlan) return;

    const sleep = document.getElementById("plan-sleep");
    if (sleep) sleep.innerHTML = `<strong>${joshPlan.sleep.windDown}</strong><small>wind-down</small><strong>${joshPlan.sleep.lightsOut}</strong><small>lights out · target ${joshPlan.sleep.target}</small>`;

    const week = document.getElementById("plan-week");
    if (week) week.innerHTML = joshPlan.week.map(([day,primary,secondary]) => `
      <div class="plan-day"><b>${day}</b><span>${primary}</span>${secondary ? `<em>${secondary}</em>` : ""}</div>
    `).join("");

    const nutrition = document.getElementById("plan-nutrition");
    if (nutrition) nutrition.innerHTML = joshPlan.nutrition.map(x => `<li>${x}</li>`).join("");

    const track = document.getElementById("plan-track");
    if (track) track.innerHTML = joshPlan.track.map(x => `<li>${x}</li>`).join("");

    const no = document.getElementById("plan-dont-buy");
    if (no) no.innerHTML = joshPlan.dontBuy.map(x => `<li>${x}</li>`).join("");

    const principle = document.getElementById("plan-principle");
    if (principle) principle.textContent = joshPlan.principle;
  }

  function renderBaseline() {
    if (!baseline) return;

    const updated = document.getElementById("baseline-updated");
    if (updated) updated.textContent = "Updated " + baseline.updated;

    const headline = document.getElementById("baseline-headline");
    if (headline) {
      headline.innerHTML = baseline.headline.map(item => `
        <article class="baseline-metric">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <small>${item.note}</small>
        </article>
      `).join("");
    }

    const labs = document.getElementById("baseline-labs");
    if (labs) {
      labs.innerHTML = baseline.labs.map(([label,value]) =>
        `<div><span>${label}</span><b>${value}</b></div>`
      ).join("");
    }

    const trends = document.getElementById("baseline-trends");
    if (trends) {
      trends.innerHTML = baseline.trends.map(item => `
        <div class="trend-row">
          <div><b>${item.label}</b><small>${item.period}</small></div>
          <span>${item.from}</span>
          <span class="trend-arrow">→</span>
          <strong>${item.to}</strong>
        </div>
      `).join("");
    }

    const sleep = document.getElementById("baseline-sleep");
    if (sleep) {
      sleep.textContent = `Historical sleep snapshot: ${baseline.sleep.average} average, ${baseline.sleep.shortNights}, latency ${baseline.sleep.latency}. ${baseline.sleep.note}`;
    }

    const privacy = document.getElementById("baseline-privacy");
    if (privacy) privacy.textContent = baseline.privacy;

    const next = document.getElementById("baseline-next-list");
    if (next) next.innerHTML = baseline.next.map(item => `<li>${item}</li>`).join("");
  }

  function featuredVideoCard(resource) {
    const type = resourceTypes[resource.type] || { label: resource.type, icon: "▶" };
    return `
      <article class="video-card">
        <div class="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${resource.youtubeId}"
            title="${resource.title}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
        <div class="video-copy">
          <div class="resource-meta">
            <span class="resource-type">${type.icon} ${type.label}</span>
            <span>${resource.person}</span>
            <span>${resource.duration}</span>
          </div>
          <h3>${resource.title}</h3>
          <p>${resource.note}</p>
          <div class="resource-foot">
            <span>${resource.publisher}</span>
            <span class="evidence-chip">${resource.evidence}</span>
          </div>
        </div>
      </article>
    `;
  }

  function resourceCard(resource) {
    const type = resourceTypes[resource.type] || { label: resource.type, icon: "↗" };
    return `
      <a class="resource-card" href="${resource.url}" target="_blank" rel="noreferrer">
        <div class="resource-card-top">
          <span class="resource-type">${type.icon} ${type.label}</span>
          <span class="resource-person">${resource.person}</span>
        </div>
        <h3>${resource.title}</h3>
        <p>${resource.note}</p>
        <div class="resource-foot">
          <span>${resource.publisher}${resource.duration ? " · " + resource.duration : ""}</span>
          <span class="evidence-chip">${resource.evidence}</span>
        </div>
      </a>
    `;
  }

  function renderResources(filter = "all") {
    const usable = resources.filter(r => r.type !== "listen");
    const featured = usable.filter(r => r.featured && r.youtubeId);
    const featureArea = document.getElementById("featured-videos");
    if (featureArea) {
      if (filter === "all" || filter === "watch") {
        featureArea.hidden = false;
        featureArea.innerHTML = featured.map(featuredVideoCard).join("");
      } else {
        featureArea.hidden = true;
        featureArea.innerHTML = "";
      }
    }

    const visible = usable.filter(r => {
      if (filter !== "all" && r.type !== filter) return false;
      if ((filter === "all" || filter === "watch") && r.featured && r.youtubeId) return false;
      return true;
    });

    const grid = document.getElementById("resources-grid");
    if (grid) grid.innerHTML = visible.map(resourceCard).join("");
  }

  function wireResourceFilters() {
    document.querySelectorAll(".resource-filter").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".resource-filter").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        renderResources(button.dataset.resourceFilter);
      });
    });
  }

  function wireFilters() {
    document.querySelectorAll(".filter").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        renderPeople(button.dataset.filter);
      });
    });
  }

  renderToday();
  renderJoshPlan();
  renderBaseline();
  renderPeople();
  renderPodcasts();
  renderResources();
  wireFilters();
  wireResourceFilters();
})();