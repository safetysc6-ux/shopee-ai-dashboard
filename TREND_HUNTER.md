# Shopee Trend Hunter

เป้าหมาย: หา “สินค้าต้นน้ำ” จากการเร่งตัวของยอดและสัญญาณการแข่งขัน ก่อนสินค้าจะกลายเป็นของแมส

## V1 ที่ทำแล้ว
- หน้า `trend-hunter.html`
- เพิ่มสินค้าเอง / Import CSV
- Trend Score 0–100
- สถานะ `🔥 ทำทันที / 👀 จับตา / ❄️ ยังไม่เด่น`
- ดู Growth, ยอดวันนี้, จำนวนคลิปคู่แข่งโดยประมาณ, commission
- Content Angle อัตโนมัติ
- Content Queue สำหรับสินค้าที่เลือกจะทำคลิป
- Search / Filter / Sort
- เก็บข้อมูลใน localStorage จึงทดลองได้ทันทีโดยไม่ต้องมีฐานข้อมูล

CSV columns:
`name,category,price,sales_today,sales_prev,reviews,videos,commission,url`

## Logic V1
Trend Score ประกอบด้วย:
- Velocity 35 คะแนน: อัตราโตเทียบวันก่อน
- Acceleration 25 คะแนน: จำนวนยอดที่เพิ่มขึ้น
- Competition 20 คะแนน: คู่แข่งน้อยได้คะแนนสูง
- Commission 10 คะแนน
- Freshness 10 คะแนน: รีวิวรวมยังไม่เยอะได้คะแนนสูง

Decision:
- >= 70 = ทำทันที
- 45–69 = จับตา
- < 45 = ยังไม่เด่น

## V2 ที่ควรต่อ
1. เก็บ snapshot รายสินค้าใน Cloudflare D1 ทุกวัน/ทุกชั่วโมง
2. คำนวณ 1D / 3D / 7D acceleration แทนการเทียบแค่สองจุด
3. เพิ่ม `Early Signal` และ `Saturation Risk`
4. เชื่อมข้อมูลสินค้า Shopee จากแหล่งที่ได้รับอนุญาตหรือไฟล์ export ที่เชื่อถือได้
5. เชื่อม Affiliate Dashboard เพื่อดูว่าสินค้าที่ Trend Hunter เลือก เมื่อทำคลิปจริงแล้วแปลงเป็น click/order/commission เท่าไร
6. ให้ระบบเรียนรู้ category / price band / content angle ที่ชนะของบัญชีตัวเอง
7. ส่ง Top 3 Product Opportunities เข้า Today/Slack ได้

## Architecture เป้าหมาย
`Shopee/Product Source -> Snapshot Collector -> Cloudflare D1 -> Trend Engine -> Trend Hunter UI -> Content Queue -> Affiliate Dashboard feedback`

หมายเหตุ: V1 ไม่สร้างหรืออ้างว่าเป็นข้อมูล Shopee สด หากยังไม่ได้เชื่อม source จริง
