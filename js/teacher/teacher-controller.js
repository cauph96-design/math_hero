/**
 * Math Hero Web - Teacher Mode Controller
 * Quản lý chế độ trình chiếu dành cho giáo viên trên máy chiếu / bảng tương tác.
 */

class TeacherController {
  constructor(app) {
    this.app = app;
    this.session = null;
    this.timerInterval = null;
    this.timerSeconds = 60;
    this.isTimerRunning = false;
    this.isAnswerRevealed = false;
    this.isExplanationVisible = false;
    this.isFullscreen = false;
    this.tallies = { A: 0, B: 0, C: 0, D: 0 };
  }

  init() {
    this.bindEvents();
    this.populateTopicsDropdown();
  }

  /**
   * Cập nhật danh sách chủ đề theo khối lớp trong thanh điều khiển giáo viên
   */
  populateTopicsDropdown() {
    const gradeSelect = document.getElementById("teacher-grade-select");
    const topicSelect = document.getElementById("teacher-topic-select");
    if (!gradeSelect || !topicSelect) return;

    const grade = parseInt(gradeSelect.value, 10) || 5;
    const gradeData = CURRICULUM.grades[grade];

    if (gradeData) {
      let optionsHtml = `<option value="all">-- Tất cả các chủ đề --</option>`;
      gradeData.topics.forEach(t => {
        optionsHtml += `<option value="${t.id}">${t.name}</option>`;
      });
      topicSelect.innerHTML = optionsHtml;
    }
  }

