export const sections = [
  { code: 'PU', group: 'TPS', name: 'Penalaran Umum', short: 'PU', total: 30, minutes: 30 },
  { code: 'PPU', group: 'TPS', name: 'Pengetahuan dan Pemahaman Umum', short: 'PPU', total: 20, minutes: 15 },
  { code: 'PBM', group: 'TPS', name: 'Pemahaman Bacaan dan Menulis', short: 'PBM', total: 20, minutes: 25 },
  { code: 'PK', group: 'TPS', name: 'Pengetahuan Kuantitatif', short: 'PK', total: 20, minutes: 20 },
  { code: 'LBI', group: 'Literasi', name: 'Literasi Bahasa Indonesia', short: 'LBI', total: 30, minutes: 42.5 },
  { code: 'LBE', group: 'Literasi', name: 'Literasi Bahasa Inggris', short: 'LBE', total: 20, minutes: 20 },
  { code: 'PM', group: 'Literasi', name: 'Penalaran Matematika', short: 'PM', total: 20, minutes: 42.5 },
];

const sectionByCode = Object.fromEntries(sections.map((section) => [section.code, section]));

function optionSet(correct, wrongs, seed) {
  const unique = [correct, ...wrongs].map(String).filter((value, index, arr) => arr.indexOf(value) === index).slice(0, 5);
  while (unique.length < 5) unique.push(String(Number(correct) + unique.length + seed + 1));
  const shift = seed % unique.length;
  const options = [...unique.slice(shift), ...unique.slice(0, shift)];
  return { options, answer: options.indexOf(String(correct)) };
}

function q(section, text, options, answer, skill = 'Penalaran') {
  return { section, text, options, answer, skill };
}

function numberQuestion(section, text, correct, wrongs, seed, skill = 'Numerik') {
  const packed = optionSet(correct, wrongs, seed);
  return q(section, text, packed.options, packed.answer, skill);
}

function makePenalaranUmum() {
  const items = [];
  for (let i = 0; i < 10; i += 1) {
    const start = 3 + i;
    const step = 3 + (i % 5);
    const seq = [start, start + step, start + step * 2, start + step * 3, start + step * 4];
    const correct = start + step * 5;
    items.push(numberQuestion('PU', `Perhatikan pola bilangan berikut: ${seq.join(', ')}, ... Bilangan berikutnya adalah ...`, correct, [correct - step, correct + step, correct + 2 * step, correct - 2 * step], i, 'Penalaran induktif'));
  }

  const syllogisms = [
    ['Semua peserta yang disiplin hadir tepat waktu. Sebagian peserta yang hadir tepat waktu membawa kartu ujian.', 'Sebagian peserta yang membawa kartu ujian mungkin peserta yang disiplin.'],
    ['Semua data valid dapat digunakan untuk analisis. Tidak ada data rusak yang valid.', 'Data rusak tidak dapat digunakan sebagai data valid untuk analisis.'],
    ['Jika latihan konsisten, peluang nilai meningkat. Andi berlatih konsisten.', 'Peluang nilai Andi meningkat.'],
    ['Semua bacaan argumentatif memiliki klaim. Beberapa teks ujian adalah bacaan argumentatif.', 'Beberapa teks ujian memiliki klaim.'],
    ['Tidak ada keputusan rasional yang dibuat tanpa alasan. Semua pilihan program studi yang baik bersifat rasional.', 'Pilihan program studi yang baik memiliki alasan.'],
    ['Semua mahasiswa lulus administrasi memiliki nomor peserta. Raka tidak memiliki nomor peserta.', 'Raka belum tentu lulus administrasi.'],
    ['Jika kuota kecil dan peminat tinggi, persaingan ketat. Program A memiliki kuota kecil dan peminat tinggi.', 'Persaingan Program A ketat.'],
    ['Semua kesimpulan kuat didukung bukti. Pernyataan B tidak didukung bukti.', 'Pernyataan B bukan kesimpulan kuat.'],
    ['Setiap argumen valid memiliki struktur logis. Sebagian struktur logis mudah dipahami.', 'Sebagian argumen valid mungkin mudah dipahami.'],
    ['Jika skor naik, strategi belajar efektif. Skor Nina naik setelah mengganti strategi.', 'Strategi baru Nina mungkin efektif.'],
  ];
  syllogisms.forEach(([premise, correct], i) => {
    const options = [
      correct,
      'Kesimpulan tidak dapat dibuat sama sekali dari premis tersebut.',
      'Semua subjek dalam premis pasti memiliki sifat yang sama.',
      'Premis pertama selalu salah karena terlalu umum.',
      'Kesimpulan yang benar harus bertentangan dengan premis.',
    ];
    const shift = (i + 1) % options.length;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    items.push(q('PU', `${premise} Kesimpulan yang paling tepat adalah ...`, rotated, rotated.indexOf(correct), 'Penalaran deduktif'));
  });

  for (let i = 0; i < 10; i += 1) {
    const total = 120 + i * 15;
    const percent = 20 + (i % 4) * 5;
    const correct = Math.round((total * percent) / 100);
    items.push(numberQuestion('PU', `Dalam sebuah simulasi, ${percent}% dari ${total} peserta menyelesaikan bagian Penalaran Umum sebelum waktu habis. Banyak peserta tersebut adalah ...`, correct, [correct + 5, correct - 5, Math.round(total / percent), percent + total / 10], i + 20, 'Penalaran kuantitatif'));
  }
  return items;
}

