/* Adornos dibujados en SVG (estilo de la serie: colores planos, sin contorno, brillos suaves).
   Se usan en el catálogo con <svg><use href="#d-nombre"/></svg>. Todos miden 64×64. */
document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<mask id="m-luna"><rect width="64" height="64" fill="#fff"/><circle cx="43" cy="24" r="19" fill="#000"/></mask>
</defs>

<symbol id="d-pez" viewBox="0 0 64 64">
  <path d="M43 32 L60 19 Q56 32 60 45 Z" fill="#4E97CF"/>
  <path d="M22 21 Q29 10 37 20 Z" fill="#4E97CF"/>
  <ellipse cx="27" cy="32" rx="20" ry="13" fill="#6CB4E6"/>
  <path d="M10 34 Q27 47 45 34 Q28 42 10 34Z" fill="#A6D6F4"/>
  <path d="M25 25 Q28 32 25 39" stroke="#4E97CF" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <circle cx="16" cy="29" r="3.3" fill="#2B1A12"/><circle cx="15" cy="28" r="1.1" fill="#fff"/>
</symbol>

<symbol id="d-naranja" viewBox="0 0 64 64">
  <circle cx="32" cy="36" r="21" fill="#F58A2C"/>
  <ellipse cx="24" cy="28" rx="7" ry="4.5" fill="#FFB463" transform="rotate(-35 24 28)"/>
  <g fill="#E07418"><circle cx="40" cy="44" r="1.4"/><circle cx="44" cy="36" r="1.2"/><circle cx="34" cy="50" r="1.2"/><circle cx="26" cy="44" r="1.1"/></g>
  <path d="M32 16 L33 10" stroke="#6B3F1F" stroke-width="3" stroke-linecap="round"/>
  <path d="M33 12 Q43 4 49 11 Q41 17 33 12Z" fill="#5DB34A"/>
</symbol>

<symbol id="d-pierna" viewBox="0 0 64 64">
  <g transform="rotate(-40 32 32)">
    <rect x="29" y="30" width="6.5" height="23" rx="3.2" fill="#FBF1E1"/>
    <circle cx="27.5" cy="54" r="4.6" fill="#FBF1E1"/><circle cx="36.5" cy="54" r="4.6" fill="#FBF1E1"/>
    <path d="M29 40 H35.5 V44 H29Z" fill="#E9DCC5"/>
    <ellipse cx="32" cy="21" rx="13.5" ry="15.5" fill="#C8702F"/>
    <path d="M20 26 Q32 40 44 26 Q42 36 32 37 Q22 36 20 26Z" fill="#A85A22"/>
    <ellipse cx="27" cy="15" rx="4.5" ry="6.5" fill="#E2964F"/>
  </g>
</symbol>

<symbol id="d-zzz" viewBox="0 0 64 64">
  <g font-family="Fredoka, sans-serif" font-weight="700">
    <text x="6" y="56" font-size="28" fill="#8C9BD6">Z</text>
    <text x="27" y="37" font-size="21" fill="#A6B3E6">Z</text>
    <text x="44" y="20" font-size="15" fill="#C3CDF0">Z</text>
  </g>
</symbol>

<symbol id="d-nube" viewBox="0 0 64 64">
  <g fill="#fff"><circle cx="21" cy="36" r="12"/><circle cx="34" cy="27" r="15"/><circle cx="47" cy="37" r="11"/><rect x="10" y="34" width="46" height="15" rx="7.5"/></g>
  <path d="M10 42 Q33 53 56 42 V43 Q56 49 49 49 H17 Q10 49 10 43Z" fill="#D6E8FA"/>
  <ellipse cx="29" cy="21" rx="6" ry="3.5" fill="#F4F9FF" transform="rotate(-20 29 21)"/>
</symbol>

<symbol id="d-brillo" viewBox="0 0 64 64">
  <path d="M32 5 C34 24 40 30 59 32 C40 34 34 40 32 59 C30 40 24 34 5 32 C24 30 30 24 32 5Z" fill="#FFD45C"/>
  <path d="M32 19 C33 28 36 31 45 32 C36 33 33 36 32 45 C31 36 28 33 19 32 C28 31 31 28 32 19Z" fill="#FFF1B8"/>
