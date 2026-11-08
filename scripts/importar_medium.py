#!/usr/bin/env python3
"""Importa las entradas de un export de Medium (carpeta posts/) a este sitio.

Uso: python3 scripts/importar_medium.py RUTA/A/medium/posts
Escribe contenido/blog/<slug>.html (solo el cuerpo limpio) y data/posts.json.
Las que ya existen en posts.json conservan su 'publicar' y categoria.
"""
import sys, re, json, pathlib, unicodedata, datetime
from bs4 import BeautifulSoup

RAIZ = pathlib.Path(__file__).resolve().parent.parent
origen = pathlib.Path(sys.argv[1])
(RAIZ / "contenido" / "blog").mkdir(parents=True, exist_ok=True)
pj = RAIZ / "data" / "posts.json"
previos = {p["s"]: p for p in json.loads(pj.read_text("utf-8"))} if pj.exists() else {}

def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    return t[:70].rstrip("-")

INICIAL = [  # las 10 que salen el primer dia (partes del titulo)
    "10 razones para coleccionar", "10 Consejos para iniciar", "Glosario de Trading Cards",
    "saber el precio de mis tarjetas", "almacenar y proteger", "grados de condici",
    "Errores comunes de coleccionistas", "empezar a coleccionar tarjetas deportivas con poco",
    "vender tus tarjetas por WhatsApp", "Encapsular"]

def categoria(t):
    x = t.lower()
    if any(k in x for k in ["hobby news", "bolet", "topps", "panini", "psa", "ebay", "hasbro", "mundial", "copa", "nba", "blockchain", "nft", "lanzamiento"]) and not any(k in x for k in ["guía", "consejos", "cómo"]):
        return "Noticia"
    if any(k in x for k in ["cómo", "como ", "consejos", "guía", "glosario", "errores", "razones", "qué son", "encapsular", "lecciones", "verdades", "invertir", "precio", "test", "almacenar", "grados", "vender", "empezar"]):
        return "Guía"
    return "Historia"

PERMITIDAS = {"p","h2","h3","h4","ul","ol","li","blockquote","strong","em","b","i","a","br","hr","figure","figcaption","img","iframe","pre","code"}
posts = []
for f in sorted(origen.glob("*.html")):
    if f.name.startswith("draft_"): continue
    s = BeautifulSoup(f.read_text("utf-8"), "html.parser")
    titulo = s.find("h1", class_="p-name").get_text(" ", strip=True)
    fecha = s.find("time", class_="dt-published")["datetime"][:10]
    canon = s.find("a", class_="p-canonical"); medium = canon["href"] if canon else ""
    cuerpo = s.find("section", attrs={"data-field": "body"})
    for sc in cuerpo.find_all(["script", "style"]): sc.decompose()
    # titulo repetido al inicio
    for h in cuerpo.find_all(["h1","h2","h3","h4"], limit=2):
        if re.sub(r"\W+", "", h.get_text()).lower() == re.sub(r"\W+", "", titulo).lower(): h.decompose()
    # figuras
    for fig in cuerpo.find_all("figure"):
        img = fig.find("img"); cap = fig.find("figcaption")
        if not img: fig.decompose(); continue
        src = img["src"].replace("/max/800/", "/max/1200/")
        nuevo = BeautifulSoup("", "html.parser")
        fg = nuevo.new_tag("figure"); im = nuevo.new_tag("img", src=src, loading="lazy", alt=(cap.get_text(" ", strip=True) if cap else titulo))
        fg.append(im)
        if cap and cap.get_text(strip=True):
            fc = nuevo.new_tag("figcaption"); fc.string = cap.get_text(" ", strip=True); fg.append(fc)
        fig.replace_with(fg)
    for ifr in cuerpo.find_all("iframe"):
        src = ifr.get("src", "")
        m = re.search(r"youtube\.com/embed/([\w-]+)", src) or re.search(r"[?&]v=([\w-]+)", src)
        if "youtube" in src and m:
            ifr.attrs = {"src": f"https://www.youtube-nocookie.com/embed/{m.group(1)}", "loading": "lazy", "allowfullscreen": "", "title": "Video de YouTube", "class": "yt"}
        else: ifr.decompose()
    for t in list(cuerpo.find_all(True)):
        if t.name not in PERMITIDAS: t.unwrap()
    for t in cuerpo.find_all(True):
        if t.name == "a":
            href = t.get("href", ""); t.attrs = {"href": href, "target": "_blank", "rel": "noopener"}
        elif t.name in ("img", "iframe"): pass
        else: t.attrs = {}
    for e in cuerpo.find_all(["p", "li", "h2", "h3", "h4"]):
        if not e.get_text(strip=True) and not e.find(["img", "iframe"]): e.decompose()
    html = "".join(str(c) for c in cuerpo.contents).strip()
    img1 = cuerpo.find("img"); portada = img1["src"] if img1 else ""
    primero = next((p.get_text(" ", strip=True) for p in cuerpo.find_all("p") if len(p.get_text(strip=True)) > 60), titulo)
    resumen = primero if len(primero) <= 170 else primero[:167].rsplit(" ", 1)[0] + "…"
    palabras = len(cuerpo.get_text(" ").split())
    sg = slug(titulo)
    (RAIZ / "contenido" / "blog" / f"{sg}.html").write_text(html, "utf-8")
    prev = previos.get(sg, {})
    posts.append({"s": sg, "t": titulo, "f": fecha, "r": resumen, "c": prev.get("c", categoria(titulo)),
                  "img": portada, "min": max(1, round(palabras / 200)), "medium": medium, "publicar": prev.get("publicar", "")})

# calendario: 10 el domingo 2026-11-08 y 1 por dia desde el 9
d = datetime.date(2026, 11, 9)
posts.sort(key=lambda p: p["f"])
for p in posts:
    if p["publicar"]: continue
    if any(k.lower() in p["t"].lower() for k in INICIAL): p["publicar"] = "2026-11-08"
for p in posts:
    if not p["publicar"]:
        p["publicar"] = d.isoformat(); d += datetime.timedelta(days=1)
posts.sort(key=lambda p: p["f"], reverse=True)
pj.write_text(json.dumps(posts, ensure_ascii=False, indent=1), "utf-8")
print(len(posts), "entradas;", sum(p["publicar"] == "2026-11-08" for p in posts), "para el lunes")
