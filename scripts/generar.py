#!/usr/bin/env python3
"""Genera el sitio estático de Hobby Pop.

Lee data/*.json y src/body.html y escribe:
  index.html
  tienda/<slug>/index.html   (una por tienda)
  vendedor/<slug>/index.html (una por vendedor)
  404.html, sitemap.xml, robots.txt

Uso:  python3 scripts/generar.py
"""
import json, pathlib, html, shutil

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DOMINIO = "https://hobbypop.co"
cargar = lambda n: json.loads((RAIZ / "data" / n).read_text(encoding="utf-8"))
grupos, tiendas, vendedores = cargar("grupos.json"), cargar("tiendas.json"), cargar("vendedores.json")
cuerpo = (RAIZ / "src" / "body.html").read_text(encoding="utf-8")

DATA = json.dumps({"grupos": grupos, "tiendas": tiendas, "vendedores": vendedores}, ensure_ascii=False).replace("</", "<\\/")
e = html.escape

def pagina(titulo, desc, ruta_url, ruta_js="", indexar=True):
    og = f"{DOMINIO}/assets/og.png"
    robots = "" if indexar else '<meta name="robots" content="noindex">\n'
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{e(titulo)}</title>
<meta name="description" content="{e(desc)}">
{robots}<link rel="canonical" href="{DOMINIO}{ruta_url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hobby Pop">
<meta property="og:locale" content="es_PA">
<meta property="og:title" content="{e(titulo)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{DOMINIO}{ruta_url}">
<meta property="og:image" content="{og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#140B33">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@600;700;800;900&display=swap">
<link rel="stylesheet" href="/css/styles.css">
</head>
<body>
{cuerpo}
<script>window.DATA={DATA};window.RUTA={json.dumps(ruta_js)};</script>
<script src="/js/app.js"></script>
</body>
</html>
"""

def escribir(rel, contenido):
    p = RAIZ / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(contenido, encoding="utf-8")

urls = ["/"]
escribir("index.html", pagina(
    "Hobby Pop · Comunidad de coleccionistas de tarjetas",
    "La comunidad hispana de coleccionistas de tarjetas. Tiendas y vendedores de confianza, grupos de WhatsApp, blog y herramientas para aprender el hobby.",
    "/"))

for t in tiendas:
    ruta = f"/tienda/{t['s']}/"
    desc = f"{t['n']} en {t['z']}. Tienda de confianza de la comunidad Hobby Pop: horario, ubicación y qué manejan."
    escribir(f"tienda/{t['s']}/index.html", pagina(f"{t['n']} · Tienda de confianza | Hobby Pop", desc, ruta, f"tienda-{t['s']}", indexar=not t.get("ejemplo")))
    if not t.get("ejemplo"): urls.append(ruta)

for v in vendedores:
    ruta = f"/vendedor/{v['s']}/"
    desc = f"{v['n']} en {v['z']}. Vendedor de confianza de la comunidad Hobby Pop. {v.get('d','')}".strip()
    escribir(f"vendedor/{v['s']}/index.html", pagina(f"{v['n']} · Vendedor de confianza | Hobby Pop", desc, ruta, f"vendedor-{v['s']}", indexar=not v.get("ejemplo")))
    if not v.get("ejemplo"): urls.append(ruta)

escribir("404.html", pagina("Página no encontrada | Hobby Pop", "Esta página no existe. Vuelve al inicio de Hobby Pop.", "/404.html", "", indexar=False))
escribir("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
         "".join(f"  <url><loc>{DOMINIO}{u}</loc></url>\n" for u in urls) + "</urlset>\n")
escribir("robots.txt", f"User-agent: *\nAllow: /\nSitemap: {DOMINIO}/sitemap.xml\n")
print(f"OK: {len(tiendas)} tiendas, {len(vendedores)} vendedores, {len(urls)} URLs en el sitemap")
