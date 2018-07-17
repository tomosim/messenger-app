# FE-nc-messenger

Thanks for looking at my messenger app. Please feel free to fork and clone this repo.

## About

FE-nc-messenger is a react based messaging app that uses a firestore real time database and authentification. 

## Dependancies

``` "dependencies": {
    "firebase": "^4.13.1",
    "firebaseui": "^3.1.1",
    "moment": "^2.22.2",
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.4"
  }
```
 
## Installing and Deploying

In order to install and run this app you'll need to set up a config file inside the src folder like so:

```
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: YOUR KEY HERE",
  authDomain: "YOUR AUTHDOMAIN",
  databaseURL: "YOUR DATABASEURL",
  projectId: "YOUR PROJECT ID"
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export const auth = firebase.auth();

```

All api keys are obtainable through [firebase](https://firebase.google.com/) after you have initialised your database.

## To Do

- host on firebase

## Authors

- Tom Simmons

## Acknowledgements 

- [Northcoders](https://northcoders.com/) - A coding education like no other.
