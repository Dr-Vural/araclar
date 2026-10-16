#!/bin/bash
# Çevrimdışı pakete gömülecek kütüphaneleri npm kayıt defterinden indirir.
# Bu dosyalar depoda tutulmaz (bkz. .gitignore); paketi üretmeden önce
# bir kez çalıştırmak yeterlidir.
#
#   bash cevrimdisi/indir.sh && python3 cevrimdisi/uret-paket.py

set -e
cd "$(dirname "$0")"
mkdir -p libs && cd libs

al() {  # al <tgz-adresi> <arşiv-içi-yol> <hedef-ad>
  curl -sL "$1" -o _p.tgz
  tar xzf _p.tgz
  cp "package/$2" "./$3"
  rm -rf package _p.tgz
  printf '  %-22s %8d bayt\n' "$3" "$(wc -c < "$3")"
}

al "https://registry.npmjs.org/pdf-lib/-/pdf-lib-1.17.1.tgz"            "dist/pdf-lib.min.js"        "pdf-lib.min.js"
al "https://registry.npmjs.org/jszip/-/jszip-3.10.1.tgz"                "dist/jszip.min.js"          "jszip.min.js"
al "https://registry.npmjs.org/jsbarcode/-/jsbarcode-3.11.6.tgz"        "dist/JsBarcode.all.min.js"  "jsbarcode.min.js"
al "https://registry.npmjs.org/qrcodejs2/-/qrcodejs2-0.0.2.tgz"         "qrcode.min.js"              "qrcode.min.js"

curl -sL "https://registry.npmjs.org/pdfjs-dist/-/pdfjs-dist-3.11.174.tgz" -o _p.tgz
tar xzf _p.tgz
cp package/legacy/build/pdf.min.js        ./pdfjs.min.js
cp package/legacy/build/pdf.worker.min.js ./pdfjs.worker.min.js
rm -rf package _p.tgz
printf '  %-22s %8d bayt\n' "pdfjs.min.js" "$(wc -c < pdfjs.min.js)"
printf '  %-22s %8d bayt\n' "pdfjs.worker.min.js" "$(wc -c < pdfjs.worker.min.js)"

curl -sL "https://registry.npmjs.org/js-beautify/-/js-beautify-1.14.9.tgz" -o _p.tgz
tar xzf _p.tgz
for x in beautify beautify-css beautify-html; do cp "package/js/lib/$x.js" "./$x.js"; done
rm -rf package _p.tgz
printf '  %-22s %8d bayt\n' "beautify*.js" "$(cat beautify.js beautify-css.js beautify-html.js | wc -c)"

echo "Kütüphaneler hazır."
