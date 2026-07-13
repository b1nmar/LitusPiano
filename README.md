# Candle Night Piano · Litus Piano

**Web en producción: https://candlenightpiano.com**

Landing de una sola página que promociona **Candle Night Piano**: una actuación
de piano en directo de 45 minutos a la luz de las velas — piezas conocidas,
románticas y minimalistas, interpretadas por Litus en un ambiente íntimo y mágico.

Single-page landing site for **Candle Night Piano** — a 45-minute live
candlelit piano performance by Litus (Barcelona), touring all over Europe.

## Características / Features

- **10 idiomas** (ES · EN · FR · DE · IT · NL · SV · DA · NO · FI) con
  detección automática del navegador y selector manual (preferencia recordada).
- **Scroll-driven storytelling**: parallax en el hero y escena con tres fondos
  que se funden al hacer scroll.
- **"Así suena la magia"**: teaser de vídeo con gradación de vela, bucle
  silencioso y botón de sonido.
- **Galería premium**: acordeón de paneles expansibles con leyendas, lightbox
  con navegación por teclado y carrusel con snap en móvil.
- **"Conciertos"**: mapa animado estilo aerolínea (SVG generado en cliente) con
  rutas desde Barcelona a 20 ciudades europeas; respeta `prefers-reduced-motion`.
- **"El artista"**: doble retrato (primer plano a la luz de las velas +
  escena junto al piano) y biografía.
- **Tarifa oculta** (300 €) tras un botón "Descubrir la tarifa", con
  exclusiones claras (impuestos, desplazamientos, alojamiento, material).
- **Reserva**: formulario multiidioma que abre el correo del visitante con la
  solicitud redactada; usuario de WhatsApp con copia al portapapeles.
- **Email anti-spam**: la dirección no existe en el código servido; se ensambla
  en el navegador solo al pulsar "Mostrar el email".
- 100 % estático (HTML/CSS/JS vanilla), sin dependencias en tiempo de ejecución.

## Estructura

```
index.html               # Página única
assets/css/styles.css    # Sistema visual (Fraunces + Hanken Grotesk, dorado sobre negro cálido)
assets/js/i18n.js        # Traducciones (10 idiomas)
assets/js/main.js        # Interacciones y animaciones
assets/img/              # Imágenes tratadas artísticamente
assets/video/            # Teaser "candelizado"
scripts/                 # Herramientas de proceso (sharp/ffmpeg/playwright)
.github/workflows/       # Despliegue automático a GitHub Pages
```

## Despliegue

Cada push a `main` publica automáticamente en GitHub Pages (dominio propio
`candlenightpiano.com` vía Cloudflare DNS + HTTPS). Las ramas `release/vX.Y.Z`
son puntos de restauración de cada versión entregada.

## Desarrollo

```bash
python3 -m http.server 8099   # → http://localhost:8099
npm install                    # sharp, para reprocesar imágenes
node scripts/process-images.js
```

## Privacidad

Las imágenes provienen de actuaciones reales. El público se trata con un
duotono ámbar y suavizado pictórico para que **ningún asistente sea
identificable** (ni por cara ni por ropa), conservando la atmósfera.

## Contacto

- Email: disponible en la web (clic para revelar)
- WhatsApp: En_Litos
- YouTube: [@LitusPiano](https://www.youtube.com/@LitusPiano)
