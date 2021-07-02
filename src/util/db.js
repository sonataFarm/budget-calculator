import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';

// constants
const COLLECTIONS = {
  items: 'items',
  users: 'nateFestingerUsers',
  carts: 'nateFestingerCarts'
};

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

const db = firebase.firestore();

const fetchCollection = async (collection) => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(d => { 
    const item = d.data();
    item.id = d.id;

    return item;
  });
};

const fetchUniqueItems = async () => {
  /* There seem to be duplicate items in the database :(
     This seems like a reasonable place to store this logic. */
  let items = await fetchCollection(COLLECTIONS.items);
  return  _.uniqBy(items, i => i.name);
};

const setUser = async (user) => {
  /* user is object with at least a required username property 
     Make the user's ID its username. */
  db.collection(COLLECTIONS.users).doc(user.username).set(user)
};

const setCart = (items, username) => {
  /* items is array of Items; username is string
     Make the cart's ID its user's username. */
  const cart = { items: items.map(i => i.id) };
  db.collection(COLLECTIONS.carts).doc(username).set(cart);
};

const deleteCollection = async collection => {
  if (!collection.includes('nateFestinger')) {
    return; // don't do a bad thing
  }

  const snapshot = await db.collection(collection).get();
  snapshot.docs.forEach(d => d.ref.delete());
};

const client = { fetchCollection, fetchUniqueItems, setUser, setCart, deleteCollection };

export default client;