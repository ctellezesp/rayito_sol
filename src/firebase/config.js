import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyCQ2gfCinQS_ASsptS7znlst5-bdWa74OM",
    authDomain: "joyeriarayitosol.firebaseapp.com",
    databaseURL: "https://joyeriarayitosol.firebaseio.com",
    projectId: "joyeriarayitosol",
    storageBucket: "joyeriarayitosol.appspot.com",
    messagingSenderId: "1060881215232",
    appId: "1:1060881215232:web:8c8c596c9aa5587be4cde5",
    measurementId: "G-YZX1B7TF1Q"
}
class Firebase{

  constructor(){
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.storage = firebase.storage();
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }
}

export default new Firebase();
