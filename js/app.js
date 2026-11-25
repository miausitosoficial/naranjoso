cargarTikTok().then(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const spr = (id, pose) => `assets/sprites/${carpetaSprites(id)}/${pose}.webp`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const porId = Object.fromEntries(PERSONAJES.map(p => [p.id, p]));
  const capPorN = Object.fromEntries(CAPITULOS.map(c => [c.n, c]));
  const url = id => `personaje.html?id=${id}`;
  const vt = id => `style="view-transition-name:gato-${id}"`;

  /* ---------- Stats ---------- */
  $("#stats").innerHTML = [
    [CAPITULOS.length, "capítulos"], [PERSONAJES.length, "gatos"], [1, "jarrón roto"],
  ].map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join("");

  /* ---------- Escena del hero ---------- */
  const REACCIONES = {
    naranjoso: [["sentado_feliz", "¡Prrr!"], ["sentado_ojos_brillantes", "¿Eso es pescado?"], ["sentado_bostezo", "Mmm… siesta"],
      ["sentado_panzon", "Comí demasiado"], ["sentado_campeon_rasguno", "¡Le gané a Garras!"], ["sentado_cabeza_ladeada", "¿Mm?"],
      ["sentado_brazos_arriba", "¡CASO CERRADO!"], ["sentado_saludando", "¡Miau!"]],
    nube: [["sentado_sorprendido", "¡Me robó el aura!"], ["sentado_maullando", "¡Miau!"], ["sentado_ojos_brillantes", "¿Soy bonita?"], ["sentado_feliz", "Jiji"]],
    gris: [["sentado_ojos_cerrados", "El aura no se roba… se tiene ✨"], ["sentado_mira_arriba", "¿Hay palomitas?"], ["sentado_feliz", "12.400 seguidores"], ["sentado_normal", "…"]],
  };
  const idx = { naranjoso: REACCIONES.naranjoso.length - 1, nube: 3, gris: 3 };
  Object.entries(REACCIONES).forEach(([id, l]) => l.forEach(([p]) => { new Image().src = spr(id, p); }));
  const globo = $("#globo");
  $("#escena").addEventListener("click", e => {
    const b = e.target.closest(".g"); if (!b) return;
    const id = b.dataset.id, lista = REACCIONES[id];
    chispas(e.clientX, e.clientY, id === "naranjoso" ? ["🧡", "🐾", "✨", "🐟"] : ["💙", "🐾", "✨"]);
    idx[id] = (idx[id] + 1) % lista.length;
    $("img", b).src = spr(id, lista[idx[id]][0]);
    globo.textContent = lista[idx[id]][1];
    globo.style.right = id === "gris" ? "auto" : "";
    globo.style.left = id === "gris" ? "52%" : "";
    globo.classList.remove("pop"); void globo.offsetWidth; globo.classList.add("pop");
  });

  /* ---------- Desfile ---------- */
  const desfile = $("#desfile");
  if (!quieto) {
    const fila = [["naranjoso", 0], ["nube", .9], ["gris", 1.8], ["luna", 2.7], ["manchas", 3.6], ["garras", 8.5], ["colmillo", 9.4], ["tuerto", 10.3]];
    desfile.insertAdjacentHTML("beforeend", fila.map(([id, d]) =>
      `<img class="cam" data-id="${id}" src="${spr(id, "caminando_1")}" alt="" style="animation-delay:${d}s">`).join(""));
    fila.forEach(([id]) => { for (let i = 1; i <= 8; i++) new Image().src = spr(id, "caminando_" + i); });
    const cams = [...desfile.querySelectorAll(".cam")];
    let f = 0;
    setInterval(() => {
      if (document.hidden) return;
      f = (f + 1) % 8;
      cams.forEach((im, i) => { im.src = spr(im.dataset.id, "caminando_" + (((f + i) % 8) + 1)); });
    }, 95);
  }

  /* ---------- Ticker ---------- */
  const ult = CAPITULOS[CAPITULOS.length - 1];
  const noticias = [`Nuevo: Cap. ${ult.n} · ${ult.titulo}`, "Pelea a las 3:00 a.m. en el barrio", "Se busca jarrón de reemplazo",
    "Pescado frito: desaparecido", "Fiesta secreta mientras el dueño no estaba", "Nube demanda a Gris por $1.500", "Garras sigue prófugo", "5 contra 3: ganó el Equipo Naranjoso"];
  const items = noticias.map(t => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = items + items;

  /* ---------- Último capítulo ---------- */
  const reparto = ["naranjoso", ...PERSONAJES.filter(p => p.id !== "naranjoso" && p.caps.includes(ult.n)).map(p => p.id)];
  $("#ultimoBox").innerHTML = `
    <div class="telefono rv">
      <a class="pantalla" ${enlaceCap(ult)} aria-label="Ver el capítulo ${esc(ult.n)}">
        <img src="${portadaDe(ult)}" alt="Portada del capítulo ${esc(ult.n)}" width="540" height="960">
        <span class="play"><svg viewBox="0 0 24 24"><use href="#i-play"/></svg></span>
        <span class="tt-lado" aria-hidden="true"><span class="av"><img src="assets/perfil/perfil_normal.webp" alt=""></span><i>♥</i><i>💬</i><i>↗</i></span>
        <span class="tt-ui" aria-hidden="true"><b>@miausitos_oficial</b>Cap. ${esc(ult.n)} · ${esc(ult.titulo)} 🐾</span>
      </a>
    </div>
    <div class="ultimo-txt rv" style="--d:2">
      <span class="nuevo">Capítulo nuevo</span>
      <h2><small>Capítulo ${esc(ult.n)}</small>${esc(ult.titulo)}</h2>
      <p>${esc(ult.desc)}</p>
      <div class="reparto">${reparto.map(id => `<a href="${url(id)}" title="${esc(porId[id].nombre)}" style="background:${porId[id].tinte}"><img src="${spr(id, "sentado_normal")}" alt="${esc(porId[id].nombre)}" loading="lazy"></a>`).join("")}</div>
      <div class="acciones">
        <a class="btn btn-naranja" ${enlaceCap(ult)}><svg viewBox="0 0 24 24"><use href="#i-play"/></svg> Verlo ahora</a>
        <a class="btn btn-blanco" href="#capitulos">Todos los capítulos</a>
      </div>
    </div>`;

  /* ---------- Personajes: catálogo "elige a tu gato" ---------- */
  const GRUPOS = { equipo: "Equipo Naranjoso", villano: "Pandilla de Garras", barrio: "Vecinos del barrio" };
  const FILTROS = [["todos", "Todos"], ["equipo", "Equipo"], ["villano", "Villanos"], ["barrio", "Barrio"]];
  const CARAS_BASE = ["sentado_normal", "sentado_feliz", "sentado_maullando", "sentado_saludando", "sentado_sorprendido", "sentado_ojos_brillantes"];
  const foco = $("#foco"), selector = $("#selector");
  let sel = "naranjoso", filtro = "todos";

  $("#filtrosCat").innerHTML = FILTROS.map(([f, t]) => {
    const n = f === "todos" ? PERSONAJES.length : PERSONAJES.filter(p => p.grupo === f).length;
    return `<button role="tab" type="button" data-f="${f}" aria-selected="${f === filtro}">${t} <span>${n}</span></button>`;
  }).join("");

  selector.innerHTML = PERSONAJES.map(p => `
    <button class="tile" type="button" role="option" id="tile-${p.id}" data-id="${p.id}" data-g="${p.grupo}"
            aria-selected="${p.id === sel}" style="--tinte:${p.tinte}" tabindex="-1">
      <span class="tile-img"><img src="${spr(p.id, "sentado_normal")}" data-alt="${spr(p.id, p.grupo === "villano" ? "sentado_enojado" : "sentado_feliz")}" alt="" width="120" height="120" loading="lazy"></span>
      <span class="tile-nom">${esc(p.nombre)}</span>
    </button>`).join("");

  function pintarFoco(anim) {
    const p = porId[sel];
    const deb = capPorN[p.caps[0]];
    const caras = p.caras || CARAS_BASE;
    foco.dataset.grupo = p.grupo;
    foco.style.setProperty("--tinte-foco", p.tinte);
    foco.innerHTML = `
      <div class="foco-escena">
        <span class="foco-fondo" aria-hidden="true">${esc(p.nombre)}</span>
        ${p.grupo === "villano" ? `<span class="foco-sello" aria-hidden="true">SE BUSCA</span>` : ""}
        <button class="foco-gato" type="button" aria-label="Cambiar la cara de ${esc(p.nombre)}">
          <img src="${spr(p.id, caras[0])}" alt="${esc(p.nombre)}" width="420" height="420" ${vt(p.id)}>
        </button>
        <span class="decos" aria-hidden="true">${(DECO[p.id] || []).map((d, i) => `<svg class="deco d${i}" viewBox="0 0 64 64"><use href="#d-${d}"/></svg>`).join("")}</span>
      </div>
      <div class="foco-info">
        <span class="foco-rol">${esc(GRUPOS[p.grupo])}</span>
        <h3>${esc(p.nombre)}</h3>
        <p class="foco-sub">${esc(p.subtitulo || p.rol)}</p>
        ${p.frase ? `<p class="foco-frase">${esc(p.frase)}</p>` : ""}
        <ul class="foco-datos">
          <li><small>Debut</small><b>${deb ? `Cap. ${esc(deb.n)}` : "Pronto"}</b></li>
          <li><small>Episodios</small><b>${p.caps.length}</b></li>
          <li><small>Poses</small><b>${TODAS_POSES.length}</b></li>
        </ul>
        <ul class="foco-rasgos">${p.personalidad.slice(0, 2).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="acciones">
          <a class="btn btn-naranja" href="${url(p.id)}">Ver ficha completa <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><use href="#i-flecha"/></svg></a>
          ${deb ? `<a class="btn btn-blanco" ${enlaceCap(deb)}><svg viewBox="0 0 24 24"><use href="#i-play"/></svg> Ver su debut</a>` : ""}
        </div>
      </div>`;
    if (anim) { foco.classList.remove("cambia"); void foco.offsetWidth; foco.classList.add("cambia"); }
    let k = 0;
    const b = $(".foco-gato", foco), img = $("img", b);
    caras.forEach(c => { new Image().src = spr(p.id, c); });
    b.addEventListener("click", e => {
      k = (k + 1) % caras.length; img.src = spr(p.id, caras[k]);
      b.classList.remove("sacude"); void b.offsetWidth; b.classList.add("sacude");
      setTimeout(() => b.classList.remove("sacude"), 500);
      chispas(e.clientX, e.clientY, p.grupo === "villano" ? ["💢", "⚡", "🐾"] : ["✨", "🐾", "🧡"]);
    });
  }

  function elegir(id, { anim = true, enfocar = false } = {}) {
    if (id === sel && !enfocar) return;
    sel = id;
    selector.querySelectorAll(".tile").forEach(t => {
      const si = t.dataset.id === id;
      t.setAttribute("aria-selected", si);
      t.tabIndex = si ? 0 : -1;
    });
    const t = $(`#tile-${id}`);
    selector.setAttribute("aria-activedescendant", `tile-${id}`);
    if (enfocar) t.focus({ preventScroll: true });
    t.scrollIntoView({ block: "nearest", inline: "center", behavior: quieto ? "auto" : "smooth" });
    pintarFoco(anim);
  }

  const visibles = () => [...selector.querySelectorAll(".tile:not([hidden])")];
  selector.addEventListener("click", e => { const t = e.target.closest(".tile"); if (t) elegir(t.dataset.id); });
  selector.addEventListener("keydown", e => {
    const l = visibles(), i = l.findIndex(t => t.dataset.id === sel);
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (d) { e.preventDefault(); elegir(l[(i + d + l.length) % l.length].dataset.id, { enfocar: true }); }
    else if (e.key === "Home") { e.preventDefault(); elegir(l[0].dataset.id, { enfocar: true }); }
    else if (e.key === "End") { e.preventDefault(); elegir(l[l.length - 1].dataset.id, { enfocar: true }); }
    else if (e.key === "Enter") location.href = url(sel);
  });
  $("#filtrosCat").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    filtro = b.dataset.f;
    $("#filtrosCat").querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", x === b));
    selector.querySelectorAll(".tile").forEach(t => { t.hidden = !(filtro === "todos" || t.dataset.g === filtro); });
    const l = visibles();
    if (!l.some(t => t.dataset.id === sel)) elegir(l[0].dataset.id);
  });
  pintarFoco(false);

  // cara alternativa al pasar el mouse por un gato del selector
  selector.querySelectorAll("img[data-alt]").forEach(img => {
    const a = img.getAttribute("src"), b = img.dataset.alt, el = img.closest(".tile");
    el.addEventListener("pointerenter", () => { img.src = b; });
    el.addEventListener("pointerleave", () => { img.src = a; });
  });

  /* ---------- Capítulos ---------- */
  $("#caps").innerHTML = CAPITULOS.map((c, i) => `
    <li class="rv" style="--d:${i % 4}">
      <a class="cap ${c.saga ? "noche" : ""}" ${enlaceCap(c)}>
        <span class="cap-portada">
          <img src="${portadaDe(c)}" alt="Portada del capítulo ${esc(c.n)}" width="540" height="960" loading="lazy">
          <span class="cap-n">${esc(c.n)}</span>
          <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-play"/></svg></span>
        </span>
        <span class="cap-info">
          ${c.saga ? `<span class="cap-saga">🌙 ${esc(c.saga)}</span>` : ""}
          <span class="cap-tit">${esc(c.titulo)}</span>
          <span class="cap-desc">${esc(c.desc)}</span>
          <span class="cap-ver">${c.video ? "Ver capítulo" : "Ver en TikTok"} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><use href="#i-flecha"/></svg></span>
        </span>
      </a>
    </li>`).join("");

  /* ---------- Stickers ---------- */
  const nombrePose = n => n.replace(/_/g, " ").replace("rasguno", "rasguño").replace("panzon", "panzón");
  $("#stickersGrid").innerHTML = POSES.map((n, i) => `
    <figure class="stk rv" style="--r:${[-6, 4, -3, 7, -5, 2, -8, 5][i % 8]}deg;--d:${i % 7}">
      <img src="${spr("naranjoso", n)}" alt="Naranjoso ${nombrePose(n)}" width="160" height="160" loading="lazy">
      <figcaption>${nombrePose(n)}</figcaption>
      <a href="${spr("naranjoso", n)}" download="naranjoso_${n}.webp" aria-label="Descargar sticker ${nombrePose(n)}"><svg viewBox="0 0 24 24"><use href="#i-bajar"/></svg></a>
    </figure>`).join("");

  observarRV();
  desdeHashCine();
});
