import firebase from 'firebase';
import * as admin from 'firebase-admin';

class Firestore {
  constructor() {
    if (firebase.apps.length === 0) {
      admin.initializeApp({
        apiKey: 'AIzaSyBGMpzlbvl7NMhFzF1eYnvSBYGgaNTNIkk',
        authDomain: 'kaidow-se.firebaseapp.com',
        projectId: 'kaidow-se',
        storageBucket: 'kaidow-se.appspot.com',
        messagingSenderId: '700980909076',
        appId: '1:700980909076:web:1b03107c7a27dd580fc301',
        measurementId: 'G-YY9RWC1CVX',
      });
    } else {
    }
  }

  listeningKitchen = async (store, success, reject) => {
    const res = await admin
      .firestore()
      .collection('test')
      .onSnapshot(
        function (snapshot) {
          snapshot.docChanges().forEach(function (change) {});
        },
        function (error) {}
      );
  };
}
const firestore = new Firestore();

export default firestore;
