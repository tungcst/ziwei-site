// api/chart.js
const gen = require('../lib/generateChart');

module.exports = (req, res) => {
  // ---- 共通 CORS 標頭 ----
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ---- 處理預檢 (OPTIONS) ----
  if (req.method === 'OPTIONS') {
    return res.status(200).end();   // 直接回 200 OK
  }

  // ---- 處理正式 POST ----
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { date, time, tz, gender, lang } = req.body;
    const chart = gen(date, time, tz, gender, lang || 'zh-TW');
    res.setHeader('Cache-Control', 's-maxage=60');
    res.json(chart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
