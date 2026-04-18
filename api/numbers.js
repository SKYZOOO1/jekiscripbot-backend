let emptyNumbers = [
  { id: 1, number: "081234567890", operator: "Telkomsel", price: 5000, otp_ready: true }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: emptyNumbers });
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
