import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const { apiKey, authDomain, databaseURL, projectId } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const db = firebase.firestore();

export const auth = firebase.auth();
