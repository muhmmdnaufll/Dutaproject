import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, GraduationCap, Home, LineChart, Target, Trophy } from 'lucide-react';
import './styles.css';

const TOTAL = 30;

const questions = [
  { category: 'Mathematics', text: 'What is the value of √144?', options: ['10', '11', '12', '13'], answer: 2 },
  { category: 'Mathematics', text: 'If 3x + 5 = 20, what is x?', options: ['3', '4', '5', '6'], answer: 2 },
  { category: 'Mathematics', text: 'What is 25% of 200?', options: ['25', '40', '50', '75'], answer: 2 },
  { category: 'Mathematics', text: 'The area of a rectangle is 48 and its length is 8. What is its width?', options: ['4', '5', '6', '7'], answer: 2 },
  { category: 'Mathematics', text: 'What is 7² − 3²?', options: ['30', '34', '40', '58'], answer: 2 },
  { category: 'Mathematics', text: 'What is the next number: 2, 4, 8, 16, ...?', options: ['20', '24', '30', '32'], answer: 3 },
  { category: 'Mathematics', text: 'What is the value of 15 × 6?', options: ['70', '80', '90', '100'], answer: 2 },
  { category: 'Mathematics', text: 'Simplify 18/24.', options: ['2/3', '3/4', '4/5', '5/6'], answer: 1 },
  { category: 'Mathematics', text: 'What is the perimeter of a square with side 9?', options: ['18', '27', '36', '81'], answer: 2 },
  { category: 'Mathematics', text: 'What is 5³?', options: ['15', '25', '75', '125'], answer: 3 },
  { category: 'Science', text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1 },
  { category: 'Science', text: 'What gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 1 },
  { category: 'Science', text: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], answer: 2 },
  { category: 'Science', text: 'Which organ pumps blood throughout the body?', options: ['Lung', 'Brain', 'Heart', 'Kidney'], answer: 2 },
  { category: 'Science', text: 'What force keeps objects on Earth?', options: ['Magnetism', 'Gravity', 'Friction', 'Pressure'], answer: 1 },
  { category: 'Science', text: 'What is the basic unit of life?', options: ['Atom', 'Cell', 'Tissue', 'Organ'], answer: 1 },
  { category: 'Science', text: 'Which state of matter has a fixed volume but no fixed shape?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], answer: 1 },
  { category: 'Science', text: 'What is the center of an atom called?', options: ['Electron', 'Nucleus', 'Proton', 'Neutron'], answer: 1 },
  { category: 'Science', text: 'Which vitamin is mainly obtained from sunlight?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], answer: 3 },
  { category: 'Science', text: 'What is the boiling point of water at sea level?', options: ['50°C', '75°C', '100°C', '150°C'], answer: 2 },
  { category: 'Language', text: 'Choose the correct sentence.', options: ['She go to school', 'She goes to school', 'She going school', 'She gone school'], answer: 1 },
  { category: 'Language', text: "What is the synonym of 'happy'?", options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 1 },
  { category: 'Language', text: "What is the antonym of 'strong'?", options: ['Powerful', 'Weak', 'Brave', 'Hard'], answer: 1 },
  { category: 'Language', text: 'Which word is a noun?', options: ['Run', 'Beautiful', 'Student', 'Quickly'], answer: 2 },
  { category: 'Language', text: 'Complete: I have ___ apple.', options: ['a', 'an', 'the', 'some'], answer: 1 },
  { category: 'Language', text: 'Which punctuation ends a question?', options: ['.', ',', '?', '!'], answer: 2 },
  { category: 'Language', text: "What does 'besar' mean in English?", options: ['Small', 'Big', 'Fast', 'Slow'], answer: 1 },
  { category: 'Language', text: "Choose the past tense of 'write'.", options: ['Writed', 'Written', 'Wrote', 'Writing'], answer: 2 },
  { category: 'Language', text: 'Which is the correct spelling?', options: ['Definately', 'Definitely', 'Definetly', 'Definatly'], answer: 1 },
  { category: 'Language', text: "Find the verb: 'They study every night.'", options: ['They', 'study', 'every', 'night'], answer: 1 },
];

const majors = [
  {
    name: 'Ekonomi Pembangunan',
    faculty: 'Fakultas Ekonomi dan Bisnis',
    desc: 'Mempelajari teori ekonomi dan strategi pembangunan daerah.',
    minScore: 580,
    note: 'Jurusan ini memiliki peluang yang baik untuk Anda.',
    strength: 'Fondasi akademik yang solid untuk memulai studi ekonomi.',
  },
  {
    name: 'Pendidikan Bahasa Indonesia',
    faculty: 'Fakultas Keguruan dan Ilmu Pendidikan',
    desc: 'Mempersiapkan pendidik bahasa Indonesia profesional.',
    minScore: 570,
    note: 'Skor Anda mendukung untuk jurusan ini.',
    strength: 'Peluang yang baik untuk mengembangkan karir di bidang pendidikan.',
  },
];

function Logo() {
  return (
    <div className="brand-logo" aria-label="USK MajorMatch">
      <div className="brand-mark">
        <GraduationCap size={66} strokeWidth={1.8} />
        <div className="book-lines"><span /><span /><span /></div>
        <strong>USK</strong>
        <small>MAJORMATCH</small>
      </div>
    </div>
  );
}

function scoreSummary(answers) {
  const groups = {
    Mathematics: { correct: 0, total: 10, score: 200, grade: 'D' },
    Science: { correct: 0, total: 10, score: 200, grade: 'D' },
    Language: { correct: 0, total: 10, score: 200, grade: 'D' },
  };

  answers.forEach((answer, index) => {
    if (answer === questions[index].answer) groups[questions[index].category].correct += 1;
  });

  Object.values(groups).forEach((group) => {
    group.score = group.correct === 0 ? 200 : 200 + group.correct * 80;
    group.grade = group.score >= 800 ? 'A' : group.score >= 650 ? 'B' : group.score >= 520 ? 'C' : 'D';
  });

  const correct = Object.values(groups).reduce((sum, group) => sum + group.correct, 0);
  const totalScore = Math.round(Object.values(groups).reduce((sum, group) => sum + group.score, 0) / 3);
  const percent = Math.round((correct / TOTAL) * 1000) / 10;
  const grade = totalScore >= 800 ? 'A' : totalScore >= 650 ? 'B' : totalScore >= 520 ? 'C' : 'D';
  return { groups, correct, totalScore, percent, grade };
}

function App() {
  const [view, setView] = useState('home');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(TOTAL).fill(null));
  const answered = answers.filter((answer) => answer !== null).length;
  const result = useMemo(() => scoreSummary(answers), [answers]);

  const go = (nextView) => {
    setView(nextView);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const restart = () => {
    setAnswers(Array(TOTAL).fill(null));
    setCurrent(0);
    go('quiz');
  };

  if (view === 'home') {
    return (
      <main className="page">
        <section className="card landing-card">
          <Logo />
          <h1 className="tagline">Cari Jurusanmu. Raih Mimpimu.</h1>
          <p className="lead">Ikuti tryout komprehensif untuk menemukan jurusan di Universitas Syiah Kuala yang sesuai dengan kekuatan akademik Anda. Kami akan menganalisis performa Anda dan memberikan prediksi kelayakan jurusan.</p>
          <div className="info-panel">
            <h2>Yang Akan Anda Dapatkan:</h2>
            <ul>
              <li><span>✓</span><p>30 soal tryout mencakup Matematika, Sains, dan Bahasa</p></li>
              <li><span>✓</span><p>Analisis skor detail dan kalkulasi nilai</p></li>
              <li><span>✓</span><p>Prediksi kelayakan jurusan USK yang dipersonalisasi</p></li>
              <li><span>✓</span><p>Estimasi waktu: 20-30 menit</p></li>
            </ul>
          </div>
          <button className="primary-btn home-btn" onClick={() => go('quiz')}>Mulai Tryout <ArrowRight size={38} /></button>
        </section>
      </main>
    );
  }

  if (view === 'quiz') {
    const q = questions[current];
    const progress = ((current + 1) / TOTAL) * 100;
    return (
      <main className="page">
        <section className="card quiz-card">
          <header className="top-row">
            <button className="back" onClick={() => go('home')}><ArrowLeft size={30} /> Back</button>
            <strong>Question {current + 1} of {TOTAL}</strong>
          </header>
          <div className="quiz-meta">
            <span>{q.category}</span>
            <p>{answered} answered</p>
          </div>
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>
          <h1 className="question">{q.text}</h1>
          <div className="options">
            {q.options.map((option, index) => (
              <button key={option} className={`option ${answers[current] === index ? 'selected' : ''}`} onClick={() => {
                const copy = [...answers];
                copy[current] = index;
                setAnswers(copy);
              }}>
                <span className="radio" />
                <b>{option}</b>
              </button>
            ))}
          </div>
          <div className="dual-actions">
            <button className="secondary-btn" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}><ArrowLeft /> Previous</button>
            <button className="primary-btn" onClick={() => current === TOTAL - 1 ? go('review') : setCurrent((value) => value + 1)}>Next <ArrowRight /></button>
          </div>
        </section>
      </main>
    );
  }

  if (view === 'review') {
    return (
      <main className="page">
        <section className="card review-card">
          <h1>Review Your Answers</h1>
          <div className="review-line"><span>Progress</span><b>{answered} / {TOTAL} answered</b></div>
          <div className="progress"><i style={{ width: `${(answered / TOTAL) * 100}%` }} /></div>
          <div className="number-grid">
            {questions.map((_, index) => <button key={index} className={answers[index] !== null ? 'filled' : ''} onClick={() => { setCurrent(index); go('quiz'); }}>{index + 1}</button>)}
          </div>
          <div className="dual-actions review-actions">
            <button className="secondary-btn" onClick={() => { const first = answers.findIndex((answer) => answer === null); setCurrent(first === -1 ? 0 : first); go('quiz'); }}>Continue<br />Answering</button>
            <button className="primary-btn" onClick={() => go('result')}>Submit Test ({answered}/{TOTAL})</button>
          </div>
        </section>
      </main>
    );
  }

  if (view === 'result') {
    return (
      <main className="result-page">
        <section className="card result-card">
          <div className="icon-bubble"><Trophy /></div>
          <h1>Tryout Selesai!</h1>
          <p>Berikut hasil tryout Anda</p>
          <div className="score-hero">
            <span>Skor Total</span>
            <strong>{result.totalScore}</strong>
            <b>Nilai: {result.percent}% · Grade {result.grade}</b>
            <em>{result.totalScore >= 520 ? 'Cukup Baik' : 'Perlu Peningkatan'}</em>
          </div>
          <h2>Rincian Per Subtes</h2>
          <div className="subtests">
            {Object.entries(result.groups).map(([name, group]) => <article key={name}>
              <div className="sub-head"><Award /><h3>{name}</h3><strong>{group.score}</strong><b>{group.grade}</b></div>
              <div className="sub-info"><span>{group.correct} dari 10 benar</span><em>{group.score >= 520 ? 'Cukup Baik' : 'Perlu Peningkatan'}</em></div>
              <div className="mini-progress"><i style={{ width: `${group.correct * 10}%` }} /></div>
            </article>)}
          </div>
        </section>
        <section className="card next-card">
          <LineChart className="green-icon" />
          <div>
            <h2>Langkah Selanjutnya</h2>
            <p>Berdasarkan performa Anda, kami telah menyiapkan prediksi kelayakan jurusan di Universitas Syiah Kuala yang sesuai dengan kekuatan akademik Anda.</p>
          </div>
          <button className="secondary-btn" onClick={restart}>Ulangi Tryout</button>
          <button className="primary-btn" onClick={() => go('prediction')}>Lihat Prediksi<br />Jurusan <ArrowRight /></button>
        </section>
      </main>
    );
  }

  return (
    <main className="prediction-page">
      <section className="card prediction-card">
        <div className="icon-bubble"><GraduationCap /></div>
        <h1>Prediksi Kelayakan Jurusan</h1>
        <p>Universitas Syiah Kuala</p>
        <strong className="score-pill">Skor Total Anda: {result.totalScore}</strong>
        <div className="disclaimer"><b>Disclaimer:</b> Prediksi ini bukan jaminan kelulusan, melainkan estimasi berbasis data untuk membantu siswa menyusun strategi. Kategori dibagi menjadi: <b>Aman</b> (peluang stabil), <b>Realistis</b> (skor cukup kompetitif), dan <b>Ambisius</b> (perlu peningkatan).</div>
        <div className="stats">
          <div className="safe"><CheckCircle2 /><b>2</b><span>Aman</span></div>
          <div className="real"><Target /><b>0</b><span>Realistis</span></div>
          <div className="ambi"><LineChart /><b>0</b><span>Ambisius</span></div>
        </div>
        <h2>Rekomendasi Jurusan</h2>
        <div className="major-list">
          {majors.map((major) => <article key={major.name}>
            <header><CheckCircle2 /><h3>{major.name}</h3><span>Aman</span></header>
            <p className="faculty">{major.faculty}</p>
            <p>{major.desc}</p>
            <div className="min-score"><span>Estimasi Skor Minimum:</span><b>{major.minScore}</b><em>⊙ Perlu {Math.max(0, major.minScore - result.totalScore)} poin lagi untuk mencapai estimasi skor minimum</em></div>
            <p><b>Catatan:</b> {major.note}</p>
            <p>Kelebihan Anda:</p>
            <ul><li>{major.strength}</li></ul>
          </article>)}
        </div>
      </section>
      <section className="card next-steps">
        <h2>Langkah Selanjutnya</h2>
        <ul>
          <li>Riset lebih dalam tentang jurusan yang Anda minati di website resmi USK</li>
          <li>Periksa persyaratan khusus dan jalur masuk untuk setiap jurusan</li>
          <li>Fokus meningkatkan nilai di area yang masih lemah dengan tryout berulang</li>
          <li>Konsultasikan pilihan jurusan dengan guru BK atau orang tua</li>
        </ul>
        <button className="primary-btn" onClick={() => go('home')}><Home size={17} /> Kembali ke Beranda</button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
