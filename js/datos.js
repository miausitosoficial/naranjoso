/* ==========================================================
   DATOS DEL SITIO — edita aquí para agregar capítulos o gatos.
   Las imágenes van en assets/ (sprites en assets/sprites/<id>/,
   hojas de sprites en assets/sprites/_hojas/<id>.webp).
   Textos de personajes: Videos\Personajes_Naranjoso.docx
   ========================================================== */

const TIKTOK = "https://www.tiktok.com/@miausitos_oficial";

/* grupo: "equipo" | "villano" | "barrio"
   desc: frase corta para la tarjeta del inicio
   caps: capítulos donde aparece (el primero es su primera aparición)
   caras: poses que se muestran al tocar el sprite grande */
const PERSONAJES = [
  { id: "naranjoso", nombre: "Naranjoso", grupo: "equipo", rol: "Protagonista", tinte: "#FFD7A8",
    subtitulo: "El protagonista",
    desc: "Flojo, glotón y de buen corazón. Duerme en la cama del dueño y come la comida de los demás.",
    nota: "Bebé en los caps. 1–3 · crecido desde el cap. 4",
    caps: ["1", "2", "3", "4", "5", "5.1", "5.2", "6"],
    fisica: [
      "Gato atigrado naranja con blanco: pecho, patitas, hocico y una franja en la frente blancos.",
      "Ojos verdes enormes y brillantes, bigotes largos y pelaje esponjoso con mechones.",
      "Cola esponjosa con rayas. En los caps. 1 a 3 es bebé (cabeza grande, cuerpo chiquito); desde el cap. 4 está “un poco crecido”.",
      "Desde la pelea del cap. 5 luce con orgullo un rasguño rojo en la mejilla.",
    ],
    personalidad: [
      "Flojo y glotón: su lugar favorito es la cama del dueño y su comida favorita… la comida de los demás.",
      "Travieso pero de buen corazón: rompe cosas sin querer y luego pone carita de inocente.",
      "Valiente cuando importa: enfrentó a Garras a las 3 a.m. para defender su barrio.",
      "Líder natural de su grupo de amigos; en el cap. 6 hace de juez y se toma el papel muy en serio.",
      "Le encanta que lo acaricien y siempre termina el día durmiendo con su dueño.",
    ],
    frase: "¡CASO CERRADO!",
    caras: ["sentado_normal", "sentado_feliz", "sentado_ojos_brillantes", "sentado_bostezo", "sentado_panzon", "sentado_campeon_rasguno", "sentado_maullando"] },

  { id: "nube", nombre: "Nube", grupo: "equipo", rol: "Amiga", tinte: "#DDEBFA",
    subtitulo: "La mejor amiga",
    desc: "Blanca, esponjosa y muy dramática. Demandó a Gris por robarle el aura… y ganó.",
    caps: ["4", "5", "5.1", "5.2", "6"],
    fisica: [
      "Gata completamente blanca, la más esponjosa del barrio.",
      "Ojos azul cielo, naricita rosada y almohadillas rosadas.",
      "Pelaje largo y suave que parece algodón.",
    ],
    personalidad: [
      "Dulce y sensible, pero muy dramática cuando algo le parece injusto.",
      "Miedosa en las peleas: se tapa los ojos con las patitas… aunque espía entre los dedos.",
      "Fiel a Naranjoso: fue la primera en ponerse a su lado contra la pandilla de Garras y le levantó la patita al ganar.",
      "Coqueta y preocupada por su imagen; demandó a Gris por “robarle el aura” y ganó.",
    ],
    frase: "¡Me robó el aura!" },

  { id: "gris", nombre: "Gris", grupo: "equipo", rol: "Amigo", tinte: "#E2E5EC",
    subtitulo: "El amigo con estilo",
    desc: "Esmoquin gris, relajado y fotogénico. Fan de las palomitas.",
    caps: ["4", "5", "5.1", "5.2", "6"],
    fisica: [
      "Gato gris azulado tipo esmoquin, con pecho y patitas blancas.",
      "Ojos azules y mirada medio dormida cuando posa.",
      "Siempre se ve “casualmente perfecto”.",
    ],
    personalidad: [
      "Relajado, seguro de sí mismo y un poco sobrado.",
      "Fotogénico y popular: tiene 12.400 seguidores en gatogram.",
      "Gran fan de las palomitas; nunca se pierde un espectáculo.",
      "Leal: dejó sus palomitas para pelear junto a Naranjoso en el 5 contra 3.",
    ],
    frase: "El aura no se roba… se tiene ✨" },

  { id: "luna", nombre: "Luna", grupo: "equipo", rol: "Amiga", tinte: "#E6E0F0",
    subtitulo: "La misteriosa",
    desc: "Negra, de ojos dorados y muy callada. La noctámbula del grupo.",
    caps: ["4", "5", "5.1", "5.2", "6"],
    fisica: [
      "Gata negra de pelaje brillante con reflejos grisáceos.",
      "Ojos amarillos dorados que brillan en la oscuridad.",
      "Delgada y ágil; le gusta mirar todo desde arriba de la cerca.",
    ],
    personalidad: [
      "Callada, observadora y elegante.",
      "Prefiere mirar desde lejos, pero cuando sus amigos la necesitan salta sin dudarlo.",
      "Es la noctámbula del grupo: conoce el barrio de noche mejor que nadie.",
    ],
    frase: "(un maullido bajito y misterioso)" },

  { id: "manchas", nombre: "Manchas", grupo: "equipo", rol: "Amiga", tinte: "#FBE3C8",
    subtitulo: "La alegre",
    desc: "Calicó fiestera y comelona. La primera en celebrar.",
    caps: ["4", "5", "5.1", "5.2", "6"],
    fisica: [
      "Gata calicó: blanca con manchas naranjas y negras.",
      "Ojos color miel y carita redonda.",
    ],
    personalidad: [
      "Alegre, fiestera y bien entusiasta: la primera en celebrar.",
      "Comelona como Naranjoso; siempre anda con su balde de palomitas.",
      "Buena amiga: se unió al equipo en el 5 contra 3 sin pensarlo dos veces.",
    ],
    frase: "¡Nosotros también!" },

  { id: "garras", nombre: "Garras", grupo: "villano", rol: "Villano", tinte: "#E9D6C6",
    subtitulo: "El villano (el gato grande)",
    desc: "Matón, tramposo y en el fondo cobarde. Quiere ser el dueño del barrio.",
    caps: ["5", "5.1", "5.2"],
    fisica: [
      "Gato callejero grande y robusto, café oscuro con el pecho café claro.",
      "Ojos rojos, cejas siempre fruncidas y una cicatriz sobre el ojo.",
      "Es más grande que todos los demás gatos del barrio.",
    ],
    personalidad: [
      "Matón y orgulloso: quiere ser el dueño del barrio.",
      "Tramposo: cuando perdió contra Naranjoso llamó a su pandilla.",
      "En el fondo es cobarde: al perder el 5 contra 3 gritó “¡Huyan!” y salió corriendo.",
    ],
    frase: "Je je je…",
    caras: ["sentado_normal", "sentado_enojado", "sentado_erizado", "sentado_maullando", "sentado_asustado", "erizado_de_lado"] },

  { id: "colmillo", nombre: "Colmillo", grupo: "villano", rol: "Pandilla de Garras", tinte: "#E2DCE8",
    subtitulo: "Pandilla de Garras",
    desc: "Rudo y bravucón, con un colmillo que siempre se le asoma.",
    caps: ["5.1", "5.2"],
    fisica: [
      "Gato negro con tonos morados y el pecho gris.",
      "Ojos rojos intensos y un colmillo blanco que siempre le sale de la boca.",
    ],
    personalidad: [
      "Rudo y bravucón; hace todo lo que Garras le dice.",
      "Le gusta aparecer de sorpresa, con los ojos brillando sobre la cerca.",
    ],
    frase: "¡FFFSSS! (un bufido)",
    caras: ["sentado_normal", "sentado_enojado", "sentado_erizado", "sentado_maullando", "agazapado", "erizado_de_lado"] },

  { id: "tuerto", nombre: "Tuerto", grupo: "villano", rol: "Pandilla de Garras", tinte: "#DDE5DC",
    subtitulo: "Pandilla de Garras",
    desc: "El “estratega” gruñón de la pandilla. Se cree pirata.",
    caps: ["5.1", "5.2"],
    fisica: [
      "Gato gris verdoso atigrado.",
      "Lleva un parche negro en el ojo izquierdo; el otro ojo es verde lima.",
    ],
    personalidad: [
      "Desconfiado y gruñón, el “estratega” de la pandilla.",
      "Se cree pirata y exagera sus historias de peleas pasadas.",
    ],
    frase: "Grrrr… (un gruñido)",
    caras: ["sentado_normal", "sentado_enojado", "sentado_erizado", "sentado_cabeza_ladeada", "agazapado", "erizado_de_lado"] },

  { id: "humo", nombre: "Humo", grupo: "barrio", rol: "Vecino del barrio", tinte: "#E6E7EE",
    subtitulo: "Vecino del barrio",
    desc: "Tranquilo y chismoso: siempre sabe qué pasa en el barrio.",
    caps: ["5", "5.1", "5.2"],
    fisica: ["Gato gris claro con el pecho gris perla y ojos amarillos."],
    personalidad: ["Tranquilo y chismoso: siempre sabe qué pasa en el barrio y no se pierde ninguna pelea."] },
  { id: "canela", nombre: "Canela", grupo: "barrio", rol: "Vecina del barrio", tinte: "#F6DCC4",
    subtitulo: "Vecina del barrio",
    desc: "Curiosa y emotiva: la primera en soltar un “¡Ooooh!”.",
    caps: ["5", "5.1", "5.2"],
    fisica: ["Gata color canela con el pecho crema y ojos verdes."],
    personalidad: ["Curiosa y emotiva: es la primera en soltar un “¡Ooooh!” en los momentos tensos."],
    frase: "¡Ooooh!" },
  { id: "sombra", nombre: "Sombra", grupo: "barrio", rol: "Vecino del barrio", tinte: "#E0E1E6",
    subtitulo: "Vecino del barrio",
    desc: "Barrista: grita “¡Dale!” desde el público.",
    caps: ["5", "5.1", "5.2"],
    fisica: ["Gato negro con pecho y patitas blancas (esmoquin) y ojos verdes."],
    personalidad: ["Barrista: grita “¡Dale!” desde el público y apoya al que va ganando."],
    frase: "¡Dale!" },
  { id: "crema", nombre: "Crema", grupo: "barrio", rol: "Vecina del barrio", tinte: "#FBEED6",
    subtitulo: "Vecina del barrio",
    desc: "Dulce y golosa; nunca suelta su balde de palomitas.",
    caps: ["5", "5.1", "5.2"],
    fisica: ["Gata color crema muy suave con ojos azules."],
    personalidad: ["Dulce y golosa; nunca suelta su balde de palomitas."] },
  { id: "atigrado", nombre: "Atigrado", grupo: "barrio", rol: "Vecino del barrio", tinte: "#EAE1D2",
    subtitulo: "Vecino del barrio",
    desc: "Serio y un poco asustadizo.",
    caps: ["5", "5.1", "5.2"],
    fisica: ["Gato atigrado café grisáceo con rayas oscuras y ojos ámbar."],
    personalidad: ["Serio y un poco asustadizo: cuando llegó la pandilla fue el primero en correrse."] },
  { id: "pelusa", nombre: "Pelusa", grupo: "barrio", rol: "Vecina del barrio", tinte: "#ECE6F6",
    subtitulo: "Vecina del barrio",
    desc: "Soñadora y despistada; a veces se duerme en plena pelea.",
    caps: ["5", "5.1", "5.2"],
    fisica: ["Gata lila muy peluda con ojos naranjos."],
    personalidad: ["Soñadora y despistada; a veces se queda dormida en plena pelea."] },
];

