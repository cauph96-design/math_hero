# Math Hero Web 👑 — Nền Tảng Học Toán Game Hóa Lớp 1–5

**Math Hero Web** là website học toán game hóa hiện đại, chạy trực tiếp trên trình duyệt web, được thiết kế chuyên biệt cho học sinh tiểu học (Lớp 1 đến Lớp 5) và giáo viên tại Việt Nam.

Giao diện được xây dựng hoàn thiện theo đúng phong cách từ Concept Image với tông màu xanh dương - vàng tươi sáng, bo góc mượt mà, typography tối ưu tiếng Việt (Be Vietnam Pro) và hệ thống bài giảng trực quan.

---

## 🌟 Hai Chế Độ Hoạt Động Chính

### 1. 🧑‍🏫 Teacher Mode (Chế độ Trình chiếu Giáo viên)
Dành cho giáo viên trình chiếu trên **máy chiếu, màn hình tivi lớn hoặc bảng tương tác thông minh**:
- **Khởi động tức thì:** Không cần đăng ký/đăng nhập.
- **Tùy chỉnh linh hoạt:** Chọn khối lớp (1 đến 5), chọn chủ đề, độ khó (Cơ bản, Trung bình, Nâng cao) và số lượng câu hỏi (5, 10, 15, 20 câu).
- **Giao diện bảng chiếu tối ưu:** Font chữ lớn (28px - 48px), độ tương phản cao, tối ưu khả năng quan sát từ cuối lớp học.
- **Thanh Remote điều khiển docked:**
  - `◀ Câu trước` & `Câu sau ▶`
  - `👁 Hiện/Ẩn đáp án`: Highlight phương án đúng với ánh sáng xanh rõ rệt khi giáo viên muốn công bố.
  - `💡 Lời giải chi tiết`: Kéo ngăn hướng dẫn giải từng bước để phân tích cho cả lớp.
  - `⏱ Đồng hồ đếm ngược`: Tích hợp bộ đếm giờ với tiếng tích tắc và chuông báo hết giờ.
  - `🙋 Biểu quyết lớp học (Classroom Tally)`: Giáo viên có thể chạm vào nút đếm số cánh tay học sinh chọn A, B, C, D để thảo luận tương tác.
  - `⛶ Toàn màn hình`: Kích hoạt Fullscreen API chuẩn cho máy chiếu.
- **Phím tắt nhanh:** Phím mũi tên `←` / `→` (chuyển câu), phím `Space` (hiện/ẩn đáp án), phím `T` (đếm giờ), phím `F` (toàn màn hình).

### 2. 🎒 Student Mode (Chế độ Tự học & Phiêu lưu Toán học)
Dành cho học sinh tự học và luyện tập trên máy tính, máy tính bảng hoặc điện thoại:
- **Trang chủ Hero Banner:** Lời chào cá nhân hóa, hiển thị Avatar, Cấp độ (Lv.), thanh tiến trình XP, cấp bậc danh hiệu.
- **Bản đồ phiêu lưu (Adventure Map):** Hành trình qua các hòn đảo kỳ thú, từng nấc màn chơi (1 đến 5 sao) và đích đến là Lâu đài vàng huyền bí.
- **Luồng làm bài tương tác:**
  - 10 câu/lượt mặc định (có thể cấu hình trong Cài đặt).
  - Trắc nghiệm, điền số, so sánh dấu, bài toán có lời văn.
  - Âm thanh Web Audio API phản hồi tức thì (tiếng chuông chúc mừng, hợp âm khi đúng, âm trầm nhẹ khi sai, fanfare khi lên cấp).
  - Lời giải từng bước chi tiết giải thích ngay khi hoàn thành câu hỏi.
  - Chống bấm nhiều lần gây trùng lặp điểm (Double-click protection).
  - Modal tổng kết lượt học với hoạt ảnh số sao, XP thưởng và thời gian giải.
- **Bảng vàng (Leaderboard):** Bảng xếp hạng các dũng sĩ toán học với huy chương và thứ hạng cá nhân.
- **Thống kê (Statistics):** Biểu đồ tỷ lệ đúng, số bài đã làm, thời gian trung bình và tiến độ theo môn.

