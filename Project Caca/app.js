const TOTAL = 30;

const categories = [
  { name: "Mathematics", range: [0, 9] },
  { name: "Science", range: [10, 19] },
  { name: "Language", range: [20, 29] }
];

const questions = [
  { category: "Mathematics", text: "What is the value of √144?", options: ["10", "11", "12", "13"], answer: 2 },
  { category: "Mathematics", text: "If 3x + 5 = 20, what is x?", options: ["3", "4", "5", "6"], answer: 2 },
  { category: "Mathematics", text: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2 },
  { category: "Mathematics", text: "The area of a rectangle is 48 and its length is 8. What is its width?", options: ["4", "5", "6", "7"], answer: 2 },
  { category: "Mathematics", text: "What is 7² − 3²?", options: ["30", "34", "40", "58"], answer: 2 },
  { category: "Mathematics", text: "What is the next number: 2, 4, 8, 16, ...?", options: ["20", "24", "30", "32"], answer: 3 },
  { category: "Mathematics", text: "What is the value of 15 × 6?", options: ["70", "80", "90", "100"], answer: 2 },
  { category: "Mathematics", text: "Simplify 18/24.", options: ["2/3", "3/4", "4/5", "5/6"], answer: 1 },
  { category: "Mathematics", text: "What is the perimeter of a square with side 9?", options: ["18", "27", "36", "81"], answer: 2 },
  { category: "Mathematics", text: "What is 5³?", options: ["15", "25", "75", "125"], answer: 3 },
  { category: "Science", text: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { category: "Science", text: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
  { category: "Science", text: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "NaCl"], answer: 2 },
  { category: "Science", text: "Which organ pumps blood throughout the body?", options: ["Lung", "Brain", "Heart", "Kidney"], answer: 2 },
  { category: "Science", text: "What force keeps objects on Earth?", options: ["Magnetism", "Gravity", "Friction", "Pressure"], answer: 1 },
  { category: "Science", text: "What is the basic unit of life?", options: ["Atom", "Cell", "Tissue", "Organ"], answer: 1 },
  { category: "Science", text: "Which state of matter has a fixed volume but no fixed shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 1 },
  { category: "Science", text: "What is the center of an atom called?", options: ["Electron", "Nucleus", "Proton", "Neutron"], answer: 1 },
  { category: "Science", text: "Which vitamin is mainly obtained from sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: 3 },
  { category: "Science", text: "What is the boiling point of water at sea level?", options: ["50°C", "75°C", "100°C", "150°C"], answer: 2 },
  { category: "Language", text: "Choose the correct sentence.", options: ["She go to school", "She goes to school", "She going school", "She gone school"], answer: 1 },
  { category: "Language", text: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
  { category: "Language", text: "What is the antonym of 'strong'?", options: ["Powerful", "Weak", "Brave", "Hard"], answer: 1 },
  { category: "Language", text: "Which word is a noun?", options: ["Run", "Beautiful", "Student", "Quickly"], answer: 2 },
  { category: "Language", text: "Complete: I have ___ apple.", options: ["a", "an", "the", "some"], answer: 1 },
  { category: "Language", text: "Which punctuation ends a question?", options: [".", ",", "?", "!"], answer: 2 },
  { category: "Language", text: "What does 'besar' mean in English?", options: ["Small", "Big", "Fast", "Slow"], answer: 1 },
  { category: "Language", text: "Choose the past tense of 'write'.", options: ["Writed", "Written", "Wrote", "Writing"], answer: 2 },
  { category: "Language", text: "Which is the correct spelling?", options: ["Definately", "Definitely", "Definetly", "Definatly"], answer: 1 },
  { category: "Language", text: "Find the verb: 'They study every night.'", options: ["They", "study", "every", "night"], answer: 1 }
];

const majors = [
  {
    name: "Ekonomi Pembangunan",
    faculty: "Fakultas Ekonomi dan Bisnis",
    desc: "Mempelajari teori ekonomi dan strategi pembangunan daerah.",
    minScore: 580,
    note: "Jurusan ini memiliki peluang yang baik untuk Anda.",
    strength: "Fondasi akademik yang solid untuk memulai studi ekonomi."
  },
  {
    name: "Pendidikan Bahasa Indonesia",
    faculty: "Fakultas Keguruan dan Ilmu Pendidikan",
    desc: "Mempersiapkan pendidik bahasa Indonesia profesional.",
    minScore: 570,
    note: "Skor Anda mendukung untuk jurusan ini.",
    strength: "Peluang yang baik untuk mengembangkan karir di bidang pendidikan."
  }
];

const state = {
  view: "home",
  current: 0,
  answers: Array(TOTAL).fill(null)
};

const app = document.getElementById("app");

function icon(name) {
  const icons = {
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`,
    arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>`,
    trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"></path><path d="M5 5H3v3a4 4 0 0 0 4 4"></path><path d="M19 5h2v3a4 4 0 0 1-4 4"></path></svg>`,
    medal: `<svg class="medal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="m8.6 12 1.1 9 2.3-1.7 2.3 1.7 1.1-9"></path></svg>`,
    trend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 9 11l4 4 8-8"></path><path d="M15 7h6v6"></path></svg>`,
    cap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m22 10-10-5-10 5 10 5 10-5Z"></path><path d="M6 12v5c3.4 2 8.6 2 12 0v-5"></path></svg>`,
    target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.6" fill="currentColor"></circle></svg>`,
    checkCircle: `<svg class="major-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="m8.5 12 2.2 2.2 4.8-5"></path></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M10 20v-6h4v6"></path></svg>`
  };
  return icons[name] || "";
}

function answeredCount() {
  return state.answers.filter(answer => answer !== null).length;
}

function categoryFor(index) {
  return categories.find(cat => index >= cat.range[0] && index <= cat.range[1])?.name || "Mathematics";
}

function scoreData() {
  const scores = {};
  categories.forEach(cat => scores[cat.name] = { correct: 0, total: 10, score: 0, grade: "D" });
  state.answers.forEach((answer, index) => {
    if (answer === questions[index].answer) scores[questions[index].category].correct += 1;
  });
  Object.values(scores).forEach(item => {
    item.score = item.correct === 0 ? 200 : 200 + item.correct * 80;
    item.grade = item.score >= 800 ? "A" : item.score >= 650 ? "B" : item.score >= 520 ? "C" : "D";
  });
  const correct = Object.values(scores).reduce((sum, item) => sum + item.correct, 0);
  const percentage = Math.round((correct / TOTAL) * 1000) / 10;
  const totalScore = Math.round(Object.values(scores).reduce((sum, item) => sum + item.score, 0) / 3);
  const grade = totalScore >= 800 ? "A" : totalScore >= 650 ? "B" : totalScore >= 520 ? "C" : "D";
  return { scores, correct, percentage, totalScore, grade };
}

function setView(view) {
  state.view = view;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function selectOption(optionIndex) {
  state.answers[state.current] = optionIndex;
  render();
}

function goQuestion(index) {
  state.current = Math.max(0, Math.min(TOTAL - 1, index));
  setView("quiz");
}

function renderHome() {
  app.innerHTML = `
    <main class="page">
      <section class="card landing-card">
        <img class="logo" src="./assets/logo-usk-majormatch.png" alt="USK MajorMatch logo">
        <h1 class="tagline">Cari Jurusanmu. Raih Mimpimu.</h1>
        <p class="lead">Ikuti tryout komprehensif untuk menemukan jurusan di Universitas Syiah Kuala yang sesuai dengan kekuatan akademik Anda. Kami akan menganalisis performa Anda dan memberikan prediksi kelayakan jurusan.</p>
        <div class="info-panel">
          <h2>Yang Akan Anda Dapatkan:</h2>
          <ul class="benefits">
            <li class="benefit"><span class="check">✓</span><span>30 soal tryout mencakup Matematika, Sains, dan Bahasa</span></li>
            <li class="benefit"><span class="check">✓</span><span>Analisis skor detail dan kalkulasi nilai</span></li>
            <li class="benefit"><span class="check">✓</span><span>Prediksi kelayakan jurusan USK yang dipersonalisasi</span></li>
            <li class="benefit"><span class="check">✓</span><span>Estimasi waktu: 20-30 menit</span></li>
          </ul>
        </div>
        <button class="primary-btn" data-action="start">Mulai Tryout <span class="arrow">${icon("arrowRight")}</span></button>
      </section>
    </main>
  `;
}

function renderQuiz() {
  const q = questions[state.current];
  const count = answeredCount();
  const progress = ((state.current + 1) / TOTAL) * 100;
  app.innerHTML = `
    <main class="page">
      <section class="card quiz-card">
        <header class="quiz-header">
          <button class="back-btn" data-action="home"><span class="back-icon">←</span> Back</button>
          <div class="question-count">Question ${state.current + 1} of ${TOTAL}</div>
        </header>
        <div class="meta-row">
          <div class="pill">${categoryFor(state.current)}</div>
          <div class="answered">${count} answered</div>
        </div>
        <div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div>
        <h1 class="question-text">${q.text}</h1>
        <div class="options">
          ${q.options.map((opt, idx) => `
            <button class="option ${state.answers[state.current] === idx ? "selected" : ""}" data-option="${idx}">
              <span class="radio"></span>
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>
        <div class="nav-row">
          <button class="secondary-btn" data-action="previous" ${state.current === 0 ? "disabled" : ""}><span class="arrow">${icon("arrowLeft")}</span> Previous</button>
          <button class="primary-btn" data-action="next">${state.current === TOTAL - 1 ? "Review" : "Next"} <span class="arrow">${icon("arrowRight")}</span></button>
        </div>
      </section>
    </main>
  `;
}

function renderReview() {
  const count = answeredCount();
  const progress = (count / TOTAL) * 100;
  app.innerHTML = `
    <main class="page">
      <section class="card review-card">
        <h1 class="review-title">Review Your Answers</h1>
        <div class="review-progress-row">
          <span>Progress</span>
          <span class="accent">${count} / ${TOTAL} answered</span>
        </div>
        <div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div>
        <div class="question-grid" aria-label="Question review grid">
          ${questions.map((_, index) => `
            <button class="question-cell ${state.answers[index] !== null ? "done" : ""}" data-question="${index}">${index + 1}</button>
          `).join("")}
        </div>
        <div class="review-actions">
          <button class="secondary-btn" data-action="continue">Continue<br>Answering</button>
          <button class="primary-btn" data-action="submit">Submit Test (${count}/${TOTAL})</button>
        </div>
      </section>
    </main>
  `;
}

function renderResult() {
  const data = scoreData();
  const scoreList = Object.entries(data.scores).map(([name, item]) => `
    <article class="subtest-card">
      <div class="subtest-head">
        ${icon("medal")}
        <strong class="subtest-name">${name}</strong>
        <span class="subtest-score">${item.score}</span>
        <span class="subtest-grade">${item.grade}</span>
      </div>
      <div class="subtest-body">
        <span>${item.correct} dari ${item.total} benar</span>
        <span class="need">${item.score >= 520 ? "Cukup Baik" : "Perlu Peningkatan"}</span>
      </div>
      <div class="small-progress"><div style="width:${Math.max(0, item.correct * 10)}%"></div></div>
    </article>
  `).join("");

  app.innerHTML = `
    <main class="result-page">
      <section class="card result-card">
        <div class="icon-bubble">${icon("trophy")}</div>
        <h1 class="result-title">Tryout Selesai!</h1>
        <p class="result-subtitle">Berikut hasil tryout Anda</p>
        <div class="score-card">
          <div class="score-label">Skor Total</div>
          <div class="score-number">${data.totalScore}</div>
          <div class="score-meta">Nilai: ${data.percentage}% · Grade ${data.grade}</div>
          <div class="score-status">${data.totalScore >= 520 ? "Cukup Baik" : "Perlu Peningkatan"}</div>
        </div>
        <h2 class="section-title">Rincian Per Subtes</h2>
        <div class="subtest-list">${scoreList}</div>
      </section>
      <section class="card next-card">
        <div class="next-layout">
          <div class="green-bubble">${icon("trend")}</div>
          <div>
            <h2 class="next-title">Langkah Selanjutnya</h2>
            <p class="next-copy">Berdasarkan performa Anda, kami telah menyiapkan prediksi kelayakan jurusan di Universitas Syiah Kuala yang sesuai dengan kekuatan akademik Anda.</p>
          </div>
        </div>
        <div class="next-actions">
          <button class="secondary-btn" data-action="restart">Ulangi Tryout</button>
          <button class="primary-btn" data-action="prediction">Lihat Prediksi<br>Jurusan <span class="arrow">${icon("arrowRight")}</span></button>
        </div>
      </section>
    </main>
  `;
}

function renderPrediction() {
  const data = scoreData();
  const safeCount = majors.filter(m => data.totalScore >= m.minScore - 230).length;
  const majorCards = majors.map(major => {
    const gap = Math.max(0, major.minScore - data.totalScore);
    return `
      <article class="major-card">
        <div class="major-head">
          ${icon("checkCircle")}
          <h3 class="major-name">${major.name}</h3>
          <span class="major-badge">Aman</span>
        </div>
        <p class="faculty">${major.faculty}</p>
        <p class="major-desc">${major.desc}</p>
        <div class="min-score">
          <div class="min-line">
            <span>Estimasi Skor Minimum:</span>
            <strong class="min-value">${major.minScore}</strong>
          </div>
          <p class="gap-text">⊙ Perlu ${gap} poin lagi untuk mencapai estimasi skor minimum</p>
        </div>
        <p class="note"><strong>Catatan:</strong> ${major.note}</p>
        <div class="strength">Kelebihan Anda:
          <ul><li>${major.strength}</li></ul>
        </div>
      </article>
    `;
  }).join("");

  app.innerHTML = `
    <main class="predict-page">
      <section class="card predict-card">
        <div class="icon-bubble">${icon("cap")}</div>
        <h1 class="predict-title">Prediksi Kelayakan Jurusan</h1>
        <p class="predict-subtitle">Universitas Syiah Kuala</p>
        <div class="score-pill">Skor Total Anda: ${data.totalScore}</div>
        <div class="disclaimer"><strong>Disclaimer:</strong> Prediksi ini bukan jaminan kelulusan, melainkan estimasi berbasis data untuk membantu siswa menyusun strategi. Kategori dibagi menjadi: <strong>Aman</strong> (peluang stabil), <strong>Realistis</strong> (skor cukup kompetitif), dan <strong>Ambisius</strong> (perlu peningkatan).</div>
        <div class="stats">
          <div class="stat safe">${icon("checkCircle")}<span class="num">${safeCount}</span><span class="label">Aman</span></div>
          <div class="stat realistic">${icon("target")}<span class="num">0</span><span class="label">Realistis</span></div>
          <div class="stat ambitious">${icon("trend")}<span class="num">0</span><span class="label">Ambisius</span></div>
        </div>
        <h2 class="reco-title">Rekomendasi Jurusan</h2>
        <div class="reco-list">${majorCards}</div>
      </section>
      <section class="card next-steps">
        <h2>Langkah Selanjutnya</h2>
        <ul>
          <li>Riset lebih dalam tentang jurusan yang Anda minati di website resmi USK</li>
          <li>Periksa persyaratan khusus dan jalur masuk untuk setiap jurusan</li>
          <li>Fokus meningkatkan nilai di area yang masih lemah dengan tryout berulang</li>
          <li>Konsultasikan pilihan jurusan dengan guru BK atau orang tua</li>
        </ul>
        <button class="primary-btn home-bottom" data-action="home">${icon("home")} Kembali ke Beranda</button>
      </section>
    </main>
  `;
}

function render() {
  if (state.view === "home") renderHome();
  if (state.view === "quiz") renderQuiz();
  if (state.view === "review") renderReview();
  if (state.view === "result") renderResult();
  if (state.view === "prediction") renderPrediction();
}

document.addEventListener("click", (event) => {
  const option = event.target.closest("[data-option]");
  if (option) {
    selectOption(Number(option.dataset.option));
    return;
  }

  const question = event.target.closest("[data-question]");
  if (question) {
    goQuestion(Number(question.dataset.question));
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "start") { state.current = 0; setView("quiz"); }
  if (action === "home") setView("home");
  if (action === "previous") { state.current = Math.max(0, state.current - 1); renderQuiz(); }
  if (action === "next") {
    if (state.current === TOTAL - 1) setView("review");
    else { state.current += 1; renderQuiz(); }
  }
  if (action === "continue") {
    const firstUnanswered = state.answers.findIndex(answer => answer === null);
    state.current = firstUnanswered === -1 ? 0 : firstUnanswered;
    setView("quiz");
  }
  if (action === "submit") setView("result");
  if (action === "restart") {
    state.answers = Array(TOTAL).fill(null);
    state.current = 0;
    setView("quiz");
  }
  if (action === "prediction") setView("prediction");
});

render();
