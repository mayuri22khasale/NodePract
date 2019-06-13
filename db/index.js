const admin = require('firebase-admin');

const serviceAccount = require('../certs/todolist-41b15-530bd7239ce6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
