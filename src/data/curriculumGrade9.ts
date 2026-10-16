import { Lesson } from '../types/mathverse';

export const CURRICULUM_GRADE_9: Lesson[] = [
  // ========================== TẬP 1: CHƯƠNG I ==========================
  {
    id: 'kntt-9-bai-1-2',
    grade: 9,
    bookVolume: 1,
    chapter: 'Chương I. Phương trình và hệ hai phương trình bậc nhất hai ẩn',
    lessonNumber: 1,
    topic: 'Đại số',
    title: 'Bài 1 & 2. Hệ hai phương trình bậc nhất hai ẩn & Cách giải',
    objective: 'Giải hệ phương trình bậc nhất hai ẩn bằng phương pháp thế và phương pháp cộng đại số.',
    theory: [
      'Phương trình bậc nhất hai ẩn x và y có dạng: ax + by = c (a, b không đồng thời bằng 0). Có vô số nghiệm, biểu diễn hình học là một đường thẳng.',
      'Hệ hai phương trình bậc nhất hai ẩn: { ax + by = c ; a\'x + b\'y = c\' }.',
      'Phương pháp thế: Rút một ẩn từ một phương trình rồi thế vào phương trình còn lại để được phương trình một ẩn.',
      'Phương pháp cộng đại số: Nhân hai vế của mỗi phương trình với số thích hợp sao cho hệ số của một ẩn bằng nhau (hoặc đối nhau), rồi cộng (hoặc trừ) từng vế của hai phương trình.'
    ],
    formulas: [
      {
        title: 'Hệ hai phương trình bậc nhất hai ẩn',
        formula: '{ ax + by = c ; a\'x + b\'y = c\' }',
        explanation: 'Nghiệm chung (x₀; y₀) là tọa độ giao điểm của hai đường thẳng.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Giải bằng phương pháp cộng đại số',
        description: 'Giải hệ: { 2x + y = 7 ; x - y = 2 }. Vì hệ số của y đối nhau (+1 và -1), cộng hai vế: (2x + x) = 7 + 2 => 3x = 9 => x = 3.',
        mathSnippet: '3x = 9 => x = 3'
      },
      {
        title: 'Bước 2: Tìm giá trị ẩn còn lại',
        description: 'Thay x = 3 vào phương trình x - y = 2 => 3 - y = 2 => y = 1. Nghiệm: (3; 1).',
        mathSnippet: '(x; y) = (3; 1)'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-1'],
    xpReward: 50
  },
  {
    id: 'kntt-9-bai-3',
    grade: 9,
    bookVolume: 1,
    chapter: 'Chương I. Phương trình và hệ hai phương trình bậc nhất hai ẩn',
    lessonNumber: 3,
    topic: 'Đại số',
    title: 'Bài 3. Giải bài toán bằng cách lập hệ phương trình',
    objective: 'Chọn hai ẩn số, đặt điều kiện, biểu diễn các đại lượng và lập hệ phương trình.',
    theory: [
      'Bước 1: Lập hệ phương trình:\n  + Chọn hai ẩn số và đặt điều kiện thích hợp cho chúng.\n  + Biểu diễn các đại lượng chưa biết theo các ẩn và đại lượng đã biết.\n  + Lập hai phương trình biểu thị mối quan hệ giữa các đại lượng.',
      'Bước 2: Giải hệ phương trình đã lập.',
      'Bước 3: Trả lời: Kiểm tra nghiệm có thỏa mãn điều kiện bài toán hay không rồi kết luận.'
    ],
    formulas: [
      {
        title: 'Quy trình giải bài toán bằng lập hệ phương trình',
        formula: 'Chọn ẩn -> Lập hệ 2 PT -> Giải hệ -> Đối chiếu ĐK',
        explanation: 'Áp dụng cho bài toán chuyển động, năng suất, quan hệ số, phần trăm.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Lập hệ phương trình',
        description: 'Hai số có tổng bằng 1006 và hiệu bằng 124: { x + y = 1006 ; x - y = 124 }.',
        mathSnippet: '2x = 1130 => x = 565 ; y = 441'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-2'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG II ==========================
  {
    id: 'kntt-9-bai-4-6',
    grade: 9,
    bookVolume: 1,
    chapter: 'Chương II. Phương trình và bất phương trình bậc nhất một ẩn',
    lessonNumber: 4,
    topic: 'Đại số',
    title: 'Bài 4 - 6. Bất đẳng thức & Bất phương trình bậc nhất một ẩn',
    objective: 'Nắm chắc tính chất bất đẳng thức, giải bất phương trình bậc nhất ax + b < 0 (nhớ đổi chiều khi nhân chia số âm).',
    theory: [
      'Khi cộng cùng một số vào hai vế của một bất đẳng thức, ta được bất đẳng thức mới cùng chiều: a < b => a + c < b + c.',
      'Khi nhân cả hai vế với số dương: Bất đẳng thức giữ nguyên chiều: a < b và c > 0 => ac < bc.',
      'Khi nhân cả hai vế với số âm: BẤT ĐẲNG THỨC ĐỔI CHIỀU: a < b và c < 0 => ac > bc (QUY TẮC CỰC KỲ QUAN TRỌNG!).'
    ],
    formulas: [
      {
        title: 'Quy tắc nhân với số âm',
        formula: 'a < b  và  c < 0  =>  ac > bc',
        explanation: 'Đảo ngược chiều dấu bất đẳng thức khi nhân/chia với số âm.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Giải bất phương trình có hệ số âm',
        description: 'Giải: -2x + 6 < 0 => -2x < -6. Chia cả hai vế cho -2 (số âm nên đổi chiều): x > 3.',
        mathSnippet: 'x > 3'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-3'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG III ==========================
  {
    id: 'kntt-9-bai-7-9',
    grade: 9,
    bookVolume: 1,
    chapter: 'Chương III. Căn bậc hai và căn bậc ba',
    lessonNumber: 7,
    topic: 'Đại số',
    title: 'Bài 7 - 9. Căn bậc hai & Rút gọn biểu thức chứa căn',
    objective: 'Vận dụng hằng đẳng thức √(A²) = |A|, đưa thừa số ra ngoài/vào trong căn và trục căn thức ở mẫu.',
    theory: [
      'Căn thức bậc hai √(A) xác định (có nghĩa) khi và chỉ khi A ≥ 0.',
      'Hằng đẳng thức: √(A²) = |A| (bằng A nếu A ≥ 0, bằng -A nếu A < 0).',
      'Khai phương một tích: √(A . B) = √A . √B (với A, B ≥ 0).',
      'Đưa thừa số ra ngoài dấu căn: √(A²B) = |A|√B (với B ≥ 0).',
      'Trục căn thức ở mẫu: Dùng biểu thức liên hợp (√A - √B)(√A + √B) = A - B.'
    ],
    formulas: [
      {
        title: 'Hằng đẳng thức căn bậc hai',
        formula: '√(A²) = |A|',
        explanation: 'Luôn phải lấy giá trị tuyệt đối.'
      },
      {
        title: 'Trục căn thức bằng liên hợp',
        formula: 'C / (√A + B) = C(√A - B) / (A - B²)',
        explanation: 'Khử dấu căn ở mẫu thức.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Rút gọn biểu thức căn chứa bình phương',
        description: 'Tính: √(1 - √2)² = |1 - √2|. Vì 1 < √2 nên 1 - √2 < 0 => |1 - √2| = √2 - 1.',
        mathSnippet: '√(1 - √2)² = √2 - 1'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-4'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG IV ==========================
  {
    id: 'kntt-9-bai-11-12',
    grade: 9,
    bookVolume: 1,
    chapter: 'Chương IV. Hệ thức lượng trong tam giác vuông',
    lessonNumber: 11,
    topic: 'Hình học',
    title: 'Bài 11 & 12. Tỉ số lượng giác góc nhọn & Giải tam giác vuông',
    objective: 'Ghi nhớ định nghĩa sin, cos, tan, cot trong tam giác vuông và hệ thức giữa cạnh và góc.',
    theory: [
      'Trong tam giác vuông: \n  + sin α = Đối / Huyền (sin đi học)\n  + cos α = Kề / Huyền (cos khóc khóc)\n  + tan α = Đối / Kề (tan đoàn kết)\n  + cot α = Kề / Đối (cot kết đoàn).',
      'Hai góc phụ nhau (α + β = 90°): sin α = cos β ; tan α = cot β.',
      'Hệ thức cạnh và góc: Cạnh góc vuông = (Cạnh huyền) . sin(góc đối) = (Cạnh huyền) . cos(góc kề).'
    ],
    formulas: [
      {
        title: 'Hệ thức cạnh góc vuông',
        formula: 'b = a . sin B = a . cos C',
        explanation: 'a là cạnh huyền, b là cạnh góc vuông.'
      },
      {
        title: 'Công thức lượng giác cơ bản',
        formula: 'sin²α + cos²α = 1  và  tanα . cotα = 1',
        explanation: 'Áp dụng cho mọi góc nhọn α.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính cạnh đối diện theo sin',
        description: 'Tam giác vuông có cạnh huyền a = 10 cm, góc B = 30°. Cạnh đối AC = 10 . sin 30° = 10 . (1/2) = 5 cm.',
        mathSnippet: 'b = 10 . sin 30° = 5 cm'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q9-5'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG V ==========================
  {
    id: 'kntt-9-bai-13-16',
    grade: 9,
    bookVolume: 1,
    chapter: 'Chương V. Đường tròn',
    lessonNumber: 13,
    topic: 'Hình học',
    title: 'Bài 13 - 16. Dây cung, Độ dài cung tròn & Tiếp tuyến',
    objective: 'Nắm vững quan hệ đường kính và dây cung, dấu hiệu nhận biết tiếp tuyến và tính chất hai tiếp tuyến cắt nhau.',
    theory: [
      'Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy.',
      'Định lý tiếp tuyến: Nếu một đường thẳng là tiếp tuyến của một đường tròn thì nó vuông góc với bán kính đi qua tiếp điểm.',
      'Tính chất hai tiếp tuyến cắt nhau: Nếu hai tiếp tuyến của đường tròn (O) cắt nhau tại M thì M cách đều hai tiếp điểm (MA = MB); tia MO là phân giác của góc AMB.',
      'Độ dài cung tròn n°: l = (π . R . n) / 180. Diện tích hình quạt tròn: Sq = (π . R² . n) / 360 = (l . R) / 2.'
    ],
    formulas: [
      {
        title: 'Độ dài cung tròn n°',
        formula: 'l = (π . R . n) / 180',
        explanation: 'R là bán kính, n là số đo độ của cung.'
      },
      {
        title: 'Diện tích hình quạt tròn',
        formula: 'Sq = (π . R² . n) / 360',
        explanation: 'Diện tích phần hình tròn giới hạn bởi cung n°.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính diện tích hình quạt tròn',
        description: 'Đường tròn R = 6 cm, góc ở tâm 60°. Sq = (π . 6² . 60) / 360 = 6π cm².',
        mathSnippet: 'Sq = 6π cm²'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q9-6'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VI ==========================
  {
    id: 'kntt-9-bai-18',
    grade: 9,
    bookVolume: 2,
    chapter: 'Chương VI. Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn',
    lessonNumber: 18,
    topic: 'Đại số',
    title: 'Bài 18. Hàm số y = ax² (a ≠ 0)',
    objective: 'Vẽ đồ thị parabol y = ax²; hiểu tính đối xứng qua trục Oy và đỉnh O(0; 0).',
    theory: [
      'Hàm số y = ax² (a ≠ 0) xác định với mọi giá trị x ∈ ℝ.',
      'Đồ thị là một đường cong đi qua gốc toạ độ O, nhận trục Oy làm trục đối xứng, gọi là parabol với đỉnh O(0; 0).',
      'Nếu a > 0: Đồ thị nằm phía trên trục hoành, O là điểm thấp nhất.',
      'Nếu a < 0: Đồ thị nằm phía dưới trục hoành, O là điểm cao nhất.'
    ],
    formulas: [
      {
        title: 'Hàm số bậc hai dạng đơn giản',
        formula: 'y = ax²  (a ≠ 0)',
        explanation: 'Đồ thị là đường cong parabol đỉnh O(0; 0).'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Lập bảng giá trị 5 điểm đối xứng',
        description: 'Vẽ y = 2x²: Lấy x = -2, -1, 0, 1, 2 tương ứng y = 8, 2, 0, 2, 8.',
        mathSnippet: 'Các điểm: (-2; 8), (-1; 2), (0; 0), (1; 2), (2; 8)'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-7'],
    xpReward: 50
  },
  {
    id: 'kntt-9-bai-19',
    grade: 9,
    bookVolume: 2,
    chapter: 'Chương VI. Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn',
    lessonNumber: 19,
    topic: 'Đại số',
    title: 'Bài 19. Phương trình bậc hai một ẩn',
    objective: 'Nắm chắc công thức nghiệm tổng quát qua biệt thức Δ = b² - 4ac và công thức nghiệm thu gọn Δ\'.',
    theory: [
      'Phương trình bậc hai một ẩn: ax² + bx + c = 0 (a ≠ 0).',
      'Biệt thức: Δ = b² - 4ac.\n  + Nếu Δ > 0: Có hai nghiệm phân biệt x₁,₂ = (-b ± √Δ) / (2a).\n  + Nếu Δ = 0: Có nghiệm kép x₁ = x₂ = -b / (2a).\n  + Nếu Δ < 0: Phương trình vô nghiệm.',
      'Nếu a và c trái dấu (a . c < 0) thì Δ luôn dương, phương trình luôn có hai nghiệm phân biệt.'
    ],
    formulas: [
      {
        title: 'Biệt thức Delta',
        formula: 'Δ = b² - 4ac',
        explanation: 'Cơ sở xác định số nghiệm của phương trình bậc hai.'
      },
      {
        title: 'Công thức nghiệm tổng quát',
        formula: 'x₁,₂ = (-b ± √Δ) / 2a',
        explanation: 'Khi Δ > 0.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Xác định hệ số a, b, c và tính Δ',
        description: 'Giải: 2x² - 5x + 2 = 0. a = 2, b = -5, c = 2. Δ = (-5)² - 4 . 2 . 2 = 25 - 16 = 9 > 0.',
        mathSnippet: '√Δ = √9 = 3'
      },
      {
        title: 'Bước 2: Tính hai nghiệm',
        description: 'x₁ = (5 + 3) / 4 = 2 ; x₂ = (5 - 3) / 4 = 1/2.',
        mathSnippet: 'x₁ = 2 ; x₂ = 1/2'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-8'],
    xpReward: 50
  },
  {
    id: 'kntt-9-bai-20-21',
    grade: 9,
    bookVolume: 2,
    chapter: 'Chương VI. Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn',
    lessonNumber: 20,
    topic: 'Đại số',
    title: 'Bài 20 & 21. Định lí Viète và Ứng dụng',
    objective: 'Vận dụng định lí Viète để nhẩm nghiệm và tìm hai số khi biết tổng S và tích P.',
    theory: [
      'Định lí Viète: Nếu x₁, x₂ là hai nghiệm của phương trình ax² + bx + c = 0 (a ≠ 0) thì:\n  x₁ + x₂ = -b/a\n  x₁ . x₂ = c/a.',
      'Nhẩm nghiệm đặc biệt:\n  + Nếu a + b + c = 0 thì phương trình có nghiệm x₁ = 1, x₂ = c/a.\n  + Nếu a - b + c = 0 thì phương trình có nghiệm x₁ = -1, x₂ = -c/a.',
      'Tìm hai số biết tổng S và tích P: Hai số đó là nghiệm của phương trình: X² - SX + P = 0 (Điều kiện: S² - 4P ≥ 0).'
    ],
    formulas: [
      {
        title: 'Định lí Viète',
        formula: 'x₁ + x₂ = -b/a  và  x₁ . x₂ = c/a',
        explanation: 'Quan hệ giữa các nghiệm và hệ số của phương trình bậc hai.'
      },
      {
        title: 'Tìm hai số biết tổng S và tích P',
        formula: 'X² - SX + P = 0  (S² - 4P ≥ 0)',
        explanation: 'Lập phương trình bậc hai để tìm nghiệm.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Áp dụng nhẩm nghiệm',
        description: 'Phương trình: x² - 7x + 6 = 0 có a = 1, b = -7, c = 6. Ta thấy a + b + c = 1 - 7 + 6 = 0.',
        mathSnippet: 'x₁ = 1 ; x₂ = c/a = 6'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q9-9'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG IX ==========================
  {
    id: 'kntt-9-bai-27',
    grade: 9,
    bookVolume: 2,
    chapter: 'Chương IX. Đường tròn ngoại tiếp và đường tròn nội tiếp',
    lessonNumber: 27,
    topic: 'Hình học',
    title: 'Bài 27. Góc nội tiếp',
    objective: 'Hiểu định nghĩa góc nội tiếp, mối liên hệ với cung bị chắn và tính chất góc chắn nửa đường tròn.',
    theory: [
      'Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó. Cung nằm bên trong góc gọi là cung bị chắn.',
      'Định lý: Trong một đường tròn, số đo của góc nội tiếp bằng nửa số đo của cung bị chắn.',
      'Hệ quả:\n  + Các góc nội tiếp cùng chắn một cung (hoặc chắn các cung bằng nhau) thì bằng nhau.\n  + Góc nội tiếp (nhỏ hơn hoặc bằng 90°) có số đo bằng nửa số đo của góc ở tâm cùng chắn một cung.\n  + Góc nội tiếp chắn nửa đường tròn là GÓC VUÔNG (90°).'
    ],
    formulas: [
      {
        title: 'Số đo góc nội tiếp',
        formula: 'Góc nội tiếp = 1/2 Số đo cung bị chắn',
        explanation: 'Bằng một nửa số đo góc ở tâm cùng chắn cung.'
      },
      {
        title: 'Góc chắn nửa đường tròn',
        formula: '∠ACB = 90°',
        explanation: 'AB là đường kính của đường tròn.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính góc nội tiếp từ cung bị chắn',
        description: 'Cho góc ở tâm ∠AOB = 80°. Góc nội tiếp ∠ACB cùng chắn cung AB có số đo bằng: 80° / 2 = 40°.',
        mathSnippet: '∠ACB = 40°'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q9-10'],
    xpReward: 50
  },
  {
    id: 'kntt-9-bai-29',
    grade: 9,
    bookVolume: 2,
    chapter: 'Chương IX. Đường tròn ngoại tiếp và đường tròn nội tiếp',
    lessonNumber: 29,
    topic: 'Hình học',
    title: 'Bài 29. Tứ giác nội tiếp',
    objective: 'Nắm vững định nghĩa tứ giác nội tiếp và định lý tổng hai góc đối diện bằng 180°.',
    theory: [
      'Tứ giác có bốn đỉnh nằm trên một đường tròn được gọi là tứ giác nội tiếp đường tròn.',
      'Định lý: Trong một tứ giác nội tiếp, tổng số đo hai góc đối diện bằng 180°: ∠A + ∠C = 180° ; ∠B + ∠D = 180°.',
      'Dấu hiệu nhận biết tứ giác nội tiếp:\n  + Tứ giác có tổng hai góc đối diện bằng 180°.\n  + Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.\n  + Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau.\n  + Hình chữ nhật, hình vuông, hình thang cân luôn nội tiếp đường tròn.'
    ],
    formulas: [
      {
        title: 'Định lý hai góc đối tứ giác nội tiếp',
        formula: '∠A + ∠C = 180°  và  ∠B + ∠D = 180°',
        explanation: 'Hai góc đối nhau bù nhau.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính góc đối trong tứ giác nội tiếp',
        description: 'Cho tứ giác ABCD nội tiếp đường tròn (O), biết góc A = 70°. Tính góc C: ∠C = 180° - 70° = 110°.',
        mathSnippet: '∠C = 180° - 70° = 110°'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q9-11'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG X ==========================
  {
    id: 'kntt-9-bai-31-32',
    grade: 9,
    bookVolume: 2,
    chapter: 'Chương X. Một số hình khối trong thực tiễn',
    lessonNumber: 31,
    topic: 'Hình học',
    title: 'Bài 31 & 32. Hình trụ, Hình nón & Hình cầu',
    objective: 'Tính diện tích xung quanh, diện tích toàn phần và thể tích của hình trụ, hình nón, hình cầu.',
    theory: [
      'Hình trụ: Sxq = 2πRh ; V = πR²h (R là bán kính đáy, h là chiều cao).',
      'Hình nón: Sxq = πRl (l là đường sinh: l² = h² + R²) ; V = 1/3 πR²h.',
      'Hình cầu: Diện tích mặt cầu S = 4πR² ; Thể tích hình cầu V = 4/3 πR³.'
    ],
    formulas: [
      {
        title: 'Thể tích hình trụ',
        formula: 'V = πR²h',
        explanation: 'Diện tích đáy hình tròn nhân chiều cao.'
      },
      {
        title: 'Thể tích hình nón',
        formula: 'V = 1/3 πR²h',
        explanation: 'Bằng một phần ba thể tích hình trụ cùng đáy và chiều cao.'
      },
      {
        title: 'Thể tích hình cầu',
        formula: 'V = 4/3 πR³',
        explanation: 'R là bán kính mặt cầu.'
      },
      {
        title: 'Diện tích mặt cầu',
        formula: 'S = 4πR²',
        explanation: 'Diện tích toàn bộ bề mặt hình cầu.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính thể tích hình nón',
        description: 'Hình nón có bán kính đáy R = 6 cm, chiều cao h = 8 cm. V = 1/3 . π . 6² . 8 = 96π cm³.',
        mathSnippet: 'V = 96π cm³ ≈ 301,6 cm³'
      },
      {
        title: 'Bước 2: Tính diện tích mặt cầu',
        description: 'Mặt cầu có bán kính R = 3 cm. S = 4 . π . 3² = 36π cm².',
        mathSnippet: 'S = 36π cm²'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q9-12'],
    xpReward: 50
  }
];
