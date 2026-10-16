import { Lesson } from '../types/mathverse';

export const CURRICULUM_GRADE_8: Lesson[] = [
  // ========================== TẬP 1: CHƯƠNG I ==========================
  {
    id: 'kntt-8-bai-1-2',
    grade: 8,
    bookVolume: 1,
    chapter: 'Chương I. Đa thức',
    lessonNumber: 1,
    topic: 'Đại số',
    title: 'Bài 1 & 2. Đơn thức & Đa thức nhiều biến',
    objective: 'Nhận biết đơn thức, đa thức thu gọn; xác định bậc và cộng trừ các đơn thức đồng dạng.',
    theory: [
      'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.',
      'Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó.',
      'Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến.',
      'Đa thức là tổng của những đơn thức. Mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.'
    ],
    formulas: [
      {
        title: 'Bậc của đơn thức',
        formula: 'Bậc của xᵃ . yᵇ . zᶜ = a + b + c',
        explanation: 'Tổng số mũ của tất cả các biến.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Xác định bậc đơn thức',
        description: 'Đơn thức A = 2x³y²z có bậc là 3 + 2 + 1 = 6; hệ số là 2; phần biến là x³y²z.',
        mathSnippet: 'Bậc = 3 + 2 + 1 = 6'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q8-1'],
    xpReward: 50
  },
  {
    id: 'kntt-8-bai-3-5',
    grade: 8,
    bookVolume: 1,
    chapter: 'Chương I. Đa thức',
    lessonNumber: 3,
    topic: 'Đại số',
    title: 'Bài 3 - 5. Các phép tính nhân chia đa thức',
    objective: 'Nhân đơn thức với đa thức, đa thức với đa thức; chia đa thức cho đơn thức.',
    theory: [
      'Nhân đơn thức với đa thức: A(B + C) = AB + AC.',
      'Nhân đa thức với đa thức: (A + B)(C + D) = AC + AD + BC + BD.',
      'Chia đa thức cho đơn thức: Chia từng hạng tử của đa thức cho đơn thức rồi cộng các kết quả với nhau.'
    ],
    formulas: [
      {
        title: 'Nhân đa thức với đa thức',
        formula: '(A + B)(C + D) = AC + AD + BC + BD',
        explanation: 'Nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Thực hiện nhân từng hạng tử',
        description: 'Khai triển: (x + 3)(2x - 1) = x . 2x - x . 1 + 3 . 2x - 3 . 1 = 2x² + 5x - 3.',
        mathSnippet: '2x² - x + 6x - 3 = 2x² + 5x - 3'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q8-2'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG II ==========================
  {
    id: 'kntt-8-bai-6-8',
    grade: 8,
    bookVolume: 1,
    chapter: 'Chương II. Hằng đẳng thức đáng nhớ và ứng dụng',
    lessonNumber: 6,
    topic: 'Đại số',
    title: 'Bài 6 - 8. Bảy hằng đẳng thức đáng nhớ',
    objective: 'Ghi nhớ và biến đổi thành thạo 7 hằng đẳng thức cơ bản để tính nhanh và rút gọn.',
    theory: [
      '1. Bình phương của một tổng: (A + B)² = A² + 2AB + B².',
      '2. Bình phương của một hiệu: (A - B)² = A² - 2AB + B².',
      '3. Hiệu hai bình phương: A² - B² = (A - B)(A + B).',
      '4. Lập phương của một tổng: (A + B)³ = A³ + 3A²B + 3AB² + B³.',
      '5. Lập phương của một hiệu: (A - B)³ = A³ - 3A²B + 3AB² - B³.',
      '6. Tổng hai lập phương: A³ + B³ = (A + B)(A² - AB + B²).',
      '7. Hiệu hai lập phương: A³ - B³ = (A - B)(A² + AB + B²).'
    ],
    formulas: [
      {
        title: 'Hiệu hai bình phương',
        formula: 'A² - B² = (A - B)(A + B)',
        explanation: 'Dùng để tính nhanh và phân tích thành nhân tử.'
      },
      {
        title: 'Bình phương của tổng và hiệu',
        formula: '(A ± B)² = A² ± 2AB + B²',
        explanation: 'Hằng đẳng thức thường dùng nhất.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính nhanh bằng hiệu hai bình phương',
        description: '102² - 4 = 102² - 2² = (102 - 2)(102 + 2) = 100 . 104 = 10 400.',
        mathSnippet: '102² - 2² = 100 . 104 = 10 400'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q8-3'],
    xpReward: 50
  },
  {
    id: 'kntt-8-bai-9',
    grade: 8,
    bookVolume: 1,
    chapter: 'Chương II. Hằng đẳng thức đáng nhớ và ứng dụng',
    lessonNumber: 9,
    topic: 'Đại số',
    title: 'Bài 9. Phân tích đa thức thành nhân tử',
    objective: 'Áp dụng các phương pháp: đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử.',
    theory: [
      'Phân tích đa thức thành nhân tử (thừa số) là biến đổi đa thức đó thành tích của những đa thức.',
      'Các phương pháp thường dùng:\n  + Phương pháp đặt nhân tử chung: A . B + A . C = A(B + C).\n  + Phương pháp dùng hằng đẳng thức.\n  + Phương pháp nhóm hạng tử.'
    ],
    formulas: [
      {
        title: 'Đặt nhân tử chung',
        formula: 'A . B + A . C = A(B + C)',
        explanation: 'Tìm thừa số chung của tất cả các hạng tử.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Nhận diện hằng đẳng thức',
        description: 'Phân tích: x² - 4x + 4 = x² - 2 . x . 2 + 2² = (x - 2)².',
        mathSnippet: 'x² - 4x + 4 = (x - 2)²'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q8-4'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG III ==========================
  {
    id: 'kntt-8-bai-10-14',
    grade: 8,
    bookVolume: 1,
    chapter: 'Chương III. Tứ giác',
    lessonNumber: 10,
    topic: 'Hình học',
    title: 'Bài 10 - 14. Các loại tứ giác: Hình bình hành, Chữ nhật, Thoi, Vuông',
    objective: 'Nắm chắc định nghĩa, tính chất đường chéo và dấu hiệu nhận biết các loại tứ giác đặc biệt.',
    theory: [
      'Định lý: Tổng các góc trong một tứ giác bằng 360°.',
      'Hình thang cân: Có hai góc kề một đáy bằng nhau hoặc hai đường chéo bằng nhau.',
      'Hình bình hành: Các cạnh đối song song, bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường.',
      'Hình chữ nhật: Tứ giác có 4 góc vuông; hai đường chéo bằng nhau và cắt nhau tại trung điểm.',
      'Hình thoi: Tứ giác có 4 cạnh bằng nhau; hai đường chéo vuông góc tại trung điểm và là phân giác các góc.',
      'Hình vuông: Tứ giác vừa là hình chữ nhật vừa là hình thoi (4 cạnh bằng nhau và 4 góc vuông).'
    ],
    formulas: [
      {
        title: 'Tổng các góc của tứ giác',
        formula: '∠A + ∠B + ∠C + ∠D = 360°',
        explanation: 'Áp dụng cho mọi tứ giác lồi.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Nhận biết hình thoi',
        description: 'Hình bình hành có hai đường chéo vuông góc là hình thoi.',
        mathSnippet: 'ABCD là HBH và AC ⊥ BD => ABCD là hình thoi'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q8-5'],
    xpReward: 50
  },

  // ========================== TẬP 1: CHƯƠNG IV ==========================
  {
    id: 'kntt-8-bai-15-17',
    grade: 8,
    bookVolume: 1,
    chapter: 'Chương IV. Định lí Thalès',
    lessonNumber: 15,
    topic: 'Hình học',
    title: 'Bài 15 - 17. Định lí Thalès & Đường trung bình tam giác',
    objective: 'Vận dụng định lí Thalès thuận, đảo, hệ quả và tính chất đường trung bình, đường phân giác.',
    theory: [
      'Định lí Thalès: Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.',
      'Hệ quả: Nếu một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới có ba cạnh tương ứng tỉ lệ với ba cạnh của tam giác đã cho: AM/AB = AN/AC = MN/BC.',
      'Đường trung bình của tam giác song song với cạnh thứ ba và bằng nửa cạnh đó: MN = 1/2 BC.'
    ],
    formulas: [
      {
        title: 'Hệ quả định lí Thalès',
        formula: 'AM / AB = AN / AC = MN / BC',
        explanation: 'Khi MN // BC (M ∈ AB, N ∈ AC).'
      },
      {
        title: 'Độ dài đường trung bình',
        formula: 'MN = 1/2 BC',
        explanation: 'M, N là trung điểm AB, AC.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Lập tỉ số Thalès',
        description: 'Cho MN // BC. Biết AM = 4, AB = 10, MN = 6. Tính BC: AM/AB = MN/BC => 4/10 = 6/BC => BC = 15 cm.',
        mathSnippet: 'BC = (10 . 6) / 4 = 15 cm'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q8-6'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VI ==========================
  {
    id: 'kntt-8-bai-21-24',
    grade: 8,
    bookVolume: 2,
    chapter: 'Chương VI. Phân thức đại số',
    lessonNumber: 21,
    topic: 'Đại số',
    title: 'Bài 21 - 24. Phân thức đại số & Các phép tính',
    objective: 'Tìm điều kiện xác định, rút gọn phân thức đại số và thực hiện các phép tính cộng, trừ, nhân, chia.',
    theory: [
      'Phân thức đại số là biểu thức có dạng A/B, trong đó A, B là những đa thức và B khác đa thức 0.',
      'Điều kiện xác định của phân thức A/B là giá trị của biến để mẫu thức B khác 0 (B ≠ 0).',
      'Tính chất cơ bản: A/B = (A . M) / (B . M) (M ≠ 0) và A/B = (A : N) / (B : N) (N là nhân tử chung).'
    ],
    formulas: [
      {
        title: 'Điều kiện xác định',
        formula: 'B(x) ≠ 0',
        explanation: 'Mẫu thức của phân thức phải khác 0.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tìm ĐKXĐ của phân thức',
        description: 'Tìm ĐKXĐ của (2x + 1)/(x - 5): Cho mẫu thức x - 5 ≠ 0 => x ≠ 5.',
        mathSnippet: 'ĐKXĐ: x ≠ 5'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q8-7'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG VII ==========================
  {
    id: 'kntt-8-bai-25-29',
    grade: 8,
    bookVolume: 2,
    chapter: 'Chương VII. Phương trình bậc nhất và hàm số bậc nhất',
    lessonNumber: 25,
    topic: 'Đại số',
    title: 'Bài 25 - 29. Phương trình bậc nhất & Hàm số y = ax + b',
    objective: 'Giải phương trình ax + b = 0; vẽ đồ thị hàm số bậc nhất và hiểu ý nghĩa hệ số góc a.',
    theory: [
      'Phương trình bậc nhất một ẩn: ax + b = 0 (a ≠ 0) có nghiệm duy nhất x = -b/a.',
      'Hàm số bậc nhất có dạng y = ax + b (a ≠ 0). Đồ thị là một đường thẳng.',
      'Hệ số góc a: Khi a > 0 thì góc tạo bởi đường thẳng và trục Ox là góc nhọn (hàm số đồng biến). Khi a < 0 thì góc đó là góc tù (hàm số nghịch biến).',
      'Hai đường thẳng y = ax + b và y = a\'x + b\' song song khi a = a\' và b ≠ b\'; cắt nhau khi a ≠ a\'.'
    ],
    formulas: [
      {
        title: 'Nghiệm phương trình bậc nhất',
        formula: 'x = -b / a',
        explanation: 'Nghiệm duy nhất khi a ≠ 0.'
      },
      {
        title: 'Hai đường thẳng song song',
        formula: 'a = a\'  và  b ≠ b\'',
        explanation: 'Cùng hệ số góc và khác tung độ gốc.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Giải phương trình bậc nhất',
        description: '5x - 15 = 0 => 5x = 15 => x = 3.',
        mathSnippet: 'x = 3'
      }
    ],
    visualType: 'equation',
    practiceQuestionIds: ['q8-8'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG IX ==========================
  {
    id: 'kntt-8-bai-33-36',
    grade: 8,
    bookVolume: 2,
    chapter: 'Chương IX. Tam giác đồng dạng',
    lessonNumber: 33,
    topic: 'Hình học',
    title: 'Bài 33 - 36. Các trường hợp đồng dạng của tam giác & Tam giác vuông',
    objective: 'Chứng minh hai tam giác đồng dạng (c-c-c, c-g-c, g-g) và áp dụng định lí Pythagore.',
    theory: [
      'Hai tam giác đồng dạng nếu các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ: ΔA\'B\'C\' ∽ ΔABC theo tỉ số k.',
      'Trường hợp 1 (c-c-c): Ba cặp cạnh tương ứng tỉ lệ.',
      'Trường hợp 2 (c-g-c): Hai cặp cạnh tương ứng tỉ lệ và góc xen giữa bằng nhau.',
      'Trường hợp 3 (g-g): Hai cặp góc tương ứng bằng nhau.',
      'Tỉ số chu vi bằng tỉ số đồng dạng k; tỉ số diện tích bằng bình phương tỉ số đồng dạng k².'
    ],
    formulas: [
      {
        title: 'Tỉ số diện tích hai tam giác đồng dạng',
        formula: 'S₁ / S₂ = k²',
        explanation: 'Bằng bình phương tỉ số đồng dạng.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính tỉ số diện tích',
        description: 'Hai tam giác đồng dạng theo tỉ số k = 3. Tỉ số diện tích là k² = 3² = 9.',
        mathSnippet: 'S₁/S₂ = 9'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q8-9'],
    xpReward: 50
  },

  // ========================== TẬP 2: CHƯƠNG X ==========================
  {
    id: 'kntt-8-bai-38-39',
    grade: 8,
    bookVolume: 2,
    chapter: 'Chương X. Một số hình khối trong thực tiễn',
    lessonNumber: 38,
    topic: 'Hình học',
    title: 'Bài 38 & 39. Hình chóp tam giác đều & Hình chóp tứ giác đều',
    objective: 'Mô tả đỉnh, cạnh bên, mặt đáy, trung đoạn và tính diện tích xung quanh, thể tích hình chóp.',
    theory: [
      'Hình chóp tam giác đều có mặt đáy là tam giác đều, các mặt bên là các tam giác cân bằng nhau chung đỉnh.',
      'Hình chóp tứ giác đều có mặt đáy là hình vuông, các mặt bên là các tam giác cân bằng nhau chung đỉnh.',
      'Diện tích xung quanh: Sxq = p . d (p là nửa chu vi đáy, d là độ dài trung đoạn).',
      'Thể tích hình chóp đều: V = 1/3 . Sđáy . h (h là chiều cao hình chóp).'
    ],
    formulas: [
      {
        title: 'Diện tích xung quanh hình chóp đều',
        formula: 'Sxq = p . d',
        explanation: 'p là nửa chu vi đáy, d là độ dài trung đoạn.'
      },
      {
        title: 'Thể tích hình chóp đều',
        formula: 'V = 1/3 . Sđáy . h',
        explanation: 'Một phần ba diện tích đáy nhân chiều cao.'
      }
    ],
    steps: [
      {
        title: 'Bước 1: Tính thể tích hình chóp tứ giác đều',
        description: 'Đáy là hình vuông cạnh 6 cm (Sđáy = 36 cm²), chiều cao h = 4 cm. V = 1/3 . 36 . 4 = 48 cm³.',
        mathSnippet: 'V = 1/3 . 36 . 4 = 48 cm³'
      }
    ],
    visualType: 'geometry',
    practiceQuestionIds: ['q8-10'],
    xpReward: 50
  }
];
