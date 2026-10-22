/**
 * Math Hero Web - Procedural Question Generator
 * Thuật toán sinh câu hỏi tự động bám sát chương trình, tạo phương án nhiễu thông minh.
 */

class QuestionGenerator {
  /**
   * Sinh số ngẫu nhiên trong khoảng [min, max]
   */
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Trộn mảng ngẫu nhiên (Fisher-Yates)
   */
  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Tạo 4 phương án trắc nghiệm A, B, C, D từ đáp án đúng và danh sách giá trị nhiễu
   */
  static buildMultipleChoice(correctValue, distractors, formatter = String) {
    const uniqueValues = new Set([formatter(correctValue)]);

    for (const d of distractors) {
      if (uniqueValues.size >= 4) break;
      const formattedD = formatter(d);
      if (formattedD && !uniqueValues.has(formattedD)) {
        uniqueValues.add(formattedD);
      }
    }

    // Nếu chưa đủ 4, thêm các giá trị lân cận
    let delta = 1;
    while (uniqueValues.size < 4) {
      if (typeof correctValue === "number") {
        uniqueValues.add(formatter(correctValue + delta));
        if (uniqueValues.size < 4 && correctValue - delta > 0) {
          uniqueValues.add(formatter(correctValue - delta));
        }
      } else {
        uniqueValues.add(`Lựa chọn ${uniqueValues.size + 1}`);
      }
      delta++;
    }

    const shuffled = QuestionGenerator.shuffle(Array.from(uniqueValues));
    const optionLabels = ["A", "B", "C", "D"];
    let correctId = "A";

    const options = shuffled.map((text, idx) => {
      const id = optionLabels[idx];
      if (text === formatter(correctValue)) {
        correctId = id;
      }
      return { id, text };
    });

    return { options, correctId };
  }

  /**
   * Sinh câu hỏi theo khối lớp và chủ đề
   */
  static generateQuestion(grade = 1, topicId = null, difficulty = "medium") {
    grade = parseInt(grade, 10) || 1;
    switch (grade) {
      case 1:
        return QuestionGenerator.generateGrade1(topicId, difficulty);
      case 2:
        return QuestionGenerator.generateGrade2(topicId, difficulty);
      case 3:
        return QuestionGenerator.generateGrade3(topicId, difficulty);
      case 4:
        return QuestionGenerator.generateGrade4(topicId, difficulty);
      case 5:
        return QuestionGenerator.generateGrade5(topicId, difficulty);
      default:
        return QuestionGenerator.generateGrade1(topicId, difficulty);
    }
  }

