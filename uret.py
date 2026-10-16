#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VuMaTech Tools — statik site üreteci

Kaynak:
    icerik/katalog.json        araç listesi (başlık, kategori, açıklama, ikon)
    icerik/araclar/<slug>.html her aracın gövdesi
    icerik/parca/*.html        ortak kabuk parçaları (künye, ana sayfa, altbilgi)

Çıktı: depo kökündeki sayfalar, assets/vitrin.js ve sitemap.xml.

Kullanım:
    python3 uret.py

Yeni araç eklemek:
    1. icerik/araclar/<slug>.html dosyasını oluştur (yalnız gövde)
    2. icerik/katalog.json içine kaydı ekle
    3. python3 uret.py
"""
import io
import json
import os
import re
import html
import unicodedata

KOK = os.path.dirname(os.path.abspath(__file__))
ALAN = "https://tools.vumatech.net"
ZIP = "/VuMaTech-Araclar-Cevrimdisi.zip"

FONT = ("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600"
        "&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap")

ANA_ACIKLAMA = ("Akademik, PDF, görsel ve metin araçları. Tamamı tarayıcınızda çalışır; "
                "dosyalarınız hiçbir sunucuya yüklenmez. Ücretsiz ve kayıt gerektirmez.")

SIRA = ["Akademik", "Belge", "Görsel", "Metin", "Üretici", "Hesap", "Geliştirici", "Diğer"]

ERKEN_BETIK = """<script>
/* Tema, sayfa çizilmeden uygulanır; yoksa karanlık temada bir an beyaz parlama olur.
   Kayıtlı tercih yoksa işletim sistemi ayarı kullanılır. */
