import { redirect } from "./utils/helpers";
var firebase = require('firebase');

class InitializeFirebase {
    constructor() {
        // console.log('admin - ', admin);
        var firebaseConfig = {
            apiKey: "AIzaSyChdiU0uyXYye-bk8aRYqT1lqJFWeTZm_s",
            authDomain: "auth-24107.firebaseapp.com",
            databaseURL: "https://auth-24107.firebaseio.com",
            projectId: "auth-24107",
            storageBucket: "auth-24107.appspot.com",
            messagingSenderId: "512747461237",
            appId: "1:512747461237:web:3e83acf34bfc188e36363c",
            measurementId: "G-YKL3KFXBKL"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // admin.initializeApp(firebaseConfig);
        // const db = admin.firestore();
        // firebase.analytics();
    }
}
const fb = new InitializeFirebase();
redirect('signup');
