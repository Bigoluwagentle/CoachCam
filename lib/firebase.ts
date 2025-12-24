import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7fov-8rY4hF8qRy82g1GW0y7jQ6hqa0M",
  authDomain: "coachcam-62c61.firebaseapp.com",
  projectId: "coachcam-62c61",
  storageBucket: "coachcam-62c61.firebasestorage.app",
  messagingSenderId: "288838123630",
  appId: "1:288838123630:web:fc29e9bca7fdbaa2fb267f",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { storage };