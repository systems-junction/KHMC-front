// /* eslint-disable consistent-return */
// /* eslint-disable no-restricted-globals */

// const CACHE_NAME = "pwa-task-manager";
// const urlsToCache = ["/", "/admin", "/admin/dashboard"];

// // Install a service worker
// self.addEventListener("install", (event) => {
//   // Perform install steps
//   console.log("fetch event called");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Cache and return requests
// self.addEventListener("fetch", (event) => {
//   // console.log("fetch event called");
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// // Update a service worker
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = ["pwa-task-manager"];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("push", (event) => {
//   const data = event.data.json();
//   console.log("New notification", data);
//   const options = {
//     body: "Body for the push notification",
//     icon: KHMC,
//     requireInteraction: true,
//   };
//   event.waitUntil(self.registration.showNotification(data.title, options));
// });

/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */

// const CACHE_NAME = "pwa-task-manager";
// const urlsToCache = ["/", "/admin", "/admin/dashboard"];

// // Install a service worker
// self.addEventListener("install", (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       console.log("Opened cache");
//       // caches
//       //   .match("/data.json")
//       //   .then((r) => r.json())
//       //   .then((r) => console.log(r));

//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Cache and return requests
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// // Update a service worker
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = ["pwa-task-manager"];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("New notification data", event.data.json());

  const options = {
    body: data.message,
    // actions: [{ action: "yes", title: "Yes" }],
    requireInteraction: true,
    sound:
      "https://notificationsounds.com/soundfiles/46922a0880a8f11f8f69cbb52b1396be/file-sounds-1129-hollow.mp3",
    icon:
      "https://dev.khmc-staging.online/uploads/2020-10-13T12-37-34.126Z-KHMC.png",

    // image:
    //   "https://dev.khmc-staging.online/uploads/2020-10-13T11-28-27.691Z-notif.png",
    // badge:
    //   "https://dev.khmc-staging.online/uploads/2020-10-13T11-28-27.691Z-notif.png"
  };
  event.waitUntil(self.registration.showNotification(data.title, options));

  // caches.match("/data.json").then(function(response) {
  //   // Check cache but fall back to network
  //   // const user = response.json();
  //   console.log("response for cache object", response.json());
  // if (data.test.staffTypeId === user.staffTypeId._id) {
  //   const options = {
  //     body: data.body,
  //     actions: [{ action: "yes", title: "Yes" }],
  //   };
  //   event.waitUntil(self.registration.showNotification(data.title, options));
  // }
  // });

  // event.waitUntil(
  //   caches.open(CACHE_NAME).then(function(cache) {
  //     console.log("Opened cache");
  //     caches
  //       .match("/data.json")
  //       .then((r) => r.json())
  //       .then((r) => {
  //         console.log("response of the cachae object", r);
  //         const data = event.data.json();
  //         console.log("New notification", data);
  //         if (data.test.staffTypeId === r.staffTypeId._id) {
  //           const options = {
  //             body: data.body,
  //             actions: [{ action: "yes", title: "Yes" }],
  //           };
  //           event.waitUntil(
  //             self.registration.showNotification(data.title, options)
  //           );
  //         }
  //       });
  //   })
  // );
});

self.addEventListener("notificationclick", function(event) {
  const title = event.notification.title;

  // const baseUrl = "http://localhost:3000";
  const live = "https://test.khmc-staging.com";
  const baseUrl = live;

  const mapMsgToRoute = [
    {
      title: "Purchase Requested Generated",
      url: `${baseUrl}/home/controlroom/wms/pr`,
    },
    {
      title: "Purchase Order Generated",
      url: `${baseUrl}/home/controlroom/wms/po`,
    },
    {
      title: "Account Approval Needed",
      url: `${baseUrl}/home/controlroom/wms/receiverequests`,
    },
  ];

  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function(clientList) {
        if (clients.openWindow) {
          if (title === mapMsgToRoute[0].title) {
            return clients.openWindow(mapMsgToRoute[0].url);
          } else if (title === mapMsgToRoute[1].title) {
            return clients.openWindow(mapMsgToRoute[1].url);
          } else if (title === mapMsgToRoute[2].title) {
            return clients.openWindow(mapMsgToRoute[2].url);
          }
        }
      })
  );
});