/* url: link al video en TikTok (si no hay link directo todavía, usa el perfil: TIKTOK).
   video: archivo en assets/videos/ para verlo dentro de la web (si no hay, la tarjeta abre TikTok). */
const CAPITULOS = [
  { n: "1", titulo: "¡Un gato apareció de la nada!", img: "portada_cap1", video: "assets/videos/cap1.mp4",
    desc: "Naranjoso aparece en la casa nueva… y termina adoptado.",
    url: "https://www.tiktok.com/@miausitos_oficial/video/7710689190035442962" },
  { n: "2", titulo: "¡Rompió mi jarrón… y volvió con esto!", img: "portada_cap2", video: "assets/videos/cap2.mp4",
    desc: "Rompe el jarrón, se escapa por la ventana y vuelve con una canasta de pajaritos y ratones.",
    url: "https://www.tiktok.com/@miausitos_oficial/video/7710699014991121682" },
  { n: "3", titulo: "El almuerzo desaparecido", img: "portada_cap3", video: "assets/videos/cap3.mp4",
    desc: "El pescado frito del dueño desaparece. Naranjoso eructa. Caso resuelto.",
    url: "https://www.tiktok.com/@miausitos_oficial/video/7711087504086109447" },
  { n: "4", titulo: "La fiesta secreta", img: "portada_cap4", video: "assets/videos/cap4.mp4",
    desc: "El dueño sale y Naranjoso arma fiesta con los gatos del barrio.",
    url: "https://www.tiktok.com/@miausitos_oficial/video/7711159218501422343" },
  { n: "5", titulo: "Pelea a las 3:00 a.m.", img: "portada_cap5", video: "assets/videos/cap5.mp4", saga: "Saga de Garras",
    desc: "Naranjoso se enfrenta a Garras de noche mientras los gatos miran con cabritas.", url: TIKTOK },
  { n: "5.1", titulo: "No vino solo", img: "portada_cap5.1", video: "assets/videos/cap5.1.mp4", saga: "Saga de Garras",
    desc: "Llega la pandilla de Garras: 5 contra 3.", url: TIKTOK },
  { n: "5.2", titulo: "La gran batalla", img: "portada_cap5.2", video: "assets/videos/cap5.2.mp4", saga: "Saga de Garras",
    desc: "El equipo Naranjoso gana y él se va a dormir con su dueño.", url: TIKTOK },
  { n: "6", titulo: "¡Caso cerrado!", img: "portada_cap6", video: "assets/videos/cap6.mp4",
    desc: "Juicio gatuno: Nube demanda a Gris por $1.500 por robarle el aura. Gana Nube.", url: TIKTOK },
];

