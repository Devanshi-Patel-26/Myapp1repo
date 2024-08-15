/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtIyDh6GtL0io1ppsjn9EWS42FDFqQhrU",
  authDomain: "e-commerce-6b486.firebaseapp.com",
  projectId: "e-commerce-6b486",
  storageBucket: "e-commerce-6b486.appspot.com",
  messagingSenderId: "596427943329",
  appId: "1:596427943329:web:0c858634f3d49c0e682fe0",
  measurementId: "G-C5Y2KVJ078",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  app,
  db,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  auth,
  storage,
  query,
  where,
};
