export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });
  
  const { cookie } = req.body;
  if (!cookie) return res.status(400).json({ error: 'Missing Shopee Cookie' });

  let finalCookie = cookie;

  // ระบบแปลง Cookie จาก JSON (ส่วนขยาย) เป็น String อัตโนมัติ
  try {
    if (cookie.trim().startsWith('[')) {
      const cookieArray = JSON.parse(cookie);
      finalCookie = cookieArray.map(c => `${c.name}=${c.value}`).join('; ');
    }
  } catch (e) {
    // ถ้าไม่ใช่ JSON ก็ให้ใช้งานเป็นข้อความธรรมดาต่อไป
  }

  try {
    // URL สำหรับดึงข้อมูลภาพรวม (Overview) - แก้ไขเอา Auto-link ออกแล้ว
    const shopeeApiUrl = '[https://affiliate.shopee.co.th/api/v3/report/performance/overview](https://affiliate.shopee.co.th/api/v3/report/performance/overview)';

    const shopeeRes = await fetch(shopeeApiUrl, {
      method: 'GET',
      headers: {
        'Cookie': finalCookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': '[https://affiliate.shopee.co.th/](https://affiliate.shopee.co.th/)'
      }
    });

    if (!shopeeRes.ok) throw new Error(`Shopee API Error: ${shopeeRes.status}`);

    const data = await shopeeRes.json();
    
    // โครงสร้างที่แปลงแล้ว เพื่อส่งไปบันทึกลง Supabase
    const formattedData = [
       {
          date: new Date().toISOString().split('T')[0],
          item_name: "สรุปยอดรายวันจาก API",
          clicks: data?.data?.total_clicks || 0,
          conversions: data?.data?.total_conversions || 0,
          sales_amount: data?.data?.total_sales || 0,
          commission: data?.data?.total_commission || 0
       }
    ];

    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed', details: error.message });
  }
}
