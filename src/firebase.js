import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCUNyuwKe_WHYoKNP5_ul3ZKKbSTPKFO8I",
    authDomain: "whatsapp-clone4.firebaseapp.com",
    databaseURL: "https://whatsapp-clone4.firebaseio.com",
    projectId: "whatsapp-clone4",
    storageBucket: "whatsapp-clone4.appspot.com",
    messagingSenderId: "407838143842",
    appId: "1:407838143842:web:387919bf693ab999f7e83b"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
