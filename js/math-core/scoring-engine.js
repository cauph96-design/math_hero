/**
 * Math Hero Web - Scoring Engine
 * Hệ thống tính điểm XP, sao thưởng, chuỗi liên tiếp và cấp độ game hóa.
 */

class ScoringEngine {
  static BASE_XP = 10;
  static MAX_STREAK_BONUS = 10;
  static XP_PER_LEVEL = 100;

  static DIFFICULTY_MULTIPLIERS = {
    easy: 1.0,
    medium: 1.2,
    hard: 1.5
  };

  static TITLES = [
    { minLevel: 1, title: "Tập Sự Toán Học", badge: "🌱" },
    { minLevel: 2, title: "Nhà Toán Học Nhí", badge: "⭐" },
    { minLevel: 4, title: "Chiến Binh Số Học", badge: "⚔️" },
    { minLevel: 6, title: "Hiệp Sĩ Phép Tính", badge: "🛡️" },
    { minLevel: 9, title: "Đại Kiện Tướng", badge: "🧙‍♂️" },
    { minLevel: 12, title: "Math Hero Huyền Thoại", badge: "👑" }
  ];

  /**
   * Tính số XP nhận được cho 1 câu trả lời đúng
   * @param {Object} params { difficulty, currentStreak }
   * @returns {Object} { xpGained, streakBonus, baseXP }
   */
  static calculateQuestionXP(params = {}) {
    const difficulty = params.difficulty || "medium";
    const currentStreak = params.currentStreak || 0;

    const mult = ScoringEngine.DIFFICULTY_MULTIPLIERS[difficulty] || 1.0;
    const baseXP = Math.round(ScoringEngine.BASE_XP * mult);

    // Chuỗi đúng: từ câu thứ 2 liên tiếp trở đi được cộng thêm 2 XP mỗi nấc, tối đa +10 XP
    let streakBonus = 0;
    if (currentStreak >= 2) {
      streakBonus = Math.min((currentStreak - 1) * 2, ScoringEngine.MAX_STREAK_BONUS);
    }

    const totalXP = baseXP + streakBonus;

    return {
      xpGained: totalXP,
      baseXP,
      streakBonus
    };
  }

  /**
   * Tính số sao thưởng cho một lượt làm bài dựa trên tỷ lệ % đúng
   * @param {number} correctCount Số câu đúng
   * @param {number} totalCount Tổng số câu
   * @returns {Object} { stars: 0..3, percentage: number, passed: boolean }
   */
  static calculateStars(correctCount, totalCount) {
    if (!totalCount || totalCount <= 0) {
      return { stars: 0, percentage: 0, passed: false };
    }
    const percentage = Math.round((correctCount / totalCount) * 100);

    let stars = 0;
    if (percentage >= 80) {
      stars = 3;
    } else if (percentage >= 60) {
      stars = 2;
    } else if (percentage >= 40) {
      stars = 1;
    } else {
      stars = 0;
    }

    return {
      stars,
      percentage,
      passed: stars >= 1 // Đạt ít nhất 1 sao để mở khóa màn tiếp theo
    };
  }

  /**
   * Tính cấp độ và tiến độ thanh XP từ tổng XP
   * @param {number} totalXP Tổng số điểm kinh nghiệm
   * @returns {Object} { level, currentLevelXP, nextLevelXP, progressPercent, title, badge }
   */
  static calculateLevel(totalXP) {
    const xp = Math.max(0, parseInt(totalXP, 10) || 0);
    const level = Math.floor(xp / ScoringEngine.XP_PER_LEVEL) + 1;
    const currentLevelXP = xp % ScoringEngine.XP_PER_LEVEL;
    const nextLevelXP = ScoringEngine.XP_PER_LEVEL;
    const progressPercent = Math.round((currentLevelXP / nextLevelXP) * 100);

    // Xác định danh hiệu
    let titleInfo = ScoringEngine.TITLES[0];
    for (const item of ScoringEngine.TITLES) {
      if (level >= item.minLevel) {
        titleInfo = item;
      }
    }

    return {
      level,
      currentLevelXP,
      nextLevelXP,
      progressPercent,
      title: titleInfo.title,
      badge: titleInfo.badge
    };
  }
}

if (typeof window !== "undefined") {
  window.ScoringEngine = ScoringEngine;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ScoringEngine };
}
