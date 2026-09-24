document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('n');
  const company = params.get('e');
  const phone = params.get('t');
  const dynamicName = company ? `${company} | Albañilería` : name ? `${name} | Albañil` : null;

  if (dynamicName) {
    document.title = `${dynamicName} | Servicio de Albañilería`;
    document.querySelectorAll('[data-dynamic="logo"], [data-dynamic="footer-name"]').forEach(el => { el.textContent = dynamicName; });
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = `${dynamicName}. Revoques, nivelación, mampostería, reparaciones y terminaciones en Capital y GBA.`;
  }

  const cleanPhone = phone ? phone.replace(/[\s\-()]/g, '') : '1167967633';
  const whatsappPhone = `549${cleanPhone}`;
  document.querySelectorAll('a[href^="tel:"]').forEach(link => { link.href = `tel:${cleanPhone}`; });
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const message = encodeURIComponent(`Hola, me comunico desde la página${dynamicName ? ` de ${dynamicName}` : ''}. Quiero hacer una consulta.`);
    link.href = `https://wa.me/${whatsappPhone}?text=${message}`;
  });

  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const closeMenu = () => { burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Abrir menú'); menu.hidden = true; document.body.style.overflow = ''; };
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    burger.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
    menu.hidden = open;
    document.body.style.overflow = open ? '' : 'hidden';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) revealItems.forEach(el => el.classList.add('visible'));
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    revealItems.forEach(el => observer.observe(el));
  }

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const formName = document.getElementById('contactName').value.trim();
    const formPhone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const text = [`Hola, quiero hacer una consulta desde la página.`, `Nombre: ${formName}`, `Teléfono: ${formPhone}`, message ? `Detalle: ${message}` : ''].filter(Boolean).join('\n');
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
  document.querySelectorAll('#currentYear').forEach(el => { el.textContent = new Date().getFullYear(); });
});
