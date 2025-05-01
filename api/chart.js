// api/chart.js
const gen = require('../lib/generateChart');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const { date, time, tz, gender, lang } = req.body;
    const chart = gen(date, time, tz, gender, lang || 'zh-TW');

    // CORS 給前端 (Wix) 用
    res.setHeader('Access-Control-Allow-Origin', '*');
    // CDN 快取 1 分鐘（可視需求調整）
    res.setHeader('Cache-Control', 's-maxage=60');

    res.json(chart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
