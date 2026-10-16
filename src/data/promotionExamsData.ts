import { PromotionExam, Grade, UserProfile } from '../types/mathverse';

export const PROMOTION_EXAMS: PromotionExam[] = [
  // ================= BÀI TẬP TỔNG HỢP LỚP 6 (KNTT) -> MỞ KHÓA LỚP 7 =================
  {
    id: 'exam-kntt-grade-6',
    sourceGrade: 6,
    unlocksGrade: 7,
    prerequisiteGrades: [6],
    title: 'Bài tập tổng hợp Toán 6 – Kết nối tri thức',
    subtitle: 'Đạt từ 70% để mở khóa lên Lớp 7',
    bookSeries: 'Bộ sách Kết nối tri thức với cuộc sống (Lớp 6)',
    passingScorePercent: 70,
    xpReward: 150,
    questions: [
      {
        id: 'pk6-1',
        grade: 6,
        topic: 'Số học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Kết quả của phép tính 2³ . 2⁴ theo quy tắc nhân hai lũy thừa cùng cơ số là:',
        mathExpression: '2³ . 2⁴ = ?',
        options: ['2⁷', '2¹²', '4⁷', '4¹²'],
        correctAnswer: '2⁷',
        explanation: 'Áp dụng công thức nhân hai lũy thừa cùng cơ số: aᵐ . aⁿ = aᵐ⁺ⁿ. Do đó: 2³ . 2⁴ = 2³⁺⁴ = 2⁷.'
      },
      {
        id: 'pk6-2',
        grade: 6,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Tìm Bội chung nhỏ nhất của hai số 12 và 18: BCNN(12, 18) = ?',
        correctAnswer: '36',
        explanation: '12 = 2² . 3; 18 = 2 . 3². Do đó BCNN(12, 18) = 2² . 3² = 4 . 9 = 36.'
      },
      {
        id: 'pk6-3',
        grade: 6,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Tính giá trị của biểu thức số nguyên: (-15) + (-25) - (-10) = ?',
        correctAnswer: '-30',
        explanation: '(-15) + (-25) - (-10) = -40 + 10 = -30.'
      },
      {
        id: 'pk6-4',
        grade: 6,
        topic: 'Số học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Tích (-4) . (-5) có kết quả là một số nguyên bằng:',
        options: ['20', '-20', '9', '-9'],
        correctAnswer: '20',
        explanation: 'Quy tắc nhân hai số nguyên cùng dấu: (-) . (-) = (+). Do đó (-4) . (-5) = 20.'
      },
      {
        id: 'pk6-5',
        grade: 6,
        topic: 'Phân số',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Kết quả của phép cộng hai phân số 1/4 + 2/3 sau khi quy đồng mẫu số là:',
        options: ['11/12', '3/7', '3/12', '8/12'],
        correctAnswer: '11/12',
        explanation: 'Quy đồng mẫu số chung là 12: 1/4 = 3/12 và 2/3 = 8/12. Tổng là: 3/12 + 8/12 = 11/12.'
      },
      {
        id: 'pk6-6',
        grade: 6,
        topic: 'Phân số',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Một lớp học có 40 học sinh, trong đó có 25% là học sinh giỏi. Số học sinh giỏi của lớp là bao nhiêu bạn?',
        correctAnswer: '10',
        explanation: 'Số học sinh giỏi là: 40 . 25% = 40 . (25 / 100) = 10 học sinh.'
      },
      {
        id: 'pk6-7',
        grade: 6,
        topic: 'Hình học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Trong các hình sau theo sách Kết nối tri thức, hình nào có 3 cạnh bằng nhau và 3 góc bằng nhau cùng bằng 60°?',
        options: ['Tam giác đều', 'Tam giác cân', 'Tam giác vuông', 'Hình thoi'],
        correctAnswer: 'Tam giác đều',
        explanation: 'Tam giác đều có độ dài 3 cạnh bằng nhau và số đo 3 góc đều bằng 60°.'
      },
      {
        id: 'pk6-8',
        grade: 6,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Một mảnh vườn hình thoi có độ dài hai đường chéo là 8 m và 12 m. Diện tích mảnh vườn là bao nhiêu mét vuông (m²)?',
        correctAnswer: '48',
        explanation: 'Diện tích hình thoi bằng một nửa tích độ dài hai đường chéo: S = (8 . 12) / 2 = 96 / 2 = 48 m².'
      },
      {
        id: 'pk6-9',
        grade: 6,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Một hình bình hành có độ dài cạnh đáy a = 15 cm và chiều cao tương ứng h = 6 cm. Diện tích của hình bình hành đó là bao nhiêu cm²?',
        correctAnswer: '90',
        explanation: 'Diện tích hình bình hành: S = a . h = 15 . 6 = 90 cm².'
      },
      {
        id: 'pk6-10',
        grade: 6,
        topic: 'Thống kê',
        type: 'true_false',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Trong biểu đồ tranh (Toán 6 KNTT), mỗi biểu tượng luôn chỉ có thể đại diện cho đúng 1 đối tượng duy nhất. Đúng hay Sai?',
        correctAnswer: false,
        explanation: 'Sai! Trong biểu đồ tranh, một biểu tượng có thể đại diện cho 1, 2, 5, 10 hoặc nhiều đối tượng tùy theo quy ước chú giải ở cuối biểu đồ.'
      }
    ]
  },

  // ================= BÀI TẬP TỔNG HỢP LỚP 7 (KNTT) -> MỞ KHÓA LỚP 8 =================
  {
    id: 'exam-kntt-grade-7',
    sourceGrade: 7,
    unlocksGrade: 8,
    prerequisiteGrades: [6, 7],
    title: 'Bài tập tổng hợp Toán 7 – Kết nối tri thức',
    subtitle: 'Đạt từ 70% để mở khóa lên Lớp 8 (Yêu cầu đã hoàn thành Lớp 6 và 7)',
    bookSeries: 'Bộ sách Kết nối tri thức với cuộc sống (Lớp 7)',
    passingScorePercent: 70,
    xpReward: 150,
    questions: [
      {
        id: 'pk7-1',
        grade: 7,
        topic: 'Số học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Trong các số sau, số nào là số vô tỉ?',
        options: ['√3', '0,75', '-4/5', '√16'],
        correctAnswer: '√3',
        explanation: '√3 là số thập phân vô hạn không tuần hoàn nên là số vô tỉ. Còn 0,75 = 3/4; -4/5 là số hữu tỉ; √16 = 4 là số tự nhiên.'
      },
      {
        id: 'pk7-2',
        grade: 7,
        topic: 'Số học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Giá trị của căn bậc hai số học: √81 = ?',
        correctAnswer: '9',
        explanation: 'Vì 9 > 0 và 9² = 81 nên căn bậc hai số học của 81 là 9.'
      },
      {
        id: 'pk7-3',
        grade: 7,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Tìm x biết: x / 3 = 8 / 12. Nhập giá trị của x:',
        correctAnswer: '2',
        explanation: 'Áp dụng tính chất tỉ lệ thức: 12 . x = 3 . 8 => 12x = 24 => x = 2.'
      },
      {
        id: 'pk7-4',
        grade: 7,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Cho hai số x và y tỉ lệ với 3 và 4 (x/3 = y/4) và x + y = 28. Giá trị của x là:',
        correctAnswer: '12',
        explanation: 'Theo tính chất dãy tỉ số bằng nhau: x/3 = y/4 = (x + y)/(3 + 4) = 28/7 = 4. Do đó x = 3 . 4 = 12.'
      },
      {
        id: 'pk7-5',
        grade: 7,
        topic: 'Đại số',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Bậc của đa thức một biến P(x) = 5x³ - 2x⁴ + x - 7 là:',
        options: ['4', '3', '1', '7'],
        correctAnswer: '4',
        explanation: 'Bậc của đa thức một biến là số mũ cao nhất của biến trong đa thức đó sau khi đã thu gọn. Ở đây hạng tử có số mũ cao nhất là -2x⁴ nên bậc là 4.'
      },
      {
        id: 'pk7-6',
        grade: 7,
        topic: 'Hình học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Hai góc kề bù là hai góc có chung một cạnh và tổng số đo của chúng bằng:',
        options: ['180°', '90°', '360°', '60°'],
        correctAnswer: '180°',
        explanation: 'Theo định nghĩa trong sách KNTT: Hai góc vừa kề nhau vừa bù nhau có tổng số đo bằng 180°.'
      },
      {
        id: 'pk7-7',
        grade: 7,
        topic: 'Hình học',
        type: 'true_false',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Nếu hai đường thẳng song song bị cắt bởi một đường thẳng thứ ba thì hai góc so le trong bằng nhau. Đúng hay Sai?',
        correctAnswer: true,
        explanation: 'Đúng! Đây là tính chất hai đường thẳng song song cơ bản trong chương trình Toán 7.'
      },
      {
        id: 'pk7-8',
        grade: 7,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Cho tam giác MNP vuông tại M có MN = 9 cm, MP = 12 cm. Độ dài cạnh huyền NP bằng bao nhiêu cm?',
        correctAnswer: '15',
        explanation: 'Áp dụng định lý Pythagore: NP² = MN² + MP² = 9² + 12² = 81 + 144 = 225. Suy ra NP = √225 = 15 cm.'
      },
      {
        id: 'pk7-9',
        grade: 7,
        topic: 'Hình học',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Một tam giác cân có góc ở đỉnh bằng 80°. Số đo mỗi góc ở đáy là:',
        options: ['50°', '40°', '60°', '100°'],
        correctAnswer: '50°',
        explanation: 'Tổng ba góc trong tam giác bằng 180°. Tam giác cân có hai góc ở đáy bằng nhau: Góc đáy = (180° - 80°) / 2 = 100° / 2 = 50°.'
      },
      {
        id: 'pk7-10',
        grade: 7,
        topic: 'Thống kê',
        type: 'true_false',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Biểu đồ hình quạt tròn (Toán 7 KNTT) thường được dùng để biểu thị tỉ lệ phần trăm của từng loại số liệu so với toàn thể. Đúng hay Sai?',
        correctAnswer: true,
        explanation: 'Đúng! Biểu đồ hình quạt tròn chia hình tròn thành các quạt tỉ lệ với phần trăm của từng đối tượng.'
      }
    ]
  },

  // ================= BÀI TẬP TỔNG HỢP LỚP 8 (KNTT) -> MỞ KHÓA LỚP 9 =================
  {
    id: 'exam-kntt-grade-8',
    sourceGrade: 8,
    unlocksGrade: 9,
    prerequisiteGrades: [6, 7, 8],
    title: 'Bài tập tổng hợp Toán 8 – Kết nối tri thức',
    subtitle: 'Đạt từ 70% để mở khóa lên Lớp 9 (Yêu cầu đã hoàn thành Lớp 6, 7 và 8)',
    bookSeries: 'Bộ sách Kết nối tri thức với cuộc sống (Lớp 8)',
    passingScorePercent: 70,
    xpReward: 150,
    questions: [
      {
        id: 'pk8-1',
        grade: 8,
        topic: 'Đại số',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Khai triển hằng đẳng thức hiệu hai bình phương x² - 9y² ta được:',
        options: ['(x - 3y)(x + 3y)', '(x - 9y)(x + 9y)', '(x - 3y)²', 'x² - 6xy + 9y²'],
        correctAnswer: '(x - 3y)(x + 3y)',
        explanation: 'Áp dụng hằng đẳng thức A² - B² = (A - B)(A + B) với A = x, B = 3y: x² - (3y)² = (x - 3y)(x + 3y).'
      },
      {
        id: 'pk8-2',
        grade: 8,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Tính nhanh giá trị của biểu thức 102² - 4 bằng hằng đẳng thức:',
        correctAnswer: '10400',
        explanation: '102² - 4 = 102² - 2² = (102 - 2)(102 + 2) = 100 . 104 = 10400.'
      },
      {
        id: 'pk8-3',
        grade: 8,
        topic: 'Đại số',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Giải phương trình bậc nhất một ẩn: 5x - 15 = 2x + 6. Nhập giá trị của x:',
        correctAnswer: '7',
        explanation: 'Chuyển vế: 5x - 2x = 6 + 15 => 3x = 21 => x = 7.'
      },
      {
        id: 'pk8-4',
        grade: 8,
        topic: 'Đại số',
        type: 'multiple_choice',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Điều kiện xác định của phân thức đại số (2x + 1) / (x - 5) là:',
        options: ['x ≠ 5', 'x ≠ -5', 'x ≠ 0', 'x > 5'],
        correctAnswer: 'x ≠ 5',
        explanation: 'Phân thức xác định khi mẫu thức khác 0: x - 5 ≠ 0 <=> x ≠ 5.'
      },
      {
        id: 'pk8-5',
        grade: 8,
        topic: 'Đại số',
        type: 'true_false',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Phân tích đa thức x² - 4x + 4 thành nhân tử thu được dạng bình phương của một hiệu (x - 2)². Đúng hay Sai?',
        correctAnswer: true,
        explanation: 'Đúng! Vì (x - 2)² = x² - 2 . x . 2 + 2² = x² - 4x + 4.'
      },
      {
        id: 'pk8-6',
        grade: 8,
        topic: 'Hình học',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Tứ giác có hai đường chéo vuông góc với nhau tại trung điểm của mỗi đường là hình gì?',
        options: ['Hình thoi', 'Hình chữ nhật', 'Hình bình hành', 'Hình thang cân'],
        correctAnswer: 'Hình thoi',
        explanation: 'Dấu hiệu nhận biết hình thoi: Hình bình hành có hai đường chéo vuông góc là hình thoi (hoặc tứ giác có 2 đường chéo vuông góc tại trung điểm mỗi đường).'
      },
      {
        id: 'pk8-7',
        grade: 8,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Cho tam giác ABC có MN // BC (M ∈ AB, N ∈ AC). Biết AM = 4 cm, AB = 10 cm, MN = 6 cm. Độ dài cạnh BC bằng bao nhiêu cm?',
        correctAnswer: '15',
        explanation: 'Theo hệ quả định lý Thalès: AM / AB = MN / BC => 4 / 10 = 6 / BC => BC = (10 . 6) / 4 = 15 cm.'
      },
      {
        id: 'pk8-8',
        grade: 8,
        topic: 'Hình học',
        type: 'true_false',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Nếu hai tam giác đồng dạng với nhau theo tỉ số k thì tỉ số diện tích của hai tam giác đó bằng k². Đúng hay Sai?',
        correctAnswer: true,
        explanation: 'Đúng! Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng (k²).'
      },
      {
        id: 'pk8-9',
        grade: 8,
        topic: 'Hình học',
        type: 'fill_in',
        difficulty: 'medium',
        xpReward: 15,
        question: 'Một hình chữ nhật có chiều dài 12 cm và đường chéo dài 13 cm. Chiều rộng của hình chữ nhật đó là bao nhiêu cm?',
        correctAnswer: '5',
        explanation: 'Áp dụng định lý Pythagore trong tam giác vuông tạo bởi hai cạnh và đường chéo: b² = 13² - 12² = 169 - 144 = 25 => b = 5 cm.'
      },
      {
        id: 'pk8-10',
        grade: 8,
        topic: 'Thống kê',
        type: 'multiple_choice',
        difficulty: 'easy',
        xpReward: 15,
        question: 'Để so sánh hai tập dữ liệu cùng loại ở nhiều thời điểm hoặc đối tượng khác nhau (Toán 8 KNTT), người ta thường sử dụng loại biểu đồ nào?',
        options: ['Biểu đồ cột kép', 'Biểu đồ tranh', 'Biểu đồ hình quạt đơn', 'Bảng điểm danh'],
        correctAnswer: 'Biểu đồ cột kép',
        explanation: 'Biểu đồ cột kép được sử dụng chuyên biệt để so sánh hai nhóm dữ liệu song song trực quan.'
      }
    ]
  }
];

