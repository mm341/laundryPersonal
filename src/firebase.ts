import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
  Messaging,
} from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyAeSrc9ll_GBxfi_9f0PXupac-MYIfVv_I",
  authDomain: "alwan-alghasil-laundry.firebaseapp.com",
  projectId: "alwan-alghasil-laundry",
  storageBucket: "alwan-alghasil-laundry.appspot.com",
  messagingSenderId: "908074675249",
  appId: "1:908074675249:web:4b575ba05c743707f93910",
  measurementId: "G-3M38YNVWHZ",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const messaging: any = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }

    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async () => {
  return getToken(await messaging, {
    vapidKey:
      "BI7Xr4bEECldcUxCSqKFTMqfNVsm6iddBV-IVjsFyAZ-roz0egnV-AASrwhsl9ALsYp7leA2o8tI4TfnR0_9_6I",
  })
    .then((currentToken) => {
      if (currentToken) {
        localStorage.setItem("cm_firebase_token", currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve: any = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
