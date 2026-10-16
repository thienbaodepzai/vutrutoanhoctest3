import { Question, Grade } from '../types/mathverse';

// Helper: Tìm ước chung lớn nhất (UCLN)
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Helper: Rút gọn phân số về dạng chuỗi "a/b" hoặc "a" nếu mẫu = 1
function formatFraction(num: number, den: number): string {
  if (den === 0) return '0';
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const common = gcd(num, den);
  num = num / common;
  den = den / common;
  if (den === 1) return `${num}`;
  return `${num}/${den}`;
}

// Helper: Random số nguyên trong đoạn [min, max]
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: Xáo trộn mảng
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper: Chuyển số sang chữ số mũ unicode
export function toSuperscript(num: number | string): string {
  const map: Record<string, string> = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '+': '⁺',
    '-': '⁻',
    'm': 'ᵐ',
    'n': 'ⁿ',
  };
  return String(num)
    .split('')
    .map((c) => map[c] || c)
    .join('');
}

/**
 * 1. Phân loại loại bài toán dựa vào nội dung và metadata của câu hỏi gốc
 */
export type QuestionPattern =
  | 'fraction_add_sub'
  | 'fraction_equation'
  | 'linear_equation'
  | 'powers_exponents'
  | 'integer_arithmetic'
  | 'pythagoras'
  | 'rhombus_trapezoid_area'
  | 'ratio_proportion'
  | 'general_topic';

export function detectQuestionPattern(qText: string, topic: string, subtopic?: string): QuestionPattern {
  const text = (qText + ' ' + (subtopic || '') + ' ' + topic).toLowerCase();

  // 1. Lũy thừa (Powers & Exponents) - ĐẶC BIỆT ƯU TIÊN KIỂM TRA TRƯỚC SỐ NGUYÊN
  if (
    text.includes('lũy thừa') ||
    text.includes('số mũ') ||
    text.includes('cùng cơ số') ||
    text.includes('cơ số') ||
    text.includes('aᵐ') ||
    text.includes('aⁿ') ||
    text.includes('2³') ||
    text.includes('2⁴') ||
    text.includes('²') ||
    text.includes('³') ||
    text.includes('⁴') ||
    text.includes('⁵') ||
    text.includes('⁶') ||
    text.includes('⁷') ||
    text.includes('⁸') ||
    text.includes('⁹') ||
    text.includes('^')
  ) {
    return 'powers_exponents';
  }

  // 2. Phân số bằng nhau / tìm x phân số
  if (text.includes('phân số bằng nhau') || (text.includes('tìm x') && text.includes('/'))) {
    return 'fraction_equation';
  }

  // 3. Phân số (cộng trừ quy đồng)
  if (text.includes('phân số') || text.includes('quy đồng') || (text.includes('/') && (text.includes('+') || text.includes('-')))) {
    return 'fraction_add_sub';
  }

  // 4. Định lý Pythagore / Tam giác vuông
  if (text.includes('pythagore') || text.includes('tam giác vuông') || text.includes('cạnh huyền')) {
    return 'pythagoras';
  }

  // 5. Hình học (Hình thoi / Hình thang / Chu vi / Diện tích)
  if (text.includes('hình thoi') || text.includes('hình thang') || (text.includes('diện tích') && text.includes('đường chéo'))) {
    return 'rhombus_trapezoid_area';
  }

  // 6. Dãy tỉ số bằng nhau / tỉ lệ
  if (text.includes('tỉ số') || text.includes('tỉ lệ') || text.includes('dãy tỉ số')) {
    return 'ratio_proportion';
  }

  // 7. Đại số / Tìm x / Phương trình bậc nhất
  if (text.includes('tìm x') || text.includes('phương trình') || text.includes('chuyển vế')) {
    return 'linear_equation';
  }

  // 8. Số nguyên (Cộng, trừ, nhân số nguyên - KHÔNG chứa lũy thừa)
  if (text.includes('số nguyên') || text.includes('thực hiện phép tính') || text.includes('âm') || text.includes('dương')) {
    return 'integer_arithmetic';
  }

  return 'general_topic';
}

/**
 * 2. Bộ sinh câu hỏi tương tự theo từng template toán học
 */

