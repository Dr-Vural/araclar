/* Çevrimdışı merkez — vitrin ve araç görünümü.
   Dil ve tema site.js tarafından yönetilir; burada yalnız katalog,
   arama, kategoriler, favoriler ve araç açma işi var.

   Araçlar sayfa açılışında çalıştırılmaz: bir araç açıldığında gövdesi
   DOM'a yazılır, gereken kütüphane o an enjekte edilir ve betiği
   çalıştırılır. Böylece 68 araç tek dosyada dursa da açılış hızlı olur. */
(function () {
  "use strict";

  var yuklu = {};
  function kutuphaneGetir(ad) {
    if (yuklu[ad] || !LIBSRC[ad]) return;
    var s = document.createElement("script");
    s.text = LIBSRC[ad];
    document.head.appendChild(s);
    yuklu[ad] = true;
  }
  function isciGetir() {
    if (window.__PDFJS_WORKER) return;
    try {
      window.__PDFJS_WORKER = URL.createObjectURL(
        new Blob([WORKERSRC], { type: "application/javascript" }));
    } catch (e) { /* eski tarayıcı: pdf.js ana iş parçacığında çalışır */ }
  }

  var SIRA = ["Akademik", "Belge", "Görsel", "Metin", "Üretici",
              "Hesap", "Geliştirici", "Diğer"];
  var $ = function (i) { return document.getElementById(i); };
  var T = window.VT.T;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function kat(s) {
    return String(s).toLocaleLowerCase("tr")
      .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
      .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c");
  }

  var SIMGE = {
    img: "M3 5h18v14H3z M8 13l3-3 4 4 2-2 3 3",
    doc: "M14 2H6v20h12V8z M14 2v6h4",
    text: "M4 6h16M4 12h16M4 18h10",
    gen: "M12 3v18M3 12h18M6 6l12 12M18 6L6 18",
    calc: "M5 2h14v20H5z M8 7h8M8 12h3M8 16h3M14 12h2M14 16h2",
    code: "M8 6l-5 6 5 6M16 6l5 6-5 6"
  };
  function simge(k) {
    return '<svg class="ico" viewBox="0 0 24 24"><path d="'
      + (SIMGE[k] || SIMGE.gen) + '"/></svg>';
  }

  var ANAHTAR = "vmt_fav_cevrimdisi";
  function favOku() {
    try { return JSON.parse(localStorage.getItem(ANAHTAR) || "[]"); }
    catch (e) { return []; }
  }
  function favYaz(l) {
    try { localStorage.setItem(ANAHTAR, JSON.stringify(l)); } catch (e) {}
  }
  function favCevir(t) {
    var l = favOku(), i = l.indexOf(t);
    if (i > -1) l.splice(i, 1); else l.push(t);
    favYaz(l);
  }

  var secili, terim = "";
  var izgara = $("vitrin"), cipler = $("chips"), sayac = $("count"),
      arama = $("q"), ev = $("home"), gorunum = $("toolview");

  function cipleriKur() {
    var var_ = {}, adet = {};
    TOOLS.forEach(function (x) { var_[x.c] = 1; adet[x.c] = (adet[x.c] || 0) + 1; });
    var liste = SIRA.filter(function (c) { return var_[c]; });
    if (secili === undefined) secili = liste.length ? liste[0] : "*";

    cipler.innerHTML = liste.map(function (c) {
      return '<button class="chip" data-c="' + esc(c) + '" aria-pressed="'
        + (c === secili ? "true" : "false") + '">'
        + esc(T("cat_" + c)) + "<u>" + adet[c] + "</u></button>";
    }).join("")
      + '<button class="chip chip-all" data-c="*" aria-pressed="'
      + (secili === "*" ? "true" : "false") + '">'
      + esc(T("chip_all")) + "<u>" + TOOLS.length + "</u></button>";
  }

  cipler.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    secili = b.getAttribute("data-c");
    Array.prototype.forEach.call(cipler.children, function (n) {
      n.setAttribute("aria-pressed", n === b ? "true" : "false");
    });
    ciz();
  });

  function ciz() {
    var t = kat(terim);
    var liste = TOOLS.filter(function (x) {
      /* Arama yazılıyken kategori süzgeci devre dışı. */
      if (!t && secili !== "*" && x.c !== secili) return false;
      if (!t) return true;
      return kat(x.t).indexOf(t) > -1 || kat(x.d).indexOf(t) > -1
          || kat(x.c).indexOf(t) > -1;
    });
    sayac.textContent = liste.length + " " + T("count_suffix")
      + (!t && secili !== "*" ? " · " + T("cat_" + secili) : "");

    var favler = favOku();
    function kart(x) {
      var acik = favler.indexOf(x.t) > -1;
      return '<div class="card-wrap">'
        + '<button class="fav' + (acik ? " on" : "") + '" data-fav="' + esc(x.t)
        + '" title="' + esc(T("fav_add")) + '">' + (acik ? "★" : "☆")
        + "</button>"
        + '<a class="card" href="#" data-ac="' + esc(x.t) + '">' + simge(x.i)
        + "<h2>" + esc(x.t) + "</h2><p>" + esc(x.d) + "</p>"
        + '<span class="meta"><span class="tag">' + esc(T("cat_" + x.c))
        + '</span><span class="free">' + esc(T("badge_free"))
        + "</span></span></a></div>";
    }

    if (!liste.length) {
      izgara.innerHTML = '<p class="empty">' + esc(T("empty")) + "</p>";
      return;
    }
    var html = "";
    if (!t) {
      var fav = TOOLS.filter(function (x) { return favler.indexOf(x.t) > -1; });
      if (fav.length) {
        html += '<div class="favband"><p class="favttl">' + esc(T("fav_title"))
          + '</p><div class="favgrid">' + fav.map(kart).join("") + "</div></div>";
      }
      html += liste.filter(function (x) { return favler.indexOf(x.t) < 0; })
                   .map(kart).join("");
    } else {
      html += liste.map(kart).join("");
    }
    izgara.innerHTML = html;
  }

  function aracAc(baslik) {
    var a = TOOLS.filter(function (x) { return x.t === baslik; })[0];
    if (!a) return;
    (a.needs || []).forEach(kutuphaneGetir);
    if ((a.needs || []).indexOf("pdfjs") > -1) isciGetir();

    ev.style.display = "none";
    gorunum.style.display = "block";
    gorunum.innerHTML =
      '<a href="#" class="back" id="geri">' + esc(T("back")) + "</a>"
      + '<h1 class="view">' + esc(a.t) + "</h1>"
      + '<p class="priv">' + esc(T("priv"))
      + (a.ai ? " · yapay zekâ arka plan kaldırma çevrimdışı çalışmaz,"
              + " renk kipini kullanın." : "") + "</p>"
      + '<div class="tk" id="govde">' + a.html + "</div>";

    $("geri").addEventListener("click", function (e) { e.preventDefault(); aracKapat(); });
    try {
      new Function(a.js)();
    } catch (err) {
      $("govde").innerHTML = '<p class="empty">Araç başlatılamadı: '
        + esc(err.message) + "</p>";
    }
    window.scrollTo(0, 0);
  }

  function aracKapat() {
    gorunum.style.display = "none";
    gorunum.innerHTML = "";
    ev.style.display = "";
    window.scrollTo(0, 0);
  }

  izgara.addEventListener("click", function (e) {
    var f = e.target.closest(".fav");
    if (f) { e.preventDefault(); favCevir(f.getAttribute("data-fav")); ciz(); return; }
    var a = e.target.closest("[data-ac]");
    if (a) { e.preventDefault(); aracAc(a.getAttribute("data-ac")); }
  });

  arama.addEventListener("input", function () { terim = arama.value; ciz(); });
  window.VT.dilDegisince(function () { cipleriKur(); ciz(); });

  cipleriKur();
  ciz();
  var ft = $("f-tools"), fc = $("f-cats");
  if (ft) ft.textContent = TOOLS.length;
  if (fc) fc.textContent = Object.keys(TOOLS.reduce(function (a, x) {
    a[x.c] = 1; return a;
  }, {})).length;
})();
