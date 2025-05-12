const VERSION ="0.3-alpha0";
const CACHE_NAME=`GNOME-online v${VERSION}`;
const APP_STATIC_RESOURCES=[
'/GNOME-online/apps/loupe.js',
'/GNOME-online/apps/nautilus.js',
'/GNOME-online/apps/texteditor.js',
'/GNOME-online/apps/calculator.js',
'/GNOME-online/apps/console.js',
'/GNOME-online/apps/epiphany.js',
'/GNOME-online/apps/icons/calculator.svg',
'/GNOME-online/apps/icons/console.svg',
'/GNOME-online/apps/icons/epiphany.svg',
'/GNOME-online/apps/icons/loupe.svg',
'/GNOME-online/apps/icons/nautilus.svg',
'/GNOME-online/apps/icons/texteditor.svg',
'/GNOME-online/cursors/all-scroll.png',
'/GNOME-online/cursors/default.png',
'/GNOME-online/cursors/nwse-resize.png',
'/GNOME-online/cursors/pointer.png',
'/GNOME-online/cursors/text.png',
'/GNOME-online/filesys.js',
'/GNOME-online/gnome_192.png',
'/GNOME-online/icons/application-x-executable.svg',
'/GNOME-online/icons/application-x-generic.svg',
'/GNOME-online/icons/folder-documents.svg',
'/GNOME-online/icons/folder-download.svg',
'/GNOME-online/icons/folder-pictures.svg',
'/GNOME-online/icons/folder.svg',
'/GNOME-online/icons/image-x-generic.svg',
'/GNOME-online/icons/text-html.svg',
'/GNOME-online/icons/text.svg',
'/GNOME-online/icons/user-home.svg',
'/GNOME-online/icons/user-trash.svg',
'/GNOME-online/icons/video-x-generic.svg',
'/GNOME-online/icons/x-office-document.svg',
'/GNOME-online/index.html',
'/GNOME-online/manifest.json',
'/GNOME-online/moogle.html',
'/GNOME-online/plans.md',
'/GNOME-online/styles/AdwaitaMono.woff',
'/GNOME-online/styles/InterVariable-Italic.woff2',
'/GNOME-online/styles/InterVariable.woff2',
'/GNOME-online/styles/colour.css',
'/GNOME-online/styles/style.css',
'/GNOME-online/sw.js',
'/GNOME-online/symbolic/arrow-circular-top-right-symbolic.svg',
'/GNOME-online/symbolic/battery-action-symbolic.svg',
'/GNOME-online/symbolic/battery-level-0-charging-symbolic.svg',
'/GNOME-online/symbolic/battery-level-100-charged-symbolic.svg',
'/GNOME-online/symbolic/battery-level-100-symbolic.svg',
'/GNOME-online/symbolic/battery-level-30-symbolic.svg',
'/GNOME-online/symbolic/battery-level-40-symbolic.svg',
'/GNOME-online/symbolic/battery-level-50-symbolic.svg',
'/GNOME-online/symbolic/battery-level-60-symbolic.svg',
'/GNOME-online/symbolic/battery-level-70-symbolic.svg',
'/GNOME-online/symbolic/battery-level-80-symbolic.svg',
'/GNOME-online/symbolic/battery-level-90-symbolic.svg',
'/GNOME-online/symbolic/battery-low-symbolic.svg',
'/GNOME-online/symbolic/battery-missing-symbolic.svg',
'/GNOME-online/symbolic/bug-symbolic.svg',
'/GNOME-online/symbolic/dark-mode-symbolic.svg',
'/GNOME-online/symbolic/display-brightness-high-symbolic.svg',
'/GNOME-online/symbolic/entry-clear-symbolic.svg',
'/GNOME-online/symbolic/floppy-symbolic.svg',
'/GNOME-online/symbolic/folder-remote-symbolic.svg',
'/GNOME-online/symbolic/fullscreen-square-symbolic.svg',
'/GNOME-online/symbolic/left-large-symbolic.svg',
'/GNOME-online/symbolic/menu-large-symbolic.svg',
'/GNOME-online/symbolic/network-proxy-symbolic.svg',
'/GNOME-online/symbolic/person-symbolic.svg',
'/GNOME-online/symbolic/plus-large-square-outline-symbolic.svg',
'/GNOME-online/symbolic/radiowaves-1-symbolic.svg',
'/GNOME-online/symbolic/radiowaves-5-symbolic.svg',
'/GNOME-online/symbolic/star-large-symbolic.svg',
'/GNOME-online/wall-dk.webp',
'/GNOME-online/wall-lt.webp',
'/GNOME-online/wm.js',
]

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        }),
      );
      await clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            try {
                const networkResponse = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            } catch (error) {
                console.error("Fetch failed; returning offline page instead.", error);
                return caches.match('/GNOME-online/index.html');
            }
        })(),
    );
});