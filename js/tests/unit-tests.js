/**
 * Math Hero Web - Automated Unit Tests
 * Bộ kiểm thử tự động toàn diện kiểm tra Math Core, Answer Evaluator, Scoring Engine, Storage.
 */

if (typeof console === "undefined") {
  var console = { log: (typeof print === "function" ? print : function() {}) };
}

class UnitTests {
  static runAll() {
    const results = [];
    const assert = (condition, testName, details = "") => {
      results.push({
        name: testName,
        passed: Boolean(condition),
        details: condition ? "Passed" : details || "Assertion failed"
      });
    };

    if (typeof console !== "undefined" && console.group) {
      console.group("🧪 Math Hero Web - Running Unit Tests");
    } else {
      console.log("🧪 Math Hero Web - Running Unit Tests");
    }

    // ==========================================
    // 1. Answer Evaluator Tests
    // ==========================================
    // Test 1.1: Trắc nghiệm khớp chữ cái
    const qMC = {
      type: "multiple_choice",
      correctAnswer: "B",
      options: [
        { id: "A", text: "10" },
        { id: "B", text: "20" },
        { id: "C", text: "30" }
      ]
    };
    const resMC_correct = AnswerEvaluator.evaluate("B", qMC);
    assert(resMC_correct.isCorrect === true, "AnswerEvaluator: Trắc nghiệm chọn đúng ký tự 'B'");

    const resMC_wrong = AnswerEvaluator.evaluate("A", qMC);
    assert(resMC_wrong.isCorrect === false, "AnswerEvaluator: Trắc nghiệm chọn sai ký tự 'A'");

    // Test 1.2: Chuẩn hóa số học (dấu cách phân cách hàng nghìn)
    const qNum = { type: "number_input", correctAnswer: 1250 };
    const resNumSpace = AnswerEvaluator.evaluate(" 1 250 ", qNum);
    assert(resNumSpace.isCorrect === true, "AnswerEvaluator: Nhập số có khoảng cách ' 1 250 ' khớp với 1250");

    // Test 1.3: Số thập phân dấu phẩy tiếng Việt vs dấu chấm
    const qDec = { type: "number_input", correctAnswer: 3.5 };
    const resDecComma = AnswerEvaluator.evaluate("3,5", qDec);
    assert(resDecComma.isCorrect === true, "AnswerEvaluator: Dấu phẩy thập phân '3,5' khớp với 3.5");

    // Test 1.4: Phép chia có dư ("5 dư 2")
    const qRem = { type: "remainder_division", correctAnswer: "5 dư 2" };
    const resRemExact = AnswerEvaluator.evaluate("5 dư 2", qRem);
    assert(resRemExact.isCorrect === true, "AnswerEvaluator: Phép chia có dư chuẩn '5 dư 2'");

    const resRemDu = AnswerEvaluator.evaluate("5 du 2", qRem);
    assert(resRemDu.isCorrect === true, "AnswerEvaluator: Phép chia có dư không dấu '5 du 2'");

    const resRemWrong = AnswerEvaluator.evaluate("5 dư 1", qRem);
    assert(resRemWrong.isCorrect === false, "AnswerEvaluator: Phép chia có dư sai số dư '5 dư 1'");

    // Test 1.5: Phân số tương đương
    const qFrac = { type: "fraction", correctAnswer: "3/4", allowEquivalent: true };
    const resFracEq = AnswerEvaluator.evaluate("6/8", qFrac);
    assert(resFracEq.isCorrect === true, "AnswerEvaluator: Phân số tương đương 6/8 khớp 3/4 khi allowEquivalent = true");

    // Test 1.7: Phép chia hết
    const qDiv = { type: "multiple_choice", correctAnswer: "7" };
    const resDiv = AnswerEvaluator.evaluate("7", qDiv);
    assert(resDiv.isCorrect === true, "AnswerEvaluator: Phép chia hết 35 : 5 = 7 chính xác");

    // Test 1.8: Rút gọn phân số (simplifyFraction)
    const simp = AnswerEvaluator.simplifyFraction(18, 24);
    assert(simp.numerator === 3 && simp.denominator === 4, "AnswerEvaluator: Rút gọn 18/24 thành 3/4");

    // Test 1.9: Nhập số âm hoặc số 0 hợp lệ nếu có
    const qZero = { type: "number_input", correctAnswer: 0 };
    const resZero = AnswerEvaluator.evaluate("0", qZero);
    assert(resZero.isCorrect === true, "AnswerEvaluator: Nhập số 0 chính xác");

    // ==========================================
    // 2. Scoring Engine Tests
    // ==========================================
    // Test 2.1: Sao thưởng theo tỷ lệ phần trăm
    const stars100 = ScoringEngine.calculateStars(10, 10);
    assert(stars100.stars === 3, "ScoringEngine: 10/10 đạt 3 sao");

    const stars70 = ScoringEngine.calculateStars(7, 10);
    assert(stars70.stars === 2, "ScoringEngine: 7/10 đạt 2 sao");

    const stars50 = ScoringEngine.calculateStars(5, 10);
    assert(stars50.stars === 1, "ScoringEngine: 5/10 đạt 1 sao");

    const stars30 = ScoringEngine.calculateStars(3, 10);
    assert(stars30.stars === 0, "ScoringEngine: 3/10 đạt 0 sao");

    // Test 2.2: Tính XP câu hỏi và chuỗi liên tiếp (streak)
    const xpBase = ScoringEngine.calculateQuestionXP({ difficulty: "easy", currentStreak: 0 });
    assert(xpBase.xpGained === 10, "ScoringEngine: Base XP cho câu dễ là 10 XP");

    const xpStreak = ScoringEngine.calculateQuestionXP({ difficulty: "easy", currentStreak: 3 });
    assert(xpStreak.xpGained === 14, "ScoringEngine: Chuỗi 3 liên tiếp cộng thưởng XP (10 + 4 = 14 XP)");

    // Test 2.3: Tính cấp độ người chơi
    const lvl1 = ScoringEngine.calculateLevel(50);
    assert(lvl1.level === 1 && lvl1.currentLevelXP === 50, "ScoringEngine: 50 XP -> Cấp 1 (50/100)");

    const lvl3 = ScoringEngine.calculateLevel(250);
    assert(lvl3.level === 3 && lvl3.currentLevelXP === 50, "ScoringEngine: 250 XP -> Cấp 3 (50/100)");

    // ==========================================
    // 3. Question Generator Tests
    // ==========================================
    // Test 3.1: Sinh câu hỏi Lớp 1 (không có số âm)
    let g1Ok = true;
    for (let i = 0; i < 5; i++) {
      const q = QuestionGenerator.generateGrade1("g1_add_sub_10", "easy");
      if (q.grade !== 1 || !q.prompt) g1Ok = false;
    }
    assert(g1Ok, "QuestionGenerator: Sinh câu hỏi Lớp 1 hợp lệ");

    // Test 3.2: Sinh câu hỏi Lớp 2 (bảng nhân hoặc cộng có nhớ)
    let g2Ok = true;
    for (let i = 0; i < 5; i++) {
      const q = QuestionGenerator.generateGrade2("g2_mult_div_2_5", "medium");
      if (q.grade !== 2 || !q.prompt) g2Ok = false;
    }
    assert(g2Ok, "QuestionGenerator: Sinh câu hỏi Lớp 2 hợp lệ");

    // Test 3.3: Sinh câu hỏi Lớp 3 (bảng nhân lớn hoặc chia có dư)
    let g3Ok = true;
    for (let i = 0; i < 5; i++) {
      const q = QuestionGenerator.generateGrade3("g3_division_remainder", "medium");
      if (q.grade !== 3 || !q.prompt) g3Ok = false;
    }
    assert(g3Ok, "QuestionGenerator: Sinh câu hỏi Lớp 3 hợp lệ");

    // Test 3.4: Sinh câu hỏi Lớp 4 (phân số hoặc trung bình cộng)
    let g4Ok = true;
    for (let i = 0; i < 5; i++) {
      const q = QuestionGenerator.generateGrade4("g4_fractions_basic", "medium");
      if (q.grade !== 4 || !q.prompt) g4Ok = false;
    }
    assert(g4Ok, "QuestionGenerator: Sinh câu hỏi Lớp 4 hợp lệ");

    // Test 3.5: Sinh câu hỏi Lớp 5 (chuyển động hoặc số thập phân)
    let g5Ok = true;
    for (let i = 0; i < 5; i++) {
      const q = QuestionGenerator.generateGrade5("g5_motion_problems", "medium");
      if (q.grade !== 5 || !q.prompt) g5Ok = false;
    }
    assert(g5Ok, "QuestionGenerator: Sinh câu hỏi Lớp 5 toán vận tốc hợp lệ");

    // Test 3.6: Sinh bộ quiz 10 câu
    const set10 = QuestionGenerator.generateQuizSet({ grade: 3, count: 10 });
    assert(set10.length === 10, "QuestionGenerator: Sinh đủ bộ 10 câu hỏi cho Lớp 3");

    // ==========================================
    // 4. Storage Migration & Fallback Tests
    // ==========================================
    const testMigrated = StorageManager.migrate({});
    assert(testMigrated.profile && testMigrated.stats && testMigrated.version, "StorageManager: Migrate dữ liệu rỗng trả về cấu trúc hợp lệ");

    const exportStr = StorageManager.exportJSON();
    assert(typeof exportStr === "string" && exportStr.includes("version"), "StorageManager: Xuất file JSON thành công");

    // Log summary
    let passedCount = 0;
    results.forEach(r => {
      if (r.passed) passedCount++;
      console.log(`${r.passed ? "✅" : "❌"} ${r.name}`);
    });

    console.log(`\n🎉 Đã hoàn thành kiểm thử: ${passedCount}/${results.length} bài test passed!`);
    if (typeof console !== "undefined" && console.groupEnd) console.groupEnd();

    return {
      total: results.length,
      passed: passedCount,
      failed: results.length - passedCount,
      results
    };
  }

