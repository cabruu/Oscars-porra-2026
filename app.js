const CONFIG = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbz_U9qD6kEgS4JfGe26bFZk6K52ZHf4nxZRvKdZGJJb-Db5ZXH0LGXEPjXVMo4CboM4/exec",
};

const state = {
  answers:    {},
  currentIdx: 0,
  submitted:  false,
  twitch:     "",
  discord:    "",
};

function esc(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function initUserStep() {
  document.getElementById("btn-scroll-down").addEventListener("click", () => {
    document.getElementById("quiz-section").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("btn-start").addEventListener("click", () => {
    const t = document.getElementById("twitch").value.trim();
    const d = document.getElementById("discord").value.trim();

    if (!t && !d) {
      const input = document.getElementById("twitch");
      input.focus();
      input.style.borderColor = "rgba(255,80,80,0.7)";
      setTimeout(() => input.style.borderColor = "", 1500);
      return;
    }

    state.twitch  = t;
    state.discord = d;

    document.getElementById("hero").classList.add("hero-hidden");

    document.getElementById("step-user").classList.remove("active");
    document.getElementById("step-user").classList.add("hidden");
    document.getElementById("step-categories").classList.remove("hidden");
    document.getElementById("step-categories").classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    initSlider();
  });
}

function initSlider() {
  document.getElementById("cat-total").textContent = OSCAR_CATEGORIES.length;
  buildSlides();
  buildDots();
  updateSlider();

  document.getElementById("btn-prev").addEventListener("click", () => {
    if (state.currentIdx > 0) { state.currentIdx--; updateSlider(); }
  });
  document.getElementById("btn-next").addEventListener("click", () => {
    if (state.currentIdx < OSCAR_CATEGORIES.length - 1) { state.currentIdx++; updateSlider(); }
  });
  document.getElementById("submit-btn").addEventListener("click", handleSubmit);
}

function buildSlides() {
  const track = document.getElementById("slider-track");
  track.innerHTML = "";

  OSCAR_CATEGORIES.forEach((cat, idx) => {
    const slide = document.createElement("div");
    slide.className = "slide-card";
    slide.id = `slide-${cat.id}`;

    slide.innerHTML = `
      <div class="slide-header">
        <span class="slide-emoji">${cat.emoji}</span>
        <div class="slide-meta">
          <div class="slide-num">Categoría ${idx + 1} de ${OSCAR_CATEGORIES.length}</div>
          <h2 class="slide-name">${cat.name}</h2>
        </div>
        <span class="slide-badge" id="badge-${cat.id}">Sin elegir</span>
      </div>
      <div class="nominees-list">
        ${cat.nominees.map((nom, i) => `
          <label class="nominee-label" for="n-${cat.id}-${i}">
            <input type="radio" name="${cat.id}" id="n-${cat.id}-${i}" value="${esc(nom)}" />
            <span class="nominee-box">
              <span class="radio-dot"></span>
              <span class="nominee-text">${nom}</span>
            </span>
          </label>
        `).join("")}
      </div>
    `;

    slide.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener("change", () => {
        state.answers[cat.id] = radio.value;
        slide.classList.add("answered");
        const badge = document.getElementById(`badge-${cat.id}`);
        badge.textContent = "✓ Elegido";
        badge.classList.add("ok");
        updateDots();
        updateProgress();
        updateSubmitZone();
      });
    });

    track.appendChild(slide);
  });
}

function buildDots() {
  const wrap = document.getElementById("dot-indicators");
  wrap.innerHTML = "";
  OSCAR_CATEGORIES.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot";
    d.setAttribute("aria-label", `Ir a categoría ${i + 1}`);
    d.addEventListener("click", () => { state.currentIdx = i; updateSlider(); });
    wrap.appendChild(d);
  });
}

function updateSlider() {
  const idx   = state.currentIdx;
  const total = OSCAR_CATEGORIES.length;
  document.getElementById("slider-track").style.transform = `translateX(-${idx * 100}%)`;
  document.getElementById("cat-current").textContent = idx + 1;
  document.getElementById("btn-prev").disabled = idx === 0;
  document.getElementById("btn-next").disabled = idx === total - 1;
  updateDots();
  updateProgress();
  updateSubmitZone();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === state.currentIdx);
    dot.classList.toggle("done",   i !== state.currentIdx && !!state.answers[OSCAR_CATEGORIES[i].id]);
  });
}

function updateProgress() {
  const answered = Object.keys(state.answers).length;
  const total    = OSCAR_CATEGORIES.length;
  document.getElementById("answered-count").textContent = answered;
  document.getElementById("progress-fill").style.width  = `${(answered / total) * 100}%`;
}

function updateSubmitZone() {
  const answered = Object.keys(state.answers).length;
  const total    = OSCAR_CATEGORIES.length;
  const missing  = total - answered;
  const btn      = document.getElementById("submit-btn");
  const note     = document.getElementById("submit-note");

  if (answered === 0) {
    note.innerHTML = "Respondé las categorías para poder enviar tu porra.";
    btn.disabled = true;
  } else if (missing > 0) {
    note.innerHTML = `Respondiste <strong>${answered}</strong> de <strong>${total}</strong> categorías. Podés enviar así o completar las ${missing} restantes.`;
    btn.disabled = false;
  } else {
    note.innerHTML = `¡Completaste las <strong>${total}</strong> categorías! Listo para enviar 🏆`;
    btn.disabled = false;
  }
}

async function handleSubmit() {
  if (state.submitted) return;

  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V15a1 1 0 0 0-2 0v1.93A8 8 0 0 1 4.07 11H6a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 0 0 2h1.93A8 8 0 0 1 13 16.93z"/></svg> Enviando…`;

  const payload = {
    timestamp: new Date().toISOString(),
    twitch:    state.twitch,
    discord:   state.discord,
    ...state.answers,
  };

  try {
    await fetch(CONFIG.APPS_SCRIPT_URL, {
      method:  "POST",
      mode:    "no-cors",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    state.submitted = true;
    showConfirmScreen();
  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Enviar mi Porra`;
    alert("Error al enviar. Revisá tu conexión e intentá de nuevo.");
  }
}

function showConfirmScreen() {
  if (state.twitch)
    document.getElementById("confirm-twitch-display").innerHTML =
      `<span class="modal-tag twitch">🟣 ${esc(state.twitch)}</span>`;
  if (state.discord)
    document.getElementById("confirm-discord-display").innerHTML =
      `<span class="modal-tag discord">🔵 ${esc(state.discord)}</span>`;

  const screen = document.getElementById("confirm-screen");
  screen.classList.remove("hidden");

  screen.getBoundingClientRect();
  screen.classList.add("visible");

  document.body.style.overflow = "hidden";
}

document.addEventListener("DOMContentLoaded", () => {
  initUserStep();
});