</symbol>

<symbol id="d-corazon" viewBox="0 0 64 64">
  <path d="M32 55 C14 43 7 33 7 23 C7 15 13 9 21 9 C26 9 30 12 32 17 C34 12 38 9 43 9 C51 9 57 15 57 23 C57 33 50 43 32 55Z" fill="#F27A93"/>
  <ellipse cx="19" cy="21" rx="5.5" ry="3.5" fill="#F9B6C4" transform="rotate(-35 19 21)"/>
</symbol>

<symbol id="d-palomitas" viewBox="0 0 64 64">
  <g fill="#FFF6DF"><circle cx="20" cy="22" r="8"/><circle cx="31" cy="15" r="9"/><circle cx="43" cy="21" r="8"/><circle cx="25" cy="27" r="7"/><circle cx="38" cy="27" r="7"/></g>
  <g fill="#F6D27A"><circle cx="31" cy="13" r="2.6"/><circle cx="18" cy="20" r="2"/><circle cx="45" cy="19" r="2"/><circle cx="37" cy="25" r="1.6"/></g>
  <path d="M13 28 H51 L46 59 H18 Z" fill="#fff"/>
  <path d="M13 28 H21 L22.5 59 H18 Z M28.5 28 H35.5 L35 59 H29 Z M43 28 H51 L46 59 H41.5 Z" fill="#E5483B"/>
  <rect x="12" y="26" width="40" height="5" rx="2.5" fill="#F4F0EA"/>
</symbol>

<symbol id="d-camara" viewBox="0 0 64 64">
  <rect x="20" y="13" width="16" height="10" rx="3" fill="#43424F"/>
  <rect x="7" y="20" width="50" height="33" rx="9" fill="#55546A"/>
  <rect x="7" y="20" width="50" height="8" rx="4" fill="#43424F"/>
  <circle cx="32" cy="37" r="12" fill="#2E2D3A"/>
  <circle cx="32" cy="37" r="8.5" fill="#8FC7F0"/><circle cx="32" cy="37" r="4.5" fill="#2E3A55"/>
  <circle cx="29" cy="34" r="2.2" fill="#fff"/>
  <circle cx="48" cy="27" r="2.8" fill="#FFD45C"/>
</symbol>

<symbol id="d-lentes" viewBox="0 0 64 64">
  <path d="M5 25 H59" stroke="#2B2630" stroke-width="4" stroke-linecap="round"/>
  <path d="M7 24 H28 V31 Q28 43 17.5 43 Q7 43 7 31Z" fill="#2B2630"/>
  <path d="M36 24 H57 V31 Q57 43 46.5 43 Q36 43 36 31Z" fill="#2B2630"/>
  <path d="M11 28 H18 L12 37Z M40 28 H47 L41 37Z" fill="#6E6A7A"/>
</symbol>

<symbol id="d-luna" viewBox="0 0 64 64">
  <circle cx="30" cy="34" r="23" fill="#FFD45C" mask="url(#m-luna)"/>
  <g fill="#F2BE3A"><circle cx="20" cy="42" r="3.4"/><circle cx="30" cy="51" r="2.2"/><circle cx="13" cy="31" r="2"/></g>
</symbol>

<symbol id="d-estrella" viewBox="0 0 64 64">
  <path d="M32 7 L39.6 22.6 L56.8 25 L44.4 37 L47.3 54.1 L32 46 L16.7 54.1 L19.6 37 L7.2 25 L24.4 22.6 Z" fill="#FFC93C" stroke="#FFC93C" stroke-width="5" stroke-linejoin="round"/>
  <path d="M27 24 L32 14 L35 21Z" fill="#FFE79A"/>
</symbol>

