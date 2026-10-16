#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VuMaTech Tools — çevrimdışı paket üreteci

Sitenin kendi ana sayfasını ve varlıklarını temel alır; bütün araçları,
kütüphaneleri ve tasarımı tek bir HTML dosyasına gömer. Sonuç internet
bağlantısı olmadan çalışır.

Kaynak : ../index.html, ../assets/{kit.css,site.js}, ../icerik/
Çıktı  : ../VuMaTech-Araclar-Cevrimdisi.zip

Kullanım:
    python3 cevrimdisi/uret-paket.py

Kütüphaneler cevrimdisi/libs/ altında beklenir (indir.sh ile alınır).
"""
import io
import json
import os
import re
import zipfile

BURADA = os.path.dirname(os.path.abspath(__file__))
KOK = os.path.dirname(BURADA)
LIBS = os.path.join(BURADA, "libs")

# Canlı bir sunucuya soru soran araçlar çevrimdışı çalışamaz.
AG_GEREKTIREN = {
    "doi-kaynakca-uretici",
    "isbn-kitap-kunyesi",
    "orcid-yayin-listesi-cekici",
}

# cdnjs adresindeki parça -> gömülecek yerel dosya
KUTUPHANE = [
    ("pdf-lib", "pdflib", "pdf-lib.min.js"),
    ("pdf.min.js", "pdfjs", "pdfjs.min.js"),
    ("jszip", "jszip", "jszip.min.js"),
    ("qrcode", "qr", "qrcode.min.js"),
    ("jsbarcode", "barcode", "jsbarcode.min.js"),
    ("beautify-css", "beaCss", "beautify-css.js"),
    ("beautify-html", "beaHtml", "beautify-html.js"),
    ("beautify.min", "bea", "beautify.js"),
]

SCRIPT_SRC = re.compile(r'<script\s+src="(https://[^"]+)"\s*></script>', re.I)


def oku(*yol):
    with io.open(os.path.join(*yol), encoding="utf-8") as f:
        return f.read()


def js_metni(s):
    """Rastgele metni JavaScript dizgi sabiti olarak güvenle gömer.

    JSON dizgisi geçerli bir JavaScript dizgisidir ve bütün kaçışları
    (tırnak, ters eğik çizgi, satır sonu, denetim karakterleri) doğru
    yapar — şablon dizgisiyle elle kaçış denemek kırılgandır.

    Ek olarak "</" dizisi "<\\/" biçimine çevrilir: aksi hâlde gömülen
    kaynakta geçen bir </script> satır içi betiği erkenden kapatır.
    U+2028/U+2029 de kaçırılır; eski ayrıştırıcılar bunları satır sonu
    sayar.
    """
    return (json.dumps(s, ensure_ascii=False)
            .replace("</", "<\\/")
            .replace(" ", "\\u2028")
            .replace(" ", "\\u2029"))


# ---------------------------------------------------------------- araçlar
def araclari_topla():
    katalog = json.loads(oku(KOK, "icerik", "katalog.json"))
    kayitlar = katalog["araclar"] if isinstance(katalog, dict) else katalog
    araclar, atlanan = [], []

    for k in kayitlar:
        slug = k["slug"]
        if slug in AG_GEREKTIREN:
            atlanan.append((k["baslik"], "canlı internet gerektirir"))
            continue

        govde = oku(KOK, "icerik", "araclar", slug + ".html")

        gerekli = []
        for parca, anahtar, _ in KUTUPHANE:
            if any(parca in m.group(1).lower() for m in SCRIPT_SRC.finditer(govde)):
                if anahtar not in gerekli:
                    gerekli.append(anahtar)

        # yapay zekâ modeli gömülemeyecek kadar büyük; renk kipi çevrimdışı çalışır
        yz = "imgly" in govde
        if yz:
            govde = govde.replace(
                "import(url).then", 'Promise.reject(new Error("offline")).then'
            )

        # cdnjs etiketleri çıkar, pdf.js işçisini gömülü bloba yönlendir
        govde = SCRIPT_SRC.sub("", govde)
        govde = re.sub(
            r'GlobalWorkerOptions\.workerSrc\s*=\s*"[^"]*"',
            "GlobalWorkerOptions.workerSrc=window.__PDFJS_WORKER",
            govde,
        )

        # gövde ile betiği ayır
        parcalar = re.split(r"<script>//<!\[CDATA\[(.*?)//\]\]></script>", govde, flags=re.S)
        html = parcalar[0]
        betik = "".join(parcalar[i] for i in range(1, len(parcalar), 2))

        araclar.append({
            "t": k["baslik"], "c": k["kategori"], "d": k["aciklama"],
            "i": k["ikon"], "needs": gerekli, "ai": yz,
            "html": html, "js": betik,
        })

    return araclar, atlanan


# ---------------------------------------------------------------- kabuk
def kabugu_kur(araclar):
    sayfa = oku(KOK, "index.html")

    # 1) varlıkları göm
    stil = "<style>" + oku(KOK, "assets", "kit.css") + "</style>"
    sayfa = re.sub(r'<link[^>]+href="/assets/kit\.css[^"]*"[^>]*>',
                   lambda m: stil, sayfa)
    ortak = "<script>" + oku(KOK, "assets", "site.js") + "</script>"
    sayfa = re.sub(r'<script src="/assets/site\.js[^"]*"></script>',
                   lambda m: ortak, sayfa)

    # 2) çevrimdışı pakette anlamsız bölümleri çıkar
    sayfa = re.sub(r"<a class='offline-cta'.*?</a>", "", sayfa, flags=re.S)
    sayfa = re.sub(r"<div class='adzone'>.*?</div>\s*</div>", "</div>", sayfa, flags=re.S)
    sayfa = re.sub(r"<div class='adzone'>.*?-->\s*</div>", "", sayfa, flags=re.S)

    # 3) vitrin bölümünü sarmala, araç görünümü için yer aç
    baslangic = "          <div class='hero'>"
    bitis = "          <div class='grid' id='vitrin'></div>"
    if baslangic not in sayfa or bitis not in sayfa:
        raise SystemExit("ana sayfa yapısı beklenenden farklı")
    sayfa = sayfa.replace(baslangic, '<div id="home">\n' + baslangic, 1)
    sayfa = sayfa.replace(bitis, bitis + '\n</div>\n<div id="toolview"></div>', 1)

    # 4) başlık ve künye etiketi
    sayfa = re.sub(r"<title>.*?</title>",
                   "<title>VuMaTech Tools — çevrimdışı</title>", sayfa, flags=re.S)
    sayfa = sayfa.replace("vumatech.net</a>", "çevrimdışı sürüm</a>", 1)

    # 5) çalışma zamanı: kütüphaneler + araçlar + vitrin
    kaynaklar = {a: oku(LIBS, d) for _, a, d in KUTUPHANE}
    depo = ("var LIBSRC={\n"
            + ",\n".join("%s:%s" % (a, js_metni(v)) for a, v in kaynaklar.items())
            + "\n};\n")
    isci = "var WORKERSRC=" + js_metni(oku(LIBS, "pdfjs.worker.min.js")) + ";\n"
    veri = ("var TOOLS=[\n" + ",\n".join(
        "{t:%s,c:%s,d:%s,i:%s,needs:%s,ai:%s,html:%s,js:%s}" % (
            json.dumps(a["t"], ensure_ascii=False),
            json.dumps(a["c"], ensure_ascii=False),
            json.dumps(a["d"], ensure_ascii=False),
            json.dumps(a["i"], ensure_ascii=False),
            json.dumps(a["needs"]),
            "true" if a["ai"] else "false",
            js_metni(a["html"]), js_metni(a["js"]))
        for a in araclar) + "\n];\n")

    calisma = oku(BURADA, "merkez.js")

    gomulu = "<script>\n" + depo + isci + veri + calisma + "\n</script>"
    sayfa = re.sub(r'<script src="/assets/vitrin\.js[^"]*"></script>',
                   lambda m: gomulu, sayfa)
    return sayfa


# ---------------------------------------------------------------- paket
BASLATICI_WIN = "@echo off\r\nstart \"\" \"%~dp0BASLAT.html\"\r\n"

KISAYOL_WIN = (
    "@echo off\r\nsetlocal\r\n"
    'set "HEDEF=%~dp0BASLAT.html"\r\n'
    'set "KS=%USERPROFILE%\\Desktop\\VuMaTech Araclar.url"\r\n'
    "(\r\necho [InternetShortcut]\r\n"
    "echo URL=file:///%HEDEF:\\=/%\r\n"
    "echo IconIndex=0\r\n"
    ') > "%KS%"\r\n'
    "echo Masaustune kisayol olusturuldu.\r\npause\r\n"
)

BASLATICI_UNIX = """#!/bin/bash
DIZIN="$(cd "$(dirname "$0")" && pwd)"
if command -v open >/dev/null 2>&1; then open "$DIZIN/BASLAT.html"
elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$DIZIN/BASLAT.html"
else echo "BASLAT.html dosyasini tarayicinizla acin"; fi
"""


def okuyun_metni(sayi, atlanan):
    satir = "\n".join("  - %s (%s)" % (a, n) for a, n in atlanan)
    return ("VuMaTech Araclar - Cevrimdisi Surum\n"
            "===================================\n\n"
            "Bu klasor %d araci icerir ve INTERNET OLMADAN calisir.\n"
            "Gereken her sey BASLAT.html dosyasinin icine gomuludur;\n"
            "disaridan hicbir sey indirilmez.\n\n"
            "NASIL ACILIR\n"
            "------------\n"
            "Windows : Windows-Baslat.bat dosyasina cift tiklayin.\n"
            "Mac     : Mac-Linux-Baslat.command dosyasina cift tiklayin.\n"
            "Linux   : Mac-Linux-Baslat.command dosyasina cift tiklayin.\n\n"
            "Ya da BASLAT.html dosyasini herhangi bir tarayiciyla acin.\n"
            "Kurulum gerekmez.\n\n"
            "MASAUSTUNE KISAYOL (Windows)\n"
            "----------------------------\n"
            "Masaustune-Kisayol-Olustur.bat dosyasina cift tiklayin.\n\n"
            "TASIMA\n"
            "------\n"
            "Klasorun tamamini USB bellege kopyalayabilir, e-posta ile\n"
            "gonderebilirsiniz. Her yerde ayni calisir.\n\n"
            "BU SURUMDE OLMAYAN ARACLAR\n"
            "--------------------------\n"
            "Asagidaki araclar calismak icin canli internete ihtiyac duyar,\n"
            "bu yuzden pakete alinmadi:\n%s\n\n"
            "Bunlar icin cevrimici siteyi kullanin: tools.vumatech.net\n\n"
            "Vesikalik aracinda yapay zeka ile arka plan kaldirma cevrimdisi\n"
            "calismaz; renkten kaldirma secenegini kullanin.\n\n"
            "-----------------------------------------------------------\n"
            "VuMaTech Studio - Biskek | vumatech.net\n"
            "Butun araclar cihazinizda calisir; dosyalariniz disari gitmez.\n"
            % (sayi, satir))


def main():
    araclar, atlanan = araclari_topla()
    sayfa = kabugu_kur(araclar)

    hedef = os.path.join(KOK, "VuMaTech-Araclar-Cevrimdisi.zip")
    kok_ad = "VuMaTech Araclar"
    with zipfile.ZipFile(hedef, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        z.writestr(kok_ad + "/BASLAT.html", sayfa)
        z.writestr(kok_ad + "/Windows-Baslat.bat", BASLATICI_WIN)
        z.writestr(kok_ad + "/Masaustune-Kisayol-Olustur.bat", KISAYOL_WIN)
        bilgi = zipfile.ZipInfo(kok_ad + "/Mac-Linux-Baslat.command")
        bilgi.external_attr = 0o755 << 16
        z.writestr(bilgi, BASLATICI_UNIX)
        z.writestr(kok_ad + "/OKUYUN-Nasil-Kullanilir.txt",
                   okuyun_metni(len(araclar), atlanan).replace("\n", "\r\n"))

    mb = os.path.getsize(hedef) / 1048576.0
    print("Çevrimdışı paket: %d araç · sayfa %.2f MB · zip %.2f MB"
          % (len(araclar), len(sayfa.encode("utf-8")) / 1048576.0, mb))
    for ad, neden in atlanan:
        print("  dışarıda: %s — %s" % (ad, neden))


if __name__ == "__main__":
    main()
