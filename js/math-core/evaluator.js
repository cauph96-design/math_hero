/**
 * Math Hero Web - Answer Evaluator
 * Bộ đánh giá và kiểm tra đáp án toán học chuẩn xác, linh hoạt.
 */

class AnswerEvaluator {
  /**
   * Chuẩn hóa chuỗi nhập từ người dùng: bỏ khoảng trắng thừa, đồng nhất dấu thập phân.
   */
  static normalizeString(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  /**
   * Chuẩn hóa số học: xử lý dấu phẩy thập phân tiếng Việt (3,5 -> 3.5), loại bỏ dấu cách phân cách hàng nghìn.
   */
  static parseNumber(str) {
    if (typeof str === "number") return str;
    if (!str) return NaN;
    let s = String(str).trim();
    // Bỏ khoảng cách phân cách nghìn: "1 250" -> "1250"
    s = s.replace(/\s+/g, "");
    // Thay dấu phẩy thành chấm nếu phù hợp với số thập phân
    s = s.replace(",", ".");
    const num = parseFloat(s);
    return isNaN(num) ? NaN : num;
  }

  /**
   * Phân tích phân số dạng a/b
   */
  static parseFraction(str) {
    if (!str) return null;
    const s = String(str).trim().replace(/\s+/g, "");
    const parts = s.split("/");
    if (parts.length === 2) {
      const num = parseInt(parts[0], 10);
      const den = parseInt(parts[1], 10);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return { numerator: num, denominator: den, value: num / den };
      }
    }
    return null;
  }

  /**
   * Tìm ước chung lớn nhất (UCLN)
   */
  static gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  /**
   * Rút gọn phân số
   */
  static simplifyFraction(num, den) {
    if (den === 0) return null;
    const common = AnswerEvaluator.gcd(num, den);
    const sNum = num / common;
    const sDen = den / common;
    if (sDen < 0) {
      return { numerator: -sNum, denominator: -sDen, str: `${-sNum}/${-sDen}` };
    }
    return { numerator: sNum, denominator: sDen, str: `${sNum}/${sDen}` };
  }

  /**
   * Phân tích kết quả chia có dư: ví dụ "5 dư 2", "5 du 2", "5 r 2"
   */
  static parseRemainderDivision(str) {
    if (!str) return null;
    const s = String(str).toLowerCase().trim();
    const regex = /^(\d+)\s*(?:dư|du|r)\s*(\d+)$/;
    const match = s.match(regex);
    if (match) {
      return {
        quotient: parseInt(match[1], 10),
        remainder: parseInt(match[2], 10)
      };
    }
    return null;
  }

