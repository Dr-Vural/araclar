# VuMaTech Tools

[tools.vumatech.net](https://tools.vumatech.net) — tarayıcıda çalışan 68 ücretsiz araç.
Akademik, belge, görsel, metin ve geliştirici araçları; dosyalar hiçbir sunucuya
yüklenmez, bütün işlem kullanıcının cihazında yapılır.

Statik site. Cloudflare Pages üzerinde yayında, derleme adımı gerektirmez.

## Yapı

```
index.html              vitrin (arama, kategori, favoriler)
araclar/<slug>/         araç sayfaları
hakkinda/               tanıtım
gizlilik-ve-kvkk/       aydınlatma metni
assets/
  kit.css               tasarım sistemi, aydınlık ve karanlık tema
  site.js               dil, tema, iletişim bağlantıları (her sayfada)
  vitrin.js             katalog, arama, kategoriler, favoriler (yalnız ana sayfa)
icerik/
  katalog.json          araç listesi
  araclar/<slug>.html   araç gövdeleri (kaynak)
  parca/                ortak kabuk parçaları
uret.py                 statik sayfaları kaynaktan üretir
_headers                güvenlik ve önbellek başlıkları
_redirects              eski sayfa adreslerinden yönlendirme
```

## Yeni araç eklemek

1. `icerik/araclar/<slug>.html` dosyasını oluştur — yalnız araç gövdesi,
   kabuk ve başlık üreteç tarafından eklenir.
2. `icerik/katalog.json` içine kaydı ekle:

```json
{ "baslik": "Araç Adı", "slug": "arac-adi", "kategori": "Metin",
  "aciklama": "Kartta görünecek bir cümlelik açıklama.", "ikon": "text" }
```

Kategoriler: Akademik, Belge, Görsel, Metin, Üretici, Hesap, Geliştirici, Diğer.
İkonlar: `doc`, `img`, `text`, `gen`, `calc`, `code`.

3. `python3 uret.py` çalıştır ve değişiklikleri gönder. Cloudflare Pages
   dakikası içinde yayına alır.

## Arayüz dilleri

Türkçe, Kırgızca, Rusça ve İngilizce. Metinler `assets/site.js` içindeki
`I18N` sözlüğünde tutulur; dil ziyaretçinin tarayıcı ayarından seçilir,
künyedeki bayraklardan değiştirilebilir ve tercih yerel olarak saklanır.

Araç sayfalarının kendi içeriği Türkçedir; çeviri arayüz kabuğunu kapsar.

## Çevrimdışı sürüm

`VuMaTech-Araclar-Cevrimdisi.zip` — 65 araç, gereken kütüphaneler ve tasarım
tek bir HTML dosyasına gömülü. İnternet bağlantısı olmadan çalışır; ana
sayfadaki indirme bağlantısı bu dosyayı sunar.

Paket sitenin kendi ana sayfasından ve varlıklarından üretilir, dolayısıyla
görünüm, dört dil ve tema seçimi siteyle aynıdır. Araç gövdeleri açılışta
çalıştırılmaz; bir araç açıldığında gövdesi yazılır ve gereken kütüphane o an
enjekte edilir.

```
bash cevrimdisi/indir.sh        # kütüphaneleri npm'den al (bir kez)
python3 cevrimdisi/uret-paket.py
```

Canlı internet gerektiren üç araç (Crossref, Open Library, ORCID) pakete
alınmaz. Vesikalık aracında yapay zekâ ile arka plan kaldırma çevrimdışı
çalışmaz; renkten kaldırma seçeneği çalışır.

## Dış bağımlılıklar

Araçların çoğu tamamen bağımsızdır. PDF, QR ve barkod araçları ilk açılışta
cdnjs üzerinden kütüphane indirir. Üç araç dışarıya sorgu gönderir ve yalnız
girilen numarayı iletir, dosya göndermez:

| Araç | Servis |
|---|---|
| DOI Kaynakça Üretici | Crossref |
| ISBN Kitap Künyesi | Open Library |
| ORCID Yayın Listesi | ORCID |

---

VuMaTech Studio · Bişkek
