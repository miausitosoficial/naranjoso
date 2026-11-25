/* "Cine": reproductor de capítulos dentro de la web.
   - Cualquier link con data-ver="5.1" abre el capítulo 5.1 (si tiene video en datos.js).
   - Se puede enlazar directo: index.html#ver-5.1
   - Al terminar, ofrece el siguiente con cuenta regresiva. Teclas: Esc, ← →, espacio. */
const enlaceCap = c => c.video
  ? `href="#ver-${c.n}" data-ver="${c.n}"`
  : `href="${c.url}" target="_blank" rel="noopener"`;

(() => {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  let cine, video, actual = null, cuenta = null, foco = null;

  const conVideo = () => CAPITULOS.filter(c => c.video);
  const vecino = (c, d) => { const l = conVideo(); return l[l.indexOf(c) + d]; };

  function crear() {
    if (cine) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="cine" id="cine" hidden role="dialog" aria-modal="true" aria-labelledby="cineTit">
        <div class="cine-caja">
          <button class="cine-x" type="button" data-cine="cerrar" aria-label="Cerrar">×</button>
          <div class="cine-pantalla">
            <video id="cineVideo" playsinline controls preload="metadata"></video>
            <div class="cine-fin" id="cineFin" hidden>
              <p>Siguiente capítulo</p>
              <img id="cineFinImg" alt="">
              <b id="cineFinTit"></b>
              <button class="btn btn-naranja" type="button" data-cine="sig">▶ Ver ahora <span id="cineCuenta"></span></button>
              <button class="cine-link" type="button" data-cine="quedarse">Quedarme aquí</button>
            </div>
          </div>
          <div class="cine-info">
            <div class="cine-tags"><span class="cine-n" id="cineN"></span><span class="cap-saga" id="cineSaga" hidden></span></div>
            <h3 id="cineTit"></h3>
            <p id="cineDesc"></p>
            <div class="cine-nav">
              <button class="btn btn-blanco" type="button" data-cine="ant" id="cineAnt">← Anterior</button>
              <button class="btn btn-naranja" type="button" data-cine="sig" id="cineSig">Siguiente →</button>
            </div>
            <a class="cine-tt" id="cineTT" target="_blank" rel="noopener">Ver en TikTok ↗</a>
            <ol class="cine-lista" id="cineLista" aria-label="Capítulos"></ol>
          </div>
        </div>
      </div>`);
    cine = document.getElementById("cine");
    video = document.getElementById("cineVideo");
    cine.addEventListener("click", e => {
      const b = e.target.closest("[data-cine],[data-ir]");
      if (e.target === cine) return cerrar();
      if (!b) return;
      if (b.dataset.ir) return abrir(b.dataset.ir);
      ({ cerrar, ant: () => ir(-1), sig: () => ir(1), quedarse: pararCuenta })[b.dataset.cine]();
    });
    video.addEventListener("ended", alTerminar);
  }

  function abrir(n, { autoplay = true } = {}) {
    const c = CAPITULOS.find(x => x.n === n && x.video);
    if (!c) return false;
    crear(); pararCuenta();
    if (cine.hidden) foco = document.activeElement;
    actual = c;
    video.poster = portadaDe(c);
    video.src = c.video;
    document.getElementById("cineN").textContent = nombreCap(c).replace("Cap.", "Capítulo");
    const saga = document.getElementById("cineSaga");
    saga.hidden = !c.saga; saga.textContent = c.saga ? `🌙 ${c.saga}` : "";
    document.getElementById("cineTit").textContent = c.titulo;
    document.getElementById("cineDesc").textContent = c.desc;
    document.getElementById("cineAnt").disabled = !vecino(c, -1);
    document.getElementById("cineSig").disabled = !vecino(c, 1);
    const tt = document.getElementById("cineTT");
    tt.href = c.url; tt.hidden = !c.url;
    document.getElementById("cineLista").innerHTML = conVideo().map(x => `
      <li><button type="button" data-ir="${x.n}" ${x === c ? 'aria-current="true"' : ""}>
        <img src="${portadaDe(x)}" alt="" loading="lazy"><span><b>${esc(nombreCap(x))}</b>${esc(x.titulo)}</span>
      </button></li>`).join("");
    cine.hidden = false;
    document.documentElement.classList.add("cine-abierto");
    history.replaceState(null, "", `#ver-${c.n}`);
    if (autoplay) video.play().catch(() => {}); // si el navegador bloquea el autoplay, queda el botón de play
    cine.querySelector(".cine-x").focus({ preventScroll: true });
    const sel = cine.querySelector('[aria-current="true"]');
    if (sel) sel.scrollIntoView({ block: "nearest", inline: "center" });
    return true;
  }

  function ir(d) { const c = actual && vecino(actual, d); if (c) abrir(c.n); }

  function cerrar() {
    if (!cine || cine.hidden) return;
    pararCuenta(); video.pause(); video.removeAttribute("src"); video.load();
    cine.hidden = true; actual = null;
    document.documentElement.classList.remove("cine-abierto");
    history.replaceState(null, "", location.pathname + location.search);
    if (foco && foco.focus) foco.focus({ preventScroll: true });
  }

  function alTerminar() {
    const sig = actual && vecino(actual, 1);
    if (!sig) return;
    document.getElementById("cineFinImg").src = portadaDe(sig);
    document.getElementById("cineFinTit").textContent = `${nombreCap(sig)} · ${sig.titulo}`;
    document.getElementById("cineFin").hidden = false;
    let s = 5;
    const pinta = () => { document.getElementById("cineCuenta").textContent = `(${s})`; };
    pinta();
    cuenta = setInterval(() => { s--; pinta(); if (s <= 0) { pararCuenta(); abrir(sig.n); } }, 1000);
  }

  function pararCuenta() {
    clearInterval(cuenta); cuenta = null;
    const f = document.getElementById("cineFin"); if (f) f.hidden = true;
  }

  /* Links con data-ver en cualquier parte de la página */
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-ver]");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (abrir(a.dataset.ver)) e.preventDefault();
  });
  addEventListener("keydown", e => {
    if (!cine || cine.hidden) return;
    if (e.key === "Escape") cerrar();
    else if (e.key === "ArrowRight" && e.target.tagName !== "VIDEO") ir(1);
    else if (e.key === "ArrowLeft" && e.target.tagName !== "VIDEO") ir(-1);
  });
  /* Enlace directo: #ver-5.1 */
  const desdeHash = () => { const m = location.hash.match(/^#ver-([\w.]+)$/); if (m) abrir(decodeURIComponent(m[1]), { autoplay: false }); };
  addEventListener("hashchange", desdeHash);
  window.abrirCine = abrir;
  window.desdeHashCine = desdeHash;
})();
