/**
 * Math Hero Web - Student Controller
 * Quản lý toàn bộ giao diện và luồng học sinh: Trang chủ, Bản đồ phiêu lưu, Luyện tập, Thống kê, Bảng vàng.
 */

class StudentController {
  constructor(app) {
    this.app = app;
    this.currentQuiz = null;
    this.quizTimerInterval = null;
    this.quizTimeSeconds = 0;
    this.isAnswering = false;
    this.activeTopicId = "g5_decimals_basics"; // Mặc định lớp 5
  }

  /**
   * Khởi tạo và liên kết các sự kiện
   */
  init() {
    this.bindEvents();
    this.renderDashboard();
  }

  bindEvents() {
    // Nút Bắt đầu luyện tập ở Hero Banner
    const btnHeroCta = document.getElementById("btn-hero-cta");
    if (btnHeroCta) {
      btnHeroCta.addEventListener("click", () => {
        SoundEffects.playClick();
        this.app.switchView("view-map");
        this.renderAdventureMap();
      });
    }

    // Nút tiếp tục trong Quiz
    const btnQuizNext = document.getElementById("btn-quiz-next");
    if (btnQuizNext) {
      btnQuizNext.addEventListener("click", () => {
        SoundEffects.playClick();
        this.nextQuestion();
      });
    }

    // Nút làm lại câu hỏi hiện tại trong Quiz
    const btnQuizRetry = document.getElementById("btn-quiz-retry");
    if (btnQuizRetry) {
      btnQuizRetry.addEventListener("click", () => {
        SoundEffects.playClick();
        this.retryCurrentQuestion();
      });
    }

    // Nút thoát quiz về bản đồ
    const btnQuizBack = document.getElementById("btn-quiz-back");
    if (btnQuizBack) {
      btnQuizBack.addEventListener("click", () => {
        SoundEffects.playClick();
        this.exitQuiz();
      });
    }

    // Dropdown chọn chủ đề ở bản đồ phiêu lưu
    const mapTopicSelect = document.getElementById("map-topic-select");
    if (mapTopicSelect) {
      mapTopicSelect.addEventListener("change", (e) => {
        this.activeTopicId = e.target.value;
        this.renderAdventureMap();
      });
    }

    // Lọc thời gian thống kê
    const statsPeriodSelect = document.getElementById("stats-period-select");
    if (statsPeriodSelect) {
      statsPeriodSelect.addEventListener("change", () => {
        this.renderStats();
      });
    }
  }

  /**
   * Cập nhật thông tin Header và Dashboard học sinh
   */
  renderDashboard() {
    const data = StorageManager.load();
    const profile = data.profile;
    const stats = data.stats;
    const levelInfo = ScoringEngine.calculateLevel(stats.totalXP);

    // Cập nhật Header
    const headerUserName = document.getElementById("header-user-name");
    if (headerUserName) headerUserName.textContent = profile.name;

    const gradeSelect = document.getElementById("header-grade-select");
    if (gradeSelect) gradeSelect.value = profile.grade;

    // Cập nhật Hero Banner
    const heroLevelTag = document.getElementById("hero-level-tag");
    if (heroLevelTag) heroLevelTag.textContent = `Lv. ${levelInfo.level}`;

    const heroXpFill = document.getElementById("hero-xp-fill");
    if (heroXpFill) heroXpFill.style.width = `${levelInfo.progressPercent}%`;

    const heroXpText = document.getElementById("hero-xp-text");
    if (heroXpText) {
      heroXpText.textContent = `${levelInfo.currentLevelXP} / ${levelInfo.nextLevelXP} XP`;
    }

    const heroGradeText = document.getElementById("hero-grade-text");
    if (heroGradeText) {
      heroGradeText.textContent = `Lớp ${profile.grade} • Tiểu học`;
    }

    // Cập nhật thẻ tóm tắt chủ đề ở Dashboard
    this.renderSubjectCards();
    this.renderHomeOverview();
  }

