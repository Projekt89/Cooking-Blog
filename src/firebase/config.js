import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDMj_dYD96TvRSWJ3GreeBgpHe_SIG5_Hw",
  authDomain: "recipes-blog.firebaseapp.com",
  projectId: "recipes-blog",
  storageBucket: "recipes-blog.appspot.com",
  messagingSenderId: "170555457417",
  appId: "1:170555457417:web:baf5cb9f2ac614918ceb58"
};

// init firebaseapp
firebase.initializeApp(firebaseConfig)

// init services
export const projectFirestore = firebase.firestore()
