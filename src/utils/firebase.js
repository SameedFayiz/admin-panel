import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoccollection,
  query,
  where,
  onSnapshotdoc,
  onSnapshot,
  setDoc,
  addDoc,
  Timestamp,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqQxpeStD6W1ordhGW9y3v267YFsGmCeQ",
  authDomain: "react-native-1c371.firebaseapp.com",
  projectId: "react-native-1c371",
  storageBucket: "react-native-1c371.appspot.com",
  messagingSenderId: "677501835756",
  appId: "1:677501835756:web:69ebcd27885f0e55c788c9",
  measurementId: "G-1LDZ8X5ZX3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const userRegister = async (name, password, course, image) => {
  const email = `${name}@gmail.com`;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    let uid = user.uid;
    await setDoc(doc(db, "users", uid), {
      id: uid,
      name,
      email,
      password,
      course,
      image,
    });
    uid = userLogin("admin@123.com", 123456);
    return uid;
  } catch (error) {
    console.log("sign up error-->", error.message);
    return error;
  }
};

export const userLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    const uid = user.uid;
    return uid;
  } catch (error) {
    console.log("sign in error-->", error.message);
    return error;
  }
};

export const userSignOut = async () => {
  try {
    await signOut(auth);
    console.log("logged out");
  } catch (error) {
    console.log("logout error-->", error.message);
    return error;
  }
};

export const getData = async () => {
  const row = [];
  function createData(id, name, course, pass, image) {
    return { id, name, course, pass, image };
  }

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    row.push(
      createData(doc.id, data.name, data.course, data.password, data.image)
    );
  });
  return row;
};

export const getCourses = async () => {
  const docRef = doc(db, "static", "courses");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