// Sinh bài toán cộng/trừ phân số tương tự (VD: 5/6 + 1/3 -> 7/8 + 1/4, 4/5 + 1/10...)
function generateFractionAddSub(grade: Grade = 6): Question {
  const isAdd = Math.random() > 0.3; // 70% cộng, 30% trừ
  const pairs = [
    { b: 8, d: 4 },
    { b: 6, d: 3 },
    { b: 10, d: 5 },
    { b: 12, d: 4 },
    { b: 12, d: 6 },
    { b: 15, d: 5 },
    { b: 7, d: 7 },
    { b: 9, d: 3 },
  ];
  const pair = pairs[randomInt(0, pairs.length - 1)];
  const b = pair.b;
  const d = pair.d;

  let a = randomInt(1, b - 1);
  let c = randomInt(1, d - 1);

  // Đảm bảo kết quả dương nếu là phép trừ
  if (!isAdd && a / b <= c / d) {
    a = b - 1;
    c = 1;
  }

  const commonDen = (b * d) / gcd(b, d);
  const factor1 = commonDen / b;
  const factor2 = commonDen / d;

  const numResult = isAdd ? a * factor1 + c * factor2 : a * factor1 - c * factor2;
  const correctStr = formatFraction(numResult, commonDen);

  const opSymbol = isAdd ? '+' : '-';
  const opName = isAdd ? 'cộng' : 'trừ';

  // Tạo các phương án nhiễu trắc nghiệm
  const distractors = new Set<string>();
  // Nhiễu 1: Cộng tử với tử, mẫu với mẫu
  const wrong1 = isAdd ? `${a + c}/${b + d}` : `${Math.abs(a - c)}/${b + d}`;
  if (wrong1 !== correctStr) distractors.add(wrong1);

  // Nhiễu 2: Quên quy đồng tử số
  const wrong2 = formatFraction(isAdd ? a + c : Math.abs(a - c), commonDen);
  if (wrong2 !== correctStr) distractors.add(wrong2);

  // Nhiễu 3: Tích hai mẫu số
  const wrong3 = formatFraction(numResult + 1, commonDen);
  if (wrong3 !== correctStr) distractors.add(wrong3);

  // Thêm phương án bổ sung nếu chưa đủ
  const fallbacks = ['1/2', '3/4', '2/3', '5/6', '7/12', '1'];
  for (const f of fallbacks) {
    if (distractors.size >= 3) break;
    if (f !== correctStr) distractors.add(f);
  }

  const options = shuffle([correctStr, ...Array.from(distractors).slice(0, 3)]);

  return {
    id: `gen-frac-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Phân số',
    subtopic: isAdd ? 'Cộng phân số' : 'Trừ phân số',
    type: 'multiple_choice',
    difficulty: 'medium',
    xpReward: 20,
    question: `Tính kết quả của phép tính: ${a}/${b} ${opSymbol} ${c}/${d} (rút gọn tối giản)`,
    mathExpression: `${a}/${b} ${opSymbol} ${c}/${d} = ?`,
    options,
    correctAnswer: correctStr,
    explanation: `Bước 1: Tìm mẫu số chung của ${b} và ${d} là ${commonDen}.\n` +
      `Bước 2: Quy đồng hai phân số: ${a}/${b} = ${a * factor1}/${commonDen} và ${c}/${d} = ${c * factor2}/${commonDen}.\n` +
      `Bước 3: Thực hiện phép ${opName}: (${a * factor1} ${opSymbol} ${c * factor2}) / ${commonDen} = ${numResult}/${commonDen}.\n` +
      `Bước 4: Rút gọn tối giản được: ${correctStr}.`,
    hint: `Tìm mẫu số chung nhỏ nhất của ${b} và ${d} trước khi ${opName}.`,
  };
}

// Sinh bài toán tìm x dạng phân số (VD: x / 12 = 3 / 4)
function generateFractionEquation(grade: Grade = 6): Question {
  const denominators = [10, 12, 14, 15, 16, 20, 24];
  const b = denominators[randomInt(0, denominators.length - 1)];
  const factors = [2, 3, 4, 5].filter((f) => b % f === 0);
  const factor = factors[randomInt(0, factors.length - 1)] || 2;
  const d = b / factor;
  const c = randomInt(1, d - 1);
  const x = c * factor;

  const correctStr = `${x}`;
  const options = shuffle([
    correctStr,
    `${x + 1}`,
    `${Math.max(1, x - factor)}`,
    `${x + factor}`,
  ]);

  return {
    id: `gen-feq-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Phân số',
    subtopic: 'Phân số bằng nhau',
    type: 'fill_in',
    difficulty: 'easy',
    xpReward: 15,
    question: `Tìm số tự nhiên x biết: x / ${b} = ${c} / ${d}. Nhập giá trị của x:`,
    mathExpression: `x / ${b} = ${c} / ${d}`,
    options,
    correctAnswer: correctStr,
    explanation: `Áp dụng tính chất của hai phân số bằng nhau:\n` +
      `x · ${d} = ${b} · ${c}\n` +
      `=> x · ${d} = ${b * c}\n` +
      `=> x = ${b * c} : ${d} = ${x}.`,
    hint: `Tích chéo x · ${d} = ${b} · ${c}.`,
  };
}

