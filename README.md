# Shopee AI Dashboard

## Trend Hunter V2

หน้า `trend-hunter-v2.html` ใช้สำหรับคัดสินค้าที่เริ่มเร่งตัวก่อนแมส โดยเก็บ snapshot ลง Cloudflare D1 และคำนวณ Trend Score จาก growth, acceleration, competition, commission และ freshness

Backend: `https://shopee-trend-hunter.safetysc6.workers.dev`

API:
- `GET /api/trends` ดูสินค้าบนเรดาร์
- `POST /api/trends` เพิ่ม/อัปเดต snapshot วันนี้
- `PATCH /api/trends` อัปเดต Content Queue
- `DELETE /api/trends?id=...` ลบสินค้า

D1: `shopee-trend-hunter-db`

หมายเหตุ: ระบบยังไม่อ้างว่าเป็นข้อมูล Shopee สดจนกว่าจะเชื่อมแหล่งข้อมูลจริงเข้ามาโดยตรง