  /**
   * Hiển thị lưới các môn học (Toán là môn chính)
   */
  renderSubjectCards() {
    const container = document.getElementById("subject-cards-container");
    if (!container) return;

    const subjects = [
      { id: "math", name: "Toán", grades: "Lớp 1 - 5", icon: "📐", colorClass: "subject-icon-blue", active: true },
      { id: "vietnamese", name: "Tiếng Việt", grades: "Lớp 1 - 5", icon: "📖", colorClass: "subject-icon-pink", active: false },
      { id: "english", name: "Tiếng Anh", grades: "Lớp 3 - 5", icon: "🇬🇧", colorClass: "subject-icon-green", active: false },
      { id: "science", name: "Khoa học Tự nhiên", grades: "Lớp 4 - 5", icon: "🔬", colorClass: "subject-icon-purple", active: false },
      { id: "history_geo", name: "Lịch sử và Địa lý", grades: "Lớp 4 - 5", icon: "🌍", colorClass: "subject-icon-orange", active: false }
    ];

    container.innerHTML = subjects.map(s => `
      <div class="subject-card ${s.active ? 'active' : ''}" data-subject="${s.id}">
        <div class="subject-card-left">
          <div class="subject-icon-box ${s.colorClass}">${s.icon}</div>
          <div>
            <div class="subject-info-title">${s.name}</div>
            <div class="subject-info-grades">${s.grades}</div>
          </div>
        </div>
        <div class="subject-arrow">→</div>
      </div>
    `).join("");

    // Sự kiện click chọn môn
    container.querySelectorAll(".subject-card").forEach(card => {
      card.addEventListener("click", () => {
        SoundEffects.playClick();
        const subId = card.getAttribute("data-subject");
        if (subId === "math") {
          this.app.switchView("view-map");
          this.renderAdventureMap();
        } else {
          alert(`Môn ${card.querySelector(".subject-info-title").textContent} đang hoàn thiện nội dung. Hãy cùng khám phá môn Toán trước nhé!`);
        }
      });
    });
  }

  /**
   * Hiển thị phần tóm tắt Bản đồ và Thống kê nhanh ở Trang chủ
   */
  renderHomeOverview() {
    const data = StorageManager.load();
    const stats = data.stats;

    // Cập nhật các chỉ số nhanh
    const statAnswered = document.getElementById("home-stat-answered");
    if (statAnswered) statAnswered.textContent = stats.totalAnswered || 0;

    const statAccuracy = document.getElementById("home-stat-accuracy");
    if (statAccuracy) {
      const acc = stats.totalAnswered > 0 ? Math.round((stats.correctCount / stats.totalAnswered) * 100) : 0;
      statAccuracy.textContent = `${acc}%`;
    }

    const statTime = document.getElementById("home-stat-time");
    if (statTime) {
      const avgSec = stats.totalAnswered > 0 ? Math.round(stats.totalTimeSeconds / stats.totalAnswered) : 92;
      const m = Math.floor(avgSec / 60);
      const s = avgSec % 60;
      statTime.textContent = m > 0 ? `${m} phút ${s} giây` : `${s} giây`;
    }

    // Mini Map nodes ở trang chủ
    const miniMap = document.getElementById("home-mini-map");
    if (miniMap) {
      const grade = data.profile.grade;
      const gradeTopics = CURRICULUM.grades[grade]?.topics || [];
      const currentTopic = gradeTopics.find(t => t.id === this.activeTopicId) || gradeTopics[0];
      const topicProgress = data.progress[currentTopic.id] || { unlockedLevel: 1, stars: {} };

      let html = `<div style="display:flex; justify-content:space-around; align-items:center; padding: 10px 0;">`;
      for (let i = 1; i <= 5; i++) {
        const isCurrent = i === topicProgress.unlockedLevel;
        const isCompleted = i < topicProgress.unlockedLevel || (topicProgress.stars[i] && topicProgress.stars[i] > 0);
        const isLocked = i > topicProgress.unlockedLevel;
        const stars = topicProgress.stars[i] || 0;

        html += `
          <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
            <div style="width:40px; height:40px; border-radius:50%; background:${isCompleted ? '#10b981' : isCurrent ? '#f59e0b' : '#94a3b8'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem; box-shadow:0 4px 8px rgba(0,0,0,0.15);">
              ${i}
            </div>
            <div style="font-size:0.75rem;">${'⭐'.repeat(stars)}</div>
          </div>
        `;
      }
      html += `</div>`;
      miniMap.innerHTML = html;
    }
  }

