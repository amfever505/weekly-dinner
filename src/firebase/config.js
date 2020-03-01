import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCCDTBiJZ9w2tz9h1ogASU_7hL5zI_Imio',
  authDomain: 'weekly-dinner.firebaseapp.com',
  databaseURL: 'https://weekly-dinner.firebaseio.com',
  storageBucket: 'weekly-dinner.appspot.com'
};
firebase.initializeApp(config);

export const database = firebase.database();
