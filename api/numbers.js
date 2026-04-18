let emptyNumbers = [
  { id: 1, number: "081234567890", operator: "Telkomsel", price: 5000, otp_ready: true }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: emptyNumbers });
  }
  
  return res.status(200).json({ success: true, message: "API jalan, Bos!" });
}
