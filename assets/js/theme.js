// Thème clair/sombre. Seul script du site : aucune requête réseau, aucun suivi.
// Le choix est mémorisé localement (localStorage) s'il est disponible ; sinon, le thème suit le système.
(function () {
  var root = document.documentElement;
  var KEY = 'theme';
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* stockage indisponible : on ignore */ } }
  var saved = read();
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var sync = function () { btn.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false'); };
    sync();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      write(next);
      sync();
    });
  });
})();
