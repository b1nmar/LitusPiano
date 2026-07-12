# Candle Night Piano · Litus Piano

Landing page de una sola página para promocionar **Candle Night Piano**, una
actuación de piano en directo de 45 minutos a la luz de las velas: piezas
conocidas, románticas y minimalistas, interpretadas en un ambiente íntimo y
mágico.

Single-page landing site promoting **Candle Night Piano** — a 45-minute live
candlelit piano performance of well-known, romantic and minimalist pieces.

## Características / Features

- **Bilingüe ES/EN** con detección automática del idioma del navegador y botón
  de cambio manual (se recuerda la preferencia).
- **Scroll-driven storytelling**: el fondo cambia (cross-fade) a medida que se
  hace scroll, con parallax en la cabecera y animaciones de aparición.
- **Diseño a la luz de las velas**: paleta cálida, tipografía serif elegante,
  partículas de luz flotantes.
- **Secciones**: hero, la experiencia, escena con fondo dinámico, repertorio,
  galería, ocasiones, **tarifa (300 €)** y reserva (email + WhatsApp).
- 100% estático (HTML/CSS/JS vanilla), sin dependencias en tiempo de ejecución.
  Listo para GitHub Pages, Netlify, Vercel o cualquier hosting estático.

## Estructura

```
index.html            # Página
assets/css/styles.css # Estilos
assets/js/main.js     # i18n + efectos de scroll
assets/img/           # Imágenes tratadas artísticamente (privacidad)
scripts/              # Herramientas de desarrollo (no necesarias para desplegar)
```

## Desarrollo

```bash
# Servir localmente
python3 -m http.server 8099
# → http://localhost:8099

# (Opcional) Reprocesar imágenes con tratamiento artístico + privacidad
npm install
node scripts/process-images.js
```

## Privacidad

Las imágenes provienen de actuaciones reales y se han tratado artísticamente
(suavizado pictórico + desenfoque que elimina el detalle facial + gradación de
color cálida) para que **ningún asistente sea identificable**, conservando la
atmósfera de la velada.

## Contacto

- Email: lituspiano@gmail.com
- WhatsApp: En_Litos
- YouTube: [@LitusPiano](https://www.youtube.com/@LitusPiano)
