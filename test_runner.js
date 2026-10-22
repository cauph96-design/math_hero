/**
 * Math Hero Web - Command-Line Test Runner
 * Tương thích cả Node.js và macOS JavaScriptCore (jsc).
 */

if (typeof window === "undefined") {
  var window = this;
}

if (typeof localStorage === "undefined") {
  var localStorage = {
    _store: {},
    getItem: function(k) { return this._store[k] || null; },
    setItem: function(k, v) { this._store[k] = String(v); },
    removeItem: function(k) { delete this._store[k]; }
  };
}

if (typeof load === "function") {
  // JavaScriptCore environment
  load('js/math-core/curriculum.js');
  load('js/math-core/question-bank.js');
  load('js/math-core/evaluator.js');
  load('js/math-core/scoring-engine.js');
  load('js/math-core/explanation-engine.js');
  load('js/math-core/question-generator.js');
  load('js/storage/storage-manager.js');
  load('js/tests/unit-tests.js');
} else if (typeof require === "function") {
  // Node.js environment
  require('./js/math-core/curriculum.js');
  require('./js/math-core/question-bank.js');
  require('./js/math-core/evaluator.js');
  require('./js/math-core/scoring-engine.js');
  require('./js/math-core/explanation-engine.js');
  require('./js/math-core/question-generator.js');
  require('./js/storage/storage-manager.js');
  require('./js/tests/unit-tests.js');
}

var summary = UnitTests.runAll();
var output = (typeof print === "function") ? print : console.log;
output("==================================================");
output("KẾT QUẢ KIỂM THỬ:");
output("Tổng số bài kiểm tra: " + summary.total);
output("Số bài đạt (PASS):    " + summary.passed);
output("Số bài lỗi (FAIL):    " + summary.failed);
output("==================================================");

if (summary.failed > 0) {
  if (typeof process !== "undefined" && process.exit) {
    process.exit(1);
  }
}
