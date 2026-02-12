document.addEventListener("DOMContentLoaded", () => {
  const exercises = [
    { id: 1, name: "Стойка на руках у стены", levels: [0, 1, 1, 0, 0, 0, 0] },
    { id: 2, name: "Стойка на одной руке у стены", levels: [0, 3, 3, 0, 0, 1, 1] },
    { id: 3, name: "Разворот 360°", levels: [0, 2, 2, 1, 0, 2, 2] },
    { id: 4, name: "Стойка free", levels: [3, 2, 2, 1, 1, 3, 2] },
    { id: 5, name: "Спичаг", levels: [3, 3, 1, 1, 3, 3, 2] },
    { id: 6, name: "Star free", levels: [0, 0, 1, 2, 0, 3, 1] },
    { id: 7, name: "Угол (2 кубика)", levels: [0, 1, 0, 0, 0, 1, 0] },
    { id: 8, name: "Угол (1 кубик)", levels: [0, 2, 0, 0, 0, 1, 1] },
    { id: 9, name: "Угол (пол)", levels: [0, 3, 0, 0, 0, 1, 2] },
    { id: 10, name: "Заход в звезду", levels: [1, 2, 0, 0, 1, 2, 3] },
    { id: 11, name: "Biceps stand", levels: [0, 2, 1, 0, 1, 3, 1] },
    { id: 12, name: "Крокодил в biceps stand", levels: [0, 2, 2, 3, 3, 0, 1] },
    { id: 13, name: "Needle", levels: [0, 0, 2, 0, 0, 3, 1] },
    { id: 14, name: "Side star free", levels: [0, 0, 2, 3, 0, 0, 2] },
    { id: 15, name: "Подъём полупальцы (колени)", levels: [2, 0, 0, 0, 0, 0, 0] },
    { id: 16, name: "Подъём полупальцы (планка)", levels: [3, 0, 0, 0, 0, 0, 0] },
    { id: 17, name: "Monolimb reverse star", levels: [0, 1, 2, 1, 1, 3, 2] },
    { id: 18, name: "Планка 5 минут", levels: [0, 1, 2, 0, 3, 0, 0] },
    { id: 19, name: "Baby H2H", levels: [2, 2, 1, 0, 0, 3, 2] },
    { id: 20, name: "Уголок в Tucksit", levels: [2, 2, 1, 1, 3, 0, 1] }
  ];

  const SKILLS = ["кисть", "плечи", "структура", "баланс1т", "кор", "баланс↓", "коорд"];

  const RANKS = {
    "❌ Не присваивается": "#FFFFFF",
    "🔴 III юношеский": "#FF0000",
    "🟠 II юношеский": "#FF8800",
    "🟡 I юношеский": "#FFFF00",
    "🟢 III взрослый": "#00FF00",
    "🔵 II взрослый": "#0000FF",
    "🟣 I взрослый": "#800080"
  };

  const form = document.getElementById("flyer-form");
  const resultEl = document.getElementById("result");
  const calcBtn = form?.querySelector("button.submit");

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function render(ids, blockId) {
    const container = document.querySelector(`#${blockId} .items`);
    if (!container) return;

    ids.forEach((id) => {
      const ex = exercises.find((e) => e.id === id);
      if (!ex) return;

      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${id}"> ${id}. ${escapeHtml(ex.name)}`;
      container.appendChild(label);
    });
  }

  render([1, 2, 3, 4, 5, 6], "block1");
  render([7, 8, 9], "block2");
  render([10, 11, 12, 13, 14, 15, 16], "block3");
  render([17, 18, 19, 20], "block4");

  function getSelectedExerciseIds() {
    if (!form) return [];
    return [...form.querySelectorAll('input[type="checkbox"]:checked')].map((i) =>
      parseInt(i.value, 10)
    );
  }

  function validateRequiredFields() {
    if (!form) return null;

    const fullname = form.fullname?.value?.trim();
    const city = form.city?.value?.trim();

    if (!fullname || !city) {
      resultEl.innerHTML = `<div class="result-card"><h3 class="result-title">Заполни ФИО и Город</h3></div>`;
      return null;
    }
    return { fullname, city };
  }

  function calculateRankByLogicTxt(performed_exercises) {
    // Шаг 1: максимумы по 7 компетенциям
    const maxLevelsArr = [0, 0, 0, 0, 0, 0, 0];

    performed_exercises.forEach((id) => {
      const ex = exercises.find((e) => e.id === id);
      if (!ex) return;

      ex.levels.forEach((lvl, idx) => {
        if (lvl > maxLevelsArr[idx]) maxLevelsArr[idx] = lvl;
      });
    });

    const max_skills = {};
    SKILLS.forEach((name, idx) => (max_skills[name] = maxLevelsArr[idx]));

    // Шаг 2: активные компетенции
    const active_skills = maxLevelsArr.filter((v) => v > 0).length;

    // Шаг 3: худший максимум (игнорируем 0)
    const nonZero = maxLevelsArr.filter((v) => v > 0);
    const worst_max = nonZero.length ? Math.min(...nonZero) : 0;

    // Шаг 4: ранжирование (v2.4)
    let rank = "❌ Не присваивается";

    if (active_skills < 4) {
      rank = "❌ Не присваивается";
    } else if (active_skills < 7 || worst_max < 2) {
      if (active_skills >= 7) {
        rank = "🟡 I юношеский";
      } else if (active_skills >= 4) {
        rank = "🔴 III юношеский";
      } else {
        rank = "🟠 II юношеский";
      }
    } else if (worst_max >= 7) {
      rank = "🟣 I взрослый";
    } else if (worst_max >= 3 && maxLevelsArr.filter((v) => v >= 4).length >= 4) {
      rank = "🔵 II взрослый";
    } else if (worst_max >= 2) {
      rank = "🟢 III взрослый";
    } else {
      rank = "🟡 I юношеский";
    }

    const color = RANKS[rank] || "#FFFFFF";

    return {
      max_skills,
      active_skills,
      worst_max,
      rank,
      color,
      maxLevelsArr
    };
  }

  function renderResult({ fullname, city, calc }) {
    const { rank, color, active_skills, worst_max, max_skills, maxLevelsArr } = calc;

    const skillsLines = Object.entries(max_skills)
      .map(
        ([k, v]) =>
          `<li><span class="skill-name">${escapeHtml(k)}</span><span class="skill-val">${escapeHtml(v)}</span></li>`
      )
      .join("");

    resultEl.innerHTML = `
      <div class="result-card" style="border-left: 10px solid ${escapeHtml(color)};">
        <h3 class="result-title">${escapeHtml(rank)}</h3>
        <p class="result-meta"><strong>${escapeHtml(fullname)}</strong>, ${escapeHtml(city)}</p>

        <div class="result-grid">
          <div class="result-block">
            <div class="result-label">Активных компетенций</div>
            <div class="result-value">${escapeHtml(active_skills)}</div>
          </div>
          <div class="result-block">
            <div class="result-label">Худший максимум</div>
            <div class="result-value">${escapeHtml(worst_max)}</div>
          </div>
        </div>

        <div class="result-label" style="margin-top:12px;">Максимумы по компетенциям</div>
        <ul class="skills-list">${skillsLines}</ul>

        <p class="result-levels" style="margin-top:10px;">
          <strong>Массив:</strong> <span>${escapeHtml(maxLevelsArr.join(" · "))}</span>
        </p>
      </div>
    `;
  }

  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const baseData = validateRequiredFields();
      if (!baseData) return;

      const selected = getSelectedExerciseIds();
      const calc = calculateRankByLogicTxt(selected);

      renderResult({
        fullname: baseData.fullname,
        city: baseData.city,
        calc
      });
    });
  }
});
