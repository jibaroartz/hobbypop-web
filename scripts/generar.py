#!/usr/bin/env python3
"""Genera el sitio estático de Hobby Pop.

Lee data/*.json y src/body.html y escribe:
  index.html
  tienda/<slug>/index.html   (una por tienda)
  vendedor/<slug>/index.html (una por vendedor)
  404.html, sitemap.xml, robots.txt

Uso:  python3 scripts/generar.py
"""
import json, pathlib, html, datetime, re
from urllib.parse import quote

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DOMINIO = "https://hobbypop.co"
cargar = lambda n: json.loads((RAIZ / "data" / n).read_text(encoding="utf-8"))
grupos, tiendas, vendedores = cargar("grupos.json"), cargar("tiendas.json"), cargar("vendedores.json")
cuerpo = (RAIZ / "src" / "body.html").read_text(encoding="utf-8")
# Interruptores de secciones (data/config.json): false = oculta, sin borrar nada
cfg = {"mostrar_tiendas": True, "mostrar_vendedores": True}
if (RAIZ / "data" / "config.json").exists(): cfg.update(cargar("config.json"))
MT, MV = cfg["mostrar_tiendas"], cfg["mostrar_vendedores"]
cuerpo = (cuerpo.replace("%%H_T%%", "" if MT else " hidden").replace("%%H_V%%", "" if MV else " hidden")
                .replace("%%H_D%%", "" if (MT or MV) else " hidden"))

# Entradas del blog: solo las que ya llegaron a su fecha de publicacion (hora de Panama)
import os
hoy = os.environ.get("HOBBYPOP_HOY") or datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-5))).date().isoformat()  # HOBBYPOP_HOY=2026-11-09 para probar
posts_todos = cargar("posts.json") if (RAIZ / "data" / "posts.json").exists() else []
posts = [p for p in posts_todos if p["publicar"] <= hoy]
MESES = "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split()
fecha_es = lambda f: f"{int(f[8:])} de {MESES[int(f[5:7])-1]} de {f[:4]}"

DATA = json.dumps({"grupos": grupos, "tiendas": tiendas, "vendedores": vendedores, "posts": posts, "config": {"tiendas": MT, "vendedores": MV}}, ensure_ascii=False).replace("</", "<\\/")
e = html.escape

def pagina(titulo, desc, ruta_url, ruta_js="", indexar=True, og=None, entrada=""):
    og = og or f"{DOMINIO}/assets/og.png"
    body = cuerpo.replace("<!--ENTRADA-->", entrada)
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/css/styles.css">
</head>
<body>
{body}
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
    "La comunidad hispana de coleccionistas de tarjetas. " + ("Tiendas y vendedores de confianza, " if (MT or MV) else "") + "grupos de WhatsApp, blog y herramientas para aprender el hobby.",
    "/"))

for t in (tiendas if MT else []):
    ruta = f"/tienda/{t['s']}/"
    desc = f"{t['n']} en {t['z']}. Tienda de confianza de la comunidad Hobby Pop: horario, ubicación y qué manejan."
    escribir(f"tienda/{t['s']}/index.html", pagina(f"{t['n']} · Tienda de confianza | Hobby Pop", desc, ruta, f"tienda-{t['s']}", indexar=not t.get("ejemplo")))
    if not t.get("ejemplo"): urls.append(ruta)

for v in (vendedores if MV else []):
    ruta = f"/vendedor/{v['s']}/"
    desc = f"{v['n']} en {v['z']}. Vendedor de confianza de la comunidad Hobby Pop. {v.get('d','')}".strip()
    escribir(f"vendedor/{v['s']}/index.html", pagina(f"{v['n']} · Vendedor de confianza | Hobby Pop", desc, ruta, f"vendedor-{v['s']}", indexar=not v.get("ejemplo")))
    if not v.get("ejemplo"): urls.append(ruta)

SECCIONES = {
    "tiendas": ("Tiendas de confianza", "Tiendas de cartas coleccionables en Panamá que la comunidad Hobby Pop conoce y recomienda."),
    "vendedores": ("Vendedores de confianza", "Vendedores de tarjetas coleccionables que la comunidad Hobby Pop conoce y recomienda."),
    "comunidad": ("Comunidad", "Los grupos de WhatsApp de Hobby Pop: deportes, TCG, entretenimiento, fans e intercambio y venta."),
    "blog": ("Blog", "Guías para coleccionar, noticias del hobby e historias de la comunidad Hobby Pop."),
    "contacto": ("Contacto", "Escríbenos por WhatsApp o Instagram, o pide aparecer como tienda o vendedor de confianza."),
    "reglas": ("Reglas de la comunidad", "Las reglas generales de todos los grupos de la comunidad Hobby Pop."),
}
import shutil
for _d, _on in (("tienda", MT), ("tiendas", MT), ("vendedor", MV), ("vendedores", MV)):
    if not _on and (RAIZ / _d).exists(): shutil.rmtree(RAIZ / _d)
