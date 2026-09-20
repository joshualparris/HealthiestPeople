(() => {
  const people = window.HEALTHIEST_PEOPLE || [];
  const podcasts = window.HEALTH_PODCASTS || [];
  const resources = window.HEALTH_RESOURCES || [];
  const resourceTypes = window.RESOURCE_TYPES || {};
  const baseline = window.JOSH_BASELINE || null;
  const joshPlan = window.JOSH_PLAN || null;
  const glossary = window.HEALTH_GLOSSARY || [];
  const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

  function glossaryMatches(text) {
    const haystack = String(text || "").toLowerCase();
    const seen = new Set();
    return glossary.filter(item => {
      const hit = (item.match || []).some(term => haystack.includes(String(term).toLowerCase()));
      if (!hit || seen.has(item.term)) return false;
      seen.add(item.term);
      return true;
    });
  }

  function explanationMarkup(text) {
    const matches = glossaryMatches(text);
    if (!matches.length) return "";
    const definitions = matches.map(item =>
      `<p><b>${item.term}:</b> ${item.meaning}</p>`
    ).join("");
    return `<details class="term-explainer"><summary>Plain English</summary><div>${definitions}</div></details>`;
  }

  function setExplainedText(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<span>${text}</span>${explanationMarkup(text)}`;
  }

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
    setExplainedText("daily-movement", day.movement);
    setExplainedText("daily-food", day.food);
    setExplainedText("daily-recovery", day.recovery);
    setExplainedText("daily-tiny", day.tiny);

    const person = people[stableIndex(dateKey, people.length)];
    document.getElementById("lesson-name").textContent = person.name;
    document.getElementById("lesson-lens").textContent = person.lens;
    document.getElementById("lesson-text").textContent = person.lesson;
    const link = document.getElementById("lesson-link");
    link.href = "people/" + person.id + ".html";
  }

  function evidenceGroup(person) {
    return /A|B/.test(person.evidence) && !/Mostly C|Mostly C-D/.test(person.evidence) ? "strong" : "self";
  }

  function personCard(person) {
    const sources = person.sources.map(([label,url]) =>
      `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`
    ).join("");

    const doItems = person.do.map(x => `<li><span>${x}</span>${explanationMarkup(x)}</li>`).join("");
    const skipItems = person.skip.map(x => `<li><span>${x}</span>${explanationMarkup(x)}</li>`).join("");

    return `
      <article class="person-card" id="person-${person.id}" data-group="${evidenceGroup(person)}">
        <div class="person-top">
          <h3>${person.name}</h3>
          <span class="person-badge">${person.evidence}</span>
        </div>
        <p class="lens">${person.lens}</p>
        <p class="summary">${person.summary}${explanationMarkup(person.summary)}</p>
        <p class="person-lesson">${person.lesson}${explanationMarkup(person.lesson)}</p>
        <p class="mini-head">Copy this</p>
        <ul>${doItems}</ul>
        <p class="mini-head">Don't copy blindly</p>
        <ul>${skipItems}</ul>
        <div class="person-sources">${sources}</div>
        <div class="person-card-actions"><a class="person-profile-link" href="people/${person.id}.html">Open detailed profile →</a><a class="person-media-link" href="resources.html">Media library</a></div>
      </article>
    `;
  }

  function renderPeople(filter = "all") {
    const grid = document.getElementById("people-grid");
    if (!grid) return;
    const visible = people.filter(p => filter === "all" || evidenceGroup(p) === filter);
    grid.innerHTML = visible.map(personCard).join("");
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
      <div class="plan-day"><b>${day}</b><span>${primary}</span>${secondary ? `<em>${secondary}</em>` : ""}${explanationMarkup(primary + " " + secondary)}</div>
    `).join("");

    const homeWeek = document.getElementById("home-week");
    if (homeWeek) {
      const anchors = joshPlan.week.filter(([,primary]) => !primary.startsWith("No required")).map(([day,primary,secondary]) => `
        <div class="home-week-row"><b>${day}</b><span>${primary}</span>${secondary ? `<small>${secondary}</small>` : ""}</div>
      `).join("");
      homeWeek.innerHTML = anchors;
    }

    const workouts = document.getElementById("plan-workouts");
    if (workouts && joshPlan.workouts) {
      workouts.innerHTML = joshPlan.workouts.map(workout => `
        <article class="workout-card">
          <div class="workout-head">
            <div><span class="tag">${workout.when}</span><h3>${workout.name}</h3></div>
            <strong>${workout.rounds}</strong>
          </div>
          <ol class="workout-list">
            ${workout.exercises.map(([name,dose]) => `<li><span>${name}</span><b>${dose}</b></li>`).join("")}
          </ol>
          <p class="workout-note">${workout.note}</p>
          ${explanationMarkup(workout.note)}
        </article>
      `).join("");
    }

    const nutrition = document.getElementById("plan-nutrition");
    if (nutrition) nutrition.innerHTML = joshPlan.nutrition.map(x => `<li><span>${x}</span>${explanationMarkup(x)}</li>`).join("");

    const nutritionHelp = document.getElementById("plan-nutrition-help");
    if (nutritionHelp && joshPlan.nutritionHelp) {
      nutritionHelp.innerHTML = joshPlan.nutritionHelp.map(item => `
        <details class="help-card">
          <summary>${item.title}</summary>
          <p>${item.text}</p>
        </details>
      `).join("");
    }

    const track = document.getElementById("plan-track");
    if (track) track.innerHTML = joshPlan.track.map(x => `<li><span>${x}</span>${explanationMarkup(x)}</li>`).join("");

    const no = document.getElementById("plan-dont-buy");
    if (no) no.innerHTML = joshPlan.dontBuy.map(x => `<li><span>${x}</span>${explanationMarkup(x)}</li>`).join("");

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
          <small>${item.note}${item.source ? " · " + item.source : ""}</small>
          ${explanationMarkup(item.label + " " + item.value + " " + item.note)}
          ${item.meaning ? `
            <details class="metric-explainer">
              <summary>What this means for me</summary>
              <p>${item.meaning}</p>
              ${item.action ? `<p class="next-action"><b>Practical takeaway:</b> ${item.action}</p>` : ""}
            </details>` : ""}
        </article>
      `).join("");
    }

    const labs = document.getElementById("baseline-labs");
    if (labs) {
      labs.innerHTML = baseline.labs.map(([label,value]) =>
        `<div><span>${label}</span><b>${value}</b>${explanationMarkup(label + " " + value)}</div>`
      ).join("");
    }

    const trends = document.getElementById("baseline-trends");
    if (trends) {
      trends.innerHTML = baseline.trends.map(item => `
        <div class="trend-row">
          <div><b>${item.label}</b><small>${item.period}</small>${explanationMarkup(item.label)}</div>
          <span>${item.from}</span>
          <span class="trend-arrow">→</span>
          <strong>${item.to}</strong>
        </div>
      `).join("");
    }

    const sleep = document.getElementById("baseline-sleep");
    if (sleep) {
      sleep.textContent = `Current sleep context: ${baseline.sleep.average} average. ${baseline.sleep.shortNights}. ${baseline.sleep.note}`;
    }

    const privacy = document.getElementById("baseline-privacy");
    if (privacy) privacy.textContent = baseline.privacy;

    const next = document.getElementById("baseline-next-list");
    if (next) next.innerHTML = baseline.next.map(item => {
      if (typeof item === "string") return `<li><span>${item}</span>${explanationMarkup(item)}</li>`;
      return `
        <li>
          <div class="measure-card">
            <h4>${item.title}</h4>
            <p><b>Why:</b> ${item.why}</p>
            <div class="measure-how"><b>How:</b> ${item.how}</div>
            ${item.frequency ? `<p><b>How often:</b> ${item.frequency}</p>` : ""}
            ${item.sourceUrl ? `<a class="measure-source" href="${item.sourceUrl}" target="_blank" rel="noreferrer">${item.sourceLabel || "Source"} ↗</a>` : ""}
            ${explanationMarkup(item.title + " " + item.why + " " + item.how)}
          </div>
        </li>`;
    }).join("");

    const archive = document.getElementById("baseline-archive-links");
    if (archive && baseline.archiveLinks) {
      archive.innerHTML = baseline.archiveLinks.map(([label,url]) =>
        `<p><a href="${url}">${label} ↗</a></p>`
      ).join("");
    }
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

  function renderGlossary() {
    const grid = document.getElementById("glossary-grid");
    if (!grid) return;
    grid.innerHTML = glossary.map(item => `
      <article class="glossary-card">
        <h3>${item.term}</h3>
        <p>${item.meaning}</p>
      </article>
    `).join("");
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

  if (document.getElementById("today-title")) renderToday();
  renderJoshPlan();
  renderBaseline();
  renderGlossary();
  renderPeople();
  renderPodcasts();
  renderResources();
  wireFilters();
  wireResourceFilters();
})();