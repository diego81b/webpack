(function () {
  let body;

  function showSampleNotification() {
    navigator.serviceWorker.getRegistration().then((reg) => {
      const options = {
        body: 'Notificamelo!',
        icon: 'static/img/icons/android-chrome-512x512.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
      };
      reg.showNotification('VUE Commit', options);
    });
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          if ('Notification' in window) {
            if (Notification.permission === 'granted') {
              showSampleNotification();
              if ('PushManager' in window) {
                console.info('Notifiche push abilitate');
                return registration.pushManager.getSubscription()
                  .then((sub) => {
                    if (sub) {
                      console.log('Subscription object: ', sub);
                      return sub;
                    }
                    console.log('Not subscribed to push service!');
                    return registration.pushManager.subscribe({
                      userVisibleOnly: true,
                      applicationServerKey: urlB64ToUint8Array('BEibYAQBhAaq4wcONEz6Ow8QdspHTKf4S8sH9AZNTLXejCRVJGGbyRfaIEmu5j557MWQPpiNCyvFCc7GpWcnw-E'),
                    });
                  })
                  .catch((subscriptionError) => {
                    console.log('Subscription failed: ', subscriptionError);
                  });
              }
            } else if (Notification.permission === 'blocked') {
              console.log('Notification denied');
            } else {
              Notification.requestPermission((status) => {
                console.log('Notification permission status:', status);
              });
            }
          }
        })
        .then((subscription) => {
          const rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
          const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
          const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
          const authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
          const endpoint = subscription.endpoint;
          body = {
            endpoint,
            key,
            authSecret,
          };
          console.log('Body Request: ', JSON.stringify(body));
          fetch('http://localhost:5000/v1/dashboard/register', {
            method: 'post',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
          });
        })
        .then((response) => {
          console.info('registration done', response);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}(navigator, window));
