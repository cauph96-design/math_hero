/**
 * Math Hero Web - Explanation Engine
 * Trình tạo và định dạng lời giải từng bước trực quan, dễ hiểu cho học sinh tiểu học.
 */

class ExplanationEngine {
  /**
   * Định dạng lời giải chi tiết thành HTML hoặc mảng bước trực quan
   * @param {Object|string} rawExplanation Dữ liệu lời giải
   * @returns {Object} { steps: Array<{stepNumber, text, highlight}>, note: string, formula: string }
   */
  static format(rawExplanation) {
    if (!rawExplanation) {
      return {
        steps: [{ stepNumber: 1, text: "Xem lại lý thuyết và các bước tính của bài học." }],
        note: "",
        formula: ""
      };
    }

    // Nếu đã là object có cấu trúc
    if (typeof rawExplanation === "object" && rawExplanation.steps) {
      return {
        steps: rawExplanation.steps,
        note: rawExplanation.note || "",
        formula: rawExplanation.formula || ""
      };
    }

    // Nếu là string, phân tách theo dòng hoặc dấu xuống hàng / dấu gạch đầu dòng
    const text = String(rawExplanation).trim();
    const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);

    const steps = [];
    let note = "";
    let formula = "";

    lines.forEach((line, index) => {
      if (line.toLowerCase().startsWith("lưu ý:") || line.toLowerCase().startsWith("chú ý:")) {
        note = line.replace(/^(?:lưu ý|chú ý):\s*/i, "");
      } else if (line.toLowerCase().startsWith("công thức:") || line.toLowerCase().startsWith("quy tắc:")) {
        formula = line.replace(/^(?:công thức|quy tắc):\s*/i, "");
      } else {
        // Làm sạch tiền tố bước nếu có
        const cleanedText = line.replace(/^(?:bước\s*\d+[:.]?|-|\*)\s*/i, "");
        steps.push({
          stepNumber: steps.length + 1,
          text: cleanedText
        });
      }
    });

    if (steps.length === 0) {
      steps.push({ stepNumber: 1, text });
    }

    return { steps, note, formula };
  }

  /**
   * Tạo HTML hiển thị thẻ lời giải
   */
  static renderHTML(explanationObj) {
    const formatted = ExplanationEngine.format(explanationObj);
    let html = `<div class="explanation-card">`;
    html += `<div class="explanation-header"><span class="exp-icon">💡</span> <strong>Lời giải chi tiết:</strong></div>`;

    if (formatted.formula) {
      html += `<div class="explanation-formula"><span class="badge-formula">Công thức</span> <code>${formatted.formula}</code></div>`;
    }

    html += `<ol class="explanation-steps">`;
    formatted.steps.forEach(step => {
      html += `<li><span class="step-badge">Bước ${step.stepNumber}</span> <span class="step-content">${step.text}</span></li>`;
    });
    html += `</ol>`;

    if (formatted.note) {
      html += `<div class="explanation-note"><span class="note-icon">📌</span> <em>${formatted.note}</em></div>`;
    }

    html += `</div>`;
    return html;
  }
}

if (typeof window !== "undefined") {
  window.ExplanationEngine = ExplanationEngine;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ExplanationEngine };
}
