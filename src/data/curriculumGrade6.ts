import { Lesson } from '../types/mathverse';

export const CURRICULUM_GRADE_6: Lesson[] = [
  // ========================== TẬP 1: CHƯƠNG I ==========================
  {
    id: 'kntt-6-bai-1',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương I. Tập hợp các số tự nhiên',
    lessonNumber: 1,
    topic: 'Số học',
    title: 'Bài 1. Tập hợp',
    objective: 'Nhận biết tập hợp, các phần tử của tập hợp; sử dụng đúng các ký hiệu ∈, ∉.',
    theory: [
      'Tập hợp (gọi tắt là tập) gồm các đối tượng nhất định gọi là phần tử của tập hợp.',
      'Ký hiệu x ∈ A đọc là "x thuộc A" (x là phần tử của A). Ký hiệu y ∉ A đọc là "y không thuộc A".',
      'Hai cách mô tả tập hợp:\n  + Cách 1: Liệt kê các phần tử trong dấu { } (mỗi phần tử chỉ viết 1 lần, thứ tự tùy ý).\n  + Cách 2: Nêu dấu hiệu đặc trưng cho các phần tử của tập hợp.'
    ],
    formulas: [
      {
        title: 'Ký hiệu tập hợp số tự nhiên',
        formula: 'ℕ = {0; 1; 2; 3; ...}',
        explanation: 'Tập hợp các số tự nhiên. Tập ℕ* = {1; 2; 3; ...} là các số tự nhiên khác 0.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Xác định điều kiện các phần tử',
        description: 'Viết tập hợp A các số tự nhiên nhỏ hơn 6 bằng cách liệt kê.',
        mathSnippet: 'A = {0; 1; 2; 3; 4; 5}'
      },
      {
        title: 'Bước 2: Sử dụng ký hiệu thuộc hoặc không thuộc',
        description: 'Ta thấy 3 thuộc A nên viết 3 ∈ A; 7 không thuộc A nên viết 7 ∉ A.',
        mathSnippet: '3 ∈ A  và  7 ∉ A'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-1'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-2',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương I. Tập hợp các số tự nhiên',
    lessonNumber: 2,
    topic: 'Số học',
    title: 'Bài 2. Cách ghi số tự nhiên',
    objective: 'Nắm vững hệ thập phân, giá trị theo vị trí của các chữ số và cách đọc, viết số La Mã đến 30.',
    theory: [
      'Trong hệ thập phân, 10 đơn vị ở một hàng bằng 1 đơn vị ở hàng liền trước nó.',
      'Cấu tạo số thập phân: ab = a . 10 + b (a ≠ 0); abc = a . 100 + b . 10 + c (a ≠ 0).',
      'Số La Mã sử dụng các chữ số I (1), V (5), X (10). Các số thường gặp: IV (4), IX (9), XIV (14), XIX (19), XXIV (24), XXIX (29).'
    ],
    formulas: [
      {
        title: 'Cấu tạo số có 3 chữ số',
        formula: 'abc = a . 100 + b . 10 + c',
        explanation: 'a là chữ số hàng trăm, b là hàng chục, c là hàng đơn vị.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Phân tích số tự nhiên theo cấu tạo thập phân',
        description: 'Viết số 345 dưới dạng tổng giá trị các chữ số: 345 = 3 . 100 + 4 . 10 + 5.',
        mathSnippet: '345 = 300 + 40 + 5'
      },
      {
        title: 'Bước 2: Đọc và viết số La Mã',
        description: 'Viết số 26 bằng chữ số La Mã: 26 = 20 + 6 = XX + VI = XXVI.',
        mathSnippet: '26 -> XXVI'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-2'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-6',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương I. Tập hợp các số tự nhiên',
    lessonNumber: 6,
    topic: 'Số học',
    title: 'Bài 6. Luỹ thừa với số mũ tự nhiên',
    objective: 'Hiểu định nghĩa luỹ thừa bậc n; nhân và chia hai luỹ thừa cùng cơ số.',
    theory: [
      'Luỹ thừa bậc n của a là tích của n thừa số bằng nhau, mỗi thừa số bằng a: aⁿ = a . a . ... . a (n thừa số, n ∈ ℕ*).',
      'Quy ước: a¹ = a; a⁰ = 1 (a ≠ 0).',
      'Nhân hai luỹ thừa cùng cơ số: aᵐ . aⁿ = aᵐ⁺ⁿ.',
      'Chia hai luỹ thừa cùng cơ số (a ≠ 0, m ≥ n): aᵐ : aⁿ = aᵐ⁻ⁿ.'
    ],
    formulas: [
      {
        title: 'Nhân hai luỹ thừa cùng cơ số',
        formula: 'aᵐ . aⁿ = aᵐ⁺ⁿ',
        explanation: 'Giữ nguyên cơ số, cộng các số mũ.'
      },
      {
        title: 'Chia hai luỹ thừa cùng cơ số',
        formula: 'aᵐ : aⁿ = aᵐ⁻ⁿ  (a ≠ 0, m ≥ n)',
        explanation: 'Giữ nguyên cơ số, trừ số mũ của số bị chia cho số chia.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Xác định cơ số và số mũ',
        description: 'Tính: 2³ . 2⁴. Cơ số chung là 2, số mũ là 3 và 4.',
        mathSnippet: '2³ . 2⁴ = 2³⁺⁴ = 2⁷ = 128'
      },
      {
        title: 'Bước 2: Thực hiện phép chia',
        description: 'Tính: 5⁶ : 5² = 5⁶⁻² = 5⁴ = 625.',
        mathSnippet: '5⁶ : 5² = 5⁴ = 625'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-1', 'q6-fe1'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-7',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương I. Tập hợp các số tự nhiên',
    lessonNumber: 7,
    topic: 'Số học',
    title: 'Bài 7. Thứ tự thực hiện các phép tính',
    objective: 'Thực hiện đúng thứ tự tính có dấu ngoặc và không có dấu ngoặc.',
    theory: [
      'Biểu thức không có dấu ngoặc: Luỹ thừa -> Nhân và chia -> Cộng và trừ.',
      'Biểu thức có dấu ngoặc: Trong ngoặc tròn ( ) trước -> Trong ngoặc vuông [ ] -> Trong ngoặc nhọn { }.'
    ],
    formulas: [
      {
        title: 'Thứ tự ưu tiên',
        formula: '( ) -> [ ] -> { } -> Luỹ thừa -> Nhân/Chia -> Cộng/Trừ',
        explanation: 'Tính từ trong ra ngoài, từ cấp cao xuống cấp thấp.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính luỹ thừa và trong ngoặc tròn',
        description: 'Tính: 50 - 3 . 2³ = 50 - 3 . 8.',
        mathSnippet: '2³ = 8'
      },
      {
        title: 'Bước 2: Thực hiện nhân trước, trừ sau',
        description: '50 - 24 = 26.',
        mathSnippet: '50 - 24 = 26'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q6-2'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG II ==========================
  {
    id: 'kntt-6-bai-9',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương II. Tính chia hết trong tập hợp các số tự nhiên',
    lessonNumber: 9,
    topic: 'Số học',
    title: 'Bài 9. Dấu hiệu chia hết',
    objective: 'Nhận biết dấu hiệu chia hết cho 2, 5, 3, 9 trong hệ thập phân.',
    theory: [
      'Dấu hiệu chia hết cho 2: Chữ số tận cùng là chữ số chẵn (0, 2, 4, 6, 8).',
      'Dấu hiệu chia hết cho 5: Chữ số tận cùng là 0 hoặc 5.',
      'Dấu hiệu chia hết cho 9: Tổng các chữ số chia hết cho 9.',
      'Dấu hiệu chia hết cho 3: Tổng các chữ số chia hết cho 3.'
    ],
    formulas: [
      {
        title: 'Dấu hiệu chia hết cho 3 và 9',
        formula: '(a + b + c + ...) chia hết cho 3 (hoặc 9)',
        explanation: 'Chỉ dựa vào tổng các chữ số của số đó.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Kiểm tra chữ số tận cùng',
        description: 'Số 1 230 có tận cùng là 0 nên chia hết cho cả 2 và 5.',
        mathSnippet: 'Tận cùng = 0 => chia hết cho 2 và 5'
      },
      {
        title: 'Bước 2: Kiểm tra tổng các chữ số',
        description: 'Tổng: 1 + 2 + 3 + 0 = 6 chia hết cho 3 nhưng không chia hết cho 9.',
        mathSnippet: '6 chia hết cho 3'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-3'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-10',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương II. Tính chia hết trong tập hợp các số tự nhiên',
    lessonNumber: 10,
    topic: 'Số học',
    title: 'Bài 10. Số nguyên tố & Hợp số',
    objective: 'Phân biệt số nguyên tố và hợp số; phân tích số tự nhiên ra thừa số nguyên tố.',
    theory: [
      'Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó. Ví dụ: 2, 3, 5, 7, 11, 13...',
      'Hợp số là số tự nhiên lớn hơn 1, có nhiều hơn hai ước.',
      'Số 0 và số 1 không phải là số nguyên tố và cũng không phải là hợp số.',
      'Mọi hợp số đều phân tích được ra thừa số nguyên tố theo sơ đồ cột hoặc sơ đồ cây.'
    ],
    formulas: [
      {
        title: 'Số nguyên tố chẵn duy nhất',
        formula: 'Số 2',
        explanation: '2 là số nguyên tố nhỏ nhất và là số nguyên tố chẵn duy nhất.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Chia liên tiếp cho các số nguyên tố nhỏ nhất',
        description: 'Phân tích số 24: 24 : 2 = 12; 12 : 2 = 6; 6 : 2 = 3; 3 : 3 = 1.',
        mathSnippet: '24 = 2 . 2 . 2 . 3'
      },
      {
        title: 'Bước 2: Viết gọn dưới dạng luỹ thừa',
        description: '24 = 2³ . 3.',
        mathSnippet: '24 = 2³ . 3'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-4'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-11-12',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương II. Tính chia hết trong tập hợp các số tự nhiên',
    lessonNumber: 11,
    topic: 'Số học',
    title: 'Bài 11 & 12. ƯCLN và BCNN',
    objective: 'Tìm ƯCLN và BCNN của hai hay nhiều số bằng cách phân tích ra thừa số nguyên tố.',
    theory: [
      'ƯCLN(a, b): Lập tích các thừa số nguyên tố CHUNG, mỗi thừa số lấy với số mũ NHỎ NHẤT.',
      'BCNN(a, b): Lập tích các thừa số nguyên tố CHUNG và RIÊNG, mỗi thừa số lấy với số mũ LỚN NHẤT.',
      'Hai số nguyên tố cùng nhau là hai số có ƯCLN bằng 1.'
    ],
    formulas: [
      {
        title: 'Mối quan hệ giữa ƯCLN và BCNN',
        formula: 'ƯCLN(a, b) . BCNN(a, b) = a . b',
        explanation: 'Tích của ƯCLN và BCNN bằng tích của hai số ban đầu.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Phân tích 12 và 18 ra thừa số nguyên tố',
        description: '12 = 2² . 3  và  18 = 2 . 3².',
        mathSnippet: 'Thừa số chung: 2 và 3'
      },
      {
        title: 'Bước 2: Tính ƯCLN và BCNN',
        description: 'ƯCLN(12, 18) = 2 . 3 = 6; BCNN(12, 18) = 2² . 3² = 36.',
        mathSnippet: 'ƯCLN = 6 ; BCNN = 36'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-5'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG III ==========================
  {
    id: 'kntt-6-bai-14',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương III. Số nguyên',
    lessonNumber: 14,
    topic: 'Số học',
    title: 'Bài 14. Phép cộng và phép trừ số nguyên',
    objective: 'Thực hiện thành thạo cộng trừ hai số nguyên cùng dấu và khác dấu.',
    theory: [
      'Cộng hai số nguyên cùng dấu âm: (-a) + (-b) = -(a + b).',
      'Cộng hai số nguyên khác dấu: Lấy phần số tự nhiên lớn hơn trừ phần số tự nhiên nhỏ hơn rồi đặt trước hiệu dấu của số có phần tự nhiên lớn hơn.',
      'Phép trừ số nguyên: Muốn trừ số nguyên a cho số nguyên b, ta cộng a với số đối của b: a - b = a + (-b).'
    ],
    formulas: [
      {
        title: 'Phép trừ là phép cộng với số đối',
        formula: 'a - b = a + (-b)',
        explanation: 'Chuyển phép trừ thành phép cộng số đối.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Nhận diện loại dấu',
        description: 'Tính: (-15) + 20. Hai số khác dấu, 20 > 15.',
        mathSnippet: '20 - 15 = 5 (mang dấu dương +)'
      },
      {
        title: 'Bước 2: Phép trừ chuyển thành cộng số đối',
        description: 'Tính: 7 - 12 = 7 + (-12) = -(12 - 7) = -5.',
        mathSnippet: '7 - 12 = -5'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-6'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-15-16',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương III. Số nguyên',
    lessonNumber: 15,
    topic: 'Số học',
    title: 'Bài 15 & 16. Quy tắc dấu ngoặc & Phép nhân số nguyên',
    objective: 'Bỏ dấu ngoặc đúng quy tắc và nắm vững quy tắc nhân hai số nguyên cùng dấu, khác dấu.',
    theory: [
      'Quy tắc dấu ngoặc: Khi bỏ ngoặc có dấu "+" đằng trước, giữ nguyên dấu các số hạng. Khi bỏ ngoặc có dấu "-" đằng trước, phải ĐỔI DẤU tất cả số hạng bên trong (+ thành -, - thành +).',
      'Quy tắc nhân hai số nguyên:\n  + Cùng dấu: (+) . (+) = (+) ; (-) . (-) = (+).\n  + Khác dấu: (+) . (-) = (-) ; (-) . (+) = (-).'
    ],
    formulas: [
      {
        title: 'Quy tắc nhân dấu',
        formula: '(-) . (-) = (+)  và  (+) . (-) = (-)',
        explanation: 'Nhân cùng dấu ra số dương, nhân trái dấu ra số âm.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Bỏ dấu ngoặc',
        description: 'Tính: 10 - (-5 + 3) = 10 + 5 - 3 = 12.',
        mathSnippet: 'Đổi dấu -5 thành +5, +3 thành -3'
      },
      {
        title: 'Bước 2: Nhân số nguyên',
        description: '(-6) . (-7) = 42 ; (-8) . 5 = -40.',
        mathSnippet: '(-6) . (-7) = 42'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q6-7'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG IV ==========================
  {
    id: 'kntt-6-bai-18-20',
    grade: 6,
    bookVolume: 1,
    chapter: 'Chương IV. Một số hình phẳng trong thực tiễn',
    lessonNumber: 18,
    topic: 'Hình học',
    title: 'Bài 18 - 20. Tam giác đều, Hình thoi, Hình bình hành & Hình thang cân',
    objective: 'Nhận biết các yếu tố cạnh, góc, đường chéo và tính diện tích, chu vi các hình phẳng cơ bản.',
    theory: [
      'Tam giác đều: 3 cạnh bằng nhau, 3 góc bằng nhau và bằng 60°.',
      'Hình thoi: 4 cạnh bằng nhau, 2 đường chéo vuông góc tại trung điểm. Diện tích: S = 1/2 . d₁ . d₂.',
      'Hình bình hành: Các cạnh đối song song và bằng nhau. Diện tích: S = a . h (đáy nhân chiều cao).',
      'Hình thang cân: 2 cạnh bên bằng nhau, 2 góc kề một đáy bằng nhau, 2 đường chéo bằng nhau. Diện tích: S = 1/2 . (a + b) . h.'
    ],
    formulas: [
      {
        title: 'Diện tích hình thoi',
        formula: 'S = 1/2 . d₁ . d₂',
        explanation: 'Nửa tích độ dài hai đường chéo.'
      },
      {
        title: 'Diện tích hình bình hành',
        formula: 'S = a . h',
        explanation: 'Độ dài cạnh đáy nhân chiều cao tương ứng.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Áp dụng công thức diện tích hình thoi',
        description: 'Cho hình thoi có hai đường chéo là 6 cm và 8 cm. Tính diện tích.',
        mathSnippet: 'S = 1/2 . 6 . 8 = 24 cm²'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q6-8'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VI ==========================
  {
    id: 'kntt-6-bai-23-24',
    grade: 6,
    bookVolume: 2,
    chapter: 'Chương VI. Phân số',
    lessonNumber: 23,
    topic: 'Phân số',
    title: 'Bài 23 & 24. Mở rộng khái niệm phân số & So sánh phân số',
    objective: 'Hiểu phân số a/b với a, b ∈ ℤ (b ≠ 0); quy đồng mẫu số và so sánh hai phân số.',
    theory: [
      'Phân số có dạng a/b trong đó a, b ∈ ℤ, b ≠ 0. a là tử số, b là mẫu số.',
      'Hai phân số bằng nhau: a/b = c/d khi và chỉ khi a . d = b . c.',
      'Quy đồng mẫu số: Tìm mẫu số chung (BCNN của các mẫu số dương) rồi nhân cả tử và mẫu với thừa số phụ tương ứng.',
      'So sánh hai phân số cùng mẫu dương: Phân số nào có tử lớn hơn thì lớn hơn.'
    ],
    formulas: [
      {
        title: 'Điều kiện hai phân số bằng nhau',
        formula: 'a/b = c/d <=> a . d = b . c',
        explanation: 'Tích chéo của hai phân số bằng nhau.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Kiểm tra phân số bằng nhau bằng tích chéo',
        description: 'So sánh (-3)/5 và 9/(-15): (-3) . (-15) = 45; 5 . 9 = 45 => Bằng nhau!',
        mathSnippet: '(-3) . (-15) = 5 . 9 = 45'
      }
    ],
    visualType: 'fractions',
    practiceQuestionIds: ['q6-9'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-25-26',
    grade: 6,
    bookVolume: 2,
    chapter: 'Chương VI. Phân số',
    lessonNumber: 25,
    topic: 'Phân số',
    title: 'Bài 25 & 26. Các phép tính với phân số',
    objective: 'Cộng, trừ, nhân, chia phân số có số âm và vận dụng tính chất phân phối.',
    theory: [
      'Cộng trừ phân số cùng mẫu: a/m + b/m = (a + b)/m.',
      'Cộng trừ khác mẫu: Quy đồng về cùng mẫu dương rồi cộng hoặc trừ các tử.',
      'Nhân hai phân số: a/b . c/d = (a . c) / (b . d).',
      'Chia hai phân số: a/b : c/d = a/b . d/c (nhân với phân số nghịch đảo d/c).'
    ],
    formulas: [
      {
        title: 'Phép nhân phân số',
        formula: '(a/b) . (c/d) = (a.c) / (b.d)',
        explanation: 'Tử nhân tử, mẫu nhân mẫu.'
      },
      {
        title: 'Phép chia phân số',
        formula: '(a/b) : (c/d) = (a/b) . (d/c)',
        explanation: 'Nhân phân số thứ nhất với phân số nghịch đảo của phân số thứ hai.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Quy đồng mẫu',
        description: 'Tính: 1/4 + 2/3. Mẫu chung là 12.',
        mathSnippet: '3/12 + 8/12 = 11/12'
      }
    ],
    visualType: 'fractions',
    practiceQuestionIds: ['q6-10'],
    xpReward: 50
  },
  {
    id: 'kntt-6-bai-28-31',
    grade: 6,
    bookVolume: 2,
    chapter: 'Chương VII. Số thập phân',
    lessonNumber: 28,
    topic: 'Số học',
    title: 'Bài 28 - 31. Số thập phân & Tỉ số phần trăm',
    objective: 'Tính toán thành thạo với số thập phân dương và âm; giải bài toán tỉ số phần trăm thực tế.',
    theory: [
      'Số thập phân gồm phần số nguyên viết bên trái dấu phẩy và phần thập phân viết bên phải dấu phẩy.',
      'Quy tắc cộng, trừ, nhân, chia số thập phân âm tương tự như với số nguyên.',
      'Tỉ số phần trăm của a và b là: (a / b) . 100%.'
    ],
    formulas: [
      {
        title: 'Tỉ số phần trăm',
        formula: 'Tỉ lệ % = (a / b) . 100%',
        explanation: 'Nhân tỉ số với 100 rồi viết kèm ký hiệu %.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính tỉ số phần trăm',
        description: 'Lớp có 40 học sinh, có 10 học sinh giỏi. Tìm tỉ số phần trăm.',
        mathSnippet: '(10 / 40) . 100% = 25%'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q6-11'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VIII ==========================
  {
    id: 'kntt-6-bai-32-37',
    grade: 6,
    bookVolume: 2,
    chapter: 'Chương VIII. Những hình hình học cơ bản',
    lessonNumber: 32,
    topic: 'Hình học',
    title: 'Bài 32 - 37. Điểm, Đoạn thẳng, Tia & Góc',
    objective: 'Nắm chắc khái niệm điểm thuộc đường thẳng, trung điểm đoạn thẳng, góc nhọn, vuông, tù, bẹt.',
    theory: [
      'Điểm M là trung điểm của đoạn thẳng AB nếu M nằm giữa A, B và MA = MB = AB / 2.',
      'Góc là hình gồm hai tia chung gốc (đỉnh của góc).',
      'Phân loại góc theo số đo: Góc nhọn (< 90°), Góc vuông (= 90°), Góc tù (90° < góc < 180°), Góc bẹt (= 180°).'
    ],
    formulas: [
      {
        title: 'Công thức trung điểm',
        formula: 'MA = MB = AB / 2',
        explanation: 'M cách đều hai đầu mút A và B.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính độ dài đoạn thẳng khi biết trung điểm',
        description: 'Cho đoạn thẳng AB = 8 cm, M là trung điểm AB. Tính MA.',
        mathSnippet: 'MA = 8 / 2 = 4 cm'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q6-12'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG IX ==========================
  {
    id: 'kntt-6-bai-38-43',
    grade: 6,
    bookVolume: 2,
    chapter: 'Chương IX. Dữ liệu và xác suất thực nghiệm',
    lessonNumber: 38,
    topic: 'Thống kê',
    title: 'Bài 38 - 43. Biểu đồ cột kép & Xác suất thực nghiệm',
    objective: 'Đọc và vẽ biểu đồ cột kép; tính xác suất thực nghiệm của sự kiện trong trò chơi tung đồng xu, gieo xúc xắc.',
    theory: [
      'Biểu đồ cột kép dùng để so sánh hai nhóm dữ liệu cùng loại của các đối tượng.',
      'Xác suất thực nghiệm xuất hiện một sự kiện = (Số lần xuất hiện sự kiện) / (Tổng số lần thực hiện thí nghiệm).'
    ],
    formulas: [
      {
        title: 'Xác suất thực nghiệm',
        formula: 'P = k / n',
        explanation: 'k là số lần sự kiện xảy ra, n là tổng số lần làm thí nghiệm.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Đếm số lần thuận lợi',
        description: 'Gieo xúc xắc 20 lần, có 5 lần xuất hiện mặt 6 chấm. Tính xác suất thực nghiệm.',
        mathSnippet: 'P = 5 / 20 = 1/4 = 25%'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q6-13'],
    xpReward: 50
  }
];
