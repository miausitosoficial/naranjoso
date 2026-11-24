/* Mezcla los capítulos que el robot trae de TikTok (data/tiktok.json) con los de datos.js.
   - Si el capítulo ya existe en datos.js: solo le pone el link directo al video (si no tenía).
   - Si es nuevo: lo agrega con el título, texto y portada de TikTok.
   Si el archivo no existe (por ejemplo, en local), la web funciona igual con datos.js. */
const portadaDe = c => c.portada || `assets/portadas/${c.img}.webp`;

const cargarTikTok = async () => {
  try {
    const r = await fetch("data/tiktok.json", { cache: "no-cache" });
    if (!r.ok) return;
    const d = await r.json();
    for (const v of d.videos || []) {
      if (!v.n) continue;
      const c = CAPITULOS.find(x => x.n === v.n);
      if (c) {
        if (!c.url || c.url === TIKTOK) c.url = v.url;
        if (!c.img && v.portada) c.portada = v.portada;
      } else {
        CAPITULOS.push({ n: v.n, titulo: v.titulo, desc: v.desc, portada: v.portada || "assets/perfil/perfil_normal.webp", url: v.url, auto: true });
      }
    }
    CAPITULOS.sort((a, b) => parseFloat(a.n) - parseFloat(b.n));
  } catch (e) { /* sin conexión o JSON inválido: se queda con datos.js */ }
};
