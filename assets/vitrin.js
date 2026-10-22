/* VuMaTech Tools — araç vitrini
   Katalog derleme sırasında gömülür; ek bir istek yapılmaz. */
(function(){
"use strict";
var T = window.VT.T;

var ARACLAR = [{"t":"Akademik Kimlik Doğrulayıcı","u":"/araclar/akademik-kimlik-dogrulayici/","c":"Akademik","d":"ISBN, ISSN, ORCID ve DOI numaralarının kontrol basamağını denetler.","i":"doc"},{"t":"Atıf ve Kaynakça Uyuşmazlık Denetçisi","u":"/araclar/atif-ve-kaynakca-uyusmazlik-denetcisi/","c":"Akademik","d":"Metindeki atıflarla kaynakçayı karşılaştırır; eksik ve kullanılmayan kaynakları listeler. Hakem düzeltmelerinin en sık konusu.","i":"doc"},{"t":"Betimsel İstatistik ve Normallik","u":"/araclar/betimsel-istatistik-ve-normallik/","c":"Akademik","d":"Ortalama, ortanca, ss, çarpıklık ve basıklık; normallik yorumu ve APA cümlesiyle. SPSS ile uyumlu.","i":"calc"},{"t":"BibTeX RIS Kaynak Dönüştürücü","u":"/araclar/bibtex-ris-kaynak-donusturucu/","c":"Akademik","d":"BibTeX ve RIS arasında çevirir; APA ve CSV çıktısı da verir. Zotero'dan Mendeley'e taşırken.","i":"doc"},{"t":"Cronbach Alfa ve Madde Analizi","u":"/araclar/cronbach-alfa-ve-madde-analizi/","c":"Akademik","d":"Excel'den yapıştırın; iç tutarlılık katsayısı, madde-toplam korelasyonu ve madde silinirse alfa.","i":"calc"},{"t":"DOI Kaynakça Üretici","u":"/araclar/doi-kaynakca-uretici/","c":"Akademik","d":"DOI listesinden APA 7, Vancouver, GOST, MLA, Chicago, BibTeX ve RIS kaynakçası üretir.","i":"doc"},{"t":"Etki Büyüklüğü Dönüştürücü","u":"/araclar/etki-buyuklugu-donusturucu/","c":"Akademik","d":"Cohen d, r, eta kare, f, Hedges g ve odds ratio arasında dönüştürür. Meta-analiz için.","i":"calc"},{"t":"ISBN Kitap Künyesi","u":"/araclar/isbn-kitap-kunyesi/","c":"Akademik","d":"ISBN numaralarından kitap künyesi çeker; APA, GOST, Chicago, BibTeX ve CSV olarak verir.","i":"doc"},{"t":"Kaynakça Sıralayıcı ve Denetçi","u":"/araclar/kaynakca-siralayici-ve-denetci/","c":"Akademik","d":"Kaynakçayı Türkçe alfabeye göre sıralar, tekrarları siler, yıl ve nokta eksiklerini işaretler.","i":"doc"},{"t":"Korelasyon Hesaplayıcı","u":"/araclar/korelasyon-hesaplayici/","c":"Akademik","d":"Pearson ve Spearman korelasyon matrisi, anlamlılık yıldızları ve ikili ilişki için APA cümlesi.","i":"calc"},{"t":"Kör Hakemlik Anonimleştirici","u":"/araclar/kor-hakemlik-anonimlestirici/","c":"Akademik","d":"Yazar ve kurum adlarını gizler, kendi atıflarınızı ve birinci şahıs ifadelerini işaretler. Çift kör başvurular için.","i":"doc"},{"t":"ORCID Yayın Listesi Çekici","u":"/araclar/orcid-yayin-listesi-cekici/","c":"Akademik","d":"ORCID kimliğinizden yayınlarınızı çeker; APA, GOST, BibTeX veya özgeçmiş listesi olarak verir.","i":"doc"},{"t":"t Testi Hesaplayıcı","u":"/araclar/t-testi-hesaplayici/","c":"Akademik","d":"Bağımsız, eşleştirilmiş ve tek örneklem t testi; Welch düzeltmesi, Cohen d ve APA raporu.","i":"calc"},{"t":"TR Dizin Beyan Bloğu Üretici","u":"/araclar/tr-dizin-beyan-blogu-uretici/","c":"Akademik","d":"Etik kurul, katkı oranı, çıkar çatışması ve destek beyanlarını Türkçe ve İngilizce olarak hazırlar.","i":"doc"},{"t":"Türkçe Okunabilirlik Ölçer","u":"/araclar/turkce-okunabilirlik-olcer/","c":"Akademik","d":"Ateşman ve Bezirci-Yılmaz formülleriyle metnin okunabilirliğini ölçer, en uzun cümleleri gösterir.","i":"text"},{"t":"Örneklem Büyüklüğü Hesaplayıcı","u":"/araclar/orneklem-buyuklugu-hesaplayici/","c":"Akademik","d":"Anket, t testi, korelasyon ve ANOVA için gereken katılımcı sayısı. Yöntem bölümüne hazır cümleyle birlikte.","i":"calc"},{"t":"Görselden PDF Yapma","u":"/araclar/gorselden-pdf-yapma/","c":"Belge","d":"Fotoğraf ve taramaları tek PDF'te toplayın. A4, A5, Letter veya görselin kendi boyutu.","i":"doc"},{"t":"Meta Veri Denetçisi ve Temizleyici","u":"/araclar/meta-veri-temizleyici/","c":"Belge","d":"Word, Excel, PowerPoint, PDF ve fotoğraflardaki yazar, kurum, yorum, revizyon izi ve konum bilgisini gösterir, isterseniz temizler.","i":"doc"},{"t":"PDF Birleştirme","u":"/araclar/pdf-birlestirme/","c":"Belge","d":"Birden çok PDF'i tek dosyada toplayın. Sırayı sürükleyip bırakmadan, tek tıkla değiştirin.","i":"doc"},{"t":"PDF Bölme ve Sayfa Çıkarma","u":"/araclar/pdf-bolme-ve-sayfa-cikarma/","c":"Belge","d":"Belirli sayfaları çıkarın, her N sayfada bir bölün ya da her sayfayı ayrı dosya yapın.","i":"doc"},{"t":"PDF Filigran Ekleme","u":"/araclar/pdf-filigran-ekleme/","c":"Belge","d":"Bütün sayfalara metin filigranı basın. Türkçe karakterler sorunsuz görünür.","i":"doc"},{"t":"PDF Sayfa Düzenleyici","u":"/araclar/pdf-sayfa-duzenleyici/","c":"Belge","d":"Sayfaları küçük resim olarak görün; silin, döndürün, sırasını değiştirin, sonra kaydedin.","i":"doc"},{"t":"PDF Sayfa Numarası Ekleme","u":"/araclar/pdf-sayfa-numarasi-ekleme/","c":"Belge","d":"Konum, biçim, başlangıç numarası ve atlanacak sayfa seçimiyle numaralandırma. Roma rakamı desteği.","i":"doc"},{"t":"PDF Sıkıştırma","u":"/araclar/pdf-sikistirma/","c":"Belge","d":"Taranmış belgelerin boyutunu ciddi biçimde düşürün. Metin katmanı kaybolur — araç uyarır.","i":"doc"},{"t":"PDF Üstveri Düzenleyici","u":"/araclar/pdf-ustveri-duzenleyici/","c":"Belge","d":"PDF'in içindeki yazar, üretici ve tarih bilgisini gösterir; düzenler ya da tümüyle siler.","i":"doc"},{"t":"PDF'ten Görsel Çıkarma","u":"/araclar/pdf-ten-gorsel-cikarma/","c":"Belge","d":"Her sayfayı PNG, JPEG veya WebP olarak alın. 72'den 600 dpi'ye kadar çözünürlük.","i":"doc"},{"t":"PDF'ten Metin Çıkarma","u":"/araclar/pdf-ten-metin-cikarma/","c":"Belge","d":"PDF'in metin katmanını çıkarır; satır kırılmalarını ve tire ile bölünmüş kelimeleri onarır.","i":"doc"},{"t":"Favicon Paketi Üretici","u":"/araclar/favicon-paketi-uretici/","c":"Görsel","d":"Tek görselden 16'dan 512 piksele kadar bütün favicon boyutlarını ve HTML kodunu üretin.","i":"img"},{"t":"Görsel Base64 Dönüştürücü","u":"/araclar/gorsel-base64-donusturucu/","c":"Görsel","d":"Görseli data URI'ye çevirip CSS veya HTML içine gömülecek kodu alın.","i":"code"},{"t":"Görsel Boyutlandırma","u":"/araclar/gorsel-boyutlandirma/","c":"Görsel","d":"Genişlik ve yükseklik verin, en-boy oranını koruyarak yeniden boyutlandırın. Birden çok dosyayı aynı anda işleyin.","i":"img"},{"t":"Görsel Format Dönüştürücü","u":"/araclar/gorsel-format-donusturucu/","c":"Görsel","d":"PNG, JPEG ve WebP arasında dönüştürün. Şeffaflığı koruyun ya da beyaz zemine düzleştirin.","i":"img"},{"t":"Görsel Kırpma","u":"/araclar/gorsel-kirpma/","c":"Görsel","d":"Fareyle alan seçin ya da sayı girin; oran kilidiyle Instagram, 16:9 ve kare kırpma.","i":"img"},{"t":"Görsel Sansürleme","u":"/araclar/gorsel-sansurleme/","c":"Görsel","d":"Fotoğraftaki yüzleri ve bilgileri fare ile seçip pikselleştirin, bulanıklaştırın ya da kapatın.","i":"img"},{"t":"Görsel Sıkıştırma","u":"/araclar/gorsel-sikistirma/","c":"Görsel","d":"Kalite kaydırıcısıyla dosya boyutunu düşürün; önce ve sonrayı yan yana karşılaştırın.","i":"img"},{"t":"Sosyal Medya Görsel Boyutlandırıcı","u":"/araclar/sosyal-medya-gorsel-boyutlandirici/","c":"Görsel","d":"Tek görselden 20 platform boyutunu birden üretir — Instagram, LinkedIn, YouTube, Open Graph.","i":"img"},{"t":"Vesikalık ve Biyometrik Fotoğraf","u":"/araclar/vesikalik-ve-biyometrik-fotograf/","c":"Görsel","d":"Fotoğrafı pasaport ve vize ölçülerine kırpar, arka planı temizler, baş oranını biyometrik kılavuza göre denetler. Baskı sayfası üretir.","i":"img"},{"t":"Şeffaf PNG Yapıcı","u":"/araclar/seffaf-png-yapici/","c":"Görsel","d":"Bir rengi seçin, tolerans verin, arka planı şeffaflaştırıp PNG olarak indirin.","i":"img"},{"t":"Bozuk Türkçe Karakter Onarımı","u":"/araclar/bozuk-turkce-karakter-onarimi/","c":"Metin","d":"Ã§ ÄŸ Ã¼ gibi bozulmuş kodlamayı ç ğ ü haline geri getirir. Eski veritabanı ve CSV dosyaları için.","i":"text"},{"t":"Görünmez Karakter Denetçisi","u":"/araclar/gorunmez-karakter-denetcisi/","c":"Metin","d":"Metne yapışmış sıfır genişlikli ve yön denetim karakterlerini bulur, gösterir ve temizler.","i":"text"},{"t":"Kelime ve Karakter Sayacı","u":"/araclar/kelime-ve-karakter-sayaci/","c":"Metin","d":"Kelime, karakter, cümle, paragraf ve okuma süresi. Dergi özeti sınırlarını denetleyen mod dahil.","i":"text"},{"t":"Latin Kiril Çevirici","u":"/araclar/latin-kiril-cevirici/","c":"Metin","d":"Kırgızca ve Rusça metni Latin ile Kiril arasında çevirir; Türkçe metni Rusça Kiril'e sesletimle aktarır. Dört sistem.","i":"text"},{"t":"Liste Düzenleyici","u":"/araclar/liste-duzenleyici/","c":"Metin","d":"Satırları sıralayın, tekrarları silin, karıştırın, önüne arkasına metin ekleyin.","i":"text"},{"t":"Lorem Ipsum Üretici","u":"/araclar/lorem-ipsum-uretici/","c":"Metin","d":"Türkçe, Latince veya Rusça yer tutucu metin. Türkçe seçeneği gerçek harf dağılımını taklit eder.","i":"text"},{"t":"Metin Karşılaştırma","u":"/araclar/metin-karsilastirma/","c":"Metin","d":"İki sürümü satır satır kıyaslar; eklenen ve silinen satırları renkle gösterir.","i":"text"},{"t":"Metin Temizleyici","u":"/araclar/metin-temizleyici/","c":"Metin","d":"Fazla boşluk, tekrarlı satır sonu, sekme ve görünmez karakterleri tek geçişte toplar.","i":"text"},{"t":"Metinden Veri Çıkarıcı","u":"/araclar/metinden-veri-cikarici/","c":"Metin","d":"Uzun metinden e-posta, telefon, bağlantı, DOI, ISBN, IBAN ve TC kimlik numarası toplar.","i":"text"},{"t":"Toplu Bul ve Değiştir","u":"/araclar/toplu-bul-ve-degistir/","c":"Metin","d":"Sırayla uygulanan çok kurallı değiştirme; düzenli ifade ve tam kelime seçenekleriyle.","i":"text"},{"t":"Türkçe Büyük Küçük Harf","u":"/araclar/turkce-buyuk-kucuk-harf/","c":"Metin","d":"i/İ ve ı/I ayrımını doğru yapan dönüştürücü. İngilizce araçların hatalı çevirdiği tek iş.","i":"text"},{"t":"Türkçe Slug Üretici","u":"/araclar/turkce-slug-uretici/","c":"Metin","d":"Başlıktan SEO uyumlu URL üretir; ç ğ ı ö ş ü harflerini silmez, karşılığına çevirir.","i":"text"},{"t":"Barkod Üretici","u":"/araclar/barkod-uretici/","c":"Üretici","d":"EAN-13, EAN-8, UPC, Code 128, Code 39, ITF-14 ve daha fazlası. PNG ve SVG çıktı.","i":"gen"},{"t":"Parola Üretici","u":"/araclar/parola-uretici/","c":"Üretici","d":"Güçlü rastgele parola üretin; entropi hesabı ve kırılma süresi tahminiyle birlikte.","i":"gen"},{"t":"QR Kod Üretici","u":"/araclar/qr-kod-uretici/","c":"Üretici","d":"Bağlantı, WiFi, vCard, WhatsApp ve metin için QR kod. Renk, boyut ve hata düzeltme ayarlanabilir.","i":"gen"},{"t":"Renk Dönüştürücü","u":"/araclar/renk-donusturucu/","c":"Üretici","d":"HEX, RGB, HSL arasında çevirin; ton merdiveni ve WCAG kontrast denetimi alın.","i":"gen"},{"t":"Toplu QR Kod Üretici","u":"/araclar/toplu-qr-kod-uretici/","c":"Üretici","d":"Listeden yüzlerce QR kodu tek seferde üretir, adlandırır ve zip olarak indirir. Masa ve etiket kodları için.","i":"gen"},{"t":"Birim Dönüştürücü","u":"/araclar/birim-donusturucu/","c":"Hesap","d":"Uzunluk, ağırlık, alan, hacim, veri, hız, zaman, basınç ve sıcaklık. Dönüm ve okka dahil.","i":"calc"},{"t":"KDV Hesaplayıcı","u":"/araclar/kdv-hesaplayici/","c":"Hesap","d":"Türkiye ve Kırgızistan oranları hazır. Dahil ve hariç hesaplama iki yönlü çalışır.","i":"calc"},{"t":"Kredi ve Taksit Hesaplayıcı","u":"/araclar/kredi-ve-taksit-hesaplayici/","c":"Hesap","d":"Eşit taksitli kredi hesabı, ay ay ödeme planı ve CSV çıktısı. Vergi payı ayarlanabilir.","i":"calc"},{"t":"Tarih Farkı Hesaplayıcı","u":"/araclar/tarih-farki-hesaplayici/","c":"Hesap","d":"İki tarih arasındaki gün, ay, yıl farkı; yaş hesabı ve iş günü sayımı.","i":"calc"},{"t":"Yüzde Hesaplayıcı","u":"/araclar/yuzde-hesaplayici/","c":"Hesap","d":"Yüzde alma, yüzde değişim, artırma-azaltma ve geri çözme. Her sonucun işlem adımı gösterilir.","i":"calc"},{"t":"Base64 Kodlayıcı","u":"/araclar/base64-kodlayici/","c":"Geliştirici","d":"Metni ve dosyayı Base64'e çevirin ya da çözün. UTF-8 güvenli.","i":"code"},{"t":"CSS Gölge ve Gradyan Üretici","u":"/araclar/css-golge-ve-gradyan-uretici/","c":"Geliştirici","d":"Kutu gölgesi, gradyan, köşe yuvarlaklığı ve buzlu cam efekti — canlı önizlemeyle.","i":"code"},{"t":"CSV JSON Markdown Tablo Dönüştürücü","u":"/araclar/csv-json-markdown-tablo-donusturucu/","c":"Geliştirici","d":"Excel'den yapıştırın; Markdown, JSON, CSV, HTML, SQL veya APA 7 tablosu olarak alın.","i":"code"},{"t":"Hash Üretici","u":"/araclar/hash-uretici/","c":"Geliştirici","d":"SHA-1, SHA-256, SHA-384 ve SHA-512 özetleri. Metin veya dosya için.","i":"code"},{"t":"HTML CSS JS Biçimlendirici","u":"/araclar/html-css-js-bicimlendirici/","c":"Geliştirici","d":"Kodu okunur hale getirin ya da küçültün. Dili otomatik algılar.","i":"code"},{"t":"JSON Biçimlendirici","u":"/araclar/json-bicimlendirici/","c":"Geliştirici","d":"JSON'u biçimlendirin, küçültün, doğrulayın. Hata satırını ve sütununu gösterir.","i":"code"},{"t":"Markdown ve HTML Dönüştürücü","u":"/araclar/markdown-ve-html-donusturucu/","c":"Geliştirici","d":"Markdown'dan HTML'e, HTML'den Markdown veya düz metne. Canlı önizlemeli.","i":"code"},{"t":"robots.txt ve Site Haritası Üretici","u":"/araclar/robots-txt-ve-site-haritasi-uretici/","c":"Geliştirici","d":"Hazır kalıplarla robots.txt ve sitemap.xml üretin. Yapay zekâ tarayıcılarını engelleme ayarı dahil.","i":"code"},{"t":"URL Kodlayıcı ve Çözücü","u":"/araclar/url-kodlayici-ve-cozucu/","c":"Geliştirici","d":"Adresleri kodlayıp çözün; adres parçalarını ve parametrelerini ayrıştırıp gösterir.","i":"code"},{"t":"UUID ve Rastgele Kimlik Üretici","u":"/araclar/uuid-ve-rastgele-kimlik-uretici/","c":"Geliştirici","d":"UUID v4, ULID, Nano ID ve kısa kimlikler. Kriptografik rastgelelikle üretilir.","i":"code"}];

var ORDER = ["Akademik","Belge","Görsel","Metin","Üretici","Hesap","Geliştirici","Diğer"];

/* Araç olmayan sayfalar: vitrin ızgarasında görünmez, altbilgide bağlantı olur. */

var ICONS = {
  img : "M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M8.5 9.5a1 1 0 1 0 0-.01",
  doc : "M6 2h8l4 4v16H6z M14 2v5h4",
  text: "M4 6h16 M4 12h16 M4 18h10",
  gen : "M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M5.6 18.4l2.1-2.1 M16.3 7.7l2.1-2.1 M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5",
  calc: "M5 2h14v20H5z M8 6h8 M8 11h2 M14 11h2 M8 16h2 M14 16h2",
  code: "M8 6l-5 6 5 6 M16 6l5 6-5 6"
};

var root  = document.getElementById("vitrin");
if (!root) return;
var qbox  = document.getElementById("q");
var chips = document.getElementById("chips");
var count = document.getElementById("count");

var FAVKEY = "vmt_fav";
function favLoad(){
  try { return JSON.parse(localStorage.getItem(FAVKEY) || "[]"); }
  catch(e){ return []; }
}
function favSave(list){
  try { localStorage.setItem(FAVKEY, JSON.stringify(list)); } catch(e){}
}
function favHas(title){ return favLoad().indexOf(title) > -1; }
function favToggle(title){
  var list = favLoad(), i = list.indexOf(title);
  if (i > -1) list.splice(i,1); else list.push(title);
  favSave(list);
  return i === -1;   // true = artık favori
}

var all = [], cat = "*", term = "";

function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
                                 .replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function fold(s){
  return String(s).toLocaleLowerCase("tr")
    .replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u")
    .replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c");
}
function icon(k){
  var d = (ICONS[k]||ICONS.gen).split(" M").map(function(p,i){return i?"M"+p:p;});
  return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">'
       + d.map(function(p){return '<path d="'+p+'"/>';}).join("") + '</svg>';
}

function render(){
  var t = fold(term);
  var list = all.filter(function(x){
    /* Arama yazılıyken kategori süzgeci devre dışı: kullanıcı "pdf" yazdığında
       Akademik kategorisi seçili diye boş ekran görmemeli. */
    if (!t && cat !== "*" && x.c !== cat) return false;
    if (!t) return true;
    return fold(x.t).indexOf(t) > -1 || fold(x.d).indexOf(t) > -1
        || fold(x.c).indexOf(t) > -1;
  });
  count.textContent=list.length+" "+T("count_suffix")+(!t&&cat!=="*"?" · "+T("cat_"+cat):"");
  if (!list.length){
    root.innerHTML = '<p class="empty">'+T("empty")+'</p>';
    return;
  }
  var favs = favLoad();
  function cardHtml(x){
    var on = favs.indexOf(x.t) > -1;
    return '<div class="card-wrap">'
         + '<button class="fav'+(on?' on':'')+'" data-fav="'+esc(x.t)+'" '
         + 'aria-label="fav" title="'+esc(T("fav_add"))+'">'
         + (on?'\u2605':'\u2606')+'</button>'
         + '<a class="card" href="'+esc(x.u)+'">'
         + icon(x.i)
         + '<h2>'+esc(x.t)+'</h2>'
         + '<p>'+esc(x.d)+'</p>'
         + '<span class="meta"><span class="tag">'+esc(x.c)+'</span>'
         + '<span class="free">'+esc(T("badge_free"))+'</span></span></a></div>';
  }
  // Favoriler kategori filtresinden bağımsızdır: arama yapılmadığı sürece
  // hangi kategori seçili olursa olsun en üstte durur. Böylece kullanıcı
  // favorilerine her ekrandan tek bakışta ulaşır.
  var html = "";
  if (!fold(term)){
    var favAll = all.filter(function(x){ return favs.indexOf(x.t) > -1; });
    if (favAll.length){
      html += '<div class="favband"><p class="favttl">'
            + ''+T("fav_title")+'</p><div class="favgrid">'
            + favAll.map(cardHtml).join("") + '</div></div>';
    }
    // seçili kategorideki araçlar (favori olanlar tekrar edilmesin)
    var rest = list.filter(function(x){ return favs.indexOf(x.t) < 0; });
    html += rest.map(cardHtml).join("");
  } else {
    html += list.map(cardHtml).join("");
  }
  root.innerHTML = html;
}

function buildChips(){
  var used = {};
  all.forEach(function(x){ used[x.c] = 1; });
  var cats = ORDER.filter(function(c){ return used[c]; });
  var n = {};
  all.forEach(function(x){ n[x.c] = (n[x.c]||0)+1; });

  // Açılışta ilk kategori seçili gelir; "Tümü" en sağda durur.
  // Böylece ilk ekran 70 aracı birden değil, derli toplu bir küme gösterir.
  cat = cats.length ? cats[0] : "*";

  chips.innerHTML = cats.map(function(c){
      return '<button class="chip" data-c="'+esc(c)+'" aria-pressed="'
           + (c === cat ? "true" : "false") + '">'
           + esc(T("cat_"+c))+'<u>'+n[c]+'</u></button>';
    }).join("")
    + '<button class="chip chip-all" data-c="*" aria-pressed="false">'+esc(T("chip_all"))
    + '<u>'+all.length+'</u></button>';

  chips.addEventListener("click", function(e){
    var b = e.target.closest(".chip");
    if (!b) return;
    cat = b.getAttribute("data-c");
    Array.prototype.forEach.call(chips.children, function(n){
      n.setAttribute("aria-pressed", n === b ? "true" : "false");
    });
    render();
  });
}

/* Katalog derleme sırasında bu dosyaya gömülür (bkz. uret.py).
   Yeni araç eklendiğinde vitrin yeniden üretilir. */

all = ARACLAR.slice();
buildChips();
render();

var f1 = document.getElementById("f-tools"), f2 = document.getElementById("f-cats");
if (f1) f1.textContent = all.length;
if (f2) f2.textContent = Object.keys(all.reduce(function(a,x){ a[x.c]=1; return a; }, {})).length;

root.addEventListener("click", function(e){
  var b = e.target.closest ? e.target.closest(".fav") : null;
  if (!b) return;
  e.preventDefault();
  favToggle(b.getAttribute("data-fav"));
  render();
});

qbox.addEventListener("input", function(){ term = qbox.value; render(); });

window.VT.dilDegisince(function(){ buildChips(); render(); });
})();
