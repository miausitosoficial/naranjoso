"""Obtiene el refresh token de TikTok para el robot (se corre UNA vez, en tu compu).

Uso:  python obtener_token.py

Te pide el Client key y el Client secret de tu app de developers.tiktok.com
(los escribes tú; el secreto no se muestra en pantalla), abre TikTok para que
autorices la cuenta, y al final te muestra el refresh token para que lo pegues
como secreto en GitHub. No guarda nada en archivos ni lo envía a otro lado.
"""
import getpass
import json
import secrets
import urllib.parse
import urllib.request
import webbrowser

REDIRECT = "https://miausitosoficial.github.io/naranjoso/tiktok-callback.html"
SCOPES = "user.info.basic,video.list"


def main():
    print("\n=== Conectar la web de Naranjoso con TikTok ===\n")
    client_key = input("1) Pega tu Client key: ").strip()
    client_secret = getpass.getpass("2) Pega tu Client secret (no se verá al escribir): ").strip()
    estado = secrets.token_urlsafe(12)
    url = "https://www.tiktok.com/v2/auth/authorize/?" + urllib.parse.urlencode({
        "client_key": client_key, "scope": SCOPES, "response_type": "code",
        "redirect_uri": REDIRECT, "state": estado,
    })
    print("\n3) Se va a abrir TikTok. Inicia sesión con @miausitos_oficial y aprieta 'Autorizar'.")
    print("   Si no se abre solo, copia este link en el navegador:\n   " + url + "\n")
    webbrowser.open(url)
    code = input("4) Pega aquí el código que te muestra la página de Naranjoso: ").strip()
    code = urllib.parse.unquote(code)

    datos = urllib.parse.urlencode({
        "client_key": client_key, "client_secret": client_secret, "code": code,
        "grant_type": "authorization_code", "redirect_uri": REDIRECT,
    }).encode()
    req = urllib.request.Request("https://open.tiktokapis.com/v2/oauth/token/", data=datos,
                                 headers={"Content-Type": "application/x-www-form-urlencoded"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            resp = json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        resp = json.loads(e.read().decode() or "{}")

    if "refresh_token" not in resp:
        print("\nNo funcionó:", resp.get("error"), "-", resp.get("error_description"))
        print("Revisa que el Redirect URI de tu app sea exactamente:\n  " + REDIRECT)
        print("y que el código no haya caducado (vuelve a correr el script).")
        return
    if "video.list" not in resp.get("scope", ""):
        print("\nOjo: TikTok no dio permiso de 'video.list'. Revisa que la app tenga Display API con ese scope.")
    dias = int(resp.get("refresh_expires_in", 0)) // 86400
    print("\n=== ¡Listo! ===")
    print("Copia este REFRESH TOKEN y guárdalo en GitHub como secreto TIKTOK_REFRESH_TOKEN")
    print(f"(dura unos {dias} días):\n")
    print(resp["refresh_token"])
    print("\nNo lo compartas con nadie. Cierra esta ventana cuando lo hayas pegado.")


if __name__ == "__main__":
    main()
    input("\nPresiona Enter para salir...")
