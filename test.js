const db = require('./db');

const userRef = db.collection('users');

const deleteDoc = userRef.doc('DC').delete();