function makePPU() {
  const vocab = [
    ['implikasi', 'akibat logis'], ['valid', 'sahih'], ['relevan', 'berkaitan'], ['inferensi', 'simpulan'], ['objektif', 'tidak memihak'],
    ['efisien', 'hemat sumber daya'], ['akurat', 'tepat'], ['konsisten', 'tetap selaras'], ['signifikan', 'bermakna'], ['komprehensif', 'menyeluruh'],
  ];
  const items = vocab.map(([word, correct], i) => {
    const options = [correct, 'berlawanan', 'sementara', 'tidak terukur', 'tanpa dasar'];
    const shift = i % 5;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    return q('PPU', `Makna kata "${word}" yang paling sesuai dalam konteks akademik adalah ...`, rotated, rotated.indexOf(correct), 'Kosakata akademik');
  });

  const logicSentences = [
    ['Pemerintah memperluas akses pendidikan tinggi; ..., kualitas pembelajaran tetap harus dijaga.', 'meskipun demikian'],
    ['Data peminat meningkat tajam; ..., daya tampung tidak berubah signifikan.', 'sementara itu'],
    ['Siswa perlu membaca soal secara teliti; ..., kesalahan kecil dapat mengubah jawaban.', 'sebab'],
    ['Tryout bukan penentu kelulusan; ..., tryout berguna untuk mengukur kesiapan.', 'namun'],
    ['Nilai kuantitatif Rani baik; ..., ia masih perlu memperkuat literasi bahasa Inggris.', 'di sisi lain'],
    ['Pilihan jurusan harus realistis; ..., minat pribadi tetap penting dipertimbangkan.', 'selain itu'],
    ['Persaingan prodi kedokteran sangat ketat; ..., target skor harus lebih tinggi.', 'oleh karena itu'],
    ['Latihan singkat setiap hari lebih efektif; ..., dilakukan secara konsisten.', 'apabila'],
    ['Skor total cukup tinggi; ..., subtes tertentu masih berada di bawah standar.', 'akan tetapi'],
    ['Informasi daya tampung tersedia di portal resmi; ..., calon peserta sebaiknya mengeceknya langsung.', 'karena itu'],
  ];
  logicSentences.forEach(([sentence, correct], i) => {
    const options = [correct, 'seandainya', 'padahal tidak', 'tanpa sebab', 'alih-alih'];
    const shift = (i + 2) % 5;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    items.push(q('PPU', `Konjungsi yang paling tepat untuk melengkapi kalimat berikut adalah: ${sentence}`, rotated, rotated.indexOf(correct), 'Kohesi kalimat'));
  });
  return items;
}