  bindEvents() {
    // Thay đổi khối lớp
    const gradeSelect = document.getElementById("teacher-grade-select");
    if (gradeSelect) {
      gradeSelect.addEventListener("change", () => {
        this.populateTopicsDropdown();
        this.startSession();
      });
    }

    // Thay đổi chủ đề
    const topicSelect = document.getElementById("teacher-topic-select");
    if (topicSelect) {
      topicSelect.addEventListener("change", () => {
        this.startSession();
      });
    }

    // Thay đổi độ khó
    const diffSelect = document.getElementById("teacher-diff-select");
    if (diffSelect) {
      diffSelect.addEventListener("change", () => {
        this.startSession();
      });
    }

    // Thay đổi số lượng câu
    const countSelect = document.getElementById("teacher-count-select");
    if (countSelect) {
      countSelect.addEventListener("change", () => {
        this.startSession();
      });
    }

    // Nút điều khiển giáo viên ở thanh đáy (Dock)
    const btnPrev = document.getElementById("btn-teacher-prev");
    if (btnPrev) btnPrev.addEventListener("click", () => this.prevQuestion());

    const btnNext = document.getElementById("btn-teacher-next");
    if (btnNext) btnNext.addEventListener("click", () => this.nextQuestion());

    const btnReveal = document.getElementById("btn-teacher-reveal");
    if (btnReveal) btnReveal.addEventListener("click", () => this.toggleRevealAnswer());

    const btnExplain = document.getElementById("btn-teacher-explain");
    if (btnExplain) btnExplain.addEventListener("click", () => this.toggleExplanation());

    const btnTimerToggle = document.getElementById("btn-teacher-timer-toggle");
    if (btnTimerToggle) btnTimerToggle.addEventListener("click", () => this.toggleTimer());

    const btnRestart = document.getElementById("btn-teacher-restart");
    if (btnRestart) btnRestart.addEventListener("click", () => this.restartSession());

    const btnFullscreen = document.getElementById("btn-teacher-fullscreen");
    if (btnFullscreen) btnFullscreen.addEventListener("click", () => this.toggleFullscreen());

    const btnExit = document.getElementById("btn-teacher-exit");
    if (btnExit) btnExit.addEventListener("click", () => this.exitTeacherMode());

    // Phím tắt bàn phím tiện lợi cho giáo viên
    window.addEventListener("keydown", (e) => {
      const teacherView = document.getElementById("view-teacher");
      if (!teacherView || teacherView.style.display === "none") return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prevQuestion();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        this.nextQuestion();
      } else if (e.key === " " && e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
        e.preventDefault();
        this.toggleRevealAnswer();
      } else if (e.key === "t" || e.key === "T") {
        this.toggleTimer();
      } else if (e.key === "f" || e.key === "F") {
        this.toggleFullscreen();
      }
    });
  }

  /**
   * Bắt đầu một phiên trình chiếu mới
   */
  startSession() {
    const gradeSelect = document.getElementById("teacher-grade-select");
    const topicSelect = document.getElementById("teacher-topic-select");
    const diffSelect = document.getElementById("teacher-diff-select");
    const countSelect = document.getElementById("teacher-count-select");

    const grade = parseInt(gradeSelect?.value, 10) || 5;
    const topicId = topicSelect?.value === "all" ? null : topicSelect?.value;
    const difficulty = diffSelect?.value || "medium";
    const count = parseInt(countSelect?.value, 10) || 10;

    // Sinh bộ câu hỏi qua QuestionGenerator
    const questions = QuestionGenerator.generateQuizSet({
      grade,
      topicId,
      difficulty,
      count
    });

    this.session = {
      grade,
      topicId,
      difficulty,
      questions,
      currentIndex: 0
    };

    this.isAnswerRevealed = false;
    this.isExplanationVisible = false;
    this.tallies = { A: 0, B: 0, C: 0, D: 0 };
    this.resetTimer(60);

    this.renderCurrentQuestion();
  }

  /**
   * Hiển thị câu hỏi trình chiếu hiện tại
   */
  renderCurrentQuestion() {
    if (!this.session || !this.session.questions.length) return;

    const q = this.session.questions[this.session.currentIndex];
    const total = this.session.questions.length;
    const currentNum = this.session.currentIndex + 1;

    // Cập nhật số thứ tự câu
    const numEl = document.getElementById("teacher-q-number");
    if (numEl) numEl.textContent = `CÂU ${currentNum} / ${total}`;

    // Cập nhật nội dung câu hỏi
    const promptEl = document.getElementById("teacher-q-prompt");
    if (promptEl) promptEl.textContent = q.prompt;

    // Đặt lại trạng thái ẩn đáp án và giải thích
    this.isAnswerRevealed = false;
    this.isExplanationVisible = false;
    this.tallies = { A: 0, B: 0, C: 0, D: 0 };

    this.updateRevealButtonState();
    this.updateExplanationDrawer(q);

    // Render danh sách lựa chọn lớn cho máy chiếu
    const grid = document.getElementById("teacher-options-grid");
    if (!grid) return;

    if (q.type === "multiple_choice" || q.type === "comparison" || Array.isArray(q.options)) {
      grid.innerHTML = q.options.map(opt => `
        <div class="teacher-opt-card" data-choice="${opt.id}">
          <div class="teacher-opt-letter">${opt.id}</div>
          <div class="teacher-opt-text">${opt.text}</div>
          <button class="teacher-opt-tally" data-tally-btn="${opt.id}" title="Đếm số học sinh chọn phương án này">
            <span class="tally-count" id="tally-${opt.id}">0</span> 🙋
          </button>
        </div>
      `).join("");

      // Gắn sự kiện biểu quyết / đếm số học sinh
      grid.querySelectorAll(".teacher-opt-tally").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const choice = btn.getAttribute("data-tally-btn");
          this.tallies[choice] = (this.tallies[choice] || 0) + 1;
          const countEl = document.getElementById(`tally-${choice}`);
          if (countEl) countEl.textContent = this.tallies[choice];
        });
      });
    } else {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; font-size: 1.8rem; color: #38bdf8; padding: 30px; background:#0f172a; border-radius:14px; border:2px dashed #475569;">
          ✍️ Dạng bài điền đáp số. Thầy/Cô hãy mời học sinh lên bảng trình bày cách giải!
        </div>
      `;
    }
  }

  /**
   * Bật/Tắt hiển thị đáp án đúng
   */
  toggleRevealAnswer() {
    if (!this.session) return;
    this.isAnswerRevealed = !this.isAnswerRevealed;
    const q = this.session.questions[this.session.currentIndex];

    const cards = document.querySelectorAll(".teacher-opt-card");
    cards.forEach(card => {
      const choice = card.getAttribute("data-choice");
      if (this.isAnswerRevealed && choice && choice.toUpperCase() === String(q.correctAnswer).toUpperCase()) {
        card.classList.add("revealed-correct");
        SoundEffects.playCorrect();
      } else {
        card.classList.remove("revealed-correct");
      }
    });

    this.updateRevealButtonState();
  }

  updateRevealButtonState() {
    const btn = document.getElementById("btn-teacher-reveal");
    if (btn) {
      btn.innerHTML = this.isAnswerRevealed ? `🙈 Ẩn đáp án` : `👁 Hiện đáp án`;
      if (this.isAnswerRevealed) {
        btn.classList.add("success");
      } else {
        btn.classList.remove("success");
      }
    }
  }

  /**
   * Bật/Tắt lời giải chi tiết
   */
  toggleExplanation() {
    const drawer = document.getElementById("teacher-explanation-drawer");
    if (!drawer) return;

    this.isExplanationVisible = !this.isExplanationVisible;
    if (this.isExplanationVisible) {
      drawer.classList.add("visible");
    } else {
      drawer.classList.remove("visible");
    }

    const btn = document.getElementById("btn-teacher-explain");
    if (btn) {
      btn.innerHTML = this.isExplanationVisible ? `💡 Ẩn lời giải` : `💡 Lời giải chi tiết`;
    }
  }

  updateExplanationDrawer(question) {
    const drawer = document.getElementById("teacher-explanation-drawer");
    if (!drawer) return;

    drawer.innerHTML = `
      <div style="font-size: 1.3rem; font-weight: 800; color: #38bdf8; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
        💡 Hướng dẫn giải chi tiết cho lớp học:
      </div>
      <div style="font-size: 1.15rem; color: #e2e8f0; line-height: 1.6;">
        ${ExplanationEngine.renderHTML(question.explanation)}
      </div>
    `;
    drawer.classList.remove("visible");
    const btn = document.getElementById("btn-teacher-explain");
    if (btn) btn.innerHTML = `💡 Lời giải chi tiết`;
  }

  /**
   * Chuyển sang câu tiếp theo
   */
  nextQuestion() {
    if (!this.session) return;
    if (this.session.currentIndex < this.session.questions.length - 1) {
      this.session.currentIndex++;
      SoundEffects.playClick();
      this.renderCurrentQuestion();
    } else {
      alert("Đã đến câu hỏi cuối cùng của buổi học!");
    }
  }

  /**
   * Quay lại câu trước
   */
  prevQuestion() {
    if (!this.session) return;
    if (this.session.currentIndex > 0) {
      this.session.currentIndex--;
      SoundEffects.playClick();
      this.renderCurrentQuestion();
    }
  }

  /**
   * Đồng hồ đếm ngược trình chiếu
   */
  toggleTimer() {
    if (this.isTimerRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isTimerRunning = true;
    const btn = document.getElementById("btn-teacher-timer-toggle");
    if (btn) btn.innerHTML = `⏸ Tạm dừng`;

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.updateTimerDisplay();
        if (this.timerSeconds <= 5 && this.timerSeconds > 0) {
          SoundEffects.playTick();
        }
      } else {
        this.pauseTimer();
        SoundEffects.playLevelUp();
        alert("⏰ Hết thời gian làm bài!");
      }
    }, 1000);
  }

  pauseTimer() {
    this.isTimerRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    const btn = document.getElementById("btn-teacher-timer-toggle");
    if (btn) btn.innerHTML = `⏱ Tiếp tục đếm`;
  }

  resetTimer(seconds = 60) {
    this.pauseTimer();
    this.timerSeconds = seconds;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const m = String(Math.floor(this.timerSeconds / 60)).padStart(2, "0");
    const s = String(this.timerSeconds % 60).padStart(2, "0");
    const el = document.getElementById("teacher-timer-val");
    if (el) el.textContent = `${m}:${s}`;
  }

  /**
   * Bật/Tắt chế độ Toàn màn hình
   */
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn("Lỗi fullscreen:", err);
      });
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  restartSession() {
    if (confirm("Thầy/Cô có muốn bắt đầu lại buổi học từ Câu 1 không?")) {
      if (this.session) {
        this.session.currentIndex = 0;
        this.renderCurrentQuestion();
      }
    }
  }

  exitTeacherMode() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    const teacherView = document.getElementById("view-teacher");
    if (teacherView) teacherView.style.display = "none";
    this.app.switchView("view-home");
  }
}

if (typeof window !== "undefined") {
  window.TeacherController = TeacherController;
}
