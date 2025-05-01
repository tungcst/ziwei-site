// lib/generateChart.js
const iztro = require('iztro');
const { DateTime } = require('luxon');

/**
 * 產生紫微斗數命盤
 * @param {string} isoDate  "YYYY-MM-DD"
 * @param {string} isoTime  "HH:mm"
 * @param {string} tz       IANA 時區字串，如 "Europe/London"
 * @param {"male"|"female"|"男"|"女"} gender
 * @param {string} [lang='zh-TW']
 * @returns {object} iztro 命盤物件
 */
module.exports = function generateChart (
  isoDate, isoTime, tz, gender, lang = 'zh-TW'
) {
  // 1. 先把使用者時間換到台北時區
  const dt = DateTime.fromISO(`${isoDate}T${isoTime}`, { zone: tz })
                     .setZone('Asia/Taipei');

  // 2. 換算 0-11 的時辰索引：子 0、丑 1 … 亥 11
  const hourIndex = Math.floor((dt.hour + 1) / 2) % 12;

  // 3. 使用 iztro 以陽曆排盤
  const chart = iztro.astro.bySolar(
    dt.toISODate(),    // 台北時區下的陽曆日期
    hourIndex,
    gender,
    true,              // already solar
    lang
  );

  // 4. 把原始輸入附加回傳
  chart.input = { isoDate, isoTime, tz };
  return chart;
};
