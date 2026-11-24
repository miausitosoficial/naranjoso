/* Comportamiento compartido: tema, barra, animaciones al hacer scroll. */
(() => {
  const root = document.documentElement;
  const oscuroSO = () => matchMedia("(prefers-color-scheme: dark)").matches;

  /* Tema claro / oscuro (se recuerda en este navegador) */
  const btn = document.getElementById("tema");
  const actual = () => root.dataset.theme || (oscuroSO() ? "dark" : "light");
  const pintar = () => { if (btn) btn.setAttribute("aria-label", actual() === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"); };
  if (!root.dataset.theme) root.dataset.theme = actual();
  pintar();
  btn && btn.addEventListener("click", () => {
    const t = actual() === "dark" ? "light" : "dark";
    root.dataset.theme = t;
    try { localStorage.setItem("tema", t); } catch (e) {}
    pintar();
  });

  /* Barra con fondo al bajar */
  const barra = document.getElementById("barra");
  const onScroll = () => barra && barra.classList.toggle("sombra", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* Aparecer al entrar en pantalla */
  window.observarRV = (raiz = document) => {
    const els = raiz.querySelectorAll(".rv:not(.si)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("si")); return; }
    const io = new IntersectionObserver(ents => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("si"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    els.forEach(e => io.observe(e));
  };

  /* Chispas: emojis o textos que saltan desde un punto (al tocar gatos) */
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.chispas = (x, y, simbolos, n = 9) => {
    if (quieto) return;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "chispa";
      s.textContent = simbolos[i % simbolos.length];
      const ang = (Math.PI * 2 * i) / n + Math.random() * .6;
      const dist = 60 + Math.random() * 70;
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist - 50 + "px");
      s.style.setProperty("--rot", (Math.random() * 80 - 40) + "deg");
      s.style.fontSize = 16 + Math.random() * 16 + "px";
      document.body.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  };

  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
