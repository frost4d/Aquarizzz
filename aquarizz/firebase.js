import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdKfHN_bqOQPYfn1yFYG9-mQfyBWdvuJ8",
  authDomain: "aquarizz-486e5.firebaseapp.com",
  projectId: "aquarizz-486e5",
  storageBucket: "aquarizz-486e5.appspot.com",
  messagingSenderId: "275293662002",
  appId: "1:275293662002:web:65e6352e7696735a9ec52b"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_API_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_API_APP_ID,
// });

// export const auth = app.auth;
// export default app;