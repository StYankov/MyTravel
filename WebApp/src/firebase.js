import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDYZAITBS0yyaCRMyN2QP3sKbg7kiBSWVg",
  authDomain: "towns-11baf.firebaseapp.com",
  databaseURL: "https://towns-11baf.firebaseio.com",
  projectId: "towns-11baf",
  storageBucket: "towns-11baf.appspot.com",
  messagingSenderId: "170300736185"
};

firebase.initializeApp(config);

const towns = firebase.database().ref('towns');
const users = firebase.database().ref('users');
const buses = firebase.database().ref('buses');
const coords = firebase.database().ref('coordinates');
const reports = firebase.database().ref('reports');

export default firebase;
export { towns, users, buses, coords, reports }