  /**
   * Hiển thị Bản đồ phiêu lưu theo khối lớp và chủ đề đang chọn
   */
  renderAdventureMap(topicId = null) {
    const data = StorageManager.load();
    const grade = data.profile.grade;
    const gradeData = CURRICULUM.grades[grade];

    if (!gradeData) return;

    // Cập nhật danh sách chủ đề trong dropdown
    const select = document.getElementById("map-topic-select");
    if (select) {
      select.innerHTML = gradeData.topics.map(t => `
        <option value="${t.id}" ${t.id === (topicId || this.activeTopicId) ? "selected" : ""}>
          ${t.name}
        </option>
      `).join("");
      this.activeTopicId = select.value;
    }

    const currentTopic = gradeData.topics.find(t => t.id === this.activeTopicId) || gradeData.topics[0];
    const mapBreadcrumbs = document.getElementById("map-breadcrumbs-text");
    if (mapBreadcrumbs) {
      mapBreadcrumbs.textContent = `Toán • Lớp ${grade} • ${currentTopic.name}`;
    }

    // Lấy dữ liệu tiến độ của chủ đề này
    const topicProgress = data.progress[currentTopic.id] || { unlockedLevel: 1, stars: {} };
    const unlockedLevel = topicProgress.unlockedLevel || 1;

    // Render các nấc màn chơi (1 đến 5)
    const nodesContainer = document.getElementById("adventure-nodes-container");
    if (!nodesContainer) return;

    let nodesHtml = "";
    for (let lvl = 1; lvl <= 5; lvl++) {
      const isCompleted = (topicProgress.stars[lvl] && topicProgress.stars[lvl] > 0) || lvl < unlockedLevel;
      const isCurrent = lvl === unlockedLevel;
      const isLocked = lvl > unlockedLevel;
      const starsCount = topicProgress.stars[lvl] || 0;

      let statusClass = "locked";
      if (isCompleted) statusClass = "completed";
      if (isCurrent) statusClass = "current";

      nodesHtml += `
        <div class="adventure-node-box ${statusClass}" data-level="${lvl}">
          <div class="node-circle">
            ${isLocked ? '🔒' : lvl}
          </div>
          <div class="node-stars-row">
            ${[1, 2, 3].map(s => s <= starsCount ? '⭐' : '☆').join('')}
          </div>
          <div class="node-title-badge">Màn ${lvl}</div>
        </div>
      `;
    }

    // Thêm Lâu Đài Đích (Castle)
    nodesHtml += `
      <div class="castle-finish-node">
        <div class="castle-icon-big">🏰</div>
        <div class="node-title-badge" style="background:#fef3c7; color:#b45309;">Vùng Đất Mới</div>
      </div>
    `;

    nodesContainer.innerHTML = nodesHtml;

    // Gắn sự kiện click vào từng nấc màn
    nodesContainer.querySelectorAll(".adventure-node-box").forEach(node => {
      node.addEventListener("click", () => {
        const lvl = parseInt(node.getAttribute("data-level"), 10);
        if (lvl <= unlockedLevel) {
          SoundEffects.playClick();
          this.startQuiz(grade, currentTopic.id, lvl);
        } else {
          SoundEffects.playWrong();
          alert(`Màn ${lvl} đang khóa! Hãy vượt qua Màn ${unlockedLevel} để mở khóa nhé!`);
        }
      });
    });
  }

  /**
   * Bắt đầu một lượt làm bài (Quiz)
   */
  startQuiz(grade, topicId, levelNumber = 1, count = 10) {
    const data = StorageManager.load();
    const settings = data.settings || {};
    const questionCount = settings.questionCountDefault || count;

    // Lấy danh sách câu hỏi qua QuestionGenerator
    const questions = QuestionGenerator.generateQuizSet({
      grade,
      topicId,
      count: questionCount,
      difficulty: levelNumber <= 2 ? "easy" : levelNumber <= 4 ? "medium" : "hard"
    });

    this.currentQuiz = {
      grade,
      topicId,
      levelNumber,
      questions,
      currentIndex: 0,
      userAnswers: {},
      correctCount: 0,
      xpGainedRound: 0,
      streak: data.stats.currentStreak || 0,
      startTime: Date.now()
    };

    // Chuyển view
    this.app.switchView("view-quiz");

    // Khởi động đồng hồ bấm giờ (nếu bật trong cài đặt)
    this.quizTimeSeconds = 0;
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);
    const timerElem = document.getElementById("quiz-timer-display");