/* Adornos que flotan a los lados de cada gato en el catálogo del inicio.
   Son dibujos SVG definidos en js/deco.js (cada nombre = un <symbol id="d-nombre">). */
const DECO = {
  naranjoso: ["pez", "naranja", "pez", "pierna", "naranja", "zzz"],
  nube: ["nube", "nube", "brillo", "nube", "nube", "corazon"],
  gris: ["palomitas", "brillo", "camara", "palomitas", "brillo", "lentes"],
  luna: ["luna", "estrella", "brillo", "estrella", "luna", "brillo"],
  manchas: ["confeti", "palomitas", "globo", "confeti", "palomitas", "globo"],
  garras: ["ira", "rayo", "basurero", "rayo", "ira", "hueso"],
  colmillo: ["murcielago", "luna", "ira", "murcielago", "rayo", "murcielago"],
  tuerto: ["bandera", "ancla", "ira", "mapa", "ancla", "bandera"],
  humo: ["humo", "ojos", "chisme", "humo", "chisme", "ojos"],
  canela: ["hoja", "ooh", "brillo", "hoja-roja", "ooh", "hoja"],
  sombra: ["megafono", "dale", "estrella", "megafono", "dale", "estrella"],
  crema: ["palomitas", "leche", "corazon", "palomitas", "leche", "brillo"],
  atigrado: ["hoja-verde", "gota", "hoja-verde", "gota", "hoja-verde", "gota"],
  pelusa: ["ovillo", "zzz", "flor", "ovillo", "zzz", "flor"],
};

