let emptyNumbers = [
  { id: 1, number: "081234567890", operator: "Telkomsel", price: 5000, otp_ready: true },
  { id: 2, number: "085678901234", operator: "Indosat", price: 4000, otp_ready: true },
  { id: 3, number: "089876543210", operator: "XL", price: 3500, otp_ready: false },
  { id: 4, number: "088212345678", operator: "Smartfren", price: 3000, otp_ready: true },
  { id: 5, number: "083812345678", operator: "Telkomsel", price: 6000, otp_ready: true },
  { id: 6, number: "081398765432", operator: "Tri", price: 2500, otp_ready: false },
  { id: 7, number: "082112345678", operator: "Telkomsel", price: 4500, otp_ready: true },
  { id: 8, number: "087712345678", operator: "XL", price: 3000, otp_ready: true }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    const { operator, maxPrice, otp_ready } = req.query;
    let filtered = [...emptyNumbers];
    if (operator) filtered = filtered.filter(n => n.operator === operator);
    if (maxPrice) filtered = filtered.filter(n => n.price <= parseInt(maxPrice));
    if (otp_ready === 'true') filtered = filtered.filter(n => n.otp_ready === true);
    return res.status(200).json({ success: true, data: filtered });
  }
  
  if (req.method === 'POST') {
    const { numberId } = req.body;
    const index = emptyNumbers.findIndex(n => n.id === numberId);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Nomor udah laku, Bos!" });
    }
    const bought = emptyNumbers[index];
    emptyNumbers.splice(index, 1);
    return res.status(200).json({ success: true, message: `Nomor ${bought.number} berhasil dibeli!` });
  }
  
  return res.status(405).json({ success: false, message: "Method gak didukung" });
}