function makePBM() {
  const items = [];
  const stems = [
    ['Para siswa harus mempersiapkan UTBK dengan jadwal yang realistis dan evaluasi yang rutin.', 'Para siswa harus mempersiapkan UTBK dengan jadwal realistis dan evaluasi rutin.'],
    ['Hasil tryout yang rendah bukanlah akhir dari proses belajar, melainkan petunjuk area yang perlu diperbaiki.', 'Hasil tryout yang rendah bukan akhir proses belajar, melainkan petunjuk area yang perlu diperbaiki.'],
    ['Pemilihan jurusan yang tepat membutuhkan pertimbangan minat, kemampuan, peluang, dan biaya studi.', 'Pemilihan jurusan yang tepat membutuhkan pertimbangan minat, kemampuan, peluang, dan biaya studi.'],
    ['Siswa yang membaca teks secara aktif biasanya lebih mampu menemukan gagasan utama dan hubungan antarparagraf.', 'Siswa yang membaca teks secara aktif biasanya lebih mampu menemukan gagasan utama dan hubungan antarparagraf.'],
    ['Strategi belajar perlu disesuaikan setelah siswa mengetahui kelemahan pada setiap subtes.', 'Strategi belajar perlu disesuaikan setelah siswa mengetahui kelemahan setiap subtes.'],
  ];
  stems.forEach(([base, correct], i) => {
    const options = [correct, base.replace('dan', 'tetapi'), base.replace('UTBK', 'utbk'), base.replace('yang', 'dimana'), `${base} Oleh karena itu.`];
    const shift = i % 5;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    items.push(q('PBM', `Pilih perbaikan kalimat yang paling efektif: "${base}"`, rotated, rotated.indexOf(correct), 'Efektivitas kalimat'));
  });

  const paragraph = 'Belajar untuk UTBK tidak cukup dilakukan dengan menghafal rumus. Peserta perlu memahami pola soal, mengatur waktu, dan mengevaluasi kesalahan. Evaluasi membuat latihan berikutnya lebih terarah karena siswa mengetahui bagian yang lemah.';
  const pQuestions = [
    ['Gagasan utama paragraf tersebut adalah ...', 'Persiapan UTBK membutuhkan pemahaman pola, manajemen waktu, dan evaluasi.'],
    ['Kalimat ketiga berfungsi untuk ...', 'menjelaskan manfaat evaluasi dalam proses latihan.'],
    ['Kata "terarah" dalam paragraf berarti ...', 'memiliki tujuan yang jelas.'],
    ['Sikap penulis terhadap hafalan rumus adalah ...', 'menganggapnya belum cukup sebagai strategi tunggal.'],
    ['Informasi yang sesuai dengan paragraf adalah ...', 'evaluasi membantu siswa mengetahui kelemahannya.'],
  ];
  pQuestions.forEach(([ask, correct], i) => {
    const options = [correct, 'UTBK hanya menilai kemampuan menghafal.', 'Latihan tidak perlu dievaluasi jika dilakukan rutin.', 'Manajemen waktu tidak berpengaruh dalam ujian.', 'Semua subtes dapat dikuasai tanpa memahami pola soal.'];
    const shift = (i + 2) % 5;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    items.push(q('PBM', `${paragraph}\n\n${ask}`, rotated, rotated.indexOf(correct), 'Memahami bacaan'));
  });

  const corrections = [
    ['di analisis', 'dianalisis'], ['ke efektifan', 'keefektifan'], ['antar paragraf', 'antarparagraf'], ['di bandingkan', 'dibandingkan'], ['memengaruhi', 'memengaruhi'],
    ['resiko', 'risiko'], ['praktik', 'praktik'], ['sekedar', 'sekadar'], ['komplek', 'kompleks'], ['obyektif', 'objektif'],
  ];
  corrections.forEach(([wrong, correct], i) => {
    const options = [correct, wrong, correct.toUpperCase(), `${correct}-nya`, `${wrong}kan`];
    const shift = (i + 3) % 5;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    items.push(q('PBM', `Bentuk baku dari kata/ungkapan "${wrong}" adalah ...`, rotated, rotated.indexOf(correct), 'Kebakuan bahasa'));
  });
  return items.slice(0, 20);
}

function makePK() {
  const items = [];
  for (let i = 0; i < 5; i += 1) {
    const a = 2 + i;
    const b = 7 + i;
    const x = 3 + i;
    const c = a * x + b;
    items.push(numberQuestion('PK', `Jika ${a}x + ${b} = ${c}, nilai x adalah ...`, x, [x + 1, x - 1, a + b, c - a], i, 'Aljabar dasar'));
  }
  for (let i = 0; i < 5; i += 1) {
    const length = 12 + i * 2;
    const width = 8 + i;
    const correct = length * width;
    items.push(numberQuestion('PK', `Sebuah persegi panjang memiliki panjang ${length} cm dan lebar ${width} cm. Luasnya adalah ... cm²`, correct, [2 * (length + width), correct + length, correct - width, length + width], i + 5, 'Geometri'));
  }
  for (let i = 0; i < 5; i += 1) {
    const values = [60 + i * 2, 70 + i * 2, 75 + i, 80 + i, 85 + i];
    const correct = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    items.push(numberQuestion('PK', `Rata-rata dari data ${values.join(', ')} adalah ...`, correct, [correct - 3, correct + 3, correct + 5, values[2]], i + 10, 'Statistika'));
  }
  for (let i = 0; i < 5; i += 1) {
    const price = 80000 + i * 10000;
    const discount = 10 + i * 5;
    const correct = price - Math.round((price * discount) / 100);
    items.push(numberQuestion('PK', `Harga sebuah buku Rp${price.toLocaleString('id-ID')} mendapat diskon ${discount}%. Harga setelah diskon adalah ...`, correct, [price + discount * 1000, price - discount * 1000, Math.round(price * discount / 100), correct + 5000], i + 15, 'Persentase'));
  }
  return items;
}

