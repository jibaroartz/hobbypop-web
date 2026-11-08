# Hobby Pop — hobbypop.co

Comunidad de coleccionistas de tarjetas en español (fuerte en Panamá). Sitio estático, sin framework, publicado en GitHub Pages. Dueño: Jibaro (Luis Quintero). Todo el texto del sitio va en español neutro.

## Cómo trabajamos
- El contenido (textos, datos, fotos) lo prepara Claude en el proyecto "Hobby Pop" de claude.ai; Claude Code lo publica en este repo.
- Fase 1 sin panel de administración: tiendas, vendedores y posts se agregan editando archivos en `data/`.
- Siempre responder a Jibaro en español, claro y corto.

## Estructura objetivo
- `prototipo/index.html` — prototipo aprobado (diseño de referencia, NO se edita; `template.html` es su fuente).
- `index.html`, `css/`, `js/`, `assets/` — sitio real.
- `data/tiendas.json`, `vendedores.json`, `posts.json`, `grupos.json` — fuente de verdad del contenido.
- `scripts/generar.py` — genera `/tienda/<slug>/index.html` y `/vendedor/<slug>/index.html` desde los JSON, con etiquetas Open Graph (para que el enlace se vea bien en WhatsApp).
- `CNAME` con `hobbypop.co`.

## Diseño (respetar el prototipo)
- Tema oscuro único. Colores: Pop #7B2CFF, Uva #461A95, Noche #140B33, Hueso #F3EFFA, Amarillo #FFC400, Cian #4FE0FF, ámbar #FF9E1B.
- Tipografía: Sofia Sans Extra Condensed (700/800/900), Google Fonts.
- Estilo: tarjetas glass, blobs difusos con parallax, botones amarillos brillantes, animaciones de aparición suaves, respetar `prefers-reduced-motion`.
- Usar los logos oficiales de Hobby Pop (los del prototipo); no inventar logos.
- Mobile first: la mayoría entra desde el celular. Probar a 400px sin scroll horizontal.

## Reglas de contenido
- URLs manuales: `/tienda/<nombre>` y `/vendedor/<nombre>`.
- Cada tienda y vendedor tiene página propia. Solo aparecen verificados y con su consentimiento.
- "Hallazgos" permanece oculto hasta que Jibaro diga.
- Botón "Quiero aparecer" bien visible arriba: abre WhatsApp +507 6443-7573 (`wa.me/50764437573?text=` con plantilla).
- Imágenes en WebP, máx. 1600px y ~150 KB.
- Mapa: Leaflet + OpenStreetMap, con lat/lng sacados de los enlaces de Google Maps.
- Boletín: formulario embebido de Mailchimp; hace falta página de Privacidad.
- Enlaces de grupos WhatsApp, YouTube (@jibarocards) e Instagram (@hobbypop7) están en el prototipo; mantenerlos iguales.

## Fuera de la fase 1
Hobby Bot, feed de eBay, vitrina privada, tiendas destacadas de pago, panel de administración.

## Antes de dar algo por terminado
- Abre bien en celular (400px) y escritorio, sin errores en consola.
- Enlaces y botones de WhatsApp funcionan.
- Vista previa al compartir (Open Graph) correcta.
- Commit claro y push a `main`.
