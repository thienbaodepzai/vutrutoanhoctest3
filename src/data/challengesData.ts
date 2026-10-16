import { Challenge } from '../types/mathverse';

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'ch-speed-1',
    title: 'Giải nhanh: Tia chớp Số học',
    category: 'speed',
    difficulty: 'easy',
    description: 'Thử thách tính nhẩm nhanh các phép cộng trừ nhân chia cơ bản trong thời gian ngắn.',
    xpReward: 100,
    timeLimitSeconds: 90,
    questions: [
      {
        id: 'csp-1',
        grade: 6,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'easy',
        xpReward: 20,
        question: 'Tính nhẩm: 15 · 4 - 25 = ?',
        correctAnswer: '35',
        explanation: '15 · 4 = 60; 60 - 25 = 35.'
      },
      {
        id: 'csp-2',
        grade: 6,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'easy',
        xpReward: 20,
        question: 'Tính nhẩm: 250 : 5 + 18 = ?',
        correctAnswer: '68',
        explanation: '250 : 5 = 50; 50 + 18 = 68.'
      },
      {
        id: 'csp-3',
        grade: 7,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'easy',
        xpReward: 20,
        question: 'Tính nhẩm: (-8) · (-7) - 16 = ?',
        correctAnswer: '40',
        explanation: '(-8) · (-7) = 56; 56 - 16 = 40.'
      }
    ]
  },
  {
    id: 'ch-pattern-1',
    title: 'Tìm quy luật: Chuỗi số Vũ trụ',
    category: 'pattern',
    difficulty: 'medium',
    description: 'Quan sát chuỗi số học và giải mã con số còn thiếu theo quy luật logic bí ẩn.',
    xpReward: 100,
    timeLimitSeconds: 120,
    questions: [
      {
        id: 'cpt-1',
        grade: 6,
        topic: 'Số học',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 30,
        question: 'Tìm số tiếp theo trong dãy số: 2, 6, 12, 20, 30, ?',
        options: ['42', '40', '36', '48'],
        correctAnswer: '42',
        explanation: 'Quy luật khoảng cách tăng dần: 2 (+4) -> 6 (+6) -> 12 (+8) -> 20 (+10) -> 30 (+12) -> 42. (Hoặc 1·2, 2·3, 3·4, 4·5, 5·6, 6·7 = 42).',
        hint: 'Quan sát hiệu số giữa hai số liền kề: +4, +6, +8, +10...'
      },
      {
        id: 'cpt-2',
        grade: 7,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 30,
        question: 'Điền số còn thiếu vào dấu ?: 1, 4, 9, 16, 25, ?',
        correctAnswer: '36',
        explanation: 'Đây là dãy các số chính phương: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25, 6² = 36.',
        hint: 'Mỗi số là bình phương của số thứ tự của nó: 1², 2², 3²...'
      },
      {
        id: 'cpt-3',
        grade: 8,
        topic: 'Đại số',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 30,
        question: 'Tìm số thích hợp điền vào ?: 3, 7, 15, 31, 63, ?',
        options: ['127', '126', '125', '128'],
        correctAnswer: '127',
        explanation: 'Quy luật: Số sau = (Số trước · 2) + 1. Cụ thể: 63 · 2 + 1 = 127.',
        hint: 'Mỗi số gấp đôi số trước rồi cộng thêm 1.'
      }
    ]
  },
  {
    id: 'ch-logic-1',
    title: 'Toán Logic: Cân thăng bằng & Câu đố tuổi',
    category: 'logic',
    difficulty: 'hard',
    description: 'Những bài toán đố tư duy logic kinh điển đòi hỏi khả năng suy luận sắc bén.',
    xpReward: 100,
    timeLimitSeconds: 150,
    questions: [
      {
        id: 'clg-1',
        grade: 7,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'hard',
        xpReward: 35,
        question: 'Hiện nay mẹ 36 tuổi, con 8 tuổi. Hỏi sau bao nhiêu năm nữa thì tuổi mẹ gấp 3 lần tuổi con?',
        correctAnswer: '6',
        explanation: 'Hiệu số tuổi giữa hai mẹ con không đổi theo thời gian: 36 - 8 = 28 tuổi.\nKhi mẹ gấp 3 lần tuổi con, hiệu số phần là: 3 - 1 = 2 phần.\nTuổi con khi đó là: 28 : 2 = 14 tuổi.\nSố năm cần thêm là: 14 - 8 = 6 năm.',
        hint: 'Hiệu số tuổi giữa mẹ và con luôn không đổi theo thời gian!'
      },
      {
        id: 'clg-2',
        grade: 8,
        topic: 'Đại số',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 35,
        question: 'Có 9 đồng xu bề ngoài giống hệt nhau, trong đó có 1 đồng xu giả nhẹ hơn. Dùng cân đĩa thăng bằng (không quả cân), số lần cân tối thiểu để chắc chắn tìm ra đồng xu giả là:',
        options: ['2 lần', '3 lần', '4 lần', '5 lần'],
        correctAnswer: '2 lần',
        explanation: 'Chia 9 đồng xu thành 3 nhóm (mỗi nhóm 3 đồng: A, B, C).\n- Lần 1: Cân nhóm A và B. Nếu bằng nhau thì đồng giả ở C; nếu nghiêng thì đồng giả ở đĩa nhẹ hơn.\n- Lần 2: Lấy 3 đồng ở nhóm chứa đồng giả, đặt 2 đồng lên 2 đĩa cân. Nếu bằng nhau thì đồng còn lại là giả, nếu nghiêng thì đồng nhẹ hơn là giả.',
        hint: 'Chia 9 đồng xu làm 3 nhóm bằng nhau.'
      }
    ]
  },
  {
    id: 'ch-geometry-1',
    title: 'Toán Hình học: Đo lường không gian',
    category: 'geometry',
    difficulty: 'medium',
    description: 'Khám phá các góc bí ẩn và diện tích hình học đặc sắc.',
    xpReward: 100,
    timeLimitSeconds: 120,
    questions: [
      {
        id: 'cgm-1',
        grade: 7,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 30,
        question: 'Cho tam giác ABC có góc ∠A = 70°, góc ∠B = 50°. Số đo góc ∠C là bao nhiêu độ?',
        correctAnswer: '60',
        explanation: 'Tổng ba góc trong tam giác bằng 180°: ∠C = 180° - (70° + 50°) = 180° - 120° = 60°.',
        hint: 'Tổng ba góc của một tam giác luôn bằng 180°.'
      },
      {
        id: 'cgm-2',
        grade: 8,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 30,
        question: 'Một hình vuông có diện tích là 64 cm². Chu vi của hình vuông đó là bao nhiêu cm?',
        correctAnswer: '32',
        explanation: 'Độ dài cạnh hình vuông là: √64 = 8 cm.\nChu vi hình vuông là: 8 · 4 = 32 cm.',
        hint: 'Diện tích hình vuông S = a².'
      }
    ]
  },
  {
    id: 'ch-mystery-1',
    title: 'Tìm số bí ẩn: Thám tử Toán học',
    category: 'mystery',
    difficulty: 'medium',
    description: 'Dựa vào những manh mối logic để truy tìm con số đang ẩn nấp.',
    xpReward: 100,
    timeLimitSeconds: 100,
    questions: [
      {
        id: 'cmys-1',
        grade: 6,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 35,
        question: 'Tôi là số tự nhiên có hai chữ số. Tôi lớn hơn 40 và nhỏ hơn 50. Tôi chia hết cho cả 3 và 5. Tôi là số mấy?',
        correctAnswer: '45',
        explanation: 'Số chia hết cho cả 3 và 5 thì chia hết cho 15. Trong khoảng từ 40 đến 50 chỉ có duy nhất số 45 thỏa mãn (45 = 15 · 3, chia hết cho 3 và 5).',
        hint: 'Số chia hết cho 5 tận cùng là 0 hoặc 5.'
      },
      {
        id: 'cmys-2',
        grade: 7,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'hard',
        xpReward: 35,
        question: 'Tôi là số nguyên tố chẵn DUY NHẤT trong vũ trụ Toán học. Tôi là số mấy?',
        correctAnswer: '2',
        explanation: 'Số 2 là số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất. Tất cả các số chẵn khác lớn hơn 2 đều chia hết cho 2 nên đều là hợp số.',
        hint: 'Số nguyên tố nhỏ nhất.'
      }
    ]
  },
  {
    id: 'ch-time60-1',
    title: 'Thử thách 60 giây: Chạy đua với thời gian',
    category: 'time60',
    difficulty: 'hard',
    description: 'Chỉ có đúng 60 giây! Trả lời liên tiếp và chính xác càng nhiều câu hỏi càng tốt.',
    xpReward: 120,
    timeLimitSeconds: 60,
    questions: [
      {
        id: 'ct60-1',
        grade: 6,
        topic: 'Số học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 20,
        question: '12 · 5 = ?',
        options: ['60', '50', '55', '65'],
        correctAnswer: '60',
        explanation: '12 · 5 = 60.'
      },
      {
        id: 'ct60-2',
        grade: 7,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'easy',
        xpReward: 20,
        question: '(-15) + (-20) = ?',
        correctAnswer: '-35',
        explanation: '(-15) + (-20) = -35.'
      },
      {
        id: 'ct60-3',
        grade: 8,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'easy',
        xpReward: 20,
        question: '7² - 40 = ?',
        correctAnswer: '9',
        explanation: '7² = 49; 49 - 40 = 9.'
      },
      {
        id: 'ct60-4',
        grade: 9,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 20,
        question: '√144 = ?',
        correctAnswer: '12',
        explanation: '12² = 144 nên √144 = 12.'
      }
    ]
  },
  {
    id: 'ch-streak-1',
    title: 'Thử thách Chuỗi liên tiếp: Sinh tồn Toán học',
    category: 'streak',
    difficulty: 'hard',
    description: 'Chế độ sinh tồn! Một câu trả lời sai sẽ kết thúc chuỗi. Hãy lập kỷ lục chuỗi dài nhất.',
    xpReward: 150,
    timeLimitSeconds: 180,
    questions: [
      {
        id: 'cst-1',
        grade: 6,
        topic: 'Số học',
        type: 'true_false',
        difficulty: 'easy',
        xpReward: 25,
        question: 'Số 0 là số nguyên dương. Đúng hay Sai?',
        correctAnswer: false,
        explanation: 'Sai! Số 0 là số nguyên nhưng không phải là số nguyên dương và cũng không phải là số nguyên âm.'
      },
      {
        id: 'cst-2',
        grade: 7,
        topic: 'Hình học',
        type: 'true_false',
        difficulty: 'medium',
        xpReward: 25,
        question: 'Trong tam giác vuông, cạnh huyền luôn là cạnh dài nhất. Đúng hay Sai?',
        correctAnswer: true,
        explanation: 'Đúng! Vì góc vuông (90°) là góc lớn nhất trong tam giác vuông nên cạnh đối diện (cạnh huyền) luôn là cạnh lớn nhất.'
      },
      {
        id: 'cst-3',
        grade: 8,
        topic: 'Đại số',
        type: 'true_false',
        difficulty: 'medium',
        xpReward: 25,
        question: 'Biểu thức (x - y)² bằng biểu thức (y - x)². Đúng hay Sai?',
        correctAnswer: true,
        explanation: 'Đúng! Vì (y - x)² = [-(x - y)]² = (-1)² · (x - y)² = (x - y)².'
      },
      {
        id: 'cst-4',
        grade: 9,
        topic: 'Đại số',
        type: 'true_false',
        difficulty: 'hard',
        xpReward: 25,
        question: 'Phương trình x² + 1 = 0 có hai nghiệm phân biệt trong tập số thực. Đúng hay Sai?',
        correctAnswer: false,
        explanation: 'Sai! Với mọi số thực x, x² ≥ 0 nên x² + 1 ≥ 1 > 0. Do đó phương trình vô nghiệm trên tập số thực ℝ.'
      }
    ]
  }
];