for k, (tt, dd) in SECCIONES.items():
    if (k == "tiendas" and not MT) or (k == "vendedores" and not MV): continue
    escribir(f"{k}/index.html", pagina(f"{tt} | Hobby Pop", dd, f"/{k}/", k))
    urls.append(f"/{k}/")

for p in posts:
    ruta = f"/blog/{p['s']}/"
    texto = (RAIZ / "contenido" / "blog" / f"{p['s']}.html").read_text(encoding="utf-8")
    texto = re.sub(r"^(<hr/?>)+", "", texto)
    # recomendadas: primero de la misma categoria, luego las mas recientes
    orden = sorted(posts, key=lambda q: (q["publicar"], q["f"]), reverse=True)
    otros = [q for q in orden if q["s"] != p["s"]]
    rel = ([q for q in otros if q["c"] == p["c"]] + [q for q in otros if q["c"] != p["c"]])[:3]
    def tarjeta(q):
        st = f" style=\"background-image:url('{e(q['img'])}')\"" if q.get("img") else ""
        cls = "n" if q["c"] == "Noticia" else ("v" if q["c"] == "Historia" else "")
        return (f'<a class="post glass hov" href="/blog/{q["s"]}/"><div class="thumb has {cls}"{st}></div><div class="pbody">'
                f'<span class="meta">{e(q["c"])} · {fecha_es(q["f"])} · {q["min"]} min</span><h3>{e(q["t"])}</h3>'
                f'<p class="txt" style="font-size:20px">{e(q["r"])}</p></div></a>')
    relhtml = f'<div class="rel"><h2 class="h2">Sigue <span class="gt">leyendo</span></h2><div class="posts">{"".join(tarjeta(q) for q in rel)}</div></div>' if rel else ""
    # portada: la del post, o la primera imagen del texto (entradas importadas)
    portada_src, portada_alt = p.get("img") or "", p["t"]
    m = re.match(r"\s*<figure>\s*<img[^>]*?>\s*(?:<figcaption>.*?</figcaption>)?\s*</figure>", texto, re.S)
    if m and not portada_src:
        s = re.search(r'src="([^"]+)"', m.group(0))
        if s: portada_src = s.group(1)
    if m: texto = texto[m.end():]
    texto = re.sub(r"^\s*(<hr/?>\s*)+", "", texto)
    portada = (f'<figure class="pa-cover"><img src="{e(portada_src)}" alt="{e(portada_alt)}" width="1600" height="900"></figure>' if portada_src else "")
    url_abs = f"{DOMINIO}{ruta}"
    compartir = (f'<div class="pa-share"><span>Comparte esta entrada</span>'
                 f'<a class="btn g sm" target="_blank" rel="noopener" href="https://wa.me/?text={quote(p["t"] + " " + url_abs)}">WhatsApp</a>'
                 f'<button class="btn g sm" type="button" data-copy="{url_abs}">Copiar enlace</button></div>')
    art = (f'<article class="pa">'
           f'<header class="pa-head"><nav class="crumbs"><a href="/#blog" data-back>← Blog</a><span class="pill">{e(p["c"])}</span></nav>'
           f'<h1>{e(p["t"])}</h1><p class="deck">{e(p["r"])}</p>'
           f'<div class="byline"><span class="av"></span><div><b>Equipo Hobby Pop</b><span>{fecha_es(p["f"])} · {p["min"]} min de lectura</span></div></div></header>'
           f'{portada}<div class="pa-body">{texto}</div>{compartir}'
           f'<aside class="pa-cta glass"><h2 class="h2">Sé parte de <span class="gt">Hobby Pop</span></h2>'
           f'<p class="txt">Únete a la comunidad de coleccionistas en español y elige los grupos que van contigo.</p>'
           f'<div class="row"><a class="btn" href="/#comunidad" data-join="comunidad">Unirme a la comunidad</a></div></aside></article>{relhtml}')
    escribir(f"blog/{p['s']}/index.html", pagina(f"{p['t']} | Blog de Hobby Pop", p["r"], ruta, f"blog-{p['s']}", og=p.get("img") or None, entrada=art))
    urls.append(ruta)

escribir("404.html", pagina("Página no encontrada | Hobby Pop", "Esta página no existe. Vuelve al inicio de Hobby Pop.", "/404.html", "", indexar=False))
escribir("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
         "".join(f"  <url><loc>{DOMINIO}{u}</loc></url>\n" for u in urls) + "</urlset>\n")
escribir("robots.txt", f"User-agent: *\nAllow: /\nSitemap: {DOMINIO}/sitemap.xml\n")
print(f"OK: {len(tiendas)} tiendas, {len(vendedores)} vendedores, {len(posts)}/{len(posts_todos)} entradas, {len(urls)} URLs en el sitemap")