// Sinh bài toán giải phương trình bậc nhất tìm x (VD: 2x + 5 = 15 hoặc 3x - 4 = 17)
function generateLinearEquation(grade: Grade = 7): Question {
  const a = randomInt(2, 6);
  const x = randomInt(2, 9); // Nghiệm nguyên đẹp
  const isPlus = Math.random() > 0.5;
  const b = randomInt(2, 15);
  const c = isPlus ? a * x + b : a * x - b;

  const opSign = isPlus ? '+' : '-';
  const correctStr = `${x}`;
  const options = shuffle([
    correctStr,
    `${x + 1}`,
    `${Math.max(1, x - 1)}`,
    `${x + 2}`,
  ]);

  return {
    id: `gen-lineq-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Đại số',
    subtopic: 'Phương trình bậc nhất',
    type: 'fill_in',
    difficulty: 'medium',
    xpReward: 20,
    question: `Tìm x biết: ${a}x ${opSign} ${b} = ${c}. Giá trị của x là:`,
    mathExpression: `${a}x ${opSign} ${b} = ${c}`,
    options,
    correctAnswer: correctStr,
    explanation: `Áp dụng quy tắc chuyển vế đổi dấu:\n` +
      `• Bước 1: Chuyển ${opSign}${b} sang vế phải thành ${isPlus ? '-' : '+'}${b}:\n` +
      `  ${a}x = ${c} ${isPlus ? '-' : '+'} ${b} => ${a}x = ${a * x}\n` +
      `• Bước 2: Chia cả hai vế cho ${a}:\n` +
      `  x = ${a * x} : ${a} = ${x}.`,
    hint: `Chuyển số hạng tự do sang vế phải rồi chia cả 2 vế cho hệ số của x.`,
  };
}

// Sinh bài toán định lý Pythagore (VD: AB = 6, AC = 8 -> BC = 10 hoặc 5, 12 -> 13)
function generatePythagoras(grade: Grade = 7): Question {
  const triples = [
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 8, c: 10 },
    { a: 9, b: 12, c: 15 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
  ];
  const t = triples[randomInt(0, triples.length - 1)];
  const correctStr = `${t.c}`;
  const options = shuffle([
    `${t.c} cm`,
    `${t.c + 2} cm`,
    `${t.a + t.b} cm`,
    `${t.c - 1} cm`,
  ]);

  return {
    id: `gen-pyth-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Hình học',
    subtopic: 'Định lý Pythagore',
    type: 'fill_in',
    difficulty: 'medium',
    xpReward: 20,
    question: `Cho tam giác ABC vuông tại A có AB = ${t.a} cm và AC = ${t.b} cm. Độ dài cạnh huyền BC là bao nhiêu cm?`,
    mathExpression: `BC = \\sqrt{${t.a}^2 + ${t.b}^2}`,
    options,
    correctAnswer: correctStr,
    explanation: `Áp dụng định lý Pythagore trong tam giác vuông ABC:\n` +
      `BC² = AB² + AC² = ${t.a}² + ${t.b}² = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}.\n` +
      `Suy ra BC = √${t.c * t.c} = ${t.c} cm.`,
    hint: `Bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: BC² = AB² + AC².`,
  };
}

