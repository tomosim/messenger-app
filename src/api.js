import { db } from "./config";

const checkForErrors = (checks, data) => {
  const errors = [];
  checks.forEach(check => {
    if (!data[check] && typeof data[check] !== "string") {
      errors.push(`data should contain a stringed ${check}`);
    }
  });
  return errors;
};

export const listenForNewMessages = cb => {
  db.collection("messages").onSnapshot(snap => {
    const newMessages = snap.docChanges.map(change => change.doc.data());
    cb(newMessages);
  });
};

export const listenToUsers = cb => {
  db.collection("users").onSnapshot(snap => {
    const users = snap.docChanges.map(change => {
      return {
        message: change.message,
        user: change.doc.data()
      };
    });
    cb(users);
  });
};

export const postMessage = message => {
  const errorChecks = ["text", "timestamp", "userName"];
  const errors = checkForErrors(errorChecks, message);
  return errors.length
    ? Promise.reject({ messages: errors })
    : db
        .collection("messages")
        .add(message)
        .then(() => message);
};

export const createUser = user => {
  const { userName } = user;
  const errorChecks = ["userName", "UID", "email"];
  const errors = checkForErrors(errorChecks, user);
  return errors.length
    ? Promise.reject({ messages: errors })
    : db
        .collection("users")
        .doc(userName)
        .get()
        .then(
          doc =>
            doc.exists
              ? Promise.reject({ messages: ["user already exists!"] })
              : db
                  .collection("users")
                  .doc(userName)
                  .set({ ...user, loggedIn: true })
        )
        .then(() => ({ userName: user.email, loggedIn: true }));
};

export const getEmailFromUserName = userName => {
  // const ref = db.ref("users");
  return db
    .collection("users")
    .doc(userName)
    .get()
    .then(userDoc => {
      return userDoc.data().email;
    });
};

export const login = user => {
  const { userName, email } = user;
  const errorChecks = ["userName", "email"];
  const errors = checkForErrors(errorChecks, user);
  return errors.length
    ? Promise.reject({ messages: errors })
    : db
        .collection("users")
        .doc(email)
        .get()
        .then(doc => {
          return !doc.exists
            ? Promise.reject({ messages: "no such user account" })
            : db
                .collection("users")
                .doc(email)
                .update({ loggedIn: true });
        })
        .then(() => ({ userName, email, loggedIn: true }));
};

export const logout = userName => {
  const err = {
    messages: "you appear to be logging out someone who does not exist!"
  };
  if (!userName) return Promise.reject(err);
  return db
    .collection("users")
    .doc(userName)
    .get()
    .then(doc => {
      return !doc.exists
        ? Promise.reject(err)
        : db
            .collection("users")
            .doc(userName)
            .update({ loggedIn: false })
            .then(() => ({ userName, loggedIn: false }));
    });
};
