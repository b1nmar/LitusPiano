# CLAUDE.md — Memoria del proyecto Candle Night Piano

Contexto esencial para retomar el trabajo en futuras sesiones.

## Qué es

Landing de una sola página que promociona **Candle Night Piano**: actuación de
piano de 45 min a la luz de las velas por **Litus** (Barcelona), 300 € sin
impuestos/desplazamientos/material. Público europeo. Tono de copy: evocador y
"clickbait" elegante. **El usuario habla español; responderle siempre en español.**
Le gusta que le sorprendan con propuestas ("sorpréndeme") y decisiones tomadas
con criterio propio.

## Producción

- **Web viva**: https://candlenightpiano.com (+ redirección desde www).
- **Hosting**: GitHub Pages, source **GitHub Actions**
  (`.github/workflows/deploy-pages.yml`). Cada push a `main` despliega en ~1 min.
  El entorno `github-pages` **solo acepta deploys desde `main`**.
- **Dominio**: registrado por el usuario en **Cloudflare**. DNS ya configurado
  (4×A + 4×AAAA de GitHub Pages en el apex, CNAME www→b1nmar.github.io, todo
  "DNS only"/nube gris). Fichero `CNAME` en el repo. HTTPS emitido por GitHub.
  El token de Cloudflare usado se revocó; pedir uno nuevo si hiciera falta tocar DNS.

## Git / versiones

- Repo público `b1nmar/LitusPiano`, rama de trabajo original
  `claude/candle-night-piano-site-f9ux06` (histórica; el trabajo real va a `main`).
- **El proxy de git bloquea push de tags (403)** → usamos **ramas de versión**
  como puntos de rollback: `release/v1.0.0` … `release/v1.5.1`.
  Rollback = `git checkout -B main release/vX.Y.Z && git push origin main`
  (con permiso del usuario). Crear una `release/vX.Y.Z` nueva tras cada entrega
  y seguir versionando igual.
- El usuario a veces sube ficheros por la web de GitHub ("Add files via upload")
  → si un push a main es rechazado, `git fetch origin main && git rebase origin/main`.

## Estructura

- `index.html` — página única; textos con `data-i18n`.
- `assets/js/i18n.js` — diccionario completo en **10 idiomas**
  (es en fr de it nl sv da no fi). ~80 claves por idioma.
- `assets/js/main.js` — i18n + selector idiomas, parallax hero, escena
  scroll-driven (3 fondos), galería acordeón + lightbox, mapa de rutas SVG
  animado (Barcelona→20 ciudades), precio "clic para revelar", email "clic para
  revelar", formulario mailto, vídeo teaser, brasas flotantes.
- `assets/css/styles.css` — sistema visual: fondo #0d0a07, dorado #e8b463,
  Fraunces (display) + Hanken Grotesk (texto) vía Google Fonts.
- `assets/img/` — imágenes YA procesadas (las que sirve la web).
- `assets/video/candle-teaser.mp4|candle-poster.jpg` — teaser 7,5 s "candelizado".
- `scripts/` — herramientas Node (sharp instalado en node_modules):
  `process-images.js` (galería v1), `process-new.js` (lote v1.5: sala con velas,
  duotonos, retrato "candelizado" con bokeh), `process-artist.js` (retrato),
  `gen-fonts.js`, `build-artifact.js`, `shoot.js` (screenshots Playwright).

## ⚠️ Originales de fotos/vídeo

Los originales estaban en `/root/.claude/uploads/<session>/` — **desaparecen al
cerrar la sesión**. En la raíz del repo quedan como fuente reprocesable:
`IMG_0777.jpeg` (retrato piano), `IMG_0772.jpeg` (sala vacía con velas) y
`IMG_5090.jpeg` (primer plano Litus) — sin personas ajenas, pueden servirse.
**Los originales con público (IMG_0775/0776) se borraron del repo tras
procesarlos**: el workflow despliega TODO el repo, y un original sin tratar
quedaría público (pasó y se corrigió en v1.5.0; siguen en el historial git —
purgarlo requeriría reescribir main). Si el usuario sube fotos de público por
la web de GitHub: procesarlas y hacer `git rm` del original en el mismo push.

## Reglas de contenido

- **Privacidad del público**: irreconocible. Fotos de público → duotono ámbar
  (`tint`) + median/blur fuerte (borra caras Y colores de ropa/pelo).
- **El artista (Litus) SÍ puede aparecer** reconocible (retrato aprobado por él).
- **Email**: `bGl0dXNwaWFub0BnbWFpbC5jb20=` (base64). **NUNCA escribirlo en
  claro** en ningún fichero servido (HTML/JS/CSS/README): solo ensamblado en
  runtime con atob + botón "Mostrar el email".
- Tarifa 300 € oculta tras botón "Descubrir la tarifa".
- Nav fija: Conciertos (#cobertura) · Tarifas (#tarifas) · Reservar · idiomas.

## ⏳ Pendiente

- **WhatsApp**: username "En_Litos" AÚN NO ACTIVO (rollout gradual de Meta;
  su app dice "pronto disponibles"). Botón actual = copiar usuario.
  Cuando el usuario diga "username activo": cambiar `#waBtn` a enlace
  `https://wa.me/<handle exacto confirmado>` (y quitar initWhatsApp de copia).
  Eligió opción A (no exponer teléfono).
- Ideas ofrecidas no hechas: testimonios, SEO/tarjeta OG al compartir,
  Google Analytics, más audio.

## Desarrollo / verificación

- Servir: `python3 -m http.server 8099` (a veces se cae; relanzar).
- Playwright: `require('/opt/node22/lib/node_modules/playwright')`, browser en
  /opt/pw-browsers. **El Chromium del sandbox no decodifica H.264** (el vídeo
  da "no supported sources" en tests: es normal, en navegadores reales va).
- El sandbox no resuelve dominios externos en el navegador; testear contra
  localhost (código idéntico a producción).
- ffmpeg instalable con `apt-get update && apt-get install -y ffmpeg`.
- Verificar producción con curl (grep de marcadores) tras cada deploy;
  esperar con `until curl ... | grep -q X; do sleep 10; done` en background.

## Historial de versiones

- v1.0.0 web inicial + dominio · v1.1.0 5 idiomas + mapa + repertorio
- v1.1.1 animación mapa visible · v1.2.0 sección Escucha (vídeo)
- v1.3.0 artista + galería acordeón + formulario + 10 idiomas
- v1.3.1 "Conciertos" + WA copiar · v1.4.0 email protegido + fotos enderezadas
  (retrato sin extintor + spotlight; artist-2 recta sin cartel)
- v1.5.0 galería renovada con 3 fotos nuevas (sala con velas, concierto en
  directo, público lleno; fuera "Entre velas" por repetitiva) + doble retrato
  en El artista (primer plano candelizado con bokeh delante, piano detrás,
  abanico al hover) + extintor fuera de artist-1 + originales de público
  eliminados del repo (privacidad)
- v1.5.1 dúo del artista animado: diagonal sin apenas solape, flotación suave
  y turnos de primer plano cada 5 s (tap/clic también intercambia)
