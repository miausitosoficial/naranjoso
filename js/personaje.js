cargarTikTok().then(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const spr = (dir, pose) => `assets/sprites/${carpetaSprites(dir)}/${pose}.webp`;
  const nombrePose = n => n.replace(/_/g, " ").replace("rasguno", "rasguño").replace("panzon", "panzón").replace(/ izq$/, " (izq.)");

  const id = new URLSearchParams(location.search).get("id");
  const i = PERSONAJES.findIndex(p => p.id === id);
  if (i < 0) { location.replace("index.html#personajes"); return; }
  const p = PERSONAJES[i];
  const capPorN = Object.fromEntries(CAPITULOS.map(c => [c.n, c]));

  document.title = `${p.nombre} · Naranjoso`;
  document.body.dataset.grupo = p.grupo;
  $("#fichaHero").style.setProperty("--tinte", p.tinte);
  $("#nombreFondo").textContent = p.nombre;
  $("#migaNombre").textContent = p.nombre;

  /* ---------- Cabecera ---------- */
  const caras = p.caras || ["sentado_normal", "sentado_feliz", "sentado_maullando", "sentado_saludando", "sentado_sorprendido", "sentado_ojos_brillantes"];
  caras.forEach(c => { new Image().src = spr(p.id, c); });
  let k = 0;
  const img = $("#fichaImg");
  img.src = spr(p.id, caras[0]);
  img.alt = p.nombre;
  img.style.viewTransitionName = `gato-${p.id}`;
  const misterio = MISTERIO.has(p.id);
  if (misterio) {
    document.body.dataset.misterio = "";
    $("#fichaGato").insertAdjacentHTML("afterbegin", `<span class="niebla" aria-hidden="true"><i>?</i><i>?</i><i>?</i><i>?</i><i>?</i><i>?</i></span>`);
    $("#fichaGato .toca").textContent = "¿Quién será?";
    $(".hoja").remove();
  }
  $("#fichaGato").addEventListener("click", e => {
    k = (k + 1) % caras.length; img.src = spr(p.id, caras[k]);
    const b = $("#fichaGato"); b.classList.remove("sacude"); void b.offsetWidth; b.classList.add("sacude"); setTimeout(() => b.classList.remove("sacude"), 500);
    chispas(e.clientX, e.clientY, misterio ? ["?", "?", "❔"] : p.grupo === "villano" ? ["💢", "⚡", "🐾"] : ["✨", "🐾", "💛"]);
  });
  $("#fichaRol").textContent = p.rol;
  $("#fichaNombre").textContent = p.nombre;
  $("#fichaSub").textContent = p.subtitulo || "";
  if (p.frase) { const f = $("#fichaFrase"); f.hidden = false; f.textContent = p.frase; }
  if (p.nota) { $("#fichaNota").hidden = false; $("#fichaNota").textContent = p.nota; }
  const primera = capPorN[p.caps[0]];
  $("#fichaChips").innerHTML = `
    <li>${primera
      ? `<a href="${primera.url}" target="_blank" rel="noopener"><small>Primera aparición</small><b>Cap. ${esc(primera.n)} · ${esc(primera.titulo)}</b></a>`
      : `<small>Primera aparición</small><b>¡Próximamente!</b>`}</li>
    <li><small>Episodios</small><b>${p.caps.length} de ${CAPITULOS.length}</b></li>
    <li><small>Grupo</small><b>${{ equipo: "Equipo Naranjoso", villano: "Pandilla de Garras", barrio: "Vecinos del barrio" }[p.grupo]}</b></li>`;

  /* ---------- Física y personalidad ---------- */
  $("#fichaFisica").innerHTML = p.fisica.map(t => `<li>${esc(t)}</li>`).join("");
  $("#fichaPersonalidad").innerHTML = p.personalidad.map(t => `<li>${esc(t)}</li>`).join("");

  /* ---------- Episodios ---------- */
  $("#capsTxt").textContent = p.caps.length === CAPITULOS.length
    ? "¡En todos los capítulos! Es el protagonista, obvio."
    : p.caps.length === 0
      ? `${p.nombre} todavía no aparece en los capítulos publicados. ¡Atento a los próximos!`
      : `${p.nombre} aparece en ${p.caps.length} capítulo${p.caps.length > 1 ? "s" : ""}.`;
  $("#fichaCaps").innerHTML = CAPITULOS.filter(c => p.caps.includes(c.n)).map((c, j) => `
    <li class="rv" style="--d:${j}"><a class="mini" ${enlaceCap(c)}>
      <img src="${portadaDe(c)}" alt="" width="540" height="960" loading="lazy">
      <span class="n">${esc(c.n)}</span>
      ${c.n === p.caps[0] ? '<span class="pri">Debut</span>' : ""}
      <span class="t">${esc(c.titulo)}</span>
    </a></li>`).join("");
  const faltan = CAPITULOS.filter(c => !p.caps.includes(c.n)).map(c => c.n);
  if (faltan.length && p.caps.length) { $("#faltan").hidden = false; $("#faltan").textContent = `No aparece en: cap. ${faltan.join(", ")}.`; }

  /* ---------- Sprites ---------- */
  let dir = p.id, tipo = "todas";
  const tipoDe = n => n.startsWith("sentado") ? "sentado" : n.startsWith("caminando") ? "caminando" : "otras";
  const pintar = () => {
    const lista = TODAS_POSES.filter(n => tipo === "todas" || tipoDe(n) === tipo);
    $("#poses").innerHTML = lista.map((n, j) => `
      <figure class="stk" tabindex="0" role="button" data-n="${n}" style="--r:${[-4, 3, -2, 5, -3, 2, -5, 4][j % 8]}deg">
        <img src="${spr(dir, n)}" alt="${esc(p.nombre)} ${nombrePose(n)}" width="140" height="140" loading="lazy">
        <figcaption>${nombrePose(n)}</figcaption>
      </figure>`).join("");
    if (!$(".hoja")) return; // los personajes "próximamente" no tienen hoja
    const hoja = p.id === "naranjoso" ? (dir === "naranjoso_bebe" ? "naranjoso_bebe" : "naranjoso_crecido") : p.id;
    const src = `assets/sprites/_hojas/${hoja}.webp`;
    $("#hojaImg").src = src;
    $("#hojaImg").alt = `Hoja de sprites de ${p.nombre}`;
    $("#hojaLink").href = src; $("#hojaVer").href = src;
    $("#hojaBajar").href = src; $("#hojaBajar").setAttribute("download", `hoja_${hoja}.webp`);
    $("#hojaTxt").textContent = `Las ${TODAS_POSES.length} poses de ${p.nombre}${p.id === "naranjoso" ? (dir === "naranjoso_bebe" ? " bebé" : " crecido") : ""} en una sola imagen.`;
  };
  const tabs = (el, fn) => el.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    el.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", x === b));
    fn(b); pintar();
  });
  if (p.id === "naranjoso") { $("#etapas").hidden = false; tabs($("#etapas"), b => { dir = b.dataset.e; }); }
  tabs($("#tipos"), b => { tipo = b.dataset.t; });
  pintar();

  /* ---------- Visor ---------- */
  const visor = $("#visor");
  let ultimoFoco = null;
  const abrir = f => {
    const n = f.dataset.n, src = spr(dir, n);
    $("#visorImg").src = src; $("#visorImg").alt = `${p.nombre} ${nombrePose(n)}`;
    $("#visorTxt").textContent = nombrePose(n);
    $("#visorBajar").href = src; $("#visorBajar").setAttribute("download", `${dir}_${n}.webp`);
    ultimoFoco = f; visor.hidden = false; $("#visorCerrar").focus();
  };
  const cerrar = () => { visor.hidden = true; ultimoFoco && ultimoFoco.focus(); };
  $("#poses").addEventListener("click", e => { const f = e.target.closest(".stk"); if (f) abrir(f); });
  $("#poses").addEventListener("keydown", e => { const f = e.target.closest(".stk"); if (f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); abrir(f); } });
  $("#visorCerrar").addEventListener("click", cerrar);
  visor.addEventListener("click", e => { if (e.target === visor) cerrar(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !visor.hidden) cerrar(); });

  /* ---------- Más personajes ---------- */
  $("#otros").innerHTML = PERSONAJES.map(q => `
    <a class="otro ${MISTERIO.has(q.id) ? "misterio" : ""}" href="personaje.html?id=${q.id}" style="--tinte:${q.tinte}" ${q.id === p.id ? 'aria-current="page"' : ""}>
      <span><img src="${spr(q.id, "sentado_normal")}" alt="" width="92" height="92" loading="lazy"></span><b>${esc(q.nombre)}</b>
    </a>`).join("");
  const ant = PERSONAJES[(i - 1 + PERSONAJES.length) % PERSONAJES.length];
  const sig = PERSONAJES[(i + 1) % PERSONAJES.length];
  const link = (q, txt, cls) => `<a class="${cls}" href="personaje.html?id=${q.id}">
      <img src="${spr(q.id, "sentado_normal")}" alt="" width="52" height="52"><span><small>${txt}</small><b>${esc(q.nombre)}</b></span></a>`;
  $("#antsig").innerHTML = link(ant, "Anterior", "") + link(sig, "Siguiente", "sig");
  const actual = $("#otros [aria-current]");
  if (actual) $("#otros").scrollLeft = actual.offsetLeft - 40;

  observarRV();
  desdeHashCine();
});
