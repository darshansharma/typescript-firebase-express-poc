var firebase = require('firebase');
import admin from 'firebase-admin';
var serviceAccount = require('../firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-24107.firebaseio.com"
});


export class Database {
    db: any;
    constructor() {
        this.db = admin.firestore();
    }

    async storeUserDetails(uid: string, name: string, email: string) {
            const docRef = this.db.collection('user')
            const user = {
                name: name,
                email: email,
            }
            await docRef.doc(uid).set(user);
    }

    async getUserDetails(uid: string) {
        const userDoc = this.db.collection('user').doc(uid);
        const user =  await userDoc.get();
        if (!user.exists) {
            console.log('No user present with uid - ', uid);
            throw new Error('No user present with uid - '+ uid);
          } else {
            return user.data();
          }
    }
}