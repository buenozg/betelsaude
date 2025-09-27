(function(){
  function getEls() {
    var navbar = document.getElementById('navbar');
    var mobileMenu = document.getElementById('mobileMenu');
    var btn = null;
    if (navbar) {
      // Seleciona o botão hambúrguer dentro do <nav>
      btn = navbar.querySelector('button');
    }
    return { navbar: navbar, mobileMenu: mobileMenu, btn: btn };
  }

  function isOpen(menu) {
    return menu && !menu.classList.contains('hidden');
  }

  function openMenu(els) {
    if (!els.mobileMenu) return;
    els.mobileMenu.classList.remove('hidden');
    if (els.btn) {
      els.btn.setAttribute('aria-expanded', 'true');
      els.btn.setAttribute('aria-label', 'Fechar menu');
    }
    // Opcional: travar rolagem quando menu está aberto
    // document.body.classList.add('overflow-hidden');
  }

  function closeMenu(els) {
    if (!els.mobileMenu) return;
    els.mobileMenu.classList.add('hidden');
    if (els.btn) {
      els.btn.setAttribute('aria-expanded', 'false');
      els.btn.setAttribute('aria-label', 'Abrir menu');
    }
    // document.body.classList.remove('overflow-hidden');
  }

  function toggleMenu() {
    var els = getEls();
    if (!els.mobileMenu) return;
    if (isOpen(els.mobileMenu)) {
      closeMenu(els);
    } else {
      openMenu(els);
    }
  }

  // Expõe a função globalmente para o onclick existente funcionar
  window.toggleMenu = toggleMenu;

  document.addEventListener('DOMContentLoaded', function(){
    var els = getEls();
    if (!els.mobileMenu) return;

    // Atributos ARIA e acessibilidade
    if (els.btn) {
      els.btn.setAttribute('aria-controls', 'mobileMenu');
      els.btn.setAttribute('aria-expanded', 'false');
      els.btn.setAttribute('aria-label', 'Abrir menu');
    }

    // Garante que comece fechado
    closeMenu(els);

    // Fecha ao clicar em links do menu
    els.mobileMenu.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(){
        closeMenu(els);
      });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener('click', function(e){
      var target = e.target;
      var clickedInsideMenu = els.mobileMenu.contains(target);
      var clickedButton = els.btn && els.btn.contains(target);
      if (isOpen(els.mobileMenu) && !clickedInsideMenu && !clickedButton) {
        closeMenu(els);
      }
    });

    // Fecha com ESC
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && isOpen(els.mobileMenu)) {
        closeMenu(els);
      }
    });

    // Fecha quando ficar em "md" ou maior
    var mq = window.matchMedia('(min-width: 768px)');
    function handleResize() {
      if (mq.matches) {
        closeMenu(els);
      }
    }
    mq.addEventListener ? mq.addEventListener('change', handleResize) : mq.addListener(handleResize);
    handleResize();
  });
})();