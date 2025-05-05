/*  載入完成後自動執行  */
document.addEventListener('DOMContentLoaded', initZiwei);

function initZiwei(){
  console.log('[Ziwei] init');
  document.getElementById('calculateBtn').addEventListener('click', generateChart);
  generateChart();          // 預設跑一次
}

/* ---- 主程式 ---- */
function generateChart(){
  /* 1. 收集輸入 */
  const dateStr = document.getElementById('birthDate').value;
  if(!dateStr){ alert('請選日期'); return; }
  const timeIdx = +document.getElementById('birthTime').value;
  const gender  = document.querySelector('input[name="gender"]:checked').value;
  const calType = document.querySelector('input[name="calendar"]:checked').value;
  const isLeap  = document.getElementById('leapMonth').checked;

  /* 2. 呼叫 iztro */
  const opt = {
    type: calType,
    dateStr,
    timeIndex: timeIdx,
    gender,
    language:'zh-TW',
    fixLeap:true
  };
  if(calType==='lunar') opt.isLeapMonth = isLeap;

  let astro;
  try{
    astro = iztro.astro.withOptions(opt);
  }catch(e){
    console.error(e);
    alert('排盤失敗，請檢查輸入！');
    return;
  }

  /* 3. 繪圖 */
  drawChart(astro);
}

function drawChart(astro){
  /* 清空 12 宮 + 中宮 */
  for(let i=0;i<12;i++) document.getElementById('pal'+i).innerHTML='';
  document.getElementById('center').innerHTML='';

  /* 中宮 */
  document.getElementById('center').innerHTML =
    `命主：${astro.soul}　身主：${astro.body}<br>`+
    `${astro.solarDate} ${astro.timeRange}<br>`+
    `${astro.fiveElementsClass}　${astro.zodiac}`;

  /* 12 宮 */
  astro.palaces.forEach(p=>{
    const td = document.getElementById('pal'+p.index);
    if(!td) return;
    td.innerHTML =
      `<div class="palace-name">${p.palaceName}</div>`+
      p.majorStars.map(s=>`<span class="star-major">${s.name}</span>`).join('')+
      p.minorStars.map(s=>`<span class="star-minor">${s.name}</span>`).join('')+
      p.adjectiveStars.map(s=>`<span class="star-adj">${s.name}</span>`).join('');
  });
}

/* 點宮位 ⇒ 高亮三方四正 */
document.addEventListener('click',e=>{
  if(!e.target.closest('#chart td')) return;
  const td = e.target.closest('#chart td');
  if(!td.id.startsWith('pal')) return;

  document.querySelectorAll('#chart td').forEach(t=>t.classList.remove('highlight'));
  const idx = +td.id.replace('pal','');
  [idx,(idx+6)%12,(idx+4)%12,(idx+8)%12].forEach(i=>{
    const t = document.getElementById('pal'+i);
    if(t) t.classList.add('highlight');
  });
});
