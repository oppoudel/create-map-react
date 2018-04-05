import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBF8vD-bP77t9she57IpfW6XEeBQ5M2HHE',
  authDomain: 'create-map-e758c.firebaseapp.com',
  databaseURL: 'https://create-map-e758c.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