/**
 * Kiểm tra xem một khối lớp mục tiêu đã được mở khóa đối với người dùng hay chưa.
 * Nguyên tắc:
 * - Lớp 6: Mặc định luôn mở.
 * - Lớp 7: Phải hoàn thành Bài tập tổng hợp Lớp 6.
 * - Lớp 8: Phải trải qua kiến thức Lớp 6 VÀ Lớp 7 (hoàn thành tổng hợp Lớp 6 & Lớp 7).
 * - Lớp 9: Phải trải qua kiến thức Lớp 6, 7 VÀ 8 (hoàn thành tổng hợp Lớp 6, 7 & 8).
 */
export function isGradeUnlocked(user: UserProfile | null, targetGrade: Grade): boolean {
  if (!user) return targetGrade === 6;
  if (targetGrade === 6) return true;

  // Check if explicitly unlocked in profile
  if (user.unlockedGrades && user.unlockedGrades.includes(targetGrade)) {
    return true;
  }

  // Check prerequisites
  if (targetGrade === 7) {
    return !!user.completedGradeExams?.[6]?.passed;
  }

  if (targetGrade === 8) {
    // Phải trải qua cả 2 kiến thức lớp 6 và 7
    return !!(user.completedGradeExams?.[6]?.passed && user.completedGradeExams?.[7]?.passed);
  }

  if (targetGrade === 9) {
    // Phải trải qua cả 3 kiến thức lớp 6, 7 và 8
    return !!(
      user.completedGradeExams?.[6]?.passed &&
      user.completedGradeExams?.[7]?.passed &&
      user.completedGradeExams?.[8]?.passed
    );
  }

  return false;
}

