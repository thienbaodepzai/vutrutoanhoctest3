import { Lesson } from '../types/mathverse';

export const CURRICULUM_GRADE_7: Lesson[] = [
  // ========================== TẬP 1: CHƯƠNG I ==========================
  {
    id: 'kntt-7-bai-1',
    grade: 7,
    bookVolume: 1,
    chapter: 'Chương I. Số hữu tỉ',
    lessonNumber: 1,
    topic: 'Số học',
    title: 'Bài 1. Tập hợp các số hữu tỉ',
    objective: 'Nhận biết số hữu tỉ, tập hợp ℚ, biểu diễn số hữu tỉ trên trục số và tìm số đối.',
    theory: [
      'Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b ∈ ℤ, b ≠ 0. Tập hợp các số hữu tỉ ký hiệu là ℚ.',
      'Mỗi số hữu tỉ được biểu diễn bởi một điểm trên trục số.',
      'Hai số hữu tỉ có điểm biểu diễn đối xứng nhau qua gốc O trên trục số gọi là hai số đối nhau. Số đối của x ký hiệu là -x.'
    ],
    formulas: [
      {
        title: 'Định nghĩa số hữu tỉ',
        formula: 'x = a/b  (a, b ∈ ℤ, b ≠ 0)',
        explanation: 'Mọi số nguyên, số thập phân hữu hạn đều là số hữu tỉ.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Chuyển đổi về dạng phân số',
        description: 'Giải thích vì sao 0,6; -1,2; 1 1/5 là các số hữu tỉ: 0,6 = 3/5; -1,2 = -6/5; 1 1/5 = 6/5.',
        mathSnippet: '0,6 = 3/5 ∈ ℚ'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q7-1'],
    xpReward: 50
  },
  {
    id: 'kntt-7-bai-2-4',
    grade: 7,
    bookVolume: 1,
    chapter: 'Chương I. Số hữu tỉ',
    lessonNumber: 2,
    topic: 'Số học',
    title: 'Bài 2 - 4. Các phép tính số hữu tỉ & Quy tắc chuyển vế',
    objective: 'Thực hiện cộng trừ nhân chia số hữu tỉ; áp dụng quy tắc chuyển vế đổi dấu khi tìm x.',
    theory: [
      'Cộng trừ nhân chia số hữu tỉ thực hiện tương tự như phân số.',
      'Quy tắc chuyển vế: Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải ĐỔI DẤU số hạng đó:\n  Nếu a + b = c thì a = c - b.\n  Nếu a - b = c thì a = c + b.'
    ],
    formulas: [
      {
        title: 'Quy tắc chuyển vế',
        formula: 'x + b = c  =>  x = c - b',
        explanation: 'Chuyển vế thì đổi dấu (+ thành -, - thành +).'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Chuyển hạng tử tự do sang vế phải',
        description: 'Tìm x biết: x + 1/2 = 3/4 => x = 3/4 - 1/2.',
        mathSnippet: 'x = 3/4 - 2/4 = 1/4'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q7-2'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG II ==========================
  {
    id: 'kntt-7-bai-6-7',
    grade: 7,
    bookVolume: 1,
    chapter: 'Chương II. Số thực',
    lessonNumber: 6,
    topic: 'Số học',
    title: 'Bài 6 & 7. Số vô tỉ, Căn bậc hai số học & Số thực ℝ',
    objective: 'Nhận biết số vô tỉ, khái niệm căn bậc hai số học và tập hợp số thực ℝ.',
    theory: [
      'Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn. Tập hợp số vô tỉ ký hiệu là 𝕀.',
      'Căn bậc hai số học của số a không âm là số x không âm sao cho x² = a, ký hiệu là √a.',
      'Tập hợp số thực ℝ gồm số hữu tỉ và số vô tỉ: ℝ = ℚ ∪ 𝕀.'
    ],
    formulas: [
      {
        title: 'Căn bậc hai số học',
        formula: '√a = x  (x ≥ 0 và x² = a)',
        explanation: 'Ví dụ: √81 = 9 vì 9 > 0 và 9² = 81.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính giá trị căn bậc hai số học',
        description: 'Tính √64: Vì 8² = 64 và 8 > 0 nên √64 = 8.',
        mathSnippet: '√64 = 8'
      }
    ],
    visualType: 'numberline',
    practiceQuestionIds: ['q7-3'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG III ==========================
  {
    id: 'kntt-7-bai-8-10',
    grade: 7,
    bookVolume: 1,
    chapter: 'Chương III. Góc và đường thẳng song song',
    lessonNumber: 8,
    topic: 'Hình học',
    title: 'Bài 8 - 10. Góc kề bù, So le trong & Tiên đề Euclid',
    objective: 'Nắm chắc tính chất hai góc kề bù, đối đỉnh, hai góc so le trong và tiên đề Euclid về đường song song.',
    theory: [
      'Hai góc kề bù có tổng số đo bằng 180°.',
      'Hai góc đối đỉnh thì bằng nhau.',
      'Dấu hiệu nhận biết hai đường thẳng song song: Một đường thẳng cắt hai đường thẳng tạo ra một cặp góc so le trong bằng nhau (hoặc đồng vị bằng nhau) thì hai đường thẳng đó song song.',
      'Tiên đề Euclid: Qua một điểm ở ngoài một đường thẳng chỉ có MỘT đường thẳng song song với đường thẳng đó.'
    ],
    formulas: [
      {
        title: 'Hai góc kề bù',
        formula: '∠A + ∠B = 180°',
        explanation: 'Có một cạnh chung và hai cạnh còn lại là hai tia đối nhau.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính số đo góc bù',
        description: 'Cho hai góc xOy và yOz kề bù, biết góc xOy = 60°. Tính góc yOz = 180° - 60° = 120°.',
        mathSnippet: '∠yOz = 180° - 60° = 120°'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q7-4'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG IV ==========================
  {
    id: 'kntt-7-bai-12',
    grade: 7,
    bookVolume: 1,
    chapter: 'Chương IV. Tam giác bằng nhau',
    lessonNumber: 12,
    topic: 'Hình học',
    title: 'Bài 12. Tổng các góc trong một tam giác',
    objective: 'Vận dụng định lý tổng ba góc trong tam giác bằng 180° và góc ngoài tam giác.',
    theory: [
      'Định lý: Tổng ba góc trong một tam giác bằng 180°.',
      'Trong tam giác vuông, hai góc nhọn phụ nhau (tổng bằng 90°).',
      'Góc ngoài của một tam giác có số đo bằng tổng số đo hai góc trong không kề với nó.'
    ],
    formulas: [
      {
        title: 'Tổng 3 góc tam giác',
        formula: '∠A + ∠B + ∠C = 180°',
        explanation: 'Luôn đúng cho mọi tam giác.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Lập phương trình tổng góc',
        description: 'Cho tam giác ABC có góc A = 70°, góc B = 60°. Tính góc C.',
        mathSnippet: '∠C = 180° - (70° + 60°) = 50°'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q7-5'],
    xpReward: 50
  },
  {
    id: 'kntt-7-bai-13-16',
    grade: 7,
    bookVolume: 1,
    chapter: 'Chương IV. Tam giác bằng nhau',
    lessonNumber: 13,
    topic: 'Hình học',
    title: 'Bài 13 - 16. Ba trường hợp bằng nhau của tam giác & Tam giác cân',
    objective: 'Chứng minh hai tam giác bằng nhau theo c-c-c, c-g-c, g-c-g và nắm tính chất tam giác cân.',
    theory: [
      'Trường hợp 1 (c-c-c): Ba cạnh tam giác này bằng ba cạnh tam giác kia.',
      'Trường hợp 2 (c-g-c): Hai cạnh và góc xen giữa bằng nhau.',
      'Trường hợp 3 (g-c-g): Một cạnh và hai góc kề bằng nhau.',
      'Tam giác cân: Có 2 cạnh bằng nhau => 2 góc ở đáy bằng nhau: Góc đáy = (180° - Góc ở đỉnh) / 2.'
    ],
    formulas: [
      {
        title: 'Góc ở đáy tam giác cân',
        formula: '∠B = ∠C = (180° - ∠A) / 2',
        explanation: 'Tam giác ABC cân tại A.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính góc đáy',
        description: 'Tam giác cân có góc ở đỉnh bằng 80°. Tính góc đáy: (180° - 80°) / 2 = 50°.',
        mathSnippet: '∠B = 50°'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q7-6'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VI ==========================
  {
    id: 'kntt-7-bai-20-21',
    grade: 7,
    bookVolume: 2,
    chapter: 'Chương VI. Tỉ lệ thức và đại lượng tỉ lệ',
    lessonNumber: 20,
    topic: 'Đại số',
    title: 'Bài 20 & 21. Tỉ lệ thức & Dãy tỉ số bằng nhau',
    objective: 'Vận dụng tính chất tích chéo tỉ lệ thức và tính chất dãy tỉ số bằng nhau để tìm ẩn số.',
    theory: [
      'Tỉ lệ thức là đẳng thức của hai tỉ số: a/b = c/d.',
      'Tính chất cơ bản: a/b = c/d <=> a . d = b . c.',
      'Tính chất dãy tỉ số bằng nhau: a/b = c/d = (a + c)/(b + d) = (a - c)/(b - d).'
    ],
    formulas: [
      {
        title: 'Dãy tỉ số bằng nhau',
        formula: 'a/x = b/y = (a + b) / (x + y)',
        explanation: 'Áp dụng để giải bài toán chia phần tỉ lệ.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Lập dãy tỉ số',
        description: 'Tìm x và y biết x/3 = y/4 và x + y = 28.',
        mathSnippet: 'x/3 = y/4 = (x + y)/(3 + 4) = 28/7 = 4'
      },
      {
        title: 'Bước 2: Tìm x và y',
        description: 'x = 3 . 4 = 12 ; y = 4 . 4 = 16.',
        mathSnippet: 'x = 12 ; y = 16'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q7-7'],
    xpReward: 50
  },
  {
    id: 'kntt-7-bai-22-23',
    grade: 7,
    bookVolume: 2,
    chapter: 'Chương VI. Tỉ lệ thức và đại lượng tỉ lệ',
    lessonNumber: 22,
    topic: 'Đại số',
    title: 'Bài 22 & 23. Đại lượng tỉ lệ thuận & Tỉ lệ nghịch',
    objective: 'Phân biệt tỉ lệ thuận (y = ax) và tỉ lệ nghịch (y = a/x); giải bài toán thực tế.',
    theory: [
      'Đại lượng tỉ lệ thuận: y liên hệ với x theo công thức y = ax (a là hằng số khác 0). Tỉ số hai giá trị tương ứng không đổi: y₁/x₁ = y₂/x₂ = a.',
      'Đại lượng tỉ lệ nghịch: y liên hệ với x theo công thức y = a/x hay x . y = a. Tích hai giá trị tương ứng không đổi: x₁ . y₁ = x₂ . y₂ = a.'
    ],
    formulas: [
      {
        title: 'Tỉ lệ thuận và tỉ lệ nghịch',
        formula: 'Thuận: y = ax  |  Nghịch: x . y = a',
        explanation: 'Thuận thì chia không đổi, nghịch thì tích không đổi.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Nhận diện tỉ lệ nghịch',
        description: '4 người thợ xây xong tường trong 9 ngày. Hỏi 6 người thợ xây xong trong mấy ngày?',
        mathSnippet: 'x . 6 = 4 . 9 => 6x = 36 => x = 6 ngày'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q7-8'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VII ==========================
  {
    id: 'kntt-7-bai-24-28',
    grade: 7,
    bookVolume: 2,
    chapter: 'Chương VII. Biểu thức đại số và đa thức một biến',
    lessonNumber: 24,
    topic: 'Đại số',
    title: 'Bài 24 - 28. Đa thức một biến & Nghiệm của đa thức',
    objective: 'Thu gọn, sắp xếp đa thức theo luỹ thừa giảm dần; tính bậc, hệ số và tìm nghiệm đa thức.',
    theory: [
      'Đa thức một biến là tổng của những đơn thức của cùng một biến.',
      'Bậc của đa thức một biến (khác đa thức không, đã thu gọn) là số mũ lớn nhất của biến trong đa thức đó.',
      'Nghiệm của đa thức: Số a được gọi là nghiệm của đa thức P(x) nếu P(a) = 0.'
    ],
    formulas: [
      {
        title: 'Định nghĩa nghiệm',
        formula: 'P(a) = 0  =>  x = a là nghiệm',
        explanation: 'Thay x = a vào đa thức mà giá trị bằng 0.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tìm nghiệm của đa thức',
        description: 'Tìm nghiệm của P(x) = 2x - 6: Cho 2x - 6 = 0 => 2x = 6 => x = 3.',
        mathSnippet: 'P(3) = 0 => x = 3 là nghiệm'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q7-9'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG IX ==========================
  {
    id: 'kntt-7-bai-31-33',
    grade: 7,
    bookVolume: 2,
    chapter: 'Chương IX. Quan hệ giữa các yếu tố trong một tam giác',
    lessonNumber: 31,
    topic: 'Hình học',
    title: 'Bài 31 - 33. Bất đẳng thức tam giác & Cạnh đối diện góc',
    objective: 'Hiểu quan hệ giữa góc và cạnh đối diện; áp dụng bất đẳng thức tam giác để kiểm tra bộ ba cạnh.',
    theory: [
      'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn; cạnh đối diện với góc lớn hơn là cạnh lớn hơn.',
      'Bất đẳng thức tam giác: Trong một tam giác, độ dài một cạnh bất kì luôn nhỏ hơn tổng và lớn hơn hiệu độ dài hai cạnh còn lại: |b - c| < a < b + c.'
    ],
    formulas: [
      {
        title: 'Bất đẳng thức tam giác',
        formula: '|b - c| < a < b + c',
        explanation: 'Điều kiện cần và đủ để 3 đoạn thẳng tạo thành tam giác.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Kiểm tra bộ ba cạnh tam giác',
        description: 'Bộ ba (2 cm; 3 cm; 6 cm) có tạo thành tam giác không? Ta thấy 2 + 3 = 5 < 6 => Không tạo thành tam giác!',
        mathSnippet: '2 + 3 < 6 (vi phạm)'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q7-10'],
    xpReward: 50
  },
  {
    id: 'kntt-7-bai-34-35',
    grade: 7,
    bookVolume: 2,
    chapter: 'Chương IX. Quan hệ giữa các yếu tố trong một tam giác',
    lessonNumber: 34,
    topic: 'Hình học',
    title: 'Bài 34 & 35. Sự đồng quy của các đường trong tam giác',
    objective: 'Nắm chắc tính chất trọng tâm (trung tuyến), trực tâm (đường cao), tâm đường tròn ngoại tiếp và nội tiếp.',
    theory: [
      'Ba đường trung tuyến của tam giác đồng quy tại một điểm gọi là TRỌNG TÂM (G). Điểm đó cách mỗi đỉnh một khoảng bằng 2/3 độ dài đường trung tuyến đi qua đỉnh đó: AG = 2/3 AM.',
      'Ba đường cao đồng quy tại một điểm gọi là TRỰC TÂM (H).',
      'Ba đường phân giác đồng quy tại điểm cách đều 3 cạnh (tâm đường tròn nội tiếp).',
      'Ba đường trung trực đồng quy tại điểm cách đều 3 đỉnh (tâm đường tròn ngoại tiếp).'
    ],
    formulas: [
      {
        title: 'Tỉ lệ trọng tâm tam giác',
        formula: 'AG = 2/3 AM  và  GM = 1/3 AM',
        explanation: 'M là trung điểm của BC.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính độ dài đoạn thẳng qua trọng tâm',
        description: 'Cho AM = 9 cm, G là trọng tâm tam giác ABC. Tính AG: AG = (2/3) . 9 = 6 cm.',
        mathSnippet: 'AG = 6 cm ; GM = 3 cm'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q7-11'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG X ==========================
  {
    id: 'kntt-7-bai-36-37',
    grade: 7,
    bookVolume: 2,
    chapter: 'Chương X. Một số hình khối trong thực tiễn',
    lessonNumber: 36,
    topic: 'Hình học',
    title: 'Bài 36 & 37. Hình lăng trụ đứng tam giác và tứ giác',
    objective: 'Tính diện tích xung quanh và thể tích hình lăng trụ đứng tam giác, tứ giác.',
    theory: [
      'Hình lăng trụ đứng tam giác (tứ giác) có hai mặt đáy song song và bằng nhau; các mặt bên là những hình chữ nhật.',
      'Diện tích xung quanh: Sxq = C . h (C là chu vi đáy, h là chiều cao lăng trụ).',
      'Thể tích hình lăng trụ đứng: V = Sđáy . h.'
    ],
    formulas: [
      {
        title: 'Thể tích hình lăng trụ đứng',
        formula: 'V = Sđáy . h',
        explanation: 'Diện tích mặt đáy nhân chiều cao lăng trụ.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính thể tích lăng trụ tam giác',
        description: 'Đáy là tam giác có diện tích 15 cm², chiều cao lăng trụ h = 10 cm. Tính thể tích: V = 15 . 10 = 150 cm³.',
        mathSnippet: 'V = 150 cm³'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q7-12'],
    xpReward: 50
  }
];