(function(){try{
  var t=localStorage.getItem("vmt_theme");
  if(t!=="dark"&&t!=="light"){
    t=(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light";
  }
  document.documentElement.setAttribute("data-theme",t);
  var m=document.querySelector('meta[name="theme-color"]');
  if(m)m.setAttribute("content", t==="dark"?"#0d1014":"#f4f3f0");
}catch(e){document.documentElement.setAttribute("data-theme","light");}})();
</script>"""

GERI = '<a class="back" href="/" data-i18n="back">← bütün araçlar</a>'

GIZLILIK_NOTU = (
    '<p class="priv">'
    '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/>'
    '<path d="M9 12l2 2 4-4"/></svg> '
    '<span data-i18n="priv">Bu araç tamamen tarayıcınızda çalışır '
    '— dosyalarınız sunucuya yüklenmez.</span></p>'
)


def oku(*parcalar):
    return io.open(os.path.join(KOK, *parcalar), encoding="utf-8").read()


def yaz(bagil_yol, metin):
    tam = os.path.join(KOK, bagil_yol)
    os.makedirs(os.path.dirname(tam), exist_ok=True)
    io.open(tam, "w", encoding="utf-8").write(metin)


KACIS = re.compile(r"\\u([0-9a-fA-F]{4})")


def kacis_coz(betik):
    """\\uXXXX kaçışlarını okunur harfe çevirir.

    Görünmez ve biçim karakterleri kaçışlı bırakılır: kaynak kodda gözle
    ayırt edilemeyen bir karakterin ham hâlde durması bakımı zorlaştırır.
    """
    def degistir(m):
        ch = chr(int(m.group(1), 16))
        if unicodedata.category(ch) in ("Cf", "Cc", "Zs", "Zl", "Zp"):
            return m.group(0)
        return ch
    return KACIS.sub(degistir, betik)


def govde_hazirla(ham):
    g = ham.replace("<script>//<![CDATA[", "<script>").replace("//]]></script>", "</script>")
    g = re.sub(r"(<script>)(.*?)(</script>)",
               lambda m: m.group(1) + kacis_coz(m.group(2)) + m.group(3), g, flags=re.S)
    return g.strip()


def sayfa(baslik, aciklama, yol, icerik, kunye, altbilgi, genis=False, vitrin=False):
    tam_baslik = baslik if yol == "/" else f"{baslik} — VuMaTech Tools"
    kanonik = ALAN + yol
    e = html.escape
    vitrin_betigi = '<script src="/assets/vitrin.js"></script>' if vitrin else ""
    return f"""<!DOCTYPE html>
<html lang="tr"{' class="wide"' if genis else ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f4f3f0">
<title>{e(tam_baslik)}</title>
<meta name="description" content="{e(aciklama)}">
<link rel="canonical" href="{kanonik}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="VuMaTech Tools">
<meta property="og:title" content="{e(tam_baslik)}">
<meta property="og:description" content="{e(aciklama)}">
<meta property="og:url" content="{kanonik}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONT}">
<link rel="stylesheet" href="/assets/kit.css">
{ERKEN_BETIK}
</head>
<body>
<div class="shell">
{kunye}
{icerik}
{altbilgi}
</div>
<script src="/assets/site.js"></script>
{vitrin_betigi}
</body>
</html>
"""


def vitrin_betigi_uret(araclar):
    """Katalogu vitrin betiğine gömer; sayfa ek bir istek yapmaz."""
    sablon = oku("assets", "vitrin.js")
    kayitlar = [{"t": a["baslik"], "u": f'/araclar/{a["slug"]}/', "c": a["kategori"],
                 "d": a["aciklama"], "i": a["ikon"]} for a in araclar]
    yeni = "var ARACLAR = " + json.dumps(kayitlar, ensure_ascii=False, separators=(",", ":")) + ";"
    guncel, adet = re.subn(r"var ARACLAR = \[.*?\];", lambda _: yeni, sablon, count=1, flags=re.S)
    if adet != 1:
        raise SystemExit("vitrin.js içinde ARACLAR dizisi bulunamadı")
    yaz("assets/vitrin.js", guncel)


def main():
    katalog = json.loads(oku("icerik", "katalog.json"))
    araclar = katalog["araclar"]
    sayfalar = katalog["sayfalar"]

    araclar.sort(key=lambda a: (SIRA.index(a["kategori"]) if a["kategori"] in SIRA else 99,
                                a["baslik"].lower()))

    kunye = oku("icerik", "parca", "crest.html")
    ana = oku("icerik", "parca", "ana.html")
    altbilgi = oku("icerik", "parca", "son.html")

    bag = " · ".join(f'<a href="/{p["slug"]}/">{html.escape(p["baslik"])}</a>' for p in sayfalar)
    altbilgi = altbilgi.replace("{SAYFA_BAGLANTILARI}", f"<span>{bag} · </span>")
    ana = ana.replace("href='CEVRIMDISI_ZIP_BAGLANTISI'", f'href="{ZIP}" download')

    yaz("index.html", sayfa("VuMaTech Tools — tarayıcınızda çalışan ücretsiz araçlar",
                            ANA_ACIKLAMA, "/", ana, kunye, altbilgi, vitrin=True))

    for a in araclar:
        govde = govde_hazirla(oku("icerik", "araclar", f'{a["slug"]}.html'))
        icerik = (f'{GERI}\n<h1 class="view">{html.escape(a["baslik"])}</h1>\n{GIZLILIK_NOTU}\n'
                  f'<div class="tk">\n{govde}\n</div>')
        yaz(f'araclar/{a["slug"]}/index.html',
            sayfa(a["baslik"], a["aciklama"] or ANA_ACIKLAMA,
                  f'/araclar/{a["slug"]}/', icerik, kunye, altbilgi, genis=True))

    for p in sayfalar:
        govde = govde_hazirla(oku("icerik", "araclar", f'{p["slug"]}.html'))
        icerik = (f'{GERI}\n<h1 class="view">{html.escape(p["baslik"])}</h1>\n'
                  f'<div class="tk">\n{govde}\n</div>')
        yaz(f'{p["slug"]}/index.html',
            sayfa(p["baslik"], f'{p["baslik"]} — VuMaTech Tools',
                  f'/{p["slug"]}/', icerik, kunye, altbilgi, genis=True))

    vitrin_betigi_uret(araclar)

    yollar = ["/"] + [f'/araclar/{a["slug"]}/' for a in araclar] \
                   + [f'/{p["slug"]}/' for p in sayfalar]
    yaz("sitemap.xml",
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(f"  <url><loc>{ALAN}{y}</loc>"
                    f"<priority>{'1.0' if y == '/' else '0.8'}</priority></url>" for y in yollar)
        + "\n</urlset>\n")

    yonlendirme = [f'/p/{a["slug"]}.html  /araclar/{a["slug"]}/  301' for a in araclar]
    yonlendirme += [f'/p/{p["slug"]}.html  /{p["slug"]}/  301' for p in sayfalar]
    yonlendirme += ["/p/*  /  301"]
    yaz("_redirects", "\n".join(yonlendirme) + "\n")

    print(f"Üretildi: 1 ana sayfa + {len(araclar)} araç + {len(sayfalar)} bilgi sayfası")
    print(f"sitemap.xml: {len(yollar)} adres · _redirects: {len(yonlendirme)} kural")


if __name__ == "__main__":
    main()
