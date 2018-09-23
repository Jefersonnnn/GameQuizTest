// Initialize Firebase
import firebase from "firebase/app";
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: "AIzaSyBSB5EIg25m791hpBaMh1itV48oLjBuZUM",
  authDomain: "gameteste-2c4e0.firebaseapp.com",
  databaseURL: "https://gameteste-2c4e0.firebaseio.com",
  projectId: "gameteste-2c4e0",
  storageBucket: "gameteste-2c4e0.appspot.com",
  messagingSenderId: "584205977551"
}

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();

// data issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

// Collections
const quizCollection = db.collection('learn');

export {
  db,
  quizCollection
}
