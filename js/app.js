cargarTikTok().then(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const spr = (id, pose) => `assets/sprites/${carpetaSprites(id)}/${pose}.webp`;
  const niebla = `<span class="niebla" aria-hidden="true"><i>?</i><i>?</i><i>?</i><i>?</i></span>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const porId = Object.fromEntries(PERSONAJES.map(p => [p.id, p]));
  const capPorN = Object.fromEntries(CAPITULOS.map(c => [c.n, c]));
  const url = id => `personaje.html?id=${id}`;
  const vt = id => `style="view-transition-name:gato-${id}"`;
  const flecha = `<span class="carta-flecha" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-flecha"/></svg></span>`;

  /* ---------- Stats ---------- */
  $("#stats").innerHTML = [
    [CAPITULOS.length, "capítulos"], [PERSONAJES.length, "gatos"], [1, "jarrón roto"],
  ].map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join("");

  /* ---------- Escena del hero ---------- */
  const REACCIONES = {
    naranjoso: [["sentado_feliz", "¡Prrr!"], ["sentado_ojos_brillantes", "¿Eso es pescado?"], ["sentado_bostezo", "Mmm… siesta"],
      ["sentado_panzon", "Comí demasiado"], ["sentado_con_rasguno", "Fue a las 3:00 a.m…"], ["sentado_cabeza_ladeada", "¿Mm?"],
      ["sentado_brazos_arriba", "¡Fiesta!"], ["sentado_saludando", "¡Miau!"]],
    nube: [["sentado_sorprendido", "¡¿Una pelea?!"], ["sentado_maullando", "¡Miau!"], ["sentado_ojos_brillantes", "¿Soy bonita?"], ["sentado_feliz", "Jiji"]],
    gris: [["sentado_ojos_cerrados", "Casualmente perfecto ✨"], ["sentado_mira_arriba", "¿Hay palomitas?"], ["sentado_feliz", "¿Me sacas una foto?"], ["sentado_normal", "…"]],
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
    "Pescado frito: desaparecido", "Fiesta secreta mientras el dueño no estaba", "¿Quién es ese gato grande?"];
  const items = noticias.map(t => `<span>${esc(t)}</span>`).join("");
  $("#ticker").innerHTML = items + items;

  /* ---------- Último capítulo ---------- */
  const reparto = ["naranjoso", ...PERSONAJES.filter(p => p.id !== "naranjoso" && p.caps.includes(ult.n)).map(p => p.id)];
  $("#ultimoBox").innerHTML = `
    <div class="telefono rv">
      <a class="pantalla" href="${ult.url}" target="_blank" rel="noopener" aria-label="Ver el capítulo ${esc(ult.n)} en TikTok">
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
        <a class="btn btn-naranja" href="${ult.url}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><use href="#i-play"/></svg> Verlo ahora</a>
        <a class="btn btn-blanco" href="#capitulos">Todos los capítulos</a>
      </div>
    </div>`;

  /* ---------- Personajes ---------- */
  const grupo = g => PERSONAJES.filter(p => p.grupo === g);
  $("#equipo").innerHTML = grupo("equipo").map((p, i) => {
    const estrella = p.id === "naranjoso";
    return `
    <a class="carta rv ${estrella ? "estrella" : ""}" href="${url(p.id)}" style="--tinte:${p.tinte};--d:${i}">
      <span class="carta-img"><img src="${spr(p.id, estrella ? "sentado_feliz" : "sentado_normal")}" data-alt="${spr(p.id, estrella ? "sentado_ojos_brillantes" : "sentado_feliz")}" alt="" width="300" height="300" loading="lazy" ${vt(p.id)}></span>
      ${estrella ? `<span class="tag">Protagonista</span>` : ""}
      <span class="carta-nombre">${esc(p.nombre)}</span>
      <span class="carta-sub">${esc(estrella ? p.desc : p.subtitulo)}</span>
      ${flecha}
    </a>`;
  }).join("");

  $("#villanos").innerHTML = grupo("villano").map((p, i) => `
    <a class="cartel rv ${MISTERIO.has(p.id) ? "misterio" : ""}" href="${url(p.id)}" style="--d:${i}">
      <span class="se-busca">SE BUSCA</span>
      <span class="foto">${MISTERIO.has(p.id) ? niebla : ""}<img src="${spr(p.id, "sentado_enojado")}" data-alt="${spr(p.id, "sentado_erizado")}" alt="" width="300" height="300" loading="lazy" ${vt(p.id)}></span>
      <span class="nom">${esc(p.nombre)}</span>
      <span class="visto">${p.caps.length ? `Visto en el cap. ${esc(p.caps[p.caps.length - 1])}` : "Aún no lo han visto…"}</span>    </a>`).join("");

  $("#barrio").innerHTML = grupo("barrio").map((p, i) => `
    <a class="vecino rv" href="${url(p.id)}" style="--tinte:${p.tinte};--d:${i}">
      <span><img src="${spr(p.id, "sentado_normal")}" data-alt="${spr(p.id, "sentado_feliz")}" alt="" width="200" height="200" loading="lazy" ${vt(p.id)}></span>
      <span><b>${esc(p.nombre)}</b><small>${esc(p.desc)}</small></span>
    </a>`).join("");

  // cara alternativa al pasar el mouse / enfocar
  document.querySelectorAll("img[data-alt]").forEach(img => {
    const a = img.getAttribute("src"), b = img.dataset.alt, el = img.closest("a");
    el.addEventListener("pointerenter", () => { img.src = b; });
    el.addEventListener("pointerleave", () => { img.src = a; });
    el.addEventListener("focus", () => { img.src = b; });
    el.addEventListener("blur", () => { img.src = a; });
  });

  /* ---------- Capítulos ---------- */
  $("#caps").innerHTML = CAPITULOS.map((c, i) => `
    <li class="rv" style="--d:${i % 4}">
      <a class="cap ${c.saga ? "noche" : ""}" href="${c.url}" target="_blank" rel="noopener">
        <span class="cap-portada">
          <img src="${portadaDe(c)}" alt="Portada del capítulo ${esc(c.n)}" width="540" height="960" loading="lazy">
          <span class="cap-n">${esc(c.n)}</span>
          <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-play"/></svg></span>
        </span>
        <span class="cap-info">
          ${c.saga ? `<span class="cap-saga">🌙 ${esc(c.saga)}</span>` : ""}
          <span class="cap-tit">${esc(c.titulo)}</span>
          <span class="cap-desc">${esc(c.desc)}</span>
          <span class="cap-ver">Ver en TikTok <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><use href="#i-flecha"/></svg></span>
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
});
