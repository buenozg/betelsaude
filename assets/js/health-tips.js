(function() {
  var tips = [
    'Beba água ao longo do dia.',
    'Alimente-se com frutas e verduras diariamente.',
    'Suba escadas em vez de usar o elevador.',
    'Faça pausas para alongar a cada 60 minutos.',
    'Durma bem: procure manter uma rotina de sono.',
    'Caminhe pelo menos 30 minutos por dia.',
    'Reduza o consumo de açúcar e alimentos ultraprocessados.',
    'Lave as mãos com frequência.',
    'Mantenha-se ativo e pratique exercícios regularmente.',
    'Evite o sedentarismo: levante-se e mova-se sempre que puder.'
  ];

  var tipEl, btnNext, idx = -1, timerId = null;

  function pickRandomIndex(prevIdx) {
    if (tips.length <= 1) return 0;
    var i;
    do {
      i = Math.floor(Math.random() * tips.length);
    } while (i === prevIdx);
    return i;
  }

  function setTip(text) {
    if (!tipEl) return;
    tipEl.style.opacity = '0';
    window.setTimeout(function() {
      tipEl.textContent = text;
      tipEl.style.opacity = '1';
    }, 250);
  }

  function nextTip() {
    idx = pickRandomIndex(idx);
    setTip(tips[idx]);
  }

  function startAutoRotate() {
    stopAutoRotate();
    timerId = window.setInterval(nextTip, 7000);
  }

  function stopAutoRotate() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    tipEl = document.getElementById('healthTipText');
    btnNext = document.getElementById('btnNextTip');
    if (!tipEl) return;
    nextTip();
    startAutoRotate();
    if (btnNext) {
      btnNext.addEventListener('click', function() {
        nextTip();
        startAutoRotate();
      });
    }
    var card = document.getElementById('healthTipsCard');
    if (card) {
      card.addEventListener('mouseenter', stopAutoRotate);
      card.addEventListener('mouseleave', startAutoRotate);
    }
  });
})();