---

## 🏗️ Cấu Trúc Mã Nguồn

```
math_hero/
├── index.html                   # Giao diện chính hoàn chỉnh (Semantic HTML5)
├── css/
│   └── style.css                # CSS thiết kế hiện đại, responsive, projector mode
├── js/
│   ├── app.js                   # Điều phối chính, chuyển view, liên kết sự kiện
│   ├── math-core/
│   │   ├── curriculum.js        # Khung chương trình chuẩn Lớp 1 - 5
│   │   ├── question-bank.js     # Ngân hàng câu hỏi tuyển chọn có giải thích
│   │   ├── question-generator.js# Thuật toán sinh câu hỏi tự động bám sát lớp
│   │   ├── evaluator.js         # Bộ kiểm tra đáp án (số, phân số, chia có dư, so sánh)
│   │   ├── scoring-engine.js    # Tính điểm XP, sao thưởng, cấp độ, chuỗi streak
│   │   └── explanation-engine.js# Định dạng lời giải từng bước trực quan
│   ├── storage/
│   │   └── storage-manager.js   # Quản lý LocalStorage với Schema Versioning & Xuất/Nhập JSON
│   ├── audio/
│   │   └── sound-effects.js     # Âm thanh game hóa bằng Web Audio API thuần
│   ├── student/
│   │   └── student-controller.js# Điều khiển logic Student Mode & Bản đồ phiêu lưu
│   ├── teacher/
│   │   └── teacher-controller.js# Điều khiển Teacher Mode trình chiếu máy chiếu
│   └── tests/
│       └── unit-tests.js        # Bộ kiểm thử tự động toàn diện
├── test_runner.js               # CLI test runner (chạy bằng jsc hoặc node)
├── run.sh                       # Script chạy nhanh HTTP server
└── assets/
    └── images/concept.jpg       # Ảnh concept tham khảo
```

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Chạy trực tiếp từ file (Không cần cài đặt bất kỳ công cụ nào)
1. Mở thư mục dự án `math_hero/`.
2. Nhấp đúp chuột vào file `index.html` để mở trực tiếp trên Google Chrome, Cốc Cốc, Edge, Safari hoặc Firefox.

### Cách 2: Khởi chạy qua Local Web Server
Chạy lệnh sau trong Terminal tại thư mục dự án:
```bash
./run.sh
# Hoặc: python3 -m http.server 8080
```
Sau đó truy cập: `http://localhost:8080` trên trình duyệt.

---

## 🧪 Kết Quả Kiểm Thử Tự Động (Automated Unit Tests)

Ứng dụng tích hợp bộ kiểm thử 27 bài test bao quát các trường hợp biên toán học và logic:
- **Kiểm thử Answer Evaluator:**
  - Nhập số có khoảng cách (` 1 250 `)
  - Dấu phẩy thập phân tiếng Việt (`3,5` vs `3.5`)
  - Phép chia có dư chuẩn (`5 dư 2` vs `5 du 2`)
  - Phân số tương đương (`6/8` == `3/4`)
  - Rút gọn phân số (`18/24` -> `3/4`)
  - Dấu so sánh `<`, `>`, `=`
- **Kiểm thử Question Generator:** Sinh đề toán tự động cho cả 5 khối lớp (Lớp 1 đến Lớp 5) đảm bảo tính hợp lệ toán học.
- **Kiểm thử Scoring Engine:** Tính toán sao (0-3 sao), XP cơ bản, chuỗi streak thưởng và cấp độ người chơi.
- **Kiểm thử Storage:** Tự động nâng cấp schema và khôi phục khi dữ liệu hỏng.

Để chạy kiểm thử:
- Trên web: Vào **Cài đặt** -> Bấm nút **"Chạy Unit Tests"** hoặc thêm `?test=1` vào URL.
- Trên Terminal (macOS):
  ```bash
  /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc test_runner.js
  ```
  Kết quả: **27/27 bài kiểm tra đều ĐẠT (PASS 100%)**.