function makeLBI() {
  const texts = [
    'Perubahan iklim meningkatkan frekuensi cuaca ekstrem di banyak wilayah. Dampaknya tidak hanya dirasakan sektor lingkungan, tetapi juga pertanian, kesehatan, dan ekonomi rumah tangga. Karena itu, kebijakan adaptasi perlu dirancang dengan mempertimbangkan kondisi lokal.',
    'Literasi digital tidak cukup dipahami sebagai kemampuan memakai perangkat. Seseorang yang literat digital mampu menilai kredibilitas informasi, menjaga keamanan data, dan menggunakan teknologi secara etis.',
    'Kota yang ramah pejalan kaki biasanya memiliki transportasi publik yang terhubung baik, trotoar aman, dan ruang terbuka. Desain semacam itu mendorong warga bergerak aktif sekaligus menurunkan ketergantungan pada kendaraan pribadi.',
    'Pendidikan tinggi bukan hanya tempat memperoleh gelar. Kampus idealnya menjadi ruang untuk menguji gagasan, membangun jejaring, dan melatih kemampuan menyelesaikan masalah kompleks.',
    'Pengelolaan sampah harus dimulai dari sumbernya. Pemilahan di rumah, pengurangan plastik sekali pakai, dan kompos skala kecil dapat menurunkan beban tempat pembuangan akhir.',
  ];
  const asks = [
    ['Gagasan utama teks adalah ...', 'inti persoalan dan solusi umum yang dibahas dalam teks.'],
    ['Kesimpulan yang paling tepat adalah ...', 'masalah dalam teks membutuhkan tindakan yang terencana dan kontekstual.'],
    ['Sikap penulis dalam teks cenderung ...', 'analitis dan memberi rekomendasi.'],
    ['Informasi tersirat dari teks adalah ...', 'perubahan perilaku atau kebijakan diperlukan untuk mengatasi masalah.'],
    ['Kata kunci yang paling mewakili teks adalah ...', 'adaptasi, evaluasi, dan keberlanjutan.'],
    ['Tujuan penulis adalah ...', 'menjelaskan persoalan serta pentingnya respons yang tepat.'],
  ];
  const items = [];
  texts.forEach((text, t) => {
    asks.forEach(([ask, correct], a) => {
      const options = [correct, 'menolak seluruh perubahan sosial yang terjadi.', 'membuktikan bahwa teknologi selalu merugikan.', 'menjelaskan sejarah panjang suatu kerajaan.', 'mengajak pembaca mengabaikan data.'];
      const shift = (t + a) % 5;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      items.push(q('LBI', `${text}\n\n${ask}`, rotated, rotated.indexOf(correct), 'Literasi teks Indonesia'));
    });
  });
  return items.slice(0, 30);
}

function makeLBE() {
  const texts = [
    'Many universities encourage students to work in interdisciplinary teams. This approach helps students understand that complex problems rarely belong to a single field. It also trains them to communicate with people who use different methods and assumptions.',
    'Online learning can increase access to education, but access alone does not guarantee meaningful learning. Students still need feedback, motivation, and opportunities to apply what they learn in realistic contexts.',
    'A city that invests in public transportation may reduce traffic congestion and air pollution. However, the system must be reliable and affordable so that people are willing to use it regularly.',
    'Scientific claims should be evaluated based on evidence, not popularity. A claim repeated by many people can still be wrong if it is not supported by valid data.',
  ];
  const asks = [
    ['What is the main idea of the passage?', 'The passage explains an issue and the conditions needed to address it effectively.'],
    ['The word "reliable" is closest in meaning to ...', 'dependable'],
    ['What can be inferred from the passage?', 'A good solution requires more than a single simple factor.'],
    ['The author would most likely agree that ...', 'evidence and context are important in making decisions.'],
    ['The tone of the passage is ...', 'informative and analytical'],
  ];
  const items = [];
  texts.forEach((text, t) => {
    asks.forEach(([ask, correct], a) => {
      const options = [correct, 'emotional and hostile', 'education is never effective', 'data should be ignored', 'a single field can solve every problem'];
      const shift = (t + a + 1) % 5;
      const rotated = [...options.slice(shift), ...options.slice(0, shift)];
      items.push(q('LBE', `${text}\n\n${ask}`, rotated, rotated.indexOf(correct), 'English literacy'));
    });
  });
  return items.slice(0, 20);
}