<symbol id="d-confeti" viewBox="0 0 64 64">
  <rect x="9" y="10" width="8" height="15" rx="2.5" fill="#F27A93" transform="rotate(-25 13 17)"/>
  <rect x="40" y="6" width="8" height="15" rx="2.5" fill="#5DA8F0" transform="rotate(30 44 13)"/>
  <rect x="24" y="36" width="8" height="15" rx="2.5" fill="#FFD45C" transform="rotate(15 28 43)"/>
  <rect x="47" y="44" width="7" height="13" rx="2.5" fill="#B48CE6" transform="rotate(-40 50 50)"/>
  <circle cx="47" cy="31" r="4.6" fill="#6CC46A"/><circle cx="14" cy="46" r="4.2" fill="#F58A2C"/><circle cx="30" cy="20" r="3.6" fill="#B48CE6"/>
</symbol>

<symbol id="d-globo" viewBox="0 0 64 64">
  <path d="M32 47 Q27 54 33 62" stroke="#8A6A5A" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="32" cy="25" rx="16" ry="20" fill="#E5483B"/>
  <path d="M28.5 44 H35.5 L32 49Z" fill="#C43A2F"/>
  <ellipse cx="25" cy="17" rx="4" ry="7.5" fill="#F48A7E" transform="rotate(20 25 17)"/>
</symbol>

<symbol id="d-ira" viewBox="0 0 64 64">
  <g fill="none" stroke="#E0453A" stroke-width="7" stroke-linecap="round">
    <path d="M26 9 Q26 26 9 26"/><path d="M38 9 Q38 26 55 26"/><path d="M9 38 Q26 38 26 55"/><path d="M55 38 Q38 38 38 55"/>
  </g>
</symbol>

<symbol id="d-rayo" viewBox="0 0 64 64">
  <path d="M37 4 L14 37 H30 L24 60 L50 25 H34 Z" fill="#FFD23F" stroke="#FFD23F" stroke-width="3" stroke-linejoin="round"/>
  <path d="M34 11 L21 32 H27Z" fill="#FFF1A8"/>
</symbol>

<symbol id="d-hueso" viewBox="0 0 64 64">
  <g transform="rotate(-30 32 32)">
    <g fill="#F1E2C8"><rect x="14" y="28" width="36" height="8" rx="4"/>
    <circle cx="14" cy="27" r="6"/><circle cx="14" cy="37" r="6"/><circle cx="50" cy="27" r="6"/><circle cx="50" cy="37" r="6"/></g>
    <path d="M18 34 H46 V36 H18Z M10 40 Q14 44 18 40 M46 40 Q50 44 54 40" fill="none" stroke="#D8C29C" stroke-width="2.4" stroke-linecap="round"/>
  </g>
</symbol>

<symbol id="d-basurero" viewBox="0 0 64 64">
  <path d="M16 22 H48 L45 58 Q45 60 43 60 H21 Q19 60 19 58 Z" fill="#8E9AA6"/>
  <rect x="11" y="15" width="42" height="8" rx="4" fill="#6F7B88"/>
  <rect x="27" y="9" width="10" height="7" rx="2.5" fill="#6F7B88"/>
  <path d="M25 29 V52 M32 29 V52 M39 29 V52" stroke="#6F7B88" stroke-width="3" stroke-linecap="round"/>
</symbol>

<symbol id="d-murcielago" viewBox="0 0 64 64">
  <path d="M32 27 C28 21 21 19 3 23 C9 27 10 33 8 39 C14 35 18 37 20 41 C22 35 27 35 32 41 C37 35 42 35 44 41 C46 37 50 35 56 39 C54 33 55 27 61 23 C43 19 36 21 32 27Z" fill="#4B3A63"/>
  <path d="M27 27 L28 18 L31 23 H33 L36 18 L37 27 Q32 33 27 27Z" fill="#4B3A63"/>
  <circle cx="30" cy="25" r="1.7" fill="#FFD45C"/><circle cx="34" cy="25" r="1.7" fill="#FFD45C"/>
</symbol>

<symbol id="d-bandera" viewBox="0 0 64 64">
  <rect x="11" y="7" width="4" height="52" rx="2" fill="#8A5A3B"/>
  <path d="M15 9 H53 L46 21 L53 33 H15Z" fill="#26222B"/>
  <circle cx="31" cy="18" r="6" fill="#fff"/><rect x="28" y="21" width="6" height="5" rx="1.5" fill="#fff"/>
  <circle cx="29" cy="18" r="1.6" fill="#26222B"/><circle cx="33" cy="18" r="1.6" fill="#26222B"/>
  <path d="M23 26 L39 31 M39 26 L23 31" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
