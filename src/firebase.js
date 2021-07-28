import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCK5dHBF__K_vNM_Xwlev5UkaQC0OK9w2Q",
  authDomain: "bitcake.firebaseapp.com",
  projectId: "bitcake",
  storageBucket: "bitcake.appspot.com",
  messagingSenderId: "871478459514",
  appId: "1:871478459514:web:fbbbdb45d72f526b9c8fc3",
  measurementId: "G-CH2H9SQE17",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
