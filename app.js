(() => {
  const people = window.HEALTHIEST_PEOPLE || [];
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
      </article>
    `;
  }

  function renderPeople(filter = "all") {
    const visible = people.filter(p => filter === "all" || evidenceGroup(p) === filter);
    document.getElementById("people-grid").innerHTML = visible.map(personCard).join("");
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
  renderPeople();
  wireFilters();
})();