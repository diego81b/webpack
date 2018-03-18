
importScripts('/static/workbox-sw.prod.v2.1.2.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});


workbox.router.registerRoute(
  new RegExp('^http://127.0.0.1:8081'),
  workbox.strategies.staleWhileRevalidate()
);


self.addEventListener('push', (event) => {
  const title = (event.data && event.data.text()) || 'Yay a message';
  const body = 'We have received a push message';
  const tag = 'push-simple-demo-notification-tag';
  const icon = 'static/img/icons/android-chrome-512x512.png';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      tag,
    }),
  );
});


workbox.precache([]);
