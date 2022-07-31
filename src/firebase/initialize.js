import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBA7hq--bawaz1p9m4JgwM2owoWLrw70xw",
    authDomain: "choreapp-fd088.firebaseapp.com",
    projectId: "choreapp-fd088",
    storageBucket: "choreapp-fd088.appspot.com",
    messagingSenderId: "441908946911",
    appId: "1:441908946911:web:fe4f8aff1213df2655c66a",
    measurementId: "G-LN4LQBPLNV"
};

const firebaseApp = initializeApp(firebaseConfig);
initializeAnalytics(firebaseApp);

export default firebaseApp;