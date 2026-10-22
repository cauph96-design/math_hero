/**
 * Math Hero Web - Chương trình Toán Tiểu Học Việt Nam (Lớp 1 - 5)
 * Cấu trúc chương trình chuẩn hóa theo từng khối lớp và chủ đề.
 */

const CURRICULUM = {
  grades: {
    1: {
      name: "Lớp 1",
      ageRange: "6 - 7 tuổi",
      description: "Làm quen với các số trong phạm vi 100, phép cộng, trừ không nhớ, hình học trực quan và đo độ dài.",
      topics: [
        {
          id: "g1_add_sub_10",
          name: "Phép cộng, trừ trong phạm vi 10",
          icon: "➕",
          description: "Các phép tính cộng, trừ cơ bản với các số từ 0 đến 10.",
          levelsCount: 5
        },
        {
          id: "g1_add_sub_20",
          name: "Phép cộng, trừ trong phạm vi 20",
          icon: "🔢",
          description: "Cộng trừ dạng 14 + 3, 17 - 5 và làm quen với số có hai chữ số.",
          levelsCount: 5
        },
        {
          id: "g1_compare_numbers",
          name: "So sánh số và dấu so sánh (<, =, >)",
          icon: "⚖️",
          description: "So sánh số lượng, tìm số lớn nhất, bé nhất trong phạm vi 100.",
          levelsCount: 5
        },
        {
          id: "g1_geometry_measurement",
          name: "Hình học và Đo lường cơ bản",
          icon: "📐",
          description: "Hình vuông, hình tròn, hình tam giác; đo độ dài bằng xăng-ti-mét (cm).",
          levelsCount: 5
        },
        {
          id: "g1_word_problems",
          name: "Toán có lời văn lớp 1",
          icon: "📖",
          description: "Bài toán thêm vào, bớt đi gắn liền với thực tế.",
          levelsCount: 5
        }
      ]
    },
    2: {
      name: "Lớp 2",
      ageRange: "7 - 8 tuổi",
      description: "Phép cộng trừ có nhớ trong phạm vi 100 và 1000, bảng nhân chia 2 và 5, đơn vị đo lường.",
      topics: [
        {
          id: "g2_mult_div_2_5",
          name: "Bảng nhân, bảng chia 2 và 5",
          icon: "✖️",
          description: "Học thuộc và áp dụng bảng nhân 2, 5 và bảng chia 2, 5.",
          levelsCount: 5
        },
        {
          id: "g2_add_sub_100_carry",
          name: "Phép cộng, trừ có nhớ trong phạm vi 100",
          icon: "🧮",
          description: "Cộng trừ có nhớ dạng 38 + 25, 62 - 27.",
          levelsCount: 5
        },
        {
          id: "g2_measurement",
          name: "Đo lường (dm, m, km, kg, lít)",
          icon: "📏",
          description: "Đơn vị đo độ dài, khối lượng, dung tích và xem đồng hồ ngày/giờ.",
          levelsCount: 5
        },
        {
          id: "g2_geometry_perimeter",
          name: "Độ dài đường gấp khúc & Chu vi",
          icon: "📐",
          description: "Đoạn thẳng, đường gấp khúc, chu vi hình tam giác, hình tứ giác.",
          levelsCount: 5
        },
        {
          id: "g2_word_problems",
          name: "Toán có lời văn về nhiều hơn, ít hơn",
          icon: "📖",
          description: "Giải bài toán có lời văn về nhiều hơn, ít hơn một số đơn vị.",
          levelsCount: 5
        }
      ]
    },
    3: {
      name: "Lớp 3",
      ageRange: "8 - 9 tuổi",
      description: "Bảng nhân chia 3, 4, 6, 7, 8, 9, phép chia có dư, chu vi và diện tích hình vuông, chữ nhật.",
      topics: [
        {
          id: "g3_mult_div_tables",
          name: "Bảng nhân, bảng chia 3, 4, 6, 7, 8, 9",
          icon: "✖️",
          description: "Luyện thành thạo bảng nhân và chia từ 3 đến 9.",
          levelsCount: 5
        },
        {
          id: "g3_division_remainder",
          name: "Phép chia có dư & Nhân chia số có nhiều chữ số",
          icon: "➗",
          description: "Phép chia hết và phép chia có dư, tìm số dư và thương.",
          levelsCount: 5
        },
        {
          id: "g3_perimeter_area",
          name: "Chu vi và diện tích hình chữ nhật, hình vuông",
          icon: "⏹️",
          description: "Công thức tính chu vi và diện tích hình chữ nhật, hình vuông.",
          levelsCount: 5
        },
        {
          id: "g3_measurement_money",
          name: "Đơn vị đo mm, gam, ml & Tiền Việt Nam",
          icon: "💰",
          description: "Đổi đơn vị đo và tính toán với tiền Việt Nam đồng.",
          levelsCount: 5
        },
        {
          id: "g3_word_problems_two_steps",
          name: "Toán giải bằng hai bước tính",
          icon: "📖",
          description: "Giải toán có lời văn yêu cầu 2 phép tính liên tiếp.",
          levelsCount: 5
        }
      ]
    },
    4: {
      name: "Lớp 4",
      ageRange: "9 - 10 tuổi",
      description: "Số có nhiều chữ số, dấu hiệu chia hết, phân số cơ bản, trung bình cộng và toán tổng - hiệu.",
      topics: [
        {
          id: "g4_large_numbers",
          name: "Số có nhiều chữ số & 4 phép tính",
          icon: "🔢",
          description: "Lớp triệu, lớp nghìn; nhân chia với số có hai chữ số.",
          levelsCount: 5
        },
        {
          id: "g4_divisibility",
          name: "Dấu hiệu chia hết cho 2, 3, 5, 9",
          icon: "🔍",
          description: "Nhận biết và vận dụng dấu hiệu chia hết để giải toán.",
          levelsCount: 5
        },
        {
          id: "g4_fractions_basic",
          name: "Phân số: Rút gọn, Quy đồng, Cộng trừ",
          icon: "🍰",
          description: "Khái niệm phân số, phân số bằng nhau, rút gọn, quy đồng và phép cộng trừ.",
          levelsCount: 5
        },
        {
          id: "g4_fractions_mult_div",
          name: "Phân số: Nhân, chia phân số",
          icon: "✖️",
          description: "Quy tắc nhân, chia hai phân số và bài toán tìm phân số của một số.",
          levelsCount: 5
        },
        {
          id: "g4_word_problems_avg_sum_diff",
          name: "Trung bình cộng & Tổng - Hiệu",
          icon: "📖",
          description: "Tìm số trung bình cộng và bài toán tìm hai số khi biết tổng và hiệu.",
          levelsCount: 5
        }
      ]
    },
    5: {
      name: "Lớp 5",
      ageRange: "10 - 11 tuổi",
      description: "Số thập phân và 4 phép tính, tỉ số phần trăm, hình hộp chữ nhật, hình lập phương, toán chuyển động đều.",
      topics: [
        {
          id: "g5_decimals_basics",
          name: "Số thập phân: Khái niệm & Phép cộng, trừ",
          icon: "🔘",
          description: "Đọc, viết, so sánh số thập phân; cộng và trừ số thập phân.",
          levelsCount: 5
        },
        {
          id: "g5_decimals_mult_div",
          name: "Số thập phân: Phép nhân, chia",
          icon: "➗",
          description: "Nhân, chia số thập phân với số tự nhiên và số thập phân.",
          levelsCount: 5
        },
        {
          id: "g5_percentages",
          name: "Tỉ số phần trăm & Toán phần trăm",
          icon: "📊",
          description: "Tìm tỉ số phần trăm, tính phần trăm của một số, bài toán mua bán thực tế.",
          levelsCount: 5
        },
        {
          id: "g5_geometry_volume",
          name: "Thể tích hình hộp chữ nhật, hình lập phương",
          icon: "📦",
          description: "Tính diện tích xung quanh, toàn phần và thể tích hình khối (cm³, dm³, m³).",
          levelsCount: 5
        },
        {
          id: "g5_motion_problems",
          name: "Toán chuyển động đều (Vận tốc, Quãng đường, Thời gian)",
          icon: "🚗",
          description: "Công thức s = v × t; hai xe chuyển động cùng chiều, ngược chiều.",
          levelsCount: 5
        }
      ]
    }
  }
};

// Export to window for global access in vanilla JS
if (typeof window !== "undefined") {
  window.CURRICULUM = CURRICULUM;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CURRICULUM };
}
