import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVI2tuyAtzznhbN5oURfFuadPM9_QTu1I",
  authDomain: "todo-b0ef9.firebaseapp.com",
  projectId: "todo-b0ef9",
  storageBucket: "todo-b0ef9.appspot.com",
  messagingSenderId: "411028708878",
  appId: "1:411028708878:web:4aa39227e7b5393df8665f",
  measurementId: "G-GRZBTW64BS",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };

const db = getFirestore(app);

export default db;
