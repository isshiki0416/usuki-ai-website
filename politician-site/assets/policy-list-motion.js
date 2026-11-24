(() => {
  const article = document.querySelector('main article');
  const header = document.querySelector('.site-header');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!article || !header || reduced.matches) return;
  const bar = document.createElement('span');
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = 'position:absolute;bottom:0;left:0;width:100%;height:3px;background:#fa5532;pointer-events:none;transform-origin:left;transform:scaleX(0)';
  header.append(bar);
  let frame = 0;
  function paint() {
    frame = 0;
    const rect = article.getBoundingClientRect();
    const start = header.offsetHeight;
    const span = Math.max(1, rect.height - innerHeight + start);
    bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, (start - rect.top) / span)) + ')';
  }
  function queue() { if (!frame) frame = requestAnimationFrame(paint); }
  paint();
  addEventListener('scroll', queue, {passive:true});
  addEventListener('resize', queue);
  if (!window.IntersectionObserver || !Element.prototype.animate) return;
  const active = new Set();
  const observer = new IntersectionObserver(entries => {
    let i = 0;
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reduced.matches) continue;
      const divider = target.matches('hr');
      const item = target.matches('li');
      const anim = target.animate(divider
        ? [{transform:'scaleX(.08)',transformOrigin:'left'}, {transform:'scaleX(1)',transformOrigin:'left'}]
        : [{opacity:.2,transform:item?'translateY(6px)':'translateX(-8px)'},{opacity:1,transform:'none'}],
        {duration:divider?580:400,delay:item?Math.min(i++,4)*45:0,easing:'ease-out',fill:'backwards'});
      active.add(anim);
      anim.onfinish = () => active.delete(anim);
    }
  }, {threshold:.05});
  article.querySelectorAll('h2, .policy-divider, ul > li').forEach(el=>observer.observe(el));
  reduced.addEventListener?.('change', () => {
    bar.hidden = reduced.matches;
    if (reduced.matches) { active.forEach(anim=>anim.cancel()); active.clear(); }
  });
})();
