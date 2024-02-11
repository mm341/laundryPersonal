importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
    apiKey: "AIzaSyAeSrc9ll_GBxfi_9f0PXupac-MYIfVv_I",
    authDomain: "alwan-alghasil-laundry.firebaseapp.com",
    projectId: "alwan-alghasil-laundry",
    storageBucket: "alwan-alghasil-laundry.appspot.com",
    messagingSenderId: "908074675249",
    appId: "1:908074675249:web:4b575ba05c743707f93910",
    measurementId: "G-3M38YNVWHZ"
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
