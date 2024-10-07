importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC8HrWZOfj2PeBqw34mG2PUxB441W97GPI",
  authDomain: "hiinfluencer-1c689.firebaseapp.com",
  projectId: "hiinfluencer-1c689",
  storageBucket: "hiinfluencer-1c689.appspot.com",
  messagingSenderId: "67287188654",
  appId: "1:67287188654:web:ee5f5de8bd8fb832b4593f",
  measurementId: "G-2KMYMVR8ST",
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/default-icon.png", // optional icon
    data: {
      click_action: payload.notification.click_action, // optional click action
    },
  };

  // Show the notification
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