</symbol>

<symbol id="d-ancla" viewBox="0 0 64 64">
  <g fill="none" stroke="#5C7FA6" stroke-width="5" stroke-linecap="round"><circle cx="32" cy="11" r="5"/><path d="M32 16 V55"/><path d="M22 25 H42"/><path d="M12 38 Q13 55 32 55 Q51 55 52 38"/></g>
  <path d="M7 41 L12 33 L18 41Z M46 41 L52 33 L57 41Z" fill="#5C7FA6"/>
</symbol>

<symbol id="d-mapa" viewBox="0 0 64 64">
  <path d="M7 14 L24 9 L40 14 L57 9 V50 L40 55 L24 50 L7 55Z" fill="#F1D9A6"/>
  <path d="M24 9 V50 L40 55 V14Z" fill="#E6C88C"/>
  <path d="M13 43 Q21 31 30 35 T45 24" stroke="#C0392B" stroke-width="2.6" stroke-dasharray="3 4" fill="none" stroke-linecap="round"/>
  <path d="M43 18 L51 26 M51 18 L43 26" stroke="#C0392B" stroke-width="3.6" stroke-linecap="round"/>
</symbol>

<symbol id="d-humo" viewBox="0 0 64 64">
  <g fill="#C9CCD8"><circle cx="19" cy="39" r="12"/><circle cx="34" cy="30" r="15"/><circle cx="47" cy="41" r="10"/><circle cx="31" cy="45" r="10"/></g>
  <g fill="#E3E5EE"><circle cx="30" cy="25" r="6"/><circle cx="17" cy="35" r="4"/></g>
</symbol>

<symbol id="d-chisme" viewBox="0 0 64 64">
  <path d="M11 12 H53 Q58 12 58 17 V39 Q58 44 53 44 H29 L16 55 L18 44 H11 Q6 44 6 39 V17 Q6 12 11 12Z" fill="#fff"/>
  <path d="M6 33 Q32 42 58 33 V39 Q58 44 53 44 H29 L16 55 L18 44 H11 Q6 44 6 39Z" fill="#EEE9F2"/>
  <g fill="#8A7E93"><circle cx="21" cy="28" r="3.8"/><circle cx="32" cy="28" r="3.8"/><circle cx="43" cy="28" r="3.8"/></g>
</symbol>

<symbol id="d-ojos" viewBox="0 0 64 64">
  <ellipse cx="21" cy="32" rx="12" ry="15" fill="#fff"/><ellipse cx="43" cy="32" rx="12" ry="15" fill="#fff"/>
  <path d="M9 34 Q21 50 33 34 Q33 47 21 47 Q9 47 9 34Z M31 34 Q43 50 55 34 Q55 47 43 47 Q31 47 31 34Z" fill="#E6E3EA"/>
  <circle cx="27" cy="33" r="6" fill="#2B1A12"/><circle cx="49" cy="33" r="6" fill="#2B1A12"/>
  <circle cx="25" cy="31" r="2" fill="#fff"/><circle cx="47" cy="31" r="2" fill="#fff"/>
</symbol>

<symbol id="d-hoja" viewBox="0 0 64 64">
  <g transform="rotate(30 32 32)"><path d="M32 5 C51 16 55 37 32 59 C9 37 13 16 32 5Z" fill="#E08A3A"/>
  <path d="M32 11 V57 M32 26 L41 19 M32 36 L22 29 M32 45 L42 38" stroke="#B8652A" stroke-width="2.6" stroke-linecap="round"/></g>
</symbol>
<symbol id="d-hoja-roja" viewBox="0 0 64 64">
  <g transform="rotate(-25 32 32)"><path d="M32 5 C51 16 55 37 32 59 C9 37 13 16 32 5Z" fill="#D2553A"/>
  <path d="M32 11 V57 M32 26 L41 19 M32 36 L22 29 M32 45 L42 38" stroke="#A53E28" stroke-width="2.6" stroke-linecap="round"/></g>