// Sinh bài toán Lũy thừa (Nhân/chia cùng cơ số, lũy thừa của lũy thừa, thứ tự phép tính)
function generatePowersExponents(qText: string = '', grade: Grade = 6): Question {
  const text = qText.toLowerCase();

  const isDivide = text.includes('chia') || text.includes(' : ') || text.includes(' chia ');
  const isPowerOfPower = text.includes('lũy thừa của lũy thừa') || text.includes('(a') || text.includes(')^');
  const isOrderOfOps = text.includes('thứ tự') || (text.includes('-') && text.includes('·') && text.includes('³'));

  if (isDivide) {
    // Dạng chia hai lũy thừa cùng cơ số: aᵐ : aⁿ = aᵐ⁻ⁿ
    const bases = [2, 3, 5, 7, 10];
    const a = bases[randomInt(0, bases.length - 1)];
    const n = randomInt(2, 4);
    const diff = randomInt(2, 4);
    const m = n + diff; // m > n
    const resExp = m - n;

    const correctStr = `${a}${toSuperscript(resExp)}`;
    const distractors = shuffle([
      `${a}${toSuperscript(Math.max(1, Math.floor(m / n)))}`,
      `1${toSuperscript(resExp)}`,
      `${a}${toSuperscript(m + n)}`,
      `${a * a}${toSuperscript(resExp)}`,
    ]).slice(0, 3);

    const options = shuffle([correctStr, ...distractors]);

    return {
      id: `gen-pow-${Date.now()}-${randomInt(100, 999)}`,
      grade,
      topic: 'Số học',
      subtopic: 'Lũy thừa',
      type: 'multiple_choice',
      difficulty: 'easy',
      xpReward: 15,
      question: `Kết quả của phép tính ${a}${toSuperscript(m)} : ${a}${toSuperscript(n)} bằng bao nhiêu?`,
      mathExpression: `${a}${toSuperscript(m)} : ${a}${toSuperscript(n)} = ?`,
      options,
      correctAnswer: correctStr,
      explanation: `Áp dụng công thức chia hai lũy thừa cùng cơ số: aᵐ : aⁿ = aᵐ⁻ⁿ (với a ≠ 0, m ≥ n).\n` +
        `Ta có: ${a}${toSuperscript(m)} : ${a}${toSuperscript(n)} = ${a}${toSuperscript(m)}⁻${toSuperscript(n)} = ${a}${toSuperscript(resExp)}.\n` +
        `Quy tắc: Giữ nguyên cơ số ${a} và lấy số mũ bị chia trừ đi số mũ chia (${m} - ${n} = ${resExp}).`,
      hint: `Khi chia hai lũy thừa cùng cơ số, giữ nguyên cơ số và TRỪ các số mũ: aᵐ : aⁿ = aᵐ⁻ⁿ.`,
    };
  }

  if (isPowerOfPower) {
    // Dạng lũy thừa của lũy thừa: (aᵐ)ⁿ = aᵐ·ⁿ
    const bases = [2, 3, 5];
    const a = bases[randomInt(0, bases.length - 1)];
    const m = randomInt(2, 4);
    const n = randomInt(2, 3);
    const resExp = m * n;

    const correctStr = `${a}${toSuperscript(resExp)}`;
    const distractors = shuffle([
      `${a}${toSuperscript(m + n)}`,
      `${a * n}${toSuperscript(m)}`,
      `${a}${toSuperscript(resExp + 1)}`,
      `${a * a}${toSuperscript(n)}`,
    ]).slice(0, 3);

    const options = shuffle([correctStr, ...distractors]);

    return {
      id: `gen-pow-${Date.now()}-${randomInt(100, 999)}`,
      grade,
      topic: 'Số học',
      subtopic: 'Lũy thừa',
      type: 'multiple_choice',
      difficulty: 'medium',
      xpReward: 20,
      question: `Viết biểu thức (${a}${toSuperscript(m)})${toSuperscript(n)} dưới dạng một lũy thừa:`,
      mathExpression: `(${a}${toSuperscript(m)})${toSuperscript(n)} = ?`,
      options,
      correctAnswer: correctStr,
      explanation: `Áp dụng công thức lũy thừa của lũy thừa: (aᵐ)ⁿ = aᵐ·ⁿ.\n` +
        `Ta có: (${a}${toSuperscript(m)})${toSuperscript(n)} = ${a}${toSuperscript(m)}·${toSuperscript(n)} = ${a}${toSuperscript(resExp)}.`,
      hint: `Khi tính lũy thừa của lũy thừa, ta giữ nguyên cơ số và NHÂN các số mũ với nhau: (aᵐ)ⁿ = aᵐ·ⁿ.`,
    };
  }

  if (isOrderOfOps) {
    // Thứ tự phép tính có lũy thừa: A - b · cⁿ
    const c = randomInt(2, 3);
    const n = c === 2 ? 3 : 2;
    const cPow = Math.pow(c, n);
    const b = randomInt(2, 4);
    const product = b * cPow;
    const result = randomInt(10, 40);
    const A = product + result;

    const correctStr = `${result}`;
    const options = shuffle([
      correctStr,
      `${result + 6}`,
      `${Math.max(1, result - 4)}`,
      `${(A - b) * cPow}`,
    ]);

    return {
      id: `gen-ord-${Date.now()}-${randomInt(100, 999)}`,
      grade,
      topic: 'Số học',
      subtopic: 'Thứ tự phép tính',
      type: 'fill_in',
      difficulty: 'medium',
      xpReward: 20,
      question: `Tính giá trị của biểu thức: ${A} - ${b} · ${c}${toSuperscript(n)} = ?`,
      mathExpression: `${A} - ${b} · ${c}${toSuperscript(n)} = ?`,
      options,
      correctAnswer: correctStr,
      explanation: `Theo thứ tự thực hiện phép tính:\n` +
        `1. Tính lũy thừa trước: ${c}${toSuperscript(n)} = ${cPow}.\n` +
        `2. Thực hiện phép nhân: ${b} · ${cPow} = ${product}.\n` +
        `3. Thực hiện phép trừ: ${A} - ${product} = ${result}.`,
      hint: `Quy tắc ưu tiên: Lũy thừa trước -> Nhân chia -> Cộng trừ.`,
    };
  }

  // MẶC ĐỊNH & PHỔ BIẾN NHẤT: NHÂN HAI LŨY THỪA CÙNG CƠ SỐ: aᵐ · aⁿ = aᵐ⁺ⁿ
  const basePool = [2, 3, 5, 7, 10];
  const a = basePool[randomInt(0, basePool.length - 1)];

  let m = randomInt(2, 5);
  let n = randomInt(2, 5);
  // Đảm bảo tạo câu hỏi phong phú
  if (a === 2 && m === 3 && n === 4) {
    m = randomInt(2, 5);
    n = randomInt(2, 4);
  }

  const sumExp = m + n;
  const mulExp = m * n;
  const correctStr = `${a}${toSuperscript(sumExp)}`;

  // Các phương án nhiễu theo lỗi sai điển hình của học sinh
  const distractor1 = `${a}${toSuperscript(mulExp)}`; // Nhân số mũ
  const distractor2 = `${a * a}${toSuperscript(sumExp)}`; // Nhân cơ số
  const distractor3 = `${a * a}${toSuperscript(mulExp)}`; // Nhân cả cơ số lẫn số mũ

  const options = shuffle([correctStr, distractor1, distractor2, distractor3]);

  const numericVal = Math.pow(a, sumExp);
  const numericNote = numericVal <= 2048 ? ` (bằng ${numericVal})` : '';

  return {
    id: `gen-pow-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Số học',
    subtopic: 'Lũy thừa',
    type: 'multiple_choice',
    difficulty: 'easy',
    xpReward: 15,
    question: `Kết quả của phép tính ${a}${toSuperscript(m)} · ${a}${toSuperscript(n)} bằng bao nhiêu?`,
    mathExpression: `${a}${toSuperscript(m)} · ${a}${toSuperscript(n)} = ?`,
    options,
    correctAnswer: correctStr,
    explanation: `Áp dụng công thức nhân hai lũy thừa cùng cơ số: aᵐ · aⁿ = aᵐ⁺ⁿ.\n` +
      `Ta có: ${a}${toSuperscript(m)} · ${a}${toSuperscript(n)} = ${a}${toSuperscript(m)}⁺${toSuperscript(n)} = ${a}${toSuperscript(sumExp)}${numericNote}.\n` +
      `Ghi nhớ: Khi nhân hai lũy thừa cùng cơ số, giữ nguyên cơ số (${a}) và CỘNG các số mũ lại với nhau (${m} + ${n} = ${sumExp}).`,
    hint: `Khi nhân hai lũy thừa cùng cơ số, giữ nguyên cơ số và cộng các số mũ: aᵐ · aⁿ = aᵐ⁺ⁿ.`,
  };
}

// Sinh bài toán số nguyên (VD: (-25) + 17 = ? hoặc (-5) . (-4) = ?)
function generateIntegerArithmetic(grade: Grade = 6): Question {
  const isMultiply = Math.random() > 0.5;

  if (isMultiply) {
    const a = -randomInt(2, 9);
    const b = Math.random() > 0.5 ? -randomInt(2, 9) : randomInt(2, 9);
    const result = a * b;
    const correctStr = `${result}`;
    const options = shuffle([correctStr, `${-result}`, `${result + 2}`, `${result - 2}`]);

    return {
      id: `gen-int-${Date.now()}-${randomInt(100, 999)}`,
      grade,
      topic: 'Số học',
      subtopic: 'Phép nhân số nguyên',
      type: 'fill_in',
      difficulty: 'easy',
      xpReward: 15,
      question: `Tính giá trị của phép tính: (${a}) · (${b}) = ?`,
      mathExpression: `(${a}) · (${b}) = ?`,
      options,
      correctAnswer: correctStr,
      explanation: `Quy tắc nhân dấu: ${b < 0 ? 'Hai số cùng dấu âm nhân với nhau ra số DƯƠNG' : 'Hai số trái dấu nhân với nhau ra số ÂM'}.\n` +
        `Ta có: |${a}| · |${b}| = ${Math.abs(a)} · ${Math.abs(b)} = ${Math.abs(result)}.\n` +
        `Kết quả: ${result}.`,
      hint: `Cùng dấu ra dương (+), khác dấu ra âm (-).`,
    };
  } else {
    const a = -randomInt(10, 35);
    const b = randomInt(5, 25);
    const result = a + b;
    const correctStr = `${result}`;
    const options = shuffle([correctStr, `${-result}`, `${result + 3}`, `${result - 3}`]);

    return {
      id: `gen-int-${Date.now()}-${randomInt(100, 999)}`,
      grade,
      topic: 'Số học',
      subtopic: 'Phép cộng số nguyên',
      type: 'fill_in',
      difficulty: 'easy',
      xpReward: 15,
      question: `Tính giá trị của phép tính: (${a}) + ${b} = ?`,
      mathExpression: `(${a}) + ${b} = ?`,
      options,
      correctAnswer: correctStr,
      explanation: `Quy tắc cộng hai số nguyên khác dấu:\n` +
        `1. Lấy phần số lớn trừ phần số bé: ${Math.abs(a)} - ${b} = ${Math.abs(result)}.\n` +
        `2. Mang dấu của số có phần tự nhiên lớn hơn (${a} mang dấu âm).\n` +
        `Kết quả là: ${result}.`,
      hint: `Trừ phần tự nhiên rồi đặt dấu của số có giá trị tuyệt đối lớn hơn.`,
    };
  }
}

// Sinh bài toán diện tích hình thoi hoặc hình thang
function generateRhombusArea(grade: Grade = 6): Question {
  const d1 = randomInt(4, 12) * 2; // Số chẵn để chia hết cho 2
  const d2 = randomInt(5, 15);
  const area = (d1 * d2) / 2;
  const correctStr = `${area}`;

  return {
    id: `gen-area-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Hình học',
    subtopic: 'Diện tích hình thoi',
    type: 'fill_in',
    difficulty: 'medium',
    xpReward: 20,
    question: `Một hình thoi có độ dài hai đường chéo lần lượt là ${d1} cm và ${d2} cm. Diện tích của hình thoi là bao nhiêu cm²?`,
    mathExpression: `S = (d_1 \\cdot d_2) / 2`,
    correctAnswer: correctStr,
    explanation: `Diện tích hình thoi bằng một nửa tích độ dài hai đường chéo:\n` +
      `S = (d₁ · d₂) / 2 = (${d1} · ${d2}) / 2 = ${d1 * d2} / 2 = ${area} cm².`,
    hint: `Công thức diện tích hình thoi: S = (d₁ · d₂) / 2.`,
  };
}