    if (settings.timerEnabled) {
      if (timerElem) timerElem.style.display = "inline-flex";
      this.quizTimerInterval = setInterval(() => {
        this.quizTimeSeconds++;
        const m = String(Math.floor(this.quizTimeSeconds / 60)).padStart(2, "0");
        const s = String(this.quizTimeSeconds % 60).padStart(2, "0");
        const valElem = document.getElementById("quiz-timer-value");
        if (valElem) valElem.textContent = `${m}:${s}`;
      }, 1000);
    } else {
      if (timerElem) timerElem.style.display = "none";
    }

    this.renderCurrentQuestion();
  }

  /**
   * Hiển thị câu hỏi hiện tại trong lượt làm bài
   */
  renderCurrentQuestion() {
    if (!this.currentQuiz) return;
    const q = this.currentQuiz.questions[this.currentQuiz.currentIndex];
    this.isAnswering = true;

    // Cập nhật Header Quiz
    const quizTitle = document.getElementById("quiz-title-text");
    if (quizTitle) quizTitle.textContent = `Luyện tập - Màn ${this.currentQuiz.levelNumber}`;

    const quizProgress = document.getElementById("quiz-progress-text");
    if (quizProgress) {
      quizProgress.textContent = `${this.currentQuiz.currentIndex + 1}/${this.currentQuiz.questions.length}`;
    }

    // Hiển thị nội dung câu hỏi
    const promptElem = document.getElementById("question-prompt-text");
    if (promptElem) promptElem.textContent = q.prompt;

    const topicTag = document.getElementById("question-topic-tag");
    if (topicTag) topicTag.textContent = `Khối ${q.grade} • ${q.difficulty === 'easy' ? 'Cơ bản' : q.difficulty === 'hard' ? 'Nâng cao' : 'Thử thách'}`;

    // Ẩn vùng giải thích và vô hiệu hóa nút tiếp tục
    const expContainer = document.getElementById("quiz-explanation-container");
    if (expContainer) {
      expContainer.innerHTML = "";
      expContainer.style.display = "none";
    }

    const btnNext = document.getElementById("btn-quiz-next");
    if (btnNext) btnNext.disabled = true;

    // Render danh sách lựa chọn
    const optionsContainer = document.getElementById("quiz-options-container");
    if (!optionsContainer) return;

    if (q.type === "multiple_choice" || q.type === "comparison" || Array.isArray(q.options)) {
      optionsContainer.innerHTML = q.options.map(opt => `
        <button class="option-btn" data-choice-id="${opt.id}">
          <span class="option-letter">${opt.id}</span>
          <span class="option-text">${opt.text}</span>
          <span class="option-status-icon">✓</span>
        </button>
      `).join("");

      // Gắn sự kiện click chọn đáp án
      optionsContainer.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          if (!this.isAnswering) return;
          const choiceId = btn.getAttribute("data-choice-id");
          this.handleAnswerSelection(choiceId, btn);
        });
      });
    } else {
      // Dạng tự nhập số (Number Input)
      optionsContainer.innerHTML = `
        <div class="number-input-form">
          <input type="text" id="quiz-number-input" class="input-answer" placeholder="Nhập đáp số của em..." autocomplete="off" />
          <button id="btn-submit-number" class="btn-submit-answer">Trả lời</button>
        </div>
      `;
      const numInput = document.getElementById("quiz-number-input");
      const btnSubmit = document.getElementById("btn-submit-number");
      if (btnSubmit && numInput) {
        btnSubmit.addEventListener("click", () => {
          if (!this.isAnswering) return;
          this.handleAnswerSelection(numInput.value, btnSubmit);
        });
        numInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && this.isAnswering) {
            this.handleAnswerSelection(numInput.value, btnSubmit);
          }
        });
        numInput.focus();
      }
    }
  }

  /**
   * Xử lý khi học sinh chọn hoặc nhập đáp án
   */
  handleAnswerSelection(userAnswer, targetElement) {
    if (!this.isAnswering || !this.currentQuiz) return;
    this.isAnswering = false; // Ngăn chặn bấm nhiều lần gây cộng điểm trùng lặp

    const q = this.currentQuiz.questions[this.currentQuiz.currentIndex];
    const evaluation = AnswerEvaluator.evaluate(userAnswer, q);

    this.currentQuiz.userAnswers[this.currentQuiz.currentIndex] = {
      userAnswer,
      isCorrect: evaluation.isCorrect,
      evaluation
    };

    // Highlight giao diện
    const optionsContainer = document.getElementById("quiz-options-container");
    const optionButtons = optionsContainer.querySelectorAll(".option-btn");

    if (evaluation.isCorrect) {
      SoundEffects.playCorrect();
      this.currentQuiz.correctCount++;
      this.currentQuiz.streak++;

      if (targetElement && targetElement.classList.contains("option-btn")) {
        targetElement.classList.add("selected-correct");
      }

      // Tính XP thưởng
      const xpResult = ScoringEngine.calculateQuestionXP({
        difficulty: q.difficulty,
        currentStreak: this.currentQuiz.streak
      });
      this.currentQuiz.xpGainedRound += xpResult.xpGained;

    } else {
      SoundEffects.playWrong();
      this.currentQuiz.streak = 0;

      if (targetElement && targetElement.classList.contains("option-btn")) {
        targetElement.classList.add("selected-wrong");
        const icon = targetElement.querySelector(".option-status-icon");
        if (icon) icon.textContent = "✗";
      }

      // Làm nổi bật đáp án đúng để học sinh học tập
      optionButtons.forEach(btn => {
        const id = btn.getAttribute("data-choice-id");
        if (id && id.toUpperCase() === String(q.correctAnswer).toUpperCase()) {
          btn.classList.add("highlight-correct");
        }
      });
    }

    // Hiển thị lời giải chi tiết
    const expContainer = document.getElementById("quiz-explanation-container");
    if (expContainer) {
      expContainer.innerHTML = ExplanationEngine.renderHTML(q.explanation);
      expContainer.style.display = "block";
    }

    // Kích hoạt nút Tiếp tục
    const btnNext = document.getElementById("btn-quiz-next");
    if (btnNext) {
      btnNext.disabled = false;
      btnNext.focus();
    }
  }

  /**
   * Chuyển sang câu hỏi tiếp theo hoặc hoàn tất bài thi
   */
  nextQuestion() {
    if (!this.currentQuiz) return;
    this.currentQuiz.currentIndex++;

    if (this.currentQuiz.currentIndex < this.currentQuiz.questions.length) {
      this.renderCurrentQuestion();
    } else {
      this.finishQuiz();
    }
  }

  /**
   * Làm lại câu hiện tại (đặt lại trạng thái không tính điểm thêm)
   */
  retryCurrentQuestion() {
    if (!this.currentQuiz) return;
    this.renderCurrentQuestion();
  }

  /**
   * Kết thúc lượt làm bài và tổng kết
   */
  finishQuiz() {
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);
    if (!this.currentQuiz) return;

    const quiz = this.currentQuiz;
    const totalQuestions = quiz.questions.length;
    const correctCount = quiz.correctCount;
    const starsResult = ScoringEngine.calculateStars(correctCount, totalQuestions);

    // Lưu vào Storage
    const updatedData = StorageManager.recordLevelResult(
      quiz.topicId,
      quiz.levelNumber,
      starsResult.stars,
      quiz.xpGainedRound
    );

    // Cập nhật thống kê bài tập
    updatedData.stats.totalAnswered = (updatedData.stats.totalAnswered || 0) + totalQuestions;
    updatedData.stats.correctCount = (updatedData.stats.correctCount || 0) + correctCount;
    updatedData.stats.totalTimeSeconds = (updatedData.stats.totalTimeSeconds || 0) + this.quizTimeSeconds;
    updatedData.stats.currentStreak = quiz.streak;
    if (quiz.streak > (updatedData.stats.maxStreak || 0)) {
      updatedData.stats.maxStreak = quiz.streak;
    }
    updatedData.stats.sessionsCompleted = (updatedData.stats.sessionsCompleted || 0) + 1;
    StorageManager.save(updatedData);

    // Âm thanh chúc mừng
    if (starsResult.stars >= 1) {
      SoundEffects.playLevelUp();
    }

    // Hiển thị Modal Kết Quả
    this.showResultModal({
      stars: starsResult.stars,
      correctCount,
      totalQuestions,
      xpGained: quiz.xpGainedRound,
      timeSeconds: this.quizTimeSeconds,
      passed: starsResult.passed,
      levelNumber: quiz.levelNumber
    });
  }

  /**
   * Hiển thị Modal tổng kết sau lượt học
   */
  showResultModal(result) {
    const modalBackdrop = document.getElementById("quiz-result-modal");
    if (!modalBackdrop) return;

    const starsDisplay = document.getElementById("result-stars-display");
    if (starsDisplay) {
      starsDisplay.textContent = [1, 2, 3].map(s => s <= result.stars ? "⭐" : "☆").join(" ");
    }

    const titleElem = document.getElementById("result-modal-title");
    if (titleElem) {
      titleElem.textContent = result.stars === 3 ? "Xuất sắc! Đỉnh cao Toán Học!" :
                             result.stars === 2 ? "Rất giỏi! Em đã hoàn thành tốt!" :
                             result.stars === 1 ? "Hoan hô! Em đã vượt qua thử thách!" : "Cố lên nhé! Hãy luyện tập lại một lần nữa!";
    }

    const correctElem = document.getElementById("result-correct-count");
    if (correctElem) correctElem.textContent = `${result.correctCount}/${result.totalQuestions}`;

    const xpElem = document.getElementById("result-xp-gained");
    if (xpElem) xpElem.textContent = `+${result.xpGained} XP`;

    const timeElem = document.getElementById("result-time-taken");
    if (timeElem) {
      const m = Math.floor(result.timeSeconds / 60);
      const s = result.timeSeconds % 60;
      timeElem.textContent = `${m}p ${s}s`;
    }

    modalBackdrop.classList.add("active");

    // Bắt sự kiện các nút trong modal
    const btnRetry = document.getElementById("btn-result-retry");
    if (btnRetry) {
      btnRetry.onclick = () => {
        modalBackdrop.classList.remove("active");
        this.startQuiz(this.currentQuiz.grade, this.currentQuiz.topicId, this.currentQuiz.levelNumber);
      };
    }

    const btnNextLevel = document.getElementById("btn-result-next-level");
    if (btnNextLevel) {
      btnNextLevel.onclick = () => {
        modalBackdrop.classList.remove("active");
        const nextLvl = Math.min(5, this.currentQuiz.levelNumber + 1);
        this.startQuiz(this.currentQuiz.grade, this.currentQuiz.topicId, nextLvl);
      };
    }

    const btnBackMap = document.getElementById("btn-result-back-map");
    if (btnBackMap) {
      btnBackMap.onclick = () => {
        modalBackdrop.classList.remove("active");
        this.app.switchView("view-map");
        this.renderAdventureMap();
        this.renderDashboard();
      };
    }
  }

  /**
   * Thoát bài quiz hiện tại
   */
  exitQuiz() {
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);
    this.currentQuiz = null;
    this.app.switchView("view-map");
    this.renderAdventureMap();
  }

  /**
   * Hiển thị Màn hình Thống kê chi tiết
   */
  renderStats() {
    const data = StorageManager.load();
    const stats = data.stats;

    const answeredEl = document.getElementById("stats-total-answered");
    if (answeredEl) answeredEl.textContent = stats.totalAnswered || 0;

    const correctEl = document.getElementById("stats-correct-count");
    if (correctEl) {
      const pct = stats.totalAnswered > 0 ? Math.round((stats.correctCount / stats.totalAnswered) * 100) : 0;
      correctEl.textContent = `${stats.correctCount || 0} (${pct}%)`;
    }

    const avgTimeEl = document.getElementById("stats-avg-time");
    if (avgTimeEl) {
      const avg = stats.totalAnswered > 0 ? Math.round(stats.totalTimeSeconds / stats.totalAnswered) : 92;
      const m = Math.floor(avg / 60);
      const s = avg % 60;
      avgTimeEl.textContent = m > 0 ? `${m} phút ${s} giây` : `${s} giây`;
    }

    const streakEl = document.getElementById("stats-max-streak");
    if (streakEl) streakEl.textContent = `${stats.maxStreak || 12} câu`;

    // Hiển thị thanh tiến độ các môn
    const progressContainer = document.getElementById("stats-subject-bars");
    if (progressContainer) {
      const bars = [
        { name: "Toán", pct: 78, color: "#2563eb" },
        { name: "Tiếng Việt", pct: 60, color: "#db2777" },
        { name: "Tiếng Anh", pct: 45, color: "#16a34a" },
        { name: "Khoa học Tự nhiên", pct: 30, color: "#9333ea" },
        { name: "Lịch sử và Địa lý", pct: 20, color: "#ea580c" }
      ];

      progressContainer.innerHTML = bars.map(b => `
        <div class="progress-item-row">
          <div class="progress-item-label">${b.name}</div>
          <div class="progress-item-bar-bg">
            <div class="progress-item-bar-fill" style="width: ${b.pct}%; background-color: ${b.color};"></div>
          </div>
          <div class="progress-item-percent">${b.pct}%</div>
        </div>
      `).join("");
    }
  }

  /**
   * Hiển thị Bảng Vàng (Leaderboard)
   */
  renderLeaderboard() {
    const container = document.getElementById("leaderboard-list-container");
    if (!container) return;

    const data = StorageManager.load();
    const myXP = data.stats.totalXP || 120;
    const myName = data.profile.name || "Nguyễn Văn A";
    const myGrade = data.profile.grade || 5;

    // Danh sách học sinh tiêu biểu
    const leaderboardData = [
      { rank: 1, name: "Trần Minh Quân", grade: "Lớp 5A", xp: 520, streak: 25, badge: "🥇" },
      { rank: 2, name: "Lê Bảo Châu", grade: "Lớp 5B", xp: 480, streak: 18, badge: "🥈" },
      { rank: 3, name: "Nguyễn Hải Đăng", grade: "Lớp 5A", xp: 390, streak: 15, badge: "🥉" },
      { rank: 4, name: "Phạm Thảo My", grade: "Lớp 5C", xp: 310, streak: 14, badge: "⭐" },
      { rank: 5, name: myName, grade: `Lớp ${myGrade}`, xp: myXP, streak: data.stats.currentStreak || 3, badge: "🌱", isMe: true },
      { rank: 6, name: "Vũ Gia Huy", grade: "Lớp 5B", xp: 95, streak: 5, badge: "⭐" }
    ];

    container.innerHTML = leaderboardData.map(item => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding: 14px 20px; background:${item.isMe ? '#eff6ff' : '#ffffff'}; border:${item.isMe ? '2px solid #3b82f6' : '1px solid #e2e8f0'}; border-radius:14px; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="font-size:1.4rem; font-weight:800; width:36px;">${item.badge}</div>
          <div>
            <div style="font-weight:700; font-size:1rem; color:#0f172a;">${item.name} ${item.isMe ? '<span style="font-size:0.75rem; background:#2563eb; color:#fff; padding:2px 8px; border-radius:999px; margin-left:6px;">Em</span>' : ''}</div>
            <div style="font-size:0.8rem; color:#64748b;">${item.grade} • Chuỗi đúng: ${item.streak}</div>
          </div>
        </div>
        <div style="font-weight:800; font-size:1.15rem; color:#2563eb;">
          ${item.xp} <span style="font-size:0.8rem; font-weight:600; color:#64748b;">XP</span>
        </div>
      </div>
    `).join("");
  }
}

if (typeof window !== "undefined") {
  window.StudentController = StudentController;
}
