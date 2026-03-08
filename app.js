// app.js — Quiniela Oscars 2026

// ── CONFIGURACIÓN ──────────────────────────────────────────
const CONFIG = {
  // Pegá acá la URL de tu Google Apps Script Web App
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/TU_DEPLOYMENT_ID_AQUI/exec",
};

// ── ESTADO ─────────────────────────────────────────────────
const state = {
  answers:    {},    // { category_id: "nominee" }
  currentIdx: 0,     // slide actual
  submitted:  false,
  twitch:     "",
  discord:    "",
};

// ── UTILS ──────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ── PASO 1: USUARIO ────────────────────────────────────────
function initUserStep() {
  const btn = document.getElementById("btn-start");
  const tInput = document.getElementById("twitch");
  const dInput = document.getElementById("discord");

  btn.addEventListener("click", () => {
    const t = tInput.value.trim();
    const d = dInput.value.trim();
    if (!t && !d) {
      tInput.focus();
      tInput.style.borderColor = "rgba(255,80,80,0.7)";
      setTimeout(() => tInput.style.borderColor = "", 1500);
      return;
    }
    state.twitch  = t;
    state.discord = d;

    document.getElementById("step-user").classList.remove("active");
    document.getElementById("step-user").classList.add("hidden");
    document.getElementById("step-categories").classList.remove("hidden");
    document.getElementById("step-categories").classList.add("active");

    initSlider();
    window.scrollTo({ top: document.getElementById("quiz-section").offsetTop - 20, behavior: "smooth" });
  });
}

// ── SLIDER ─────────────────────────────────────────────────
function initSlider() {
  const total = OSCAR_CATEGORIES.length;
  document.getElementById("cat-total").textContent = total;

  buildSlides();
  buildDots();
  updateSlider();

  document.getElementById("btn-prev").addEventListener("click", () => {
    if (state.currentIdx > 0) { state.currentIdx--; updateSlider(); }
  });
  document.getElementById("btn-next").addEventListener("click", () => {
    if (state.currentIdx < total - 1) { state.currentIdx++; updateSlider(); }
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
        <div class="slide-header-text">
          <div class="slide-num">Categoría ${idx + 1} de ${OSCAR_CATEGORIES.length}</div>
          <h2 class="slide-name">${cat.name}</h2>
        </div>
        <span class="slide-status" id="status-${cat.id}">Sin elegir</span>
      </div>
      <div class="nominees-list">
        ${cat.nominees.map((nom, i) => `
          <label class="nominee-label" for="n-${cat.id}-${i}">
            <input type="radio" name="${cat.id}" id="n-${cat.id}-${i}"
              value="${esc(nom)}" ${state.answers[cat.id] === nom ? "checked" : ""}/>
            <span class="nominee-box">
              <span class="radio-dot"></span>
              <span class="nominee-text">${nom}</span>
            </span>
          </label>
        `).join("")}
      </div>
    `;

    // Eventos
    slide.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener("change", () => {
        state.answers[cat.id] = radio.value;
        slide.classList.add("answered");
        document.getElementById(`status-${cat.id}`).textContent = "✓ Elegido";
        document.getElementById(`status-${cat.id}`).classList.add("ok");
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
  const track = document.getElementById("slider-track");

  track.style.transform = `translateX(-${idx * 100}%)`;
  document.getElementById("cat-current").textContent = idx + 1;
  document.getElementById("btn-prev").disabled = idx === 0;
  document.getElementById("btn-next").disabled = idx === total - 1;

  updateDots();
  updateProgress();
  updateSubmitZone();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
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
    note.innerHTML = "Respondé las categorías para poder enviar tu quiniela.";
    btn.disabled = true;
  } else if (missing > 0) {
    note.innerHTML = `Respondiste <strong>${answered}</strong> de <strong>${total}</strong> categorías. Podés enviar así o completar las ${missing} restantes.`;
    btn.disabled = false;
  } else {
    note.innerHTML = `¡Completaste las <strong>${total}</strong> categorías! Listo para enviar.`;
    btn.disabled = false;
  }
}

// ── SUBMIT ─────────────────────────────────────────────────
async function handleSubmit() {
  if (state.submitted) return;

  const answered = Object.keys(state.answers).length;
  if (answered === 0) { alert("Seleccioná al menos una categoría."); return; }

  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.textContent = "Enviando…";

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
    showModal();
  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = "🏆 Enviar mi Quiniela";
    alert("Error al enviar. Revisá tu conexión.");
  }
}

// ── MODAL ──────────────────────────────────────────────────
function showModal() {
  if (state.twitch)
    document.getElementById("modal-twitch-display").innerHTML =
      `<span class="modal-tag twitch">🟣 ${esc(state.twitch)}</span>`;
  if (state.discord)
    document.getElementById("modal-discord-display").innerHTML =
      `<span class="modal-tag discord">🔵 ${esc(state.discord)}</span>`;

  const topCats = [
    "mejor_pelicula","mejor_direccion","mejor_actor",
    "mejor_actriz","mejor_actor_reparto","mejor_actriz_reparto"
  ];
  const rows = topCats
    .filter(id => state.answers[id])
    .map(id => {
      const cat = OSCAR_CATEGORIES.find(c => c.id === id);
      return `<div class="summary-row">
        <span class="summary-cat">${cat.emoji} ${cat.name}</span>
        <span class="summary-pick">${esc(state.answers[id])}</span>
      </div>`;
    }).join("");

  document.getElementById("modal-summary").innerHTML =
    rows || `<p style="color:var(--white-dim);font-size:0.9rem">Todas tus predicciones fueron guardadas ✓</p>`;

  const modal = document.getElementById("confirm-modal");
  modal.classList.remove("hidden");
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("visible")));
}

function closeModal() {
  const modal = document.getElementById("confirm-modal");
  modal.classList.remove("visible");
  setTimeout(() => modal.classList.add("hidden"), 420);
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initUserStep();
  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
});