// Sinh bài toán dãy tỉ số bằng nhau (An và Bình có tổng số kẹo tỉ lệ với 2 và 3...)
function generateRatioProportion(grade: Grade = 7): Question {
  const ratio1 = randomInt(2, 4);
  const ratio2 = randomInt(3, 5);
  const k = randomInt(3, 8);
  const sum = (ratio1 + ratio2) * k;
  const person1Count = ratio1 * k;
  const correctStr = `${person1Count}`;

  return {
    id: `gen-ratio-${Date.now()}-${randomInt(100, 999)}`,
    grade,
    topic: 'Đại số',
    subtopic: 'Dãy tỉ số bằng nhau',
    type: 'fill_in',
    difficulty: 'medium',
    xpReward: 20,
    question: `Hai bạn An và Bình có tổng cộng ${sum} cái kẹo. Số kẹo của An và Bình tỉ lệ với ${ratio1} và ${ratio2}. Hỏi bạn An có bao nhiêu cái kẹo?`,
    correctAnswer: correctStr,
    explanation: `Gọi số kẹo của An là x, Bình là y (x, y > 0). Ta có x/${ratio1} = y/${ratio2} và x + y = ${sum}.\n` +
      `Áp dụng tính chất dãy tỉ số bằng nhau:\n` +
      `x/${ratio1} = y/${ratio2} = (x + y)/(${ratio1} + ${ratio2}) = ${sum}/${ratio1 + ratio2} = ${k}.\n` +
      `Số kẹo của bạn An là: x = ${ratio1} · ${k} = ${person1Count} cái kẹo.`,
    hint: `Tổng số phần bằng nhau là ${ratio1} + ${ratio2} = ${ratio1 + ratio2} phần.`,
  };
}

