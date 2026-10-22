/**
 * Math Hero Web - Sound Effects
 * Âm thanh game hóa bằng Web Audio API thuần (không cần tải file ngoài, phản hồi tức thì).
 */

class SoundEffects {
  static audioCtx = null;
  static isMuted = false;

  static init() {
    if (!SoundEffects.audioCtx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        SoundEffects.audioCtx = new AudioContext();
      }
    }
    // Resume context if suspended by browser autoplay policy
    if (SoundEffects.audioCtx && SoundEffects.audioCtx.state === "suspended") {
      SoundEffects.audioCtx.resume();
    }
  }

  static setMuted(muted) {
    SoundEffects.isMuted = Boolean(muted);
  }

  /**
   * Phát âm thanh tiếng bấm nút nhẹ
   */
  static playClick() {
    if (SoundEffects.isMuted) return;
    try {
      SoundEffects.init();
      if (!SoundEffects.audioCtx) return;

      const osc = SoundEffects.audioCtx.createOscillator();
      const gain = SoundEffects.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, SoundEffects.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, SoundEffects.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.1, SoundEffects.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, SoundEffects.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(SoundEffects.audioCtx.destination);

      osc.start();
      osc.stop(SoundEffects.audioCtx.currentTime + 0.05);
    } catch (e) {
      // Bỏ qua nếu trình duyệt chặn autoplay
    }
  }

  /**
   * Âm thanh trả lời đúng (hợp âm ngân vang vui tươi)
   */
  static playCorrect() {
    if (SoundEffects.isMuted) return;
    try {
      SoundEffects.init();
      if (!SoundEffects.audioCtx) return;

      const now = SoundEffects.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = SoundEffects.audioCtx.createOscillator();
        const gain = SoundEffects.audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(SoundEffects.audioCtx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch (e) {}
  }

  /**
   * Âm thanh trả lời chưa đúng (âm trầm nhẹ nhàng, không gây ức chế)
   */
  static playWrong() {
    if (SoundEffects.isMuted) return;
    try {
      SoundEffects.init();
      if (!SoundEffects.audioCtx) return;

      const now = SoundEffects.audioCtx.currentTime;
      const osc = SoundEffects.audioCtx.createOscillator();
      const gain = SoundEffects.audioCtx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(SoundEffects.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  /**
   * Âm thanh lên cấp / hoàn thành chặng (Fanfare hào hứng)
   */
  static playLevelUp() {
    if (SoundEffects.isMuted) return;
    try {
      SoundEffects.init();
      if (!SoundEffects.audioCtx) return;

      const now = SoundEffects.audioCtx.currentTime;
      // Melody: C5, G4, C5, E5, G5
      const notes = [
        { f: 523.25, d: 0.1 },
        { f: 392.0, d: 0.1 },
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.15 },
        { f: 783.99, d: 0.4 }
      ];

      let elapsed = 0;
      notes.forEach(note => {
        const osc = SoundEffects.audioCtx.createOscillator();
        const gain = SoundEffects.audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(note.f, now + elapsed);

        gain.gain.setValueAtTime(0.2, now + elapsed);
        gain.gain.exponentialRampToValueAtTime(0.001, now + elapsed + note.d);

        osc.connect(gain);
        gain.connect(SoundEffects.audioCtx.destination);

        osc.start(now + elapsed);
        osc.stop(now + elapsed + note.d);

        elapsed += note.d * 0.9;
      });
    } catch (e) {}
  }

  /**
   * Tiếng tích tắc đồng hồ
   */
  static playTick() {
    if (SoundEffects.isMuted) return;
    try {
      SoundEffects.init();
      if (!SoundEffects.audioCtx) return;

      const osc = SoundEffects.audioCtx.createOscillator();
      const gain = SoundEffects.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, SoundEffects.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.03, SoundEffects.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, SoundEffects.audioCtx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(SoundEffects.audioCtx.destination);

      osc.start();
      osc.stop(SoundEffects.audioCtx.currentTime + 0.03);
    } catch (e) {}
  }
}

if (typeof window !== "undefined") {
  window.SoundEffects = SoundEffects;
}
