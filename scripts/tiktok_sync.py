"""Robot que sincroniza los capítulos desde TikTok (corre en GitHub Actions).

1. Renueva el access token con el refresh token guardado en los secretos del repo.
2. Pide la lista de videos de la cuenta con la Display API oficial (video.list).
3. Se queda con los videos cuyo texto dice "Cap X" / "Capítulo X".
4. Descarga la portada de cada uno (las URLs de TikTok caducan) y escribe data/tiktok.json.

Variables de entorno (secretos del repo, nunca se imprimen):
  TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REFRESH_TOKEN
Salida opcional: si TikTok entrega un refresh token nuevo, se escribe en el archivo
indicado por NUEVO_REFRESH_TOKEN_PATH para que el workflow actualice el secreto.
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "data", "tiktok.json")
PORTADAS = os.path.join(RAIZ, "assets", "portadas", "tiktok")
API = "https://open.tiktokapis.com/v2"
CAMPOS = "id,title,video_description,cover_image_url,share_url,create_time,duration"
RE_CAP = re.compile(r"\bcap(?:[íi]tulo)?\.?\s*#?\s*(\d+(?:\.\d+)?)", re.IGNORECASE)


def pedir(url, datos=None, cabeceras=None, json_body=None):
    cab = dict(cabeceras or {})
    cuerpo = None
    if json_body is not None:
        cuerpo = json.dumps(json_body).encode()
        cab["Content-Type"] = "application/json"
    elif datos is not None:
        cuerpo = urllib.parse.urlencode(datos).encode()
        cab["Content-Type"] = "application/x-www-form-urlencoded"
    req = urllib.request.Request(url, data=cuerpo, headers=cab, method="POST" if cuerpo else "GET")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def renovar_token():
    r = pedir(f"{API}/oauth/token/", datos={
        "client_key": os.environ["TIKTOK_CLIENT_KEY"],
        "client_secret": os.environ["TIKTOK_CLIENT_SECRET"],
        "grant_type": "refresh_token",
        "refresh_token": os.environ["TIKTOK_REFRESH_TOKEN"],
    })
    if "access_token" not in r:
        sys.exit(f"No se pudo renovar el token: {r.get('error')} {r.get('error_description')}")
    nuevo = r.get("refresh_token")
    ruta = os.environ.get("NUEVO_REFRESH_TOKEN_PATH")
    if nuevo and ruta and nuevo != os.environ["TIKTOK_REFRESH_TOKEN"]:
        with open(ruta, "w") as f:
            f.write(nuevo)
        print("TikTok entregó un refresh token nuevo (se guardará en el secreto).")
    return r["access_token"]


def listar_videos(token):
    videos, cursor = [], None
    for _ in range(10):  # hasta 200 videos
        cuerpo = {"max_count": 20}
        if cursor:
            cuerpo["cursor"] = cursor
        r = pedir(f"{API}/video/list/?fields={CAMPOS}", cabeceras={"Authorization": f"Bearer {token}"}, json_body=cuerpo)
        err = r.get("error", {})
        if err.get("code") not in (None, "ok"):
            sys.exit(f"Error de TikTok en video.list: {err.get('code')} {err.get('message')}")
        d = r.get("data", {})
        videos += d.get("videos", [])
        if not d.get("has_more"):
            break
        cursor = d.get("cursor")
    return videos


def limpiar(texto):
    texto = re.sub(r"#\S+", "", texto or "")
    texto = re.sub(r"@\S+", "", texto)
    return re.sub(r"\s+", " ", texto).strip(" -|·")


def bajar_portada(v):
    url = v.get("cover_image_url")
    if not url:
        return None
    os.makedirs(PORTADAS, exist_ok=True)
    nombre = f"{v['id']}.jpg"
    ruta = os.path.join(PORTADAS, nombre)
    if not os.path.exists(ruta):
        try:
            with urllib.request.urlopen(url, timeout=30) as r, open(ruta, "wb") as f:
                f.write(r.read())
        except Exception as e:  # una portada que falla no detiene todo
            print(f"Portada {v['id']} no descargada: {e}")
            return None
    return f"assets/portadas/tiktok/{nombre}"


def main():
    token = renovar_token()
    videos = listar_videos(token)
    print(f"Videos en la cuenta: {len(videos)}")
    caps = {}
    for v in videos:
        texto = f"{v.get('title') or ''} {v.get('video_description') or ''}"
        m = RE_CAP.search(texto)
        if not m:
            continue
        n = m.group(1)
        if n in caps and caps[n]["fecha"] <= v.get("create_time", 0):
            continue  # si hay dos videos del mismo cap, se queda con el primero que se subió
        crudo = v.get("title") or v.get("video_description") or ""
        titulo = limpiar(RE_CAP.sub("", crudo)).strip(" :-|·") or f"Capítulo {n}"
        desc = limpiar(RE_CAP.sub("", v.get("video_description") or crudo)).strip(" :-|·")
        caps[n] = {
            "n": n,
            "id": v["id"],
            "titulo": titulo[:70],
            "desc": desc[:160],
            "url": v.get("share_url") or f"https://www.tiktok.com/@miausitos_oficial/video/{v['id']}",
            "portada": bajar_portada(v),
            "fecha": v.get("create_time", 0),
        }
    lista = sorted(caps.values(), key=lambda c: float(c["n"]))
    nuevo = {"videos": lista}
    viejo = None
    if os.path.exists(SALIDA):
        with open(SALIDA, encoding="utf-8") as f:
            viejo = json.load(f)
        viejo.pop("actualizado", None)
    if viejo == nuevo:
        print("Sin cambios.")
        return
    nuevo["actualizado"] = int(time.time())
    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    with open(SALIDA, "w", encoding="utf-8") as f:
        json.dump(nuevo, f, ensure_ascii=False, indent=2)
    print(f"Capítulos encontrados: {', '.join(c['n'] for c in lista) or 'ninguno'}")


if __name__ == "__main__":
    main()
