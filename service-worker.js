self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("scam-spotter-cache").then(function (cache) {
      return cache.addAll([
        "index.html",
        "styles.css",
        "script.js",
        "manifest.json",
        "icon-scam-1.png",
        "icon-scam-2.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});