function makePM() {
  const items = [];
  for (let i = 0; i < 5; i += 1) {
    const base = 40 + i * 5;
    const growth = 8 + i;
    const month = 4;
    const correct = base + growth * month;
    items.push(numberQuestion('PM', `Jumlah peserta bimbingan belajar adalah ${base} orang pada bulan pertama dan bertambah tetap ${growth} orang setiap bulan. Jumlah peserta pada bulan ke-${month + 1} adalah ...`, correct, [correct - growth, correct + growth, base * month, base + growth], i, 'Barisan aritmetika kontekstual'));
  }
  for (let i = 0; i < 5; i += 1) {
    const total = 200 + i * 40;
    const a = 35 + i * 3;
    const b = 25 + i * 2;
    const both = 10 + i;
    const correct = a + b - both;
    items.push(numberQuestion('PM', `Dari ${total} siswa, ${a} siswa mengikuti klub matematika, ${b} siswa mengikuti klub bahasa, dan ${both} siswa mengikuti keduanya. Banyak siswa yang mengikuti setidaknya satu klub adalah ...`, correct, [a + b, total - correct, correct + both, a - b + both], i + 5, 'Himpunan'));
  }
  for (let i = 0; i < 5; i += 1) {
    const distance = 120 + i * 30;
    const speed = 40 + i * 5;
    const correct = distance / speed;
    items.push(numberQuestion('PM', `Sebuah bus menempuh jarak ${distance} km dengan kecepatan rata-rata ${speed} km/jam. Waktu tempuhnya adalah ... jam`, correct, [correct + 1, Math.max(1, correct - 1), distance + speed, distance - speed], i + 10, 'Laju dan perbandingan'));
  }
  for (let i = 0; i < 5; i += 1) {
    const x = i + 2;
    const correct = 2 * x * x + 3 * x + 1;
    items.push(numberQuestion('PM', `Jika f(x) = 2x² + 3x + 1, nilai f(${x}) adalah ...`, correct, [correct + 2, correct - 2, x * x + 3, 2 * x + 4], i + 15, 'Fungsi kuadrat'));
  }
  return items;
}

export const questions = [
  ...makePenalaranUmum(),
  ...makePPU(),
  ...makePBM(),
  ...makePK(),
  ...makeLBI(),
  ...makeLBE(),
  ...makePM(),
];

