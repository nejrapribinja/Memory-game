import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyATIHfeEFamT_QNv9wS13d_y2-2nCdGmeU",
    authDomain: "memory-game-a7e0b.firebaseapp.com",
    projectId: "memory-game-a7e0b",
    storageBucket: "memory-game-a7e0b.appspot.com",
    messagingSenderId: "121858297282",
    appId: "1:121858297282:web:0bc817db5f7566a6fc5a5b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)