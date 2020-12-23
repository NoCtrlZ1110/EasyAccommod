import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyDQFivX4gjdkAGv6G4qaKqwP4-XfkKp4zU',
  authDomain: 'easyaccommod-d3daa.firebaseapp.com',
  projectId: 'easyaccommod-d3daa',
  storageBucket: 'easyaccommod-d3daa.appspot.com',
  messagingSenderId: '442087630308',
  appId: '1:442087630308:web:476f8a97928148426653f1',
  measurementId: 'G-9MSWLJS6N6',
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
