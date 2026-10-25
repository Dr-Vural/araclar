/* VuMaTech Tools — ortak sayfa kabuğu
   Dil, tema ve iletişim bağlantıları. Her sayfada yüklenir. */
(function(){
"use strict";

var I18N={"brand_sub": {"tr": "Tools", "ky": "Tools", "ru": "Tools", "en": "Tools"}, "up_link": {"tr": "vumatech.net", "ky": "vumatech.net", "ru": "vumatech.net", "en": "vumatech.net"}, "eyebrow": {"tr": "her şey cihazınızda çalışır", "ky": "баары түзмөгүңүздө иштейт", "ru": "всё работает на вашем устройстве", "en": "everything runs on your device"}, "hero_h1_a": {"tr": "Çevrimiçi araçlar,", "ky": "Онлайн куралдар,", "ru": "Онлайн-инструменты,", "en": "Online tools,"}, "hero_h1_b": {"tr": "sunucuya uğramadan", "ky": "серверге кайрылбай", "ru": "без обращения к серверу", "en": "without touching a server"}, "hero_p": {"tr": "Dosya yükleme yok, kayıt yok, bekleme yok. Seçtiğiniz araç kendi tarayıcınızda çalışır; belgeleriniz ve görselleriniz hiçbir sunucuya gitmez.", "ky": "Файл жүктөө жок, каттоо жок, күтүү жок. Тандаган куралыңыз өз браузериңизде иштейт; документтериңиз жана сүрөттөрүңүз эч кандай серверге жөнөтүлбөйт.", "ru": "Никакой загрузки файлов, регистрации и ожидания. Выбранный инструмент работает прямо в вашем браузере; ваши документы и изображения не отправляются ни на один сервер.", "en": "No file uploads, no sign-up, no waiting. The tool you pick runs in your own browser; your documents and images never go to any server."}, "fact_tools": {"tr": "araç", "ky": "курал", "ru": "инструмент", "en": "tools"}, "fact_cats": {"tr": "kategori", "ky": "категория", "ru": "категория", "en": "categories"}, "fact_free": {"tr": "ücret", "ky": "акы", "ru": "плата", "en": "cost"}, "search_ph": {"tr": "Araç ara…", "ky": "Курал издөө…", "ru": "Поиск инструмента…", "en": "Search tools…"}, "chip_all": {"tr": "Tümü", "ky": "Баары", "ru": "Все", "en": "All"}, "count_suffix": {"tr": "araç", "ky": "курал", "ru": "инструм.", "en": "tools"}, "loading": {"tr": "yükleniyor…", "ky": "жүктөлүүдө…", "ru": "загрузка…", "en": "loading…"}, "empty": {"tr": "Bu aramaya uyan araç yok.", "ky": "Бул издөөгө туура келген курал жок.", "ru": "Инструментов по этому запросу нет.", "en": "No tools match this search."}, "cat_Akademik": {"tr": "Akademik", "ky": "Академиялык", "ru": "Академические", "en": "Academic"}, "cat_Belge": {"tr": "Belge", "ky": "Документ", "ru": "Документы", "en": "Documents"}, "cat_Görsel": {"tr": "Görsel", "ky": "Сүрөт", "ru": "Изображения", "en": "Images"}, "cat_Metin": {"tr": "Metin", "ky": "Текст", "ru": "Текст", "en": "Text"}, "cat_Üretici": {"tr": "Üretici", "ky": "Генератор", "ru": "Генераторы", "en": "Generators"}, "cat_Hesap": {"tr": "Hesap", "ky": "Эсептөө", "ru": "Расчёты", "en": "Calculators"}, "cat_Geliştirici": {"tr": "Geliştirici", "ky": "Иштеп чыгуучу", "ru": "Разработчик", "en": "Developer"}, "cat_Diğer": {"tr": "Diğer", "ky": "Башка", "ru": "Прочее", "en": "Other"}, "badge_free": {"tr": "ücretsiz", "ky": "акысыз", "ru": "бесплатно", "en": "free"}, "card_open": {"tr": "aç →", "ky": "ачуу →", "ru": "открыть →", "en": "open →"}, "fav_title": {"tr": "★ Favori araçlarınız", "ky": "★ Тандамал куралдарыңыз", "ru": "★ Ваши избранные инструменты", "en": "★ Your favorite tools"}, "fav_add": {"tr": "Favorilere ekle / çıkar", "ky": "Тандамалга кошуу / чыгаруу", "ru": "Добавить / убрать из избранного", "en": "Add / remove favorite"}, "offline_b": {"tr": "Çevrimdışı sürümü indir (ZIP)", "ky": "Оффлайн версияны жүктөө (ZIP)", "ru": "Скачать офлайн-версию (ZIP)", "en": "Download offline version (ZIP)"}, "offline_s": {"tr": "bilgisayarınıza kurun, internetsiz çalışsın", "ky": "компьютериңизге орнотуп, интернетсиз иштетиңиз", "ru": "установите на компьютер, работает без интернета", "en": "install on your computer, works without internet"}, "back": {"tr": "← bütün araçlar", "ky": "← бардык куралдар", "ru": "← все инструменты", "en": "← all tools"}, "priv": {"tr": "Bu araç tamamen tarayıcınızda çalışır — dosyalarınız sunucuya yüklenmez.", "ky": "Бул курал толугу менен браузериңизде иштейт — файлдарыңыз серверге жүктөлбөйт.", "ru": "Этот инструмент работает полностью в вашем браузере — файлы не загружаются на сервер.", "en": "This tool runs entirely in your browser — your files are not uploaded to any server."}, "promo_kicker": {"tr": "VuMaTech Studio · Bişkek", "ky": "VuMaTech Studio · Бишкек", "ru": "VuMaTech Studio · Бишкек", "en": "VuMaTech Studio · Bishkek"}, "promo_h2_a": {"tr": "Bu araçları yapan ekip ", "ky": "Бул куралдарды жасаган команда ", "ru": "Команда, создавшая эти инструменты, ", "en": "The team behind these tools "}, "promo_h2_b": {"tr": "sizin sitenizi de yapar", "ky": "сиздин сайтыңызды да жасайт", "ru": "сделает и ваш сайт", "en": "builds your site too"}, "promo_lead": {"tr": "Kurumsal siteden dijital menüye, akademik dergi sistemlerinden oyun portalına kadar. Tasarım, kurulum ve yıllık bakım tek elden.", "ky": "Корпоративдик сайттан санариптик менюга, академиялык журнал системаларынан оюн порталына чейин. Дизайн, орнотуу жана жылдык тейлөө бир колдон.", "ru": "От корпоративного сайта до цифрового меню, от систем научных журналов до игрового портала. Дизайн, установка и годовое обслуживание — под ключ.", "en": "From corporate sites to digital menus, from academic journal systems to a game portal. Design, setup and yearly maintenance, all in one place."}, "svc_web": {"tr": "Web Tasarım", "ky": "Веб дизайн", "ru": "Веб-дизайн", "en": "Web Design"}, "svc_web_d": {"tr": "Kurumsal site, portfolyo, tanıtım sayfası", "ky": "Корпоративдик сайт, портфолио, тааныштыруу барагы", "ru": "Корпоративный сайт, портфолио, лендинг", "en": "Corporate site, portfolio, landing page"}, "svc_menu": {"tr": "QR Dijital Menü", "ky": "QR санариптик меню", "ru": "QR цифровое меню", "en": "QR Digital Menu"}, "svc_menu_d": {"tr": "Çok dilli menü, anlık güncelleme, baskı maliyeti yok", "ky": "Көп тилдүү меню, тез жаңылоо, басып чыгаруу чыгымы жок", "ru": "Многоязычное меню, мгновенное обновление, без затрат на печать", "en": "Multilingual menu, instant updates, no printing cost"}, "svc_acad": {"tr": "Akademik Web", "ky": "Академиялык веб", "ru": "Академический веб", "en": "Academic Web"}, "svc_acad_d": {"tr": "Akademisyen sitesi, özgeçmiş, yayın listesi", "ky": "Окумуштуу сайты, өмүр баян, басылмалар тизмеси", "ru": "Сайт учёного, резюме, список публикаций", "en": "Academic site, CV, publication list"}, "svc_ojs": {"tr": "OJS Dergi Sistemi", "ky": "OJS журнал системасы", "ru": "Система журналов OJS", "en": "OJS Journal System"}, "svc_ojs_d": {"tr": "Kurulum, tema, hakem süreci yönetimi", "ky": "Орнотуу, тема, рецензия процессин башкаруу", "ru": "Установка, тема, управление рецензированием", "en": "Setup, theme, peer-review management"}, "promo_wa": {"tr": "WhatsApp: +996 999 101 444", "ky": "WhatsApp: +996 999 101 444", "ru": "WhatsApp: +996 999 101 444", "en": "WhatsApp: +996 999 101 444"}, "promo_all": {"tr": "Tüm hizmetler", "ky": "Бардык кызматтар", "ru": "Все услуги", "en": "All services"}, "foot_about": {"tr": "Bişkek merkezli web tasarım ve dijital hizmet atölyesi. Türkiye ve Kırgızistan'da çalışır.", "ky": "Бишкек шаарындагы веб дизайн жана санариптик кызмат устаканасы. Түркияда жана Кыргызстанда иштейт.", "ru": "Мастерская веб-дизайна и цифровых услуг в Бишкеке. Работает в Турции и Кыргызстане.", "en": "A Bishkek-based web design and digital services studio, working across Türkiye and Kyrgyzstan."}, "foot_about2": {"tr": "Bu sayfadaki bütün araçlar ücretsizdir ve tarayıcınızda çalışır — dosyalarınız sunucuya yüklenmez.", "ky": "Бул барактагы бардык куралдар акысыз жана браузериңизде иштейт — файлдарыңыз серверге жүктөлбөйт.", "ru": "Все инструменты на этой странице бесплатны и работают в браузере — файлы не загружаются на сервер.", "en": "All tools on this page are free and run in your browser — your files are never uploaded."}, "foot_services": {"tr": "Hizmetler", "ky": "Кызматтар", "ru": "Услуги", "en": "Services"}, "foot_contact": {"tr": "İletişim", "ky": "Байланыш", "ru": "Контакты", "en": "Contact"}, "foot_tools_dir": {"tr": "araç dizini", "ky": "курал тизмеси", "ru": "каталог инструментов", "en": "tool directory"}, "theme_dark": {"tr": "Karanlık temaya geç", "ky": "Караңгы темага өтүү", "ru": "Тёмная тема", "en": "Switch to dark theme"}, "theme_light": {"tr": "Aydınlık temaya geç", "ky": "Жарык темага өтүү", "ru": "Светлая тема", "en": "Switch to light theme"}, "lang_label": {"tr": "Dil", "ky": "Тил", "ru": "Язык", "en": "Language"}, "wa_msg": {"tr": "Merhaba, tools.vumatech.net üzerinden yazıyorum.", "ky": "Саламатсызбы, tools.vumatech.net аркылуу жазып жатам.", "ru": "Здравствуйте, пишу с сайта tools.vumatech.net.", "en": "Hello, I'm writing from tools.vumatech.net."}};

var LANGS=["tr","ky","ru","en"];
function detectLang(){
  try{
    var saved=localStorage.getItem("vmt_lang");
    if(saved&&LANGS.indexOf(saved)>-1)return saved;
  }catch(e){}
  var nav=(navigator.languages||[navigator.language||"tr"]);
  for(var i=0;i<nav.length;i++){
    var code=String(nav[i]).toLowerCase().slice(0,2);
    if(code==="tr")return "tr";
    if(code==="ky"||code===" kg".trim())return "ky";
    if(code==="ru")return "ru";
    if(code==="en")return "en";
    // Kırgızistan bölgesi ama dil kodu yoksa Rusça'ya düş
    if(String(nav[i]).toLowerCase().indexOf("-kg")>-1)return "ru";
  }
  return "tr";
}
var LANG=detectLang();
function T(key){
  var e=I18N[key];
  if(!e)return key;
  return e[LANG]||e.tr||key;
}
function setLang(l){
  if(LANGS.indexOf(l)<0)return;
  LANG=l;
  try{localStorage.setItem("vmt_lang",l);}catch(e){}
  document.documentElement.setAttribute("lang",l);
  applyI18N();
  if(window.__themeLabel)window.__themeLabel();
  kancalar.forEach(function(f){ try{ f(); }catch(e){} });
}

// sabit arayüz metinlerini data-i18n taşıyan öğelere uygula
function applyI18N(){
  var els=document.querySelectorAll("[data-i18n]");
  Array.prototype.forEach.call(els,function(el){
    var k=el.getAttribute("data-i18n");
    var attr=el.getAttribute("data-i18n-attr");
    if(attr)el.setAttribute(attr,T(k));
    else el.textContent=T(k);
  });
}

var kancalar = [];

// --- tema düğmesi ---
(function(){
  var tb=document.getElementById("themebtn");
  if(!tb)return;
  function cur(){return document.documentElement.getAttribute("data-theme")==="dark"?"dark":"light"}
  function label(){
    tb.setAttribute("title", cur()==="dark"?T("theme_light"):T("theme_dark"));
    tb.setAttribute("aria-label", tb.getAttribute("title"));
  }
  label();
  tb.addEventListener("click",function(){
    var n=cur()==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",n);
    try{localStorage.setItem("vmt_theme",n)}catch(e){}
    var m=document.querySelector('meta[name="theme-color"]');
    if(m)m.setAttribute("content", n==="dark"?"#0d1014":"#f4f3f0");
    label();
  });
  // kullanıcı elle seçmediyse işletim sistemi ayarını izlemeyi sürdür
  if(window.matchMedia){
    var mq=matchMedia("(prefers-color-scheme: dark)");
    var on=function(e){
      var saved=null; try{saved=localStorage.getItem("vmt_theme")}catch(x){}
      if(saved==="dark"||saved==="light")return;
      document.documentElement.setAttribute("data-theme",e.matches?"dark":"light");
      label();
    };
    if(mq.addEventListener)mq.addEventListener("change",on);
    else if(mq.addListener)mq.addListener(on);
  }
  window.__themeLabel=label;
})();

var lp=document.getElementById("langpick");
if(lp){
  function markLang(){
    Array.prototype.forEach.call(lp.children,function(b){
      b.setAttribute("aria-pressed", b.getAttribute("data-lang")===LANG?"true":"false");
    });
  }
  markLang();
  lp.addEventListener("click",function(e){
    var b=e.target.closest(".langbtn"); if(!b)return;
    setLang(b.getAttribute("data-lang")); markLang();
  });
}

// İletişim bağlantıları: masaüstünde web istemcisi, telefonda uygulama.
// WhatsApp mesajı ziyaretçinin diline göre hazır bir selamla açılır;
// e-posta adresi Türkçede destek@, diğer dillerde support@ olur.
// Dil değişince bağlantılar da güncellenir.
var WA_NO = "996999101444";
var POSTA = { tr: "destek@vumatech.net", diger: "support@vumatech.net" };
function iletisimBaglantilari(){
  var mobil = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(navigator.userAgent || "");
  var metin = encodeURIComponent(T("wa_msg"));
  var wa = mobil ? "https://wa.me/" + WA_NO + "?text=" + metin
                 : "https://web.whatsapp.com/send?phone=" + WA_NO + "&text=" + metin;
  var tg = mobil ? "https://t.me/vumatech" : "https://web.telegram.org/k/#@vumatech";
  function ayarla(a, url){
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  }
  ["wa-btn", "wa-foot"].forEach(function(id){ var a = document.getElementById(id); if (a) ayarla(a, wa); });
  Array.prototype.forEach.call(document.querySelectorAll("a.wa-link"), function(a){ ayarla(a, wa); });
  var t = document.getElementById("tg-foot"); if (t) ayarla(t, tg);
  var posta = LANG === "tr" ? POSTA.tr : POSTA.diger;
  var m = document.getElementById("mail-foot");
  if (m){ m.setAttribute("href", "mailto:" + posta); m.textContent = posta; }
}
iletisimBaglantilari();
kancalar.push(iletisimBaglantilari);

document.documentElement.setAttribute("lang", LANG);
applyI18N();
if (window.__themeLabel) window.__themeLabel();

/* Vitrin betiği bu arayüzü kullanır. */
window.VT = {
  T: T,
  dil: function(){ return LANG; },
  dilDegisince: function(f){ kancalar.push(f); }
};
})();
