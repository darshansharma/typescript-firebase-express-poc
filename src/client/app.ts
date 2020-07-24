import { redirect } from "./utils/helpers";
var firebase = require('firebase');

class InitializeFirebase {
    constructor() {
        // console.log('admin - ', admin);
        var firebaseConfig = {
            // Take it from firebase.com
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
