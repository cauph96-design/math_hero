/**
 * Math Hero Web - Curated Question Bank
 * Ngân hàng câu hỏi chuẩn hóa lớp 1 đến lớp 5 bám sát chương trình Giáo Dục Tiểu Học Việt Nam.
 */

const QUESTION_BANK = [
  // ==========================================
  // LỚP 1
  // ==========================================
  {
    id: "g1_01",
    grade: 1,
    topicId: "g1_add_sub_10",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Tính: 4 + 3 = ?",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Bắt đầu từ số 4, đếm thêm 3 đơn vị: 5, 6, 7." },
        { stepNumber: 2, text: "Vậy 4 + 3 = 7." }
      ],
      note: "Em có thể dùng các que tính hoặc ngón tay để đếm thêm."
    }
  },
  {
    id: "g1_02",
    grade: 1,
    topicId: "g1_add_sub_10",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Tính: 9 - 4 = ?",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "5" },
      { id: "C", text: "6" },
      { id: "D", text: "3" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Từ 9 bớt đi 4 đơn vị: 8, 7, 6, 5." },
        { stepNumber: 2, text: "Vậy 9 - 4 = 5." }
      ]
    }
  },
  {
    id: "g1_03",
    grade: 1,
    topicId: "g1_add_sub_20",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Tính: 12 + 5 = ?",
    options: [
      { id: "A", text: "16" },
      { id: "B", text: "17" },
      { id: "C", text: "18" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Cộng hàng đơn vị: 2 + 5 = 7." },
        { stepNumber: 2, text: "Giữ nguyên chữ số 1 ở hàng chục, ta được số 17." }
      ]
    }
  },
  {
    id: "g1_04",
    grade: 1,
    topicId: "g1_compare_numbers",
    difficulty: "easy",
    type: "comparison",
    prompt: "Điền dấu thích hợp vào chỗ chấm: 35 ... 53",
    options: [
      { id: "A", text: "<" },
      { id: "B", text: ">" },
      { id: "C", text: "=" }
    ],
    correctAnswer: "<",
    explanation: {
      steps: [
        { stepNumber: 1, text: "So sánh chữ số hàng chục: 3 chục bé hơn 5 chục (3 < 5)." },
        { stepNumber: 2, text: "Vậy 35 < 53." }
      ]
    }
  },
  {
    id: "g1_05",
    grade: 1,
    topicId: "g1_geometry_measurement",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Hình nào sau đây có 3 cạnh và 3 góc?",
    options: [
      { id: "A", text: "Hình vuông" },
      { id: "B", text: "Hình chữ nhật" },
      { id: "C", text: "Hình tam giác" },
      { id: "D", text: "Hình tròn" }
    ],
    correctAnswer: "C",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Hình tam giác là hình có đúng 3 cạnh và 3 đỉnh (góc)." }
      ]
    }
  },
  {
    id: "g1_06",
    grade: 1,
    topicId: "g1_word_problems",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Mai có 8 bông hoa, Mai tặng bạn Lan 3 bông hoa. Hỏi Mai còn lại bao nhiêu bông hoa?",
    options: [
      { id: "A", text: "4 bông hoa" },
      { id: "B", text: "5 bông hoa" },
      { id: "C", text: "11 bông hoa" },
      { id: "D", text: "6 bông hoa" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Mai tặng bớt đi nên ta thực hiện phép trừ." },
        { stepNumber: 2, text: "Phép tính: 8 - 3 = 5 (bông hoa)." },
        { stepNumber: 3, text: "Đáp số: 5 bông hoa." }
      ]
    }
  },

  // ==========================================
  // LỚP 2
  // ==========================================
  {
    id: "g2_01",
    grade: 2,
    topicId: "g2_mult_div_2_5",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Tính: 2 × 7 = ?",
    options: [
      { id: "A", text: "12" },
      { id: "B", text: "14" },
      { id: "C", text: "16" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Dựa vào bảng nhân 2: 2 nhân 7 bằng 14." },
        { stepNumber: 2, text: "Hoặc lấy 2 cộng 7 lần: 2 + 2 + 2 + 2 + 2 + 2 + 2 = 14." }
      ]
    }
  },
  {
    id: "g2_02",
    grade: 2,
    topicId: "g2_mult_div_2_5",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Tính: 35 : 5 = ?",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Nhẩm theo bảng nhân 5: 5 × 7 = 35." },
        { stepNumber: 2, text: "Do đó 35 : 5 = 7." }
      ]
    }
  },
  {
    id: "g2_03",
    grade: 2,
    topicId: "g2_add_sub_100_carry",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Đặt tính rồi tính: 47 + 28 = ?",
    options: [
      { id: "A", text: "65" },
      { id: "B", text: "75" },
      { id: "C", text: "74" },
      { id: "D", text: "85" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Cộng hàng đơn vị: 7 + 8 = 15, viết 5 nhớ 1." },
        { stepNumber: 2, text: "Cộng hàng chục: 4 + 2 = 6, thêm 1 nhớ là 7, viết 7." },
        { stepNumber: 3, text: "Kết quả là 75." }
      ]
    }
  },
  {
    id: "g2_04",
    grade: 2,
    topicId: "g2_measurement",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Đổi đơn vị: 1m = ... dm = ... cm",
    options: [
      { id: "A", text: "10 dm và 100 cm" },
      { id: "B", text: "10 dm và 10 cm" },
      { id: "C", text: "100 dm và 1000 cm" },
      { id: "D", text: "100 dm và 10 cm" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "1 mét bằng 10 đề-xi-mét (1m = 10dm)." },
        { stepNumber: 2, text: "1 mét bằng 100 xăng-ti-mét (1m = 100cm)." }
      ],
      formula: "1m = 10dm = 100cm"
    }
  },
  {
    id: "g2_05",
    grade: 2,
    topicId: "g2_geometry_perimeter",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Hình tam giác ABC có độ dài các cạnh lần lượt là 3 cm, 4 cm và 5 cm. Chu vi của hình tam giác đó là:",
    options: [
      { id: "A", text: "10 cm" },
      { id: "B", text: "12 cm" },
      { id: "C", text: "14 cm" },
      { id: "D", text: "15 cm" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Chu vi hình tam giác là tổng độ dài 3 cạnh." },
        { stepNumber: 2, text: "Phép tính: 3 + 4 + 5 = 12 (cm)." },
        { stepNumber: 3, text: "Đáp số: 12 cm." }
      ],
      formula: "Chu vi tam giác = a + b + c"
    }
  },

  // ==========================================
  // LỚP 3
  // ==========================================
  {
    id: "g3_01",
    grade: 3,
    topicId: "g3_mult_div_tables",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Tính: 8 × 9 = ?",
    options: [
      { id: "A", text: "72" },
      { id: "B", text: "64" },
      { id: "C", text: "81" },
      { id: "D", text: "73" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Dựa vào bảng nhân 8 hoặc bảng nhân 9: 8 × 9 = 72." }
      ]
    }
  },
  {
    id: "g3_02",
    grade: 3,
    topicId: "g3_mult_div_tables",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Tính: 286 + 527 = ?",
    options: [
      { id: "A", text: "713" },
      { id: "B", text: "813" },
      { id: "C", text: "803" },
      { id: "D", text: "623" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Cộng hàng đơn vị: 6 + 7 = 13, viết 3 nhớ 1." },
        { stepNumber: 2, text: "Cộng hàng chục: 8 + 2 = 10, thêm 1 nhớ là 11, viết 1 nhớ 1." },
        { stepNumber: 3, text: "Cộng hàng trăm: 2 + 5 = 7, thêm 1 nhớ là 8, viết 8." },
        { stepNumber: 4, text: "Kết quả là 813." }
      ]
    }
  },
  {
    id: "g3_03",
    grade: 3,
    topicId: "g3_division_remainder",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Thực hiện phép chia: 37 : 5 có kết quả là:",
    options: [
      { id: "A", text: "7 dư 2" },
      { id: "B", text: "6 dư 7" },
      { id: "C", text: "7 dư 1" },
      { id: "D", text: "8 dư 3" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Tìm tích lớn nhất của 5 nhưng nhỏ hơn hoặc bằng 37: 5 × 7 = 35." },
        { stepNumber: 2, text: "Thương là 7." },
        { stepNumber: 3, text: "Số dư: 37 - 35 = 2 (số dư 2 bé hơn số chia 5 là hợp lệ)." },
        { stepNumber: 4, text: "Vậy 37 : 5 = 7 dư 2." }
      ]
    }
  },
  {
    id: "g3_04",
    grade: 3,
    topicId: "g3_perimeter_area",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Một mảnh đất hình chữ nhật có chiều dài 15 m, chiều rộng 8 m. Diện tích mảnh đất đó là:",
    options: [
      { id: "A", text: "46 m²" },
      { id: "B", text: "120 m²" },
      { id: "C", text: "115 m²" },
      { id: "D", text: "100 m²" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Công thức tính diện tích hình chữ nhật: S = chiều dài × chiều rộng." },
        { stepNumber: 2, text: "Phép tính: 15 × 8 = 120 (m²)." },
        { stepNumber: 3, text: "Đáp số: 120 m²." }
      ],
      formula: "S = a × b"
    }
  },
  {
    id: "g3_05",
    grade: 3,
    topicId: "g3_word_problems_two_steps",
    difficulty: "hard",
    type: "multiple_choice",
    prompt: "Cửa hàng có 45 kg gạo, buổi sáng bán được 1/5 số gạo đó. Buổi chiều bán thêm 12 kg nữa. Hỏi cửa hàng đã bán tất cả bao nhiêu ki-lô-gam gạo?",
    options: [
      { id: "A", text: "21 kg" },
      { id: "B", text: "20 kg" },
      { id: "C", text: "18 kg" },
      { id: "D", text: "24 kg" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Số gạo bán buổi sáng là: 45 : 5 = 9 (kg)." },
        { stepNumber: 2, text: "Tổng số gạo đã bán cả hai buổi: 9 + 12 = 21 (kg)." },
        { stepNumber: 3, text: "Đáp số: 21 kg." }
      ]
    }
  },

  // ==========================================
  // LỚP 4
  // ==========================================
  {
    id: "g4_01",
    grade: 4,
    topicId: "g4_divisibility",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Số nào sau đây chia hết cho cả 2 và 5?",
    options: [
      { id: "A", text: "254" },
      { id: "B", text: "375" },
      { id: "C", text: "480" },
      { id: "D", text: "512" }
    ],
    correctAnswer: "C",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0." },
        { stepNumber: 2, text: "Trong các số đã cho, chỉ có số 480 có chữ số tận cùng là 0." }
      ],
      formula: "Số có tận cùng là 0 chia hết cho cả 2 và 5"
    }
  },
  {
    id: "g4_02",
    grade: 4,
    topicId: "g4_divisibility",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Trong các số: 345, 621, 810, 914, số nào chia hết cho 9?",
    options: [
      { id: "A", text: "345 và 914" },
      { id: "B", text: "621 và 810" },
      { id: "C", text: "810 và 345" },
      { id: "D", text: "Chỉ có 621" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Dấu hiệu chia hết cho 9: Tổng các chữ số chia hết cho 9." },
        { stepNumber: 2, text: "Số 621 có: 6 + 2 + 1 = 9 (chia hết cho 9)." },
        { stepNumber: 3, text: "Số 810 có: 8 + 1 + 0 = 9 (chia hết cho 9)." },
        { stepNumber: 4, text: "Số 345 có tổng là 12, 914 có tổng là 14 (không chia hết cho 9)." }
      ]
    }
  },
  {
    id: "g4_03",
    grade: 4,
    topicId: "g4_fractions_basic",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Rút gọn phân số 18/24 về phân số tối giản ta được:",
    options: [
      { id: "A", text: "9/12" },
      { id: "B", text: "3/4" },
      { id: "C", text: "2/3" },
      { id: "D", text: "6/8" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Ước chung lớn nhất của 18 và 24 là 6." },
        { stepNumber: 2, text: "Chia cả tử số và mẫu số cho 6: 18 : 6 = 3 và 24 : 6 = 4." },
        { stepNumber: 3, text: "Vậy phân số tối giản là 3/4." }
      ]
    }
  },
  {
    id: "g4_04",
    grade: 4,
    topicId: "g4_fractions_basic",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Tính: 3/5 + 1/2 = ?",
    options: [
      { id: "A", text: "4/7" },
      { id: "B", text: "11/10" },
      { id: "C", text: "8/10" },
      { id: "D", text: "3/10" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Quy đồng mẫu số chung là 10." },
        { stepNumber: 2, text: "3/5 = (3 × 2)/(5 × 2) = 6/10." },
        { stepNumber: 3, text: "1/2 = (1 × 5)/(2 × 5) = 5/10." },
        { stepNumber: 4, text: "Cộng hai phân số: 6/10 + 5/10 = 11/10." }
      ]
    }
  },
  {
    id: "g4_05",
    grade: 4,
    topicId: "g4_word_problems_avg_sum_diff",
    difficulty: "hard",
    type: "multiple_choice",
    prompt: "Tổng của hai số là 84, hiệu của hai số đó là 16. Số lớn là:",
    options: [
      { id: "A", text: "50" },
      { id: "B", text: "34" },
      { id: "C", text: "68" },
      { id: "D", text: "48" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Công thức tìm số lớn: Số lớn = (Tổng + Hiệu) : 2." },
        { stepNumber: 2, text: "Phép tính: (84 + 16) : 2 = 100 : 2 = 50." },
        { stepNumber: 3, text: "Số bé là: 84 - 50 = 34." },
        { stepNumber: 4, text: "Đáp số: Số lớn là 50." }
      ],
      formula: "Số lớn = (Tổng + Hiệu) : 2"
    }
  },

  // ==========================================
  // LỚP 5
  // ==========================================
  {
    id: "g5_01",
    grade: 5,
    topicId: "g5_decimals_basics",
    difficulty: "easy",
    type: "multiple_choice",
    prompt: "Chữ số 7 trong số thập phân 45,72 thuộc hàng nào?",
    options: [
      { id: "A", text: "Hàng phần mười" },
      { id: "B", text: "Hàng phần trăm" },
      { id: "C", text: "Hàng chục" },
      { id: "D", text: "Hàng đơn vị" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Số 45,72 có phần nguyên là 45 và phần thập phân là 72." },
        { stepNumber: 2, text: "Chữ số đầu tiên ngay sau dấu phẩy là 7, thuộc hàng phần mười (7/10)." }
      ]
    }
  },
  {
    id: "g5_02",
    grade: 5,
    topicId: "g5_decimals_basics",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Tính: 34,8 + 17,45 = ?",
    options: [
      { id: "A", text: "51,25" },
      { id: "B", text: "52,25" },
      { id: "C", text: "52,85" },
      { id: "D", text: "41,25" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Viết thẳng cột dấu phẩy: 34,80 + 17,45." },
        { stepNumber: 2, text: "Cộng từ phải sang trái: 0 + 5 = 5; 8 + 4 = 12 (viết 2 nhớ 1); 4 + 7 + 1 = 12 (viết 2 nhớ 1); 3 + 1 + 1 = 5." },
        { stepNumber: 3, text: "Đặt dấu phẩy thẳng cột: 52,25." }
      ]
    }
  },
  {
    id: "g5_03",
    grade: 5,
    topicId: "g5_percentages",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Một lớp học có 40 học sinh, trong đó có 24 học sinh nữ. Tỉ số phần trăm của số học sinh nữ so với cả lớp là:",
    options: [
      { id: "A", text: "55%" },
      { id: "B", text: "60%" },
      { id: "C", text: "65%" },
      { id: "D", text: "40%" }
    ],
    correctAnswer: "B",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Tìm thương của số học sinh nữ và cả lớp: 24 : 40 = 0,6." },
        { stepNumber: 2, text: "Nhân 0,6 với 100 rồi viết thêm kí hiệu %: 0,6 × 100 = 60%." },
        { stepNumber: 3, text: "Đáp số: 60%." }
      ],
      formula: "Tỉ số % = (A : B) × 100%"
    }
  },
  {
    id: "g5_04",
    grade: 5,
    topicId: "g5_geometry_volume",
    difficulty: "medium",
    type: "multiple_choice",
    prompt: "Một hình lập phương có cạnh dài 5 cm. Thể tích của hình lập phương đó là:",
    options: [
      { id: "A", text: "25 cm³" },
      { id: "B", text: "100 cm³" },
      { id: "C", text: "125 cm³" },
      { id: "D", text: "150 cm³" }
    ],
    correctAnswer: "C",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Công thức tính thể tích hình lập phương: V = cạnh × cạnh × cạnh." },
        { stepNumber: 2, text: "Phép tính: 5 × 5 × 5 = 125 (cm³)." },
        { stepNumber: 3, text: "Đáp số: 125 cm³." }
      ],
      formula: "V = a × a × a"
    }
  },
  {
    id: "g5_05",
    grade: 5,
    topicId: "g5_motion_problems",
    difficulty: "hard",
    type: "multiple_choice",
    prompt: "Một ô tô đi quãng đường dài 120 km hết thời gian 2 giờ 30 phút. Vận tốc của ô tô đó là:",
    options: [
      { id: "A", text: "48 km/giờ" },
      { id: "B", text: "50 km/giờ" },
      { id: "C", text: "60 km/giờ" },
      { id: "D", text: "45 km/giờ" }
    ],
    correctAnswer: "A",
    explanation: {
      steps: [
        { stepNumber: 1, text: "Đổi thời gian: 2 giờ 30 phút = 2,5 giờ." },
        { stepNumber: 2, text: "Công thức tính vận tốc: v = s : t." },
        { stepNumber: 3, text: "Phép tính: 120 : 2,5 = 48 (km/giờ)." },
        { stepNumber: 4, text: "Đáp số: 48 km/giờ." }
      ],
      formula: "v = s : t"
    }
  }
];

if (typeof window !== "undefined") {
  window.QUESTION_BANK = QUESTION_BANK;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTION_BANK };
}
