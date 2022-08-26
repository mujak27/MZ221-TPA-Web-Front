
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './config';

// const firebaseConfig = {
//   // your config
// };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const firestore = firebase.firestore()
