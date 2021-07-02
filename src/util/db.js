import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';

// configure firebase (https://firebase.google.com/docs/web/setup)
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "yardzen-demo.firebaseapp.com",
  databaseURL: "https://yardzen-demo.firebaseio.com",
  projectId: "yardzen-demo",
  storageBucket: "yardzen-demo.appspot.com",
  messagingSenderId: "509183652730",
  appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
};

// don't initialize twice (https://stackoverflow.com/questions/43331011)
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const database = firebase.firestore();

const fetchCollection = async (collection) => {
  const snapshot = await database.collection(collection).get();
  return snapshot.docs.map(d => d.data());
};

const fetchUniqueItems = async () => {
  /* There seem to be duplicate items in the database :(
     This seems like a reasonable place to store this logic. */
  let items = await fetchCollection('items');
  return  _.uniqWith(items, _.isEqual);
};

export default { fetchCollection, fetchUniqueItems };