export const programs = [
  { name: 'Pendidikan Dokter', faculty: 'Fakultas Kedokteran', capacity: 88, applicants: 1882, target: 735, cluster: 'Saintek Kesehatan' },
  { name: 'Farmasi', faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam', capacity: 32, applicants: 1406, target: 720, cluster: 'Saintek Kesehatan' },
  { name: 'Pendidikan Dokter Gigi', faculty: 'Fakultas Kedokteran Gigi', capacity: 35, applicants: 969, target: 715, cluster: 'Saintek Kesehatan' },
  { name: 'Informatika', faculty: 'Fakultas Matematika dan Ilmu Pengetahuan Alam', capacity: 42, applicants: 1295, target: 705, cluster: 'Saintek Teknologi' },
  { name: 'Psikologi', faculty: 'Fakultas Kedokteran', capacity: 28, applicants: 700, target: 690, cluster: 'Soshum' },
  { name: 'Teknik Pertambangan', faculty: 'Fakultas Teknik', capacity: 42, applicants: 966, target: 685, cluster: 'Saintek Teknologi' },
  { name: 'Manajemen', faculty: 'Fakultas Ekonomi dan Bisnis', capacity: 70, applicants: 1306, target: 675, cluster: 'Soshum Ekonomi' },
  { name: 'Teknik Komputer', faculty: 'Fakultas Teknik', capacity: 56, applicants: 891, target: 665, cluster: 'Saintek Teknologi' },
  { name: 'Ilmu Hukum', faculty: 'Fakultas Hukum', capacity: 196, applicants: 1826, target: 650, cluster: 'Soshum Hukum' },
  { name: 'Ilmu Komunikasi', faculty: 'Fakultas Ilmu Sosial dan Ilmu Politik', capacity: 63, applicants: 780, target: 645, cluster: 'Soshum' },
  { name: 'Akuntansi', faculty: 'Fakultas Ekonomi dan Bisnis', capacity: 70, applicants: 863, target: 635, cluster: 'Soshum Ekonomi' },
  { name: 'Ilmu Keperawatan', faculty: 'Fakultas Keperawatan', capacity: 126, applicants: 1299, target: 630, cluster: 'Saintek Kesehatan' },
  { name: 'Teknik Sipil', faculty: 'Fakultas Teknik', capacity: 98, applicants: 736, target: 620, cluster: 'Saintek Teknologi' },
  { name: 'Bimbingan Konseling', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan', capacity: 53, applicants: 1071, target: 620, cluster: 'Pendidikan' },
  { name: 'PGSD', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan', capacity: 81, applicants: 1066, target: 610, cluster: 'Pendidikan' },
  { name: 'Ekonomi Pembangunan', faculty: 'Fakultas Ekonomi dan Bisnis', capacity: 56, applicants: 397, target: 585, cluster: 'Soshum Ekonomi' },
  { name: 'Pendidikan Bahasa Inggris', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan', capacity: 56, applicants: 471, target: 580, cluster: 'Pendidikan' },
  { name: 'Pendidikan Bahasa Indonesia', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan', capacity: 56, applicants: 453, target: 570, cluster: 'Pendidikan' },
  { name: 'Pendidikan Matematika', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan', capacity: 42, applicants: 186, target: 555, cluster: 'Pendidikan' },
  { name: 'Pendidikan Fisika', faculty: 'Fakultas Keguruan dan Ilmu Pendidikan', capacity: 42, applicants: 53, target: 520, cluster: 'Pendidikan' },
];

export function calculateScores(answers) {
  const groups = Object.fromEntries(sections.map((section) => [section.code, { section, correct: 0, total: section.total, score: 200, grade: 'D' }]));
  answers.forEach((answer, index) => {
    const question = questions[index];
    if (question && answer === question.answer) groups[question.section].correct += 1;
  });
  Object.values(groups).forEach((group) => {
    const ratio = group.correct / group.total;
    group.score = Math.round(200 + ratio * 600);
    group.grade = group.score >= 750 ? 'A' : group.score >= 650 ? 'B' : group.score >= 550 ? 'C' : 'D';
  });
  const correct = Object.values(groups).reduce((sum, group) => sum + group.correct, 0);
  const totalScore = Math.round(Object.values(groups).reduce((sum, group) => sum + group.score * group.total, 0) / questions.length);
  const percent = Math.round((correct / questions.length) * 1000) / 10;
  const grade = totalScore >= 750 ? 'A' : totalScore >= 650 ? 'B' : totalScore >= 550 ? 'C' : 'D';
  return { groups, correct, totalScore, percent, grade };
}

export function classify(score, target) {
  const gap = score - target;
  if (gap >= 25) return { label: 'Aman', tone: 'safe', note: 'Di atas standar target internal.' };
  if (gap >= -30) return { label: 'Realistis', tone: 'real', note: 'Masuk zona kompetitif, tetap perlu jaga performa.' };
  if (gap >= -90) return { label: 'Ambisius', tone: 'ambi', note: 'Masih mungkin, tetapi butuh peningkatan signifikan.' };
  return { label: 'Berat', tone: 'hard', note: 'Butuh lompatan skor besar atau pilihan cadangan.' };
}

export function getPredictions(score) {
  return programs.map((program) => {
    const status = classify(score, program.target);
    const gap = score - program.target;
    const tightness = program.applicants && program.capacity ? Math.round((program.applicants / program.capacity) * 10) / 10 : null;
    return { ...program, ...status, gap, tightness };
  }).sort((a, b) => {
    const rank = { Aman: 0, Realistis: 1, Ambisius: 2, Berat: 3 };
    return rank[a.label] - rank[b.label] || Math.abs(b.gap) - Math.abs(a.gap);
  });
}

export function sectionOfQuestion(index) {
  return sectionByCode[questions[index]?.section] || sections[0];
}
