import axios from "axios";

import { addSubscriber } from "../src/public/endpoins";

const convertedVapidKey = urlBase64ToUint8Array(
  "BOHtR0qVVMIA-IJEru-PbIKodcux05OzVVIJoIBKQu3Sp1mjvGkjaT-1PIzkEwAiAk6OuSCZfNGsgYkJJjOyV7k"
);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription, user) {
  console.log("subscribe function called", subscription);

  axios
    .post(addSubscriber, {
      subscription: subscription,
      user: user._id,
    })
    .then((res) => {
      if (res) {
        console.log("response for the notification request", res);
      }
    })
    .catch((e) => {
      console.log("error for the notification request", e);
    });

  // let xmlHttp = new XMLHttpRequest();
  // //put here API address
  // xmlHttp.open("POST", "http://localhost:4000/subscribe");
  // xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // xmlHttp.onreadystatechange = function() {
  //   if (xmlHttp.readyState != 4) return;
  //   if (xmlHttp.status != 200 && xmlHttp.status != 304) {
  //     console.log("HTTP error " + xmlHttp.status, null);
  //   } else {
  //     console.log("User subscribed to server");
  //   }
  // };

  // xmlHttp.send(JSON.stringify(subscription));
}

export function subscribeUser(user) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(function(registration) {
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function(existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function(newSubscription) {
                  console.log("New subscription added.", newSubscription);
                  sendSubscription(newSubscription, user);
                })
                .catch(function(e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              sendSubscription(existedSubscription, user);
            }
          });
      })
      .catch(function(e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  }
}