  /**
   * Hiển thị bảng kết quả kiểm thử trong giao diện
   */
  static showTestModal() {
    const testResults = UnitTests.runAll();
    let modal = document.getElementById("unit-test-modal");
    if (!modal) {
      const div = document.createElement("div");
      div.id = "unit-test-modal";
      div.className = "modal-backdrop";
      div.innerHTML = `
        <div class="modal-box" style="max-width: 650px; text-align: left; max-height: 85vh; display: flex; flex-direction: column;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-size:1.3rem; font-weight:800;">🧪 Kết quả kiểm thử tự động (Unit Tests)</h3>
            <button id="btn-close-tests" style="font-size:1.5rem; cursor:pointer;">&times;</button>
          </div>
          <div style="margin-bottom:14px; font-weight:700; color:${testResults.failed === 0 ? '#10b981' : '#ef4444'};">
            ${testResults.failed === 0 ? '✅ Toàn bộ bài kiểm thử đều ĐẠT (PASS)!' : `⚠️ Có ${testResults.failed} bài kiểm thử thất bại!`}
            (${testResults.passed}/${testResults.total})
          </div>
          <div id="test-list-body" style="overflow-y:auto; flex:1; border:1px solid #e2e8f0; border-radius:8px; padding:12px; background:#f8fafc; font-size:0.9rem;">
          </div>
          <div style="margin-top:16px; text-align:right;">
            <button id="btn-done-tests" class="btn-primary" style="padding:8px 20px;">Đóng</button>
          </div>
        </div>
      `;
      document.body.appendChild(div);
      modal = div;
    }

    const body = document.getElementById("test-list-body");
    if (body) {
      body.innerHTML = testResults.results.map(r => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid #e2e8f0;">
          <span style="color:#0f172a;">${r.name}</span>
          <span style="font-weight:700; color:${r.passed ? '#10b981' : '#ef4444'};">${r.passed ? 'PASS' : 'FAIL'}</span>
        </div>
      `).join("");
    }

    modal.classList.add("active");

    const closeBtn = document.getElementById("btn-close-tests");
    if (closeBtn) closeBtn.onclick = () => modal.classList.remove("active");
    const doneBtn = document.getElementById("btn-done-tests");
    if (doneBtn) doneBtn.onclick = () => modal.classList.remove("active");
  }
}

if (typeof window !== "undefined") {
  window.UnitTests = UnitTests;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { UnitTests };
}