</symbol>
<symbol id="d-hoja-verde" viewBox="0 0 64 64">
  <g transform="rotate(35 32 32)"><path d="M32 5 C51 16 55 37 32 59 C9 37 13 16 32 5Z" fill="#6CB85A"/>
  <path d="M32 11 V57 M32 26 L41 19 M32 36 L22 29 M32 45 L42 38" stroke="#4C9440" stroke-width="2.6" stroke-linecap="round"/></g>
</symbol>

<symbol id="d-ooh" viewBox="0 0 64 64">
  <path d="M11 10 H53 Q58 10 58 15 V39 Q58 44 53 44 H29 L16 55 L18 44 H11 Q6 44 6 39 V15 Q6 10 11 10Z" fill="#fff"/>
  <text x="32" y="34" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="#E0703A">¡Oh!</text>
</symbol>
<symbol id="d-dale" viewBox="0 0 64 64">
  <path d="M11 10 H53 Q58 10 58 15 V39 Q58 44 53 44 H46 L48 55 L35 44 H11 Q6 44 6 39 V15 Q6 10 11 10Z" fill="#fff"/>
  <text x="32" y="33" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="#3A7BD5">¡Dale!</text>
</symbol>

<symbol id="d-megafono" viewBox="0 0 64 64">
  <path d="M18 38 L22 51 H28 L26 38Z" fill="#6F7B88"/>
  <path d="M15 24 L42 11 V53 L15 40Z" fill="#F58A2C"/>
  <rect x="8" y="23" width="11" height="18" rx="4" fill="#E5483B"/>
  <ellipse cx="42" cy="32" rx="5.5" ry="21" fill="#FFB463"/>
  <path d="M51 20 L58 15 M53 32 H61 M51 44 L58 49" stroke="#FFD45C" stroke-width="3.4" stroke-linecap="round"/>
</symbol>

<symbol id="d-leche" viewBox="0 0 64 64">
  <path d="M24 7 H40 V12 H24Z" fill="#E8EEF7"/>
  <path d="M18 23 L24 11 H40 L46 23Z" fill="#E8EEF7"/>
  <rect x="18" y="22" width="28" height="37" rx="3" fill="#fff"/>
  <rect x="18" y="33" width="28" height="15" fill="#6CB4E6"/>
  <path d="M32 36 Q37 42 32 45.5 Q27 42 32 36Z" fill="#fff"/>
</symbol>

<symbol id="d-gota" viewBox="0 0 64 64">
  <path d="M32 7 C40 21 48 30 48 40 A16 16 0 0 1 16 40 C16 30 24 21 32 7Z" fill="#8FCBF2"/>
  <ellipse cx="25.5" cy="40" rx="3.6" ry="6.5" fill="#D2ECFB"/>
</symbol>

<symbol id="d-ovillo" viewBox="0 0 64 64">
  <path d="M49 42 Q58 47 54 56 Q51 61 57 62" stroke="#F28FAF" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <circle cx="31" cy="31" r="20" fill="#F28FAF"/>
  <g fill="none" stroke="#D96A90" stroke-width="2.6" stroke-linecap="round"><path d="M15 21 Q31 29 47 19"/><path d="M12 31 Q31 41 50 29"/><path d="M17 43 Q33 49 45 41"/><path d="M25 12 Q19 31 27 50"/></g>
</symbol>

<symbol id="d-flor" viewBox="0 0 64 64">
  <g fill="#F7A8C4"><circle cx="32" cy="18" r="10"/><circle cx="45.3" cy="27.7" r="10"/><circle cx="40.2" cy="43.3" r="10"/><circle cx="23.8" cy="43.3" r="10"/><circle cx="18.7" cy="27.7" r="10"/></g>
  <circle cx="32" cy="32" r="8" fill="#FFD45C"/><circle cx="29.5" cy="29.5" r="2.4" fill="#FFF1B8"/>
</symbol>
</svg>`);
