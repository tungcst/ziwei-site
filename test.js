const gen = require('./lib/generateChart');

const chart = gen(
  '1976-06-20',   // 出生日期
  '08:45',        // 出生時間
  'Europe/London',// 出生地時區
  'female',       // 性別
  'zh-TW'         // 輸出語言
);

console.log('solarDate =', chart.solarDate); // 應印 1976-06-20 或 1976-06-21
console.log('time      =', chart.time);      // 應印 巳時 之類