/**
 * Lấy thông tin lý do bị khóa và bài tập cần làm để mở khóa lớp mục tiêu.
 */
export function getGradeLockInfo(user: UserProfile | null, targetGrade: Grade): {
  isLocked: boolean;
  message: string;
  requiredExams: { grade: Grade; title: string; isPassed: boolean }[];
  nextActionExamGrade: Grade | null;
} {
  const unlocked = isGradeUnlocked(user, targetGrade);
  if (unlocked) {
    return {
      isLocked: false,
      message: `Lớp ${targetGrade} đã được mở khóa sẵn sàng học tập!`,
      requiredExams: [],
      nextActionExamGrade: null,
    };
  }

  const requiredGrades: Grade[] =
    targetGrade === 7 ? [6] : targetGrade === 8 ? [6, 7] : [6, 7, 8];

  const requiredExams = requiredGrades.map((g) => ({
    grade: g,
    title: `Bài tập tổng hợp Toán ${g} (Kết nối tri thức)`,
    isPassed: !!user?.completedGradeExams?.[g]?.passed,
  }));

  const missing = requiredExams.find((e) => !e.isPassed);

  let message = '';
  if (targetGrade === 7) {
    message = 'Để lên Lớp 7, em cần hoàn thành Bài tập tổng hợp Toán 6 (Bộ sách Kết nối tri thức) đạt từ 70% trở lên.';
  } else if (targetGrade === 8) {
    message = 'Để lên Lớp 8, em phải trải qua 2 kiến thức Toán Lớp 6 và Lớp 7 (Bộ sách Kết nối tri thức).';
  } else if (targetGrade === 9) {
    message = 'Để lên Lớp 9, em phải hoàn thành đầy đủ kiến thức Toán Lớp 6, 7 và 8 (Bộ sách Kết nối tri thức).';
  }

  return {
    isLocked: true,
    message,
    requiredExams,
    nextActionExamGrade: missing ? missing.grade : requiredGrades[0],
  };
}