  /**
   * Kiểm tra câu trả lời
   * @param {string|number} userAnswer Đáp án học sinh nhập hoặc chọn
   * @param {Object} question Đối tượng câu hỏi
   * @returns {Object} { isCorrect: boolean, feedback: string, userDisplay: string, expectedDisplay: string }
   */
  static evaluate(userAnswer, question) {
    if (userAnswer === null || userAnswer === undefined || String(userAnswer).trim() === "") {
      return {
        isCorrect: false,
        feedback: "Em chưa nhập hoặc chọn câu trả lời.",
        userDisplay: "",
        expectedDisplay: String(question.correctAnswer)
      };
    }

    const type = question.type || "multiple_choice";
    const expected = question.correctAnswer;

    // 1. Trắc nghiệm (Multiple Choice)
    if (type === "multiple_choice") {
      const userStr = String(userAnswer).trim();
      const expStr = String(expected).trim();

      // Kiểm tra khớp theo ID lựa chọn (A, B, C, D)
      const isChoiceIdMatch = userStr.toUpperCase() === expStr.toUpperCase();

      // Hoặc khớp theo giá trị text của lựa chọn
      let isTextMatch = false;
      if (Array.isArray(question.options)) {
        const selectedOption = question.options.find(
          opt => opt.id.toUpperCase() === userStr.toUpperCase() || opt.text.trim() === userStr
        );
        const correctOption = question.options.find(
          opt => opt.id.toUpperCase() === expStr.toUpperCase() || opt.text.trim() === expStr
        );
        if (selectedOption && correctOption && selectedOption.id === correctOption.id) {
          isTextMatch = true;
        }
      }

      const isCorrect = isChoiceIdMatch || isTextMatch;
      let expOptionText = expStr;
      if (Array.isArray(question.options)) {
        const found = question.options.find(o => o.id.toUpperCase() === expStr.toUpperCase());
        if (found) expOptionText = `${found.id}. ${found.text}`;
      }

      return {
        isCorrect,
        feedback: isCorrect ? "Chính xác! Em làm tốt lắm!" : "Chưa chính xác rồi, hãy xem lời giải nhé!",
        userDisplay: userStr,
        expectedDisplay: expOptionText
      };
    }

    // 2. So sánh (<, >, =)
    if (type === "comparison") {
      const userNorm = AnswerEvaluator.normalizeString(userAnswer);
      const expNorm = AnswerEvaluator.normalizeString(expected);
      const isCorrect = userNorm === expNorm;
      return {
        isCorrect,
        feedback: isCorrect ? "Rất giỏi! Dấu so sánh chính xác!" : "Dấu so sánh chưa đúng rồi!",
        userDisplay: userNorm,
        expectedDisplay: expNorm
      };
    }

    // 3. Phân số (Fractions)
    if (type === "fraction") {
      const userFrac = AnswerEvaluator.parseFraction(userAnswer);
      const expFrac = AnswerEvaluator.parseFraction(expected);

      if (userFrac && expFrac) {
        // Cho phép phân số tương đương nếu cờ allowEquivalent = true (mặc định cho phép)
        const allowEquivalent = question.allowEquivalent !== false;
        let isCorrect = false;

        if (allowEquivalent) {
          isCorrect = Math.abs(userFrac.value - expFrac.value) < 1e-9;
        } else {
          // Bắt buộc phải là phân số tối giản đúng
          const uSimp = AnswerEvaluator.simplifyFraction(userFrac.numerator, userFrac.denominator);
          const eSimp = AnswerEvaluator.simplifyFraction(expFrac.numerator, expFrac.denominator);
          isCorrect = uSimp.numerator === eSimp.numerator && uSimp.denominator === eSimp.denominator;
        }

        return {
          isCorrect,
          feedback: isCorrect ? "Chính xác! Phân số hoàn toàn đúng!" : "Phân số chưa đúng!",
          userDisplay: String(userAnswer).trim(),
          expectedDisplay: String(expected).trim()
        };
      }
    }

    // 4. Phép chia có dư (Remainder division)
    if (type === "remainder_division") {
      const userRem = AnswerEvaluator.parseRemainderDivision(userAnswer);
      const expRem = AnswerEvaluator.parseRemainderDivision(expected);

      if (userRem && expRem) {
        const isCorrect = userRem.quotient === expRem.quotient && userRem.remainder === expRem.remainder;
        return {
          isCorrect,
          feedback: isCorrect ? "Xuất sắc! Thương và số dư đều đúng!" : "Thương hoặc số dư chưa đúng!",
          userDisplay: String(userAnswer).trim(),
          expectedDisplay: `${expRem.quotient} dư ${expRem.remainder}`
        };
      }
    }

    // 5. Điền số (Number Input / Word problem with numerical answer)
    const userNum = AnswerEvaluator.parseNumber(userAnswer);
    const expNum = AnswerEvaluator.parseNumber(expected);

    if (!isNaN(userNum) && !isNaN(expNum)) {
      // Cho phép sai số rất nhỏ đối với số thập phân (ví dụ 0.0001)
      const tolerance = question.tolerance || 0.001;
      const isCorrect = Math.abs(userNum - expNum) <= tolerance;
      return {
        isCorrect,
        feedback: isCorrect ? "Chính xác! Đáp số hoàn hảo!" : "Đáp số chưa chính xác!",
        userDisplay: String(userAnswer).trim(),
        expectedDisplay: String(expected)
      };
    }

    // 6. Text match dự phòng
    const userClean = AnswerEvaluator.normalizeString(userAnswer);
    const expClean = AnswerEvaluator.normalizeString(expected);
    const isCorrect = userClean === expClean;

    return {
      isCorrect,
      feedback: isCorrect ? "Chính xác!" : "Chưa chính xác!",
      userDisplay: String(userAnswer).trim(),
      expectedDisplay: String(expected)
    };
  }
}

if (typeof window !== "undefined") {
  window.AnswerEvaluator = AnswerEvaluator;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { AnswerEvaluator };
}
