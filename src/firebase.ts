import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
// import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: "AIzaSyAeSrc9ll_GBxfi_9f0PXupac-MYIfVv_I",
    authDomain: "alwan-alghasil-laundry.firebaseapp.com",
    projectId: "alwan-alghasil-laundry",
    storageBucket: "alwan-alghasil-laundry.appspot.com",
    messagingSenderId: "908074675249",
    appId: "1:908074675249:web:4b575ba05c743707f93910",
    measurementId: "G-3M38YNVWHZ"
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const messaging = (async () => {
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

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BI91LwgqdJPFq0jOyHSbaPTbVlwYXsSpFf7Md5ixJ16wvbfvSqI51tcBld878DfU1iKkJFWXASaiP3Ybpp2ICK0",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
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
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
