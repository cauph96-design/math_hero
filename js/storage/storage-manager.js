/**
 * Math Hero Web - Storage Manager
 * Quản lý lưu trữ trạng thái người dùng với schema versioning, xuất/nhập JSON an toàn.
 */

const STORAGE_KEY = "math_hero_save_v1";
const SCHEMA_VERSION = "1.0.0";

const DEFAULT_SAVE_DATA = {
  version: SCHEMA_VERSION,
  lastUpdated: new Date().toISOString(),
  profile: {
    name: "Nguyễn Văn A",
    grade: 5,
    avatar: "hero_boy",
    title: "Nhà Toán Học Tương Lai"
  },
  stats: {
    totalXP: 120,
    totalAnswered: 48,
    correctCount: 44,
    totalTimeSeconds: 4416, // ~1 phút 32s trung bình
    currentStreak: 3,
    maxStreak: 12,
    sessionsCompleted: 5
  },
  progress: {
    // Tiến độ các chủ đề (mặc định mở khóa 1-3 màn đầu để học sinh trải nghiệm)
    g1_add_sub_10: { unlockedLevel: 3, stars: { 1: 3, 2: 3, 3: 0 } },
    g2_mult_div_2_5: { unlockedLevel: 2, stars: { 1: 3, 2: 0 } },
    g3_mult_div_tables: { unlockedLevel: 3, stars: { 1: 3, 2: 2, 3: 0 } },
    g4_fractions_basic: { unlockedLevel: 2, stars: { 1: 3, 2: 0 } },
    g5_decimals_basics: { unlockedLevel: 3, stars: { 1: 3, 2: 3, 3: 0, 4: 0, 5: 0 } },
    g5_percentages: { unlockedLevel: 2, stars: { 1: 2, 2: 0 } }
  },
  settings: {
    soundEnabled: true,
    timerEnabled: true,
    questionCountDefault: 10,
    theme: "light",
    teacherPreset: {
      mode: "discussion", // 'discussion' | 'exam'
      timerDuration: 60,
      showStepsByDefault: false
    }
  },
  history: []
};

class StorageManager {
  /**
   * Tải dữ liệu lưu trữ từ localStorage
   */
  static load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return StorageManager.initializeDefault();
      }
      const data = JSON.parse(raw);
      return StorageManager.migrate(data);
    } catch (e) {
      console.warn("StorageManager: Lỗi đọc dữ liệu localStorage, khôi phục mặc định:", e);
      return StorageManager.initializeDefault();
    }
  }

  /**
   * Lưu dữ liệu vào localStorage
   */
  static save(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("StorageManager: Lỗi lưu vào localStorage:", e);
      return false;
    }
  }

  /**
   * Khởi tạo dữ liệu mặc định ban đầu
   */
  static initializeDefault() {
    const data = JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA));
    StorageManager.save(data);
    return data;
  }

  /**
   * Nâng cấp schema nếu cần thiết (không làm mất dữ liệu hiện có)
   */
  static migrate(data) {
    if (!data || typeof data !== "object") {
      return StorageManager.initializeDefault();
    }

    // Đảm bảo các thuộc tính chính luôn tồn tại
    data.profile = { ...DEFAULT_SAVE_DATA.profile, ...(data.profile || {}) };
    data.stats = { ...DEFAULT_SAVE_DATA.stats, ...(data.stats || {}) };
    data.progress = data.progress || { ...DEFAULT_SAVE_DATA.progress };
    data.settings = { ...DEFAULT_SAVE_DATA.settings, ...(data.settings || {}) };
    data.history = Array.isArray(data.history) ? data.history : [];
    data.version = SCHEMA_VERSION;

    return data;
  }

  /**
   * Khôi phục toàn bộ về trạng thái ban đầu
   */
  static resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    return StorageManager.initializeDefault();
  }

  /**
   * Xuất dữ liệu ra chuỗi JSON để tải về máy
   */
  static exportJSON() {
    const data = StorageManager.load();
    return JSON.stringify(data, null, 2);
  }

  /**
   * Nhập dữ liệu từ chuỗi JSON
   */
  static importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Dữ liệu JSON không hợp lệ");
      }
      const migrated = StorageManager.migrate(parsed);
      StorageManager.save(migrated);
      return { success: true, data: migrated };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Cập nhật tiến độ hoàn thành một màn chơi
   */
  static recordLevelResult(topicId, levelNumber, starsEarned, xpGained) {
    const data = StorageManager.load();

    if (!data.progress[topicId]) {
      data.progress[topicId] = { unlockedLevel: 1, stars: {} };
    }

    const currentTopic = data.progress[topicId];
    currentTopic.stars = currentTopic.stars || {};

    // Cập nhật số sao cao nhất
    const oldStars = currentTopic.stars[levelNumber] || 0;
    if (starsEarned > oldStars) {
      currentTopic.stars[levelNumber] = starsEarned;
    }

    // Nếu đạt ít nhất 1 sao và đây là màn hiện tại, mở khóa màn tiếp theo
    if (starsEarned >= 1 && levelNumber >= currentTopic.unlockedLevel && levelNumber < 5) {
      currentTopic.unlockedLevel = levelNumber + 1;
    }

    // Cập nhật XP
    data.stats.totalXP = (data.stats.totalXP || 0) + xpGained;

    StorageManager.save(data);
    return data;
  }
}

if (typeof window !== "undefined") {
  window.StorageManager = StorageManager;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { StorageManager, DEFAULT_SAVE_DATA };
}
