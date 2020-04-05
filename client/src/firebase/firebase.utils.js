import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-udemy-2ed62.firebaseapp.com",
  databaseURL: "https://react-udemy-2ed62.firebaseio.com",
  projectId: "react-udemy-2ed62",
  storageBucket: "react-udemy-2ed62.appspot.com",
  messagingSenderId: "781792002675",
  appId: "1:781792002675:web:59629076c57f2b560c6006"
};

firebase.initializeApp(firebaseConfig);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const addNewCartItemsDocument =  (userId, itemId)  => {
  //if not add a new item
  console.log('start adding cartitem');
  const userDoc = firestore.collection('users').doc(userId);
  userDoc.collection('cart').doc(`${itemId}`).set({  
    quantity: 1 
   })
  .then(function(docRef) {
    console.log(docRef.id);
    return("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.log(error);
    return("Error adding document: ", error);
})
};

export const updateCartItemsDocument =  (userId, itemId, quantity)  => {
  //if not add a new item
  console.log('start adding cartitem');
  const userCart = firestore.collection('users').doc(userId).collection('cart').doc(`${itemId}`);
  userCart.update({
     quantity: quantity 
  })
  .then(function(docRef) {
    console.log(docRef.id);
    return("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.log(error);
    return("Error adding document: ", error);
})
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(googleProvider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email  } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      
          });
    
    } catch (error) {
      console.log('error creating user', error.message);
        }
  }

  return userRef;

};

export default firebase;