/* Todas las poses (mismos nombres para cada personaje) */
const TODAS_POSES = ["sentado_normal", "sentado_feliz", "sentado_maullando", "sentado_bostezo", "sentado_ojos_cerrados",
  "sentado_somnoliento", "sentado_ojos_brillantes", "sentado_mira_izquierda", "sentado_mira_derecha", "sentado_mira_arriba",
  "sentado_sorprendido", "sentado_erizado", "sentado_cabeza_ladeada", "sentado_pata_arriba", "sentado_pata_arriba_izq",
  "sentado_saludando", "sentado_brazos_arriba", "sentado_estirando_pata", "sentado_panzon", "sentado_cola_arriba",
  "sentado_enojado", "sentado_asustado", "sentado_con_rasguno", "sentado_campeon_rasguno",
  "caminando_1", "caminando_2", "caminando_3", "caminando_4", "caminando_5", "caminando_6", "caminando_7", "caminando_8",
  "caminando_quieto", "caminando_izquierda", "agazapado", "olfateando", "erizado_de_lado", "saltando",
  "pan_loaf", "pan_loaf_dormido", "pan_loaf_feliz", "durmiendo_panza_arriba", "durmiendo_panzon"];

/* Galería de poses de Naranjoso en el inicio */
const POSES = ["sentado_normal", "sentado_feliz", "sentado_maullando", "sentado_bostezo", "sentado_ojos_cerrados",
  "sentado_somnoliento", "sentado_ojos_brillantes", "sentado_sorprendido", "sentado_erizado", "sentado_cabeza_ladeada",
  "sentado_saludando", "sentado_brazos_arriba", "sentado_estirando_pata", "sentado_panzon", "sentado_cola_arriba",
  "sentado_enojado", "sentado_asustado", "sentado_con_rasguno", "sentado_campeon_rasguno", "sentado_mira_arriba",
  "agazapado", "olfateando", "erizado_de_lado", "saltando", "pan_loaf", "pan_loaf_dormido", "pan_loaf_feliz",
  "durmiendo_panza_arriba", "durmiendo_panzon"];

/* Personajes aún no presentados en los capítulos publicados:
   se muestran como silueta negra con "?" (assets/sprites/<id>_misterio/).
   Cuando salga su capítulo, sácalos de esta lista. */
const MISTERIO = new Set([]);
const carpetaSprites = id => (MISTERIO.has(id) ? id + "_misterio" : id);
