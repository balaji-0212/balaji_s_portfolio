// Copy this file to firebase-config.js and fill in your Firebase project config
// Then include Firebase CDN scripts and this config file in index.html BEFORE assets/js/scripts.js
//
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
// <script src="assets/js/firebase-config.js"></script>
// <script src="assets/js/scripts.js"></script>
//
// Security note: Do NOT commit secrets. Firebase client config is public, but protect write rules.

(function initFirebase(){
  // Replace with your config from Firebase Console > Project settings > Your apps
  var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  if (typeof firebase !== 'undefined' && (!firebase.apps || !firebase.apps.length)) {
    firebase.initializeApp(firebaseConfig);
  }
})();
