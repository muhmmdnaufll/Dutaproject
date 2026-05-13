import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Clock3, GraduationCap, Home, LineChart, Target, Trophy } from 'lucide-react';
import { calculateScores, getPredictions, questions, sectionOfQuestion, sections } from './examData.js';

const TOTAL = questions.length;
const TOTAL_MINUTES = sections.reduce((sum, section) => sum + section.minutes, 0);

function Logo() {
  return <div className="brand-logo" aria-label="Anak Kandung USK untuk Masa Depan Aceh"><div className="brand-mark"><GraduationCap size={66} strokeWidth={1.8} /><div className="book-lines"><span /><span /><span /></div><strong>USK</strong><small>MAJORMATCH</small></div></div>;
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
}

function SectionGrid() {
  return <div className="section-grid">{sections.map((section) => <div key={section.code}><b>{section.short}</b><span>{section.total} soal</span><small>{section.minutes} menit</small></div>)}</div>;
}

export default function App() {
  const [view, setView] = useState('home');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(TOTAL).fill(null));
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const answered = answers.filter((answer) => answer !== null).length;
  const result = useMemo(() => calculateScores(answers), [answers]);
  const predictions = useMemo(() => getPredictions(result.totalScore), [result.totalScore]);
  const remainingSeconds = startedAt ? Math.max(0, Math.round(TOTAL_MINUTES * 60 - (now - startedAt) / 1000)) : Math.round(TOTAL_MINUTES * 60);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (startedAt && remainingSeconds <= 0 && view === 'quiz') setView('review');
  }, [remainingSeconds, startedAt, view]);

  const go = (nextView) => {
    setView(nextView);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };
  const startTryout = () => { setStartedAt(Date.now()); setCurrent(0); go('quiz'); };
  const restart = () => { setAnswers(Array(TOTAL).fill(null)); setCurrent(0); setStartedAt(Date.now()); go('quiz'); };

  if (view === 'home') return <main className="page"><section className="card landing-card"><Logo /><h1 className="tagline">USK MajorMatch.</h1><p className="lead">Kerjakan tryout UTBK-SNBT: TPS, Literasi Bahasa Indonesia, Literasi Bahasa Inggris, dan Penalaran Matematika. Sistem menghitung estimasi skor 200-800, membaca kekuatan subtes, lalu menampilkan peta kelayakan jurusan USK berdasarkan target kompetitif.</p><div className="info-panel"><h2>Struktur Tryout</h2><ul><li><span>✓</span><p>{TOTAL} soal UTBK-SNBT 2026</p></li><li><span>✓</span><p>Durasi simulasi {TOTAL_MINUTES} menit dengan timer</p></li><li><span>✓</span><p>7 subtes: PU, PPU, PBM, PK, LBI, LBE, dan PM</p></li><li><span>✓</span><p>Peta jurusan memakai target skor, rasio persaingan, dan kategori Aman/Realistis/Ambisius/Berat</p></li></ul><SectionGrid /></div><button className="primary-btn home-btn" onClick={startTryout}>Mulai Tryout <ArrowRight size={38} /></button></section></main>;

  if (view === 'quiz') {
    const q = questions[current];
    const section = sectionOfQuestion(current);
    const progress = ((current + 1) / TOTAL) * 100;
    return <main className="page exam-page"><section className="card quiz-card exam-card"><header className="top-row exam-top"><button className="back" onClick={() => go('home')}><ArrowLeft size={30} /> Back</button><strong>Question {current + 1} of {TOTAL}</strong></header><div className="timer-line"><Clock3 size={20} /> Sisa waktu simulasi: <b>{formatTime(remainingSeconds)}</b></div><div className="quiz-meta"><span>{section.name}</span><p>{answered} answered</p></div><div className="progress"><i style={{ width: `${progress}%` }} /></div><div className="skill-line"><b>{section.group}</b><span>{q.skill}</span></div><h1 className="question">{q.text}</h1><div className="options">{q.options.map((option, index) => <button key={`${current}-${index}`} className={`option ${answers[current] === index ? 'selected' : ''}`} onClick={() => { const copy = [...answers]; copy[current] = index; setAnswers(copy); }}><span className="radio" /><b>{option}</b></button>)}</div><div className="dual-actions"><button className="secondary-btn" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}><ArrowLeft /> Previous</button><button className="primary-btn" onClick={() => current === TOTAL - 1 ? go('review') : setCurrent((value) => value + 1)}>{current === TOTAL - 1 ? 'Review' : 'Next'} <ArrowRight /></button></div></section></main>;
  }

  if (view === 'review') return <main className="page review-page"><section className="card review-card exam-review-card"><h1>Review Your Answers</h1><div className="review-line"><span>Progress</span><b>{answered} / {TOTAL} answered</b></div><div className="progress"><i style={{ width: `${(answered / TOTAL) * 100}%` }} /></div><div className="review-section-summary">{sections.map((section) => { const indexes = questions.map((question, index) => question.section === section.code ? index : -1).filter((index) => index >= 0); const done = indexes.filter((index) => answers[index] !== null).length; return <span key={section.code}>{section.short}: <b>{done}/{section.total}</b></span>; })}</div><div className="number-grid exam-number-grid">{questions.map((question, index) => <button key={index} title={`${index + 1}. ${sectionOfQuestion(index).name}`} className={answers[index] !== null ? 'filled' : ''} onClick={() => { setCurrent(index); go('quiz'); }}>{index + 1}</button>)}</div><div className="dual-actions review-actions"><button className="secondary-btn" onClick={() => { const first = answers.findIndex((answer) => answer === null); setCurrent(first === -1 ? 0 : first); go('quiz'); }}>Continue<br />Answering</button><button className="primary-btn" onClick={() => go('result')}>Submit Test ({answered}/{TOTAL})</button></div></section></main>;

  if (view === 'result') return <main className="result-page serious-result-page"><section className="card result-card serious-result-card"><div className="icon-bubble"><Trophy /></div><h1>Tryout UTBK Selesai!</h1><p>Berikut estimasi performa UTBK-SNBT Anda</p><div className="score-hero"><span>Estimasi Skor UTBK</span><strong>{result.totalScore}</strong><b>Akurasi latihan: {result.percent}% · Grade {result.grade}</b><em>{result.totalScore >= 650 ? 'Kompetitif' : result.totalScore >= 550 ? 'Cukup, perlu penguatan' : 'Perlu penguatan lanjutan'}</em></div><h2>Rincian Per Subtes</h2><div className="subtests serious-subtests">{Object.entries(result.groups).map(([code, group]) => <article key={code}><div className="sub-head"><Award /><h3>{group.section.name}</h3><strong>{group.score}</strong><b>{group.grade}</b></div><div className="sub-info"><span>{group.correct} dari {group.total} benar</span><em>{group.score >= 650 ? 'Kuat' : group.score >= 550 ? 'Cukup' : 'Lemah'}</em></div><div className="mini-progress"><i style={{ width: `${(group.correct / group.total) * 100}%` }} /></div></article>)}</div></section><section className="card next-card standards-card"><LineChart className="green-icon" /><div><h2>Analisis Jurusan</h2><p>Peta jurusan disusun dari estimasi skor, target kompetitif, rasio daya tampung/peminat, dan tingkat selektivitas program studi.</p></div><button className="secondary-btn" onClick={restart}>Ulangi Tryout</button><button className="primary-btn" onClick={() => go('prediction')}>Lihat Prediksi<br />Jurusan <ArrowRight /></button></section></main>;

  const counts = predictions.reduce((acc, item) => ({ ...acc, [item.label]: (acc[item.label] || 0) + 1 }), {});
  const recommended = predictions.slice(0, 8);
  return <main className="prediction-page serious-prediction-page"><section className="card prediction-card serious-prediction-card"><div className="icon-bubble"><GraduationCap /></div><h1>Prediksi Kelayakan Jurusan</h1><p>Universitas Syiah Kuala</p><strong className="score-pill">Estimasi Skor UTBK Anda: {result.totalScore}</strong><div className="disclaimer"><b>Ringkasan penilaian:</b> Kategori kelayakan dibagi menjadi <b>Aman</b> bila skor berada di atas target, <b>Realistis</b> bila dekat target, <b>Ambisius</b> bila masih perlu peningkatan besar, dan <b>Berat</b> bila gap skor sangat jauh.</div><div className="stats serious-stats"><div className="safe"><CheckCircle2 /><b>{counts.Aman || 0}</b><span>Aman</span></div><div className="real"><Target /><b>{counts.Realistis || 0}</b><span>Realistis</span></div><div className="ambi"><LineChart /><b>{counts.Ambisius || 0}</b><span>Ambisius</span></div><div className="hard"><Award /><b>{counts.Berat || 0}</b><span>Berat</span></div></div><h2>Rekomendasi Jurusan</h2><div className="major-list serious-major-list">{recommended.map((major) => <article key={major.name} className={`major-${major.tone}`}><header><CheckCircle2 /><h3>{major.name}</h3><span>{major.label}</span></header><p className="faculty">{major.faculty}</p><p>{major.cluster} · Rasio persaingan ± {major.tightness} peminat/kursi</p><div className="min-score"><span>Target Skor Kompetitif:</span><b>{major.target}</b><em>{major.gap >= 0 ? `Surplus ${major.gap} poin dari target` : `Perlu ${Math.abs(major.gap)} poin lagi untuk mendekati target`}</em></div><p><b>Catatan:</b> {major.note}</p><p>Kapasitas/peminat acuan:</p><ul><li>{major.capacity} kursi · {major.applicants} peminat sebagai indikator selektivitas.</li></ul></article>)}</div></section><section className="card next-steps serious-next-steps"><h2>Strategi Lanjutan</h2><ul><li>Targetkan subtes di bawah 550 terlebih dahulu karena paling menahan skor total.</li><li>Untuk jurusan kompetitif, jadikan skor target +25 sebagai batas aman internal.</li><li>Ambil minimal satu pilihan realistis atau aman agar strategi tidak terlalu berisiko.</li><li>Ulangi tryout penuh setelah 7-10 hari latihan terarah.</li></ul><button className="primary-btn" onClick={() => go('home')}><Home size={17} /> Kembali ke Beranda</button></section></main>;
}
