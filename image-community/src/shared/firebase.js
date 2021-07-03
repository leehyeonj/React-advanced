import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig ={
    apiKey: "AIzaSyCk9yztzZOsrWtcxUKQylZ9Cp3904UCcMM",
    authDomain: "image-community-4f83f.firebaseapp.com",
    projectId: "image-community-4f83f",
    storageBucket: "image-community-4f83f.appspot.com",
    messagingSenderId: "153120274120",
    appId: "1:153120274120:web:d784d1e43b2e1a7e58d7fd",
    measurementId: "G-1YPX259HG5"

};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
export{auth,apiKey};