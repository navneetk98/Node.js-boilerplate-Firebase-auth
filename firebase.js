    var admin = require("firebase-admin");
var serviceAccount = require('./udaan-4eda0-firebase-adminsdk-qzdeb-92f53754f3.json');

const Firebase = () => {
  const sdk = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://udaan-4eda0.firebaseio.com",
  });
  return {
    checkIfLoggedIn: (idToken) => {
      return admin.auth().verifyIdToken(idToken);
    },
    firestore: admin.firestore(),
    auth: admin.auth(),
  };
};

module.exports = Firebase();