  // ==========================================
  // SINH CÂU HỎI LỚP 1
  // ==========================================
  static generateGrade1(topicId, difficulty) {
    const isSub = Math.random() > 0.5;
    if (topicId === "g1_compare_numbers" || Math.random() < 0.25) {
      const a = QuestionGenerator.randomInt(10, 99);
      let b = QuestionGenerator.randomInt(10, 99);
      if (Math.random() < 0.2) b = a;
      const correctOp = a < b ? "<" : a > b ? ">" : "=";
      return {
        id: `gen_g1_comp_${Date.now()}_${Math.random()}`,
        grade: 1,
        topicId: "g1_compare_numbers",
        difficulty,
        type: "comparison",
        prompt: `Điền dấu thích hợp: ${a} ... ${b}`,
        options: [
          { id: "A", text: "<" },
          { id: "B", text: ">" },
          { id: "C", text: "=" }
        ],
        correctAnswer: correctOp,
        explanation: {
          steps: [
            { stepNumber: 1, text: `So sánh chữ số hàng chục và hàng đơn vị giữa số ${a} và số ${b}.` },
            { stepNumber: 2, text: `Vì ${a} ${correctOp} ${b} nên dấu cần điền là "${correctOp}".` }
          ]
        }
      };
    }

    if (!isSub) {
      // Phép cộng trong phạm vi 10 - 20
      const a = QuestionGenerator.randomInt(2, difficulty === "easy" ? 6 : 12);
      const b = QuestionGenerator.randomInt(1, difficulty === "easy" ? 4 : 8);
      const ans = a + b;
      const distractors = [ans + 1, ans - 1, ans + 2, a + b - 2, ans + 10];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(ans, distractors);
      return {
        id: `gen_g1_add_${Date.now()}_${Math.random()}`,
        grade: 1,
        topicId: "g1_add_sub_10",
        difficulty,
        type: "multiple_choice",
        prompt: `Tính: ${a} + ${b} = ?`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Lấy số ${a} đếm thêm ${b} đơn vị.` },
            { stepNumber: 2, text: `Ta được kết quả: ${a} + ${b} = ${ans}.` }
          ]
        }
      };
    } else {
      // Phép trừ
      const ans = QuestionGenerator.randomInt(1, 9);
      const b = QuestionGenerator.randomInt(1, 8);
      const a = ans + b;
      const distractors = [ans + 1, ans - 1, ans + 2, ans + 3];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(ans, distractors);
      return {
        id: `gen_g1_sub_${Date.now()}_${Math.random()}`,
        grade: 1,
        topicId: "g1_add_sub_10",
        difficulty,
        type: "multiple_choice",
        prompt: `Tính: ${a} - ${b} = ?`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Lấy số ${a} bớt đi ${b} đơn vị.` },
            { stepNumber: 2, text: `Ta được kết quả: ${a} - ${b} = ${ans}.` }
          ]
        }
      };
    }
  }

  // ==========================================
  // SINH CÂU HỎI LỚP 2
  // ==========================================
  static generateGrade2(topicId, difficulty) {
    const isMult = Math.random() < 0.5;
    if (isMult || topicId === "g2_mult_div_2_5") {
      const factor1 = Math.random() > 0.5 ? 2 : 5;
      const factor2 = QuestionGenerator.randomInt(2, 9);
      const isDiv = Math.random() > 0.5;

      if (!isDiv) {
        const ans = factor1 * factor2;
        const distractors = [ans + factor1, ans - factor1, ans + 2, ans + 5];
        const { options, correctId } = QuestionGenerator.buildMultipleChoice(ans, distractors);
        return {
          id: `gen_g2_mult_${Date.now()}_${Math.random()}`,
          grade: 2,
          topicId: "g2_mult_div_2_5",
          difficulty,
          type: "multiple_choice",
          prompt: `Tính: ${factor1} × ${factor2} = ?`,
          options,
          correctAnswer: correctId,
          explanation: {
            steps: [
              { stepNumber: 1, text: `Áp dụng bảng nhân ${factor1}: ${factor1} × ${factor2} = ${ans}.` }
            ]
          }
        };
      } else {
        const product = factor1 * factor2;
        const ans = factor2;
        const distractors = [ans + 1, ans - 1, ans + 2, ans - 2];
        const { options, correctId } = QuestionGenerator.buildMultipleChoice(ans, distractors);
        return {
          id: `gen_g2_div_${Date.now()}_${Math.random()}`,
          grade: 2,
          topicId: "g2_mult_div_2_5",
          difficulty,
          type: "multiple_choice",
          prompt: `Tính: ${product} : ${factor1} = ?`,
          options,
          correctAnswer: correctId,
          explanation: {
            steps: [
              { stepNumber: 1, text: `Nhẩm theo bảng nhân ${factor1}: ${factor1} × ${ans} = ${product}.` },
              { stepNumber: 2, text: `Do đó: ${product} : ${factor1} = ${ans}.` }
            ]
          }
        };
      }
    }

    // Cộng trừ có nhớ phạm vi 100
    const a = QuestionGenerator.randomInt(25, 68);
    const b = QuestionGenerator.randomInt(18, 29);
    const ans = a + b;
    const distractors = [ans - 10, ans + 10, ans + 1, ans - 1];
    const { options, correctId } = QuestionGenerator.buildMultipleChoice(ans, distractors);
    return {
      id: `gen_g2_addcarry_${Date.now()}_${Math.random()}`,
      grade: 2,
      topicId: "g2_add_sub_100_carry",
      difficulty,
      type: "multiple_choice",
      prompt: `Đặt tính rồi tính: ${a} + ${b} = ?`,
      options,
      correctAnswer: correctId,
      explanation: {
        steps: [
          { stepNumber: 1, text: `Cộng hàng đơn vị: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, nhớ ${Math.floor(((a % 10) + (b % 10)) / 10)} sang hàng chục.` },
          { stepNumber: 2, text: `Cộng hàng chục và thêm số nhớ ta được kết quả: ${ans}.` }
        ]
      }
    };
  }

  // ==========================================
  // SINH CÂU HỎI LỚP 3
  // ==========================================
  static generateGrade3(topicId, difficulty) {
    const roll = Math.random();
    if (roll < 0.4 || topicId === "g3_mult_div_tables") {
      const f1 = QuestionGenerator.randomInt(6, 9);
      const f2 = QuestionGenerator.randomInt(4, 9);
      const ans = f1 * f2;
      const distractors = [ans + f1, ans - f1, ans + 2, ans - 2];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(ans, distractors);
      return {
        id: `gen_g3_mult_${Date.now()}_${Math.random()}`,
        grade: 3,
        topicId: "g3_mult_div_tables",
        difficulty,
        type: "multiple_choice",
        prompt: `Tính: ${f1} × ${f2} = ?`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Theo bảng nhân ${f1}: ${f1} nhân ${f2} bằng ${ans}.` }
          ]
        }
      };
    } else if (roll < 0.7 || topicId === "g3_division_remainder") {
      // Phép chia có dư
      const divisor = QuestionGenerator.randomInt(3, 8);
      const quotient = QuestionGenerator.randomInt(4, 9);
      const remainder = QuestionGenerator.randomInt(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      const ansStr = `${quotient} dư ${remainder}`;
      const distractors = [
        `${quotient} dư ${remainder + 1}`,
        `${quotient - 1} dư ${remainder + divisor}`,
        `${quotient + 1} dư ${remainder}`,
        `${quotient} dư 0`
      ];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(ansStr, distractors);
      return {
        id: `gen_g3_rem_${Date.now()}_${Math.random()}`,
        grade: 3,
        topicId: "g3_division_remainder",
        difficulty,
        type: "multiple_choice",
        prompt: `Thực hiện phép chia: ${dividend} : ${divisor} có kết quả là:`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Tìm số lớn nhất nhân với ${divisor} không vượt quá ${dividend}: ${divisor} × ${quotient} = ${divisor * quotient}.` },
            { stepNumber: 2, text: `Thương là ${quotient}.` },
            { stepNumber: 3, text: `Số dư: ${dividend} - ${divisor * quotient} = ${remainder}.` },
            { stepNumber: 4, text: `Kết quả: ${dividend} : ${divisor} = ${ansStr}.` }
          ]
        }
      };
    } else {
      // Chu vi hình chữ nhật
      const length = QuestionGenerator.randomInt(12, 28);
      const width = QuestionGenerator.randomInt(5, length - 3);
      const perimeter = (length + width) * 2;
      const distractors = [length + width, perimeter + 4, perimeter - 4, length * width];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(
        `${perimeter} cm`,
        distractors.map(d => `${d} cm`)
      );
      return {
        id: `gen_g3_rect_${Date.now()}_${Math.random()}`,
        grade: 3,
        topicId: "g3_perimeter_area",
        difficulty,
        type: "multiple_choice",
        prompt: `Một hình chữ nhật có chiều dài ${length} cm, chiều rộng ${width} cm. Chu vi hình chữ nhật đó là:`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Công thức tính chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2.` },
            { stepNumber: 2, text: `Phép tính: (${length} + ${width}) × 2 = ${length + width} × 2 = ${perimeter} (cm).` },
            { stepNumber: 3, text: `Đáp số: ${perimeter} cm.` }
          ],
          formula: "P = (a + b) × 2"
        }
      };
    }
  }

  // ==========================================
  // SINH CÂU HỎI LỚP 4
  // ==========================================
  static generateGrade4(topicId, difficulty) {
    const roll = Math.random();
    if (roll < 0.5 || topicId === "g4_fractions_basic") {
      // Cộng phân số cùng mẫu hoặc khác mẫu
      const num1 = QuestionGenerator.randomInt(1, 4);
      const den = QuestionGenerator.randomInt(5, 9);
      const num2 = QuestionGenerator.randomInt(1, den - num1);
      const sumNum = num1 + num2;
      const ansStr = `${sumNum}/${den}`;
      const distractors = [
        `${sumNum}/${den * 2}`,
        `${sumNum + 1}/${den}`,
        `${Math.abs(num1 - num2)}/${den}`,
        `${sumNum}/${den - 1}`
      ];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(ansStr, distractors);
      return {
        id: `gen_g4_frac_${Date.now()}_${Math.random()}`,
        grade: 4,
        topicId: "g4_fractions_basic",
        difficulty,
        type: "multiple_choice",
        prompt: `Tính: ${num1}/${den} + ${num2}/${den} = ?`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Hai phân số có cùng mẫu số là ${den}.` },
            { stepNumber: 2, text: `Ta cộng hai tử số và giữ nguyên mẫu số: ${num1} + ${num2} = ${sumNum}.` },
            { stepNumber: 3, text: `Kết quả: ${ansStr}.` }
          ],
          formula: "a/c + b/c = (a + b)/c"
        }
      };
    } else {
      // Trung bình cộng
      const a = QuestionGenerator.randomInt(15, 35);
      const b = QuestionGenerator.randomInt(15, 35);
      const c = QuestionGenerator.randomInt(15, 35);
      const sum = a + b + c;
      const roundedAvg = Math.round((sum / 3) * 10) / 10;
      // Chọn 3 số sao cho chia hết cho 3 để số đẹp
      const rem = sum % 3;
      const adjA = a + (rem === 1 ? 2 : rem === 2 ? 1 : 0);
      const exactSum = adjA + b + c;
      const avg = exactSum / 3;
      const distractors = [avg + 1, avg - 1, avg + 2, exactSum];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(avg, distractors);
      return {
        id: `gen_g4_avg_${Date.now()}_${Math.random()}`,
        grade: 4,
        topicId: "g4_word_problems_avg_sum_diff",
        difficulty,
        type: "multiple_choice",
        prompt: `Tìm số trung bình cộng của 3 số: ${adjA}, ${b} và ${c}.`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Tính tổng 3 số: ${adjA} + ${b} + ${c} = ${exactSum}.` },
            { stepNumber: 2, text: `Lấy tổng chia cho 3: ${exactSum} : 3 = ${avg}.` },
            { stepNumber: 3, text: `Đáp số: Số trung bình cộng là ${avg}.` }
          ],
          formula: "TBC = Tổng các số : Số các số hạng"
        }
      };
    }
  }

  // ==========================================
  // SINH CÂU HỎI LỚP 5
  // ==========================================
  static generateGrade5(topicId, difficulty) {
    const roll = Math.random();
    if (roll < 0.4 || topicId === "g5_decimals_basics") {
      // Cộng số thập phân
      const aInt = QuestionGenerator.randomInt(10, 45);
      const aDec = QuestionGenerator.randomInt(1, 9);
      const bInt = QuestionGenerator.randomInt(5, 30);
      const bDec = QuestionGenerator.randomInt(1, 9);
      const a = parseFloat(`${aInt}.${aDec}`);
      const b = parseFloat(`${bInt}.${bDec}`);
      const ans = Math.round((a + b) * 10) / 10;
      const ansStr = String(ans).replace(".", ",");
      const distractors = [
        String(Math.round((ans + 0.2) * 10) / 10).replace(".", ","),
        String(Math.round((ans - 0.2) * 10) / 10).replace(".", ","),
        String(Math.round((ans + 1.0) * 10) / 10).replace(".", ","),
        String(Math.round((ans - 1.0) * 10) / 10).replace(".", ",")
      ];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(ansStr, distractors);
      return {
        id: `gen_g5_dec_${Date.now()}_${Math.random()}`,
        grade: 5,
        topicId: "g5_decimals_basics",
        difficulty,
        type: "multiple_choice",
        prompt: `Tính: ${String(a).replace(".", ",")} + ${String(b).replace(".", ",")} = ?`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Đặt tính sao cho các chữ số ở cùng một hàng và dấu phẩy đặt thẳng cột với nhau.` },
            { stepNumber: 2, text: `Thực hiện cộng như cộng các số tự nhiên.` },
            { stepNumber: 3, text: `Viết dấu phẩy ở kết quả thẳng cột với các dấu phẩy của các số hạng: ${ansStr}.` }
          ]
        }
      };
    } else if (roll < 0.7 || topicId === "g5_percentages") {
      // Tỉ số phần trăm
      const total = QuestionGenerator.randomInt(4, 10) * 10; // 40, 50, 60,... 100
      const percent = [10, 20, 25, 50, 75][QuestionGenerator.randomInt(0, 4)];
      const part = (total * percent) / 100;
      const distractors = [percent + 5, percent - 5, percent + 10, percent * 2].map(p => `${p}%`);
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(`${percent}%`, distractors);
      return {
        id: `gen_g5_percent_${Date.now()}_${Math.random()}`,
        grade: 5,
        topicId: "g5_percentages",
        difficulty,
        type: "multiple_choice",
        prompt: `Một trường học có ${total} học sinh tham gia câu lạc bộ, trong đó có ${part} bạn học bơi. Tỉ số phần trăm số bạn học bơi so với tổng số học sinh là:`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Tính thương của ${part} và ${total}: ${part} : ${total} = ${part / total}.` },
            { stepNumber: 2, text: `Nhân thương đó với 100 rồi thêm ký hiệu %: ${(part / total) * 100}%.` },
            { stepNumber: 3, text: `Đáp số: ${percent}%.` }
          ],
          formula: "Tỉ số % = (a : b) × 100%"
        }
      };
    } else {
      // Chuyển động đều
      const speed = QuestionGenerator.randomInt(35, 60);
      const time = QuestionGenerator.randomInt(2, 4);
      const distance = speed * time;
      const distractors = [distance + speed, distance - speed, distance + 10, speed * (time + 1)];
      const { options, correctId } = QuestionGenerator.buildMultipleChoice(
        `${distance} km`,
        distractors.map(d => `${d} km`)
      );
      return {
        id: `gen_g5_speed_${Date.now()}_${Math.random()}`,
        grade: 5,
        topicId: "g5_motion_problems",
        difficulty,
        type: "multiple_choice",
        prompt: `Một xe máy đi với vận tốc ${speed} km/giờ trong thời gian ${time} giờ. Quãng đường xe máy đi được là:`,
        options,
        correctAnswer: correctId,
        explanation: {
          steps: [
            { stepNumber: 1, text: `Công thức tính quãng đường: Quãng đường = Vận tốc × Thời gian (s = v × t).` },
            { stepNumber: 2, text: `Phép tính: ${speed} × ${time} = ${distance} (km).` },
            { stepNumber: 3, text: `Đáp số: ${distance} km.` }
          ],
          formula: "s = v × t"
        }
      };
    }
  }

  /**
   * Sinh một bộ N câu hỏi cho bài kiểm tra hoặc bài luyện tập
   * Kết hợp giữa câu hỏi có sẵn trong QUESTION_BANK và câu hỏi sinh tự động để đảm bảo độ phong phú
   */
  static generateQuizSet(params = {}) {
    const grade = parseInt(params.grade, 10) || 1;
    const topicId = params.topicId || null;
    const count = parseInt(params.count, 10) || 10;
    const difficulty = params.difficulty || "medium";

    const questions = [];

    // Lấy câu hỏi từ QUESTION_BANK phù hợp với grade
    const bankQuestions = (window.QUESTION_BANK || []).filter(q => {
      const matchGrade = q.grade === grade;
      const matchTopic = !topicId || q.topicId === topicId;
      return matchGrade && matchTopic;
    });

    // Thêm các câu hỏi từ ngân hàng (đã xáo trộn)
    const shuffledBank = QuestionGenerator.shuffle(bankQuestions);
    for (const q of shuffledBank) {
      if (questions.length >= count) break;
      questions.push({ ...q });
    }

    // Nếu chưa đủ số lượng, sinh thêm bằng thuật toán
    while (questions.length < count) {
      const genQ = QuestionGenerator.generateQuestion(grade, topicId, difficulty);
      questions.push(genQ);
    }

    return questions.slice(0, count);
  }
}

if (typeof window !== "undefined") {
  window.QuestionGenerator = QuestionGenerator;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QuestionGenerator };
}
