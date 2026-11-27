(() => {
  'use strict';
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  if (!header || !toggle || !navigation) return;

  const label = toggle.querySelector('.menu-label');
  const mobile = window.matchMedia('(max-width: 700px)');
  const setOpen = (open, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    label.textContent = open ? '收起导航' : '展开导航';
    if (restoreFocus) toggle.focus();
  };

  toggle.hidden = false;
  header.classList.add('nav-ready');
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', () => {
    const active = document.activeElement;
    const focusWillBeHidden = mobile.matches
      ? navigation.contains(active)
      : active === toggle;
    setOpen(false, focusWillBeHidden && mobile.matches);
    if (focusWillBeHidden && !mobile.matches) navigation.querySelector('a').focus();
  });
})();
