/**
 * Math Hero Web - Application Main Coordinator
 * Quản lý khởi động ứng dụng, điều hướng màn hình, đồng bộ trạng thái giáo viên và học sinh.
 */

class MathHeroApp {
  constructor() {
    this.currentView = "view-home";
    this.studentController = null;
    this.teacherController = null;
  }

  init() {
    console.log("🚀 Khởi động Math Hero Web...");

    // Tải dữ liệu lưu trữ
    const data = StorageManager.load();
    SoundEffects.setMuted(!data.settings.soundEnabled);

    // Khởi tạo các bộ điều khiển
    this.studentController = new StudentController(this);
    this.teacherController = new TeacherController(this);

    this.studentController.init();
    this.teacherController.init();

    // Liên kết sự kiện toàn cục
    this.bindGlobalEvents();

    // Kiểm tra tham số URL (e.g. ?test=1 hoặc ?mode=teacher)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("test") === "1") {
      setTimeout(() => UnitTests.showTestModal(), 300);
    } else if (urlParams.get("mode") === "teacher") {
      this.openTeacherMode();
    } else {
      this.switchView("view-home");
    }
  }

  /**
   * Chuyển đổi giữa các màn hình trong ứng dụng
   */
  switchView(viewId) {
    this.currentView = viewId;

    // Cập nhật hiển thị các section view
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    const targetSec = document.getElementById(viewId);
    if (targetSec) {
      targetSec.classList.add("active");
    }

    // Cập nhật trạng thái active trên thanh điều hướng sidebar
    document.querySelectorAll(".nav-item").forEach(item => {
      const target = item.getAttribute("data-view");
      if (target === viewId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Kích hoạt render tương ứng nếu cần
    if (viewId === "view-home") {
      this.studentController.renderDashboard();
    } else if (viewId === "view-map") {
      this.studentController.renderAdventureMap();
    } else if (viewId === "view-stats") {
      this.studentController.renderStats();
    } else if (viewId === "view-leaderboard") {
      this.studentController.renderLeaderboard();
    } else if (viewId === "view-settings") {
      this.renderSettings();
    }

    // Đóng sidebar trên thiết bị di động sau khi chuyển view
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Mở chế độ trình chiếu giáo viên
   */
  openTeacherMode() {
    SoundEffects.playClick();
    const teacherView = document.getElementById("view-teacher");
    if (teacherView) {
      teacherView.style.display = "flex";
      this.teacherController.startSession();
    }
  }

  bindGlobalEvents() {
    // Menu Sidebar Click
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        SoundEffects.playClick();
        const viewId = item.getAttribute("data-view");
        if (viewId) {
          this.switchView(viewId);
        }
      });
    });

    // Nút mở Teacher Mode trên Top Bar
    const btnTeacher = document.getElementById("btn-header-teacher");
    if (btnTeacher) {
      btnTeacher.addEventListener("click", () => {
        this.openTeacherMode();
      });
    }

    // Nút Bật/Tắt âm thanh trên Header
    const btnAudio = document.getElementById("btn-header-audio");
    if (btnAudio) {
      btnAudio.addEventListener("click", () => {
        const data = StorageManager.load();
        data.settings.soundEnabled = !data.settings.soundEnabled;
        StorageManager.save(data);
        SoundEffects.setMuted(!data.settings.soundEnabled);
        btnAudio.innerHTML = data.settings.soundEnabled ? "🔊" : "🔇";
        SoundEffects.playClick();
      });
    }

    // Dropdown chọn khối lớp ở Header
    const headerGradeSelect = document.getElementById("header-grade-select");
    if (headerGradeSelect) {
      headerGradeSelect.addEventListener("change", (e) => {
        SoundEffects.playClick();
        const newGrade = parseInt(e.target.value, 10) || 1;
        const data = StorageManager.load();
        data.profile.grade = newGrade;
        StorageManager.save(data);

        // Đồng bộ grade sang Teacher Mode
        const teacherGrade = document.getElementById("teacher-grade-select");
        if (teacherGrade) {
          teacherGrade.value = newGrade;
          this.teacherController.populateTopicsDropdown();
        }

        // Cập nhật lại giao diện học sinh
        this.studentController.renderDashboard();
        if (this.currentView === "view-map") {
          this.studentController.renderAdventureMap();
        }
      });
    }

    // Hamburger menu trên thiết bị di động
    const mobileMenuBtn = document.getElementById("btn-mobile-menu");
    const sidebar = document.getElementById("app-sidebar");
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
  }

  /**
   * Hiển thị và xử lý màn hình Cài đặt
   */
  renderSettings() {
    const data = StorageManager.load();

    const nameInput = document.getElementById("setting-name-input");
    if (nameInput) nameInput.value = data.profile.name || "Nguyễn Văn A";

    const soundCheck = document.getElementById("setting-sound-toggle");
    if (soundCheck) soundCheck.checked = Boolean(data.settings.soundEnabled);

    const timerCheck = document.getElementById("setting-timer-toggle");
    if (timerCheck) timerCheck.checked = Boolean(data.settings.timerEnabled);

    // Lưu tên học sinh
    const btnSaveName = document.getElementById("btn-save-name");
    if (btnSaveName && nameInput) {
      btnSaveName.onclick = () => {
        const newName = nameInput.value.trim();
        if (newName) {
          data.profile.name = newName;
          StorageManager.save(data);
          this.studentController.renderDashboard();
          SoundEffects.playCorrect();
          alert("Đã cập nhật tên học sinh thành công!");
        }
      };
    }

    // Đổi cài đặt âm thanh
    if (soundCheck) {
      soundCheck.onchange = (e) => {
        data.settings.soundEnabled = e.target.checked;
        StorageManager.save(data);
        SoundEffects.setMuted(!data.settings.soundEnabled);
        const btnAudio = document.getElementById("btn-header-audio");
        if (btnAudio) btnAudio.innerHTML = data.settings.soundEnabled ? "🔊" : "🔇";
      };
    }

    // Đổi cài đặt đồng hồ
    if (timerCheck) {
      timerCheck.onchange = (e) => {
        data.settings.timerEnabled = e.target.checked;
        StorageManager.save(data);
      };
    }

    // Nút chạy kiểm thử tự động
    const btnRunTests = document.getElementById("btn-run-tests");
    if (btnRunTests) {
      btnRunTests.onclick = () => {
        UnitTests.showTestModal();
      };
    }

    // Xuất dữ liệu JSON
    const btnExport = document.getElementById("btn-export-json");
    if (btnExport) {
      btnExport.onclick = () => {
        const jsonStr = StorageManager.exportJSON();
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `math_hero_save_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };
    }

    // Nhập dữ liệu JSON
    const fileInput = document.getElementById("file-import-json");
    if (fileInput) {
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = StorageManager.importJSON(event.target.result);
          if (res.success) {
            SoundEffects.playCorrect();
            alert("Đã khôi phục dữ liệu từ tệp JSON thành công!");
            this.studentController.renderDashboard();
            this.renderSettings();
          } else {
            alert(`Lỗi khi nhập tệp: ${res.error}`);
          }
        };
        reader.readAsText(file);
      };
    }

    // Đặt lại toàn bộ dữ liệu
    const btnReset = document.getElementById("btn-reset-data");
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm("⚠️ Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập và điểm XP về mặc định không?")) {
          StorageManager.resetAll();
          this.studentController.renderDashboard();
          this.renderSettings();
          SoundEffects.playCorrect();
          alert("Đã khôi phục trạng thái ban đầu!");
        }
      };
    }
  }
}

// Khởi chạy ứng dụng khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  window.app = new MathHeroApp();
  window.app.init();
});