/**
 * HÀM CHÍNH: Tạo bài tập tương tự từ câu sai của học sinh
 * Tự động nhận diện template, sinh dữ liệu ngẫu nhiên mới và tính toán đáp án bảo chứng 100%
 */
export function generateSimilarQuestion(
  originalQuestionText: string,
  topic: string,
  subtopic?: string,
  grade: Grade = 6
): Question {
  const pattern = detectQuestionPattern(originalQuestionText, topic, subtopic);

  switch (pattern) {
    case 'powers_exponents':
      return generatePowersExponents(originalQuestionText, grade);

    case 'fraction_add_sub':
      return generateFractionAddSub(grade);

    case 'fraction_equation':
      return generateFractionEquation(grade);

    case 'linear_equation':
      return generateLinearEquation(grade >= 7 ? grade : 7);

    case 'pythagoras':
      return generatePythagoras(grade >= 7 ? grade : 7);

    case 'integer_arithmetic':
      return generateIntegerArithmetic(grade);

    case 'rhombus_trapezoid_area':
      return generateRhombusArea(grade);

    case 'ratio_proportion':
      return generateRatioProportion(grade >= 7 ? grade : 7);

    case 'general_topic':
    default:
      // Fallback theo topic chính và subtopic
      if (subtopic?.includes('Lũy thừa') || originalQuestionText.includes('lũy thừa')) return generatePowersExponents(originalQuestionText, grade);
      if (topic.includes('Phân số')) return generateFractionAddSub(grade);
      if (topic.includes('Hình học')) return generatePythagoras(grade >= 7 ? grade : 7);
      if (topic.includes('Đại số')) return generateLinearEquation(grade >= 7 ? grade : 7);
      return generateIntegerArithmetic(grade);
  }
}
