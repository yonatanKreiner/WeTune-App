# Ionic 1 and Firebase 3 [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/AurelienWolz)

> This application is still under development, it is functional but your feedback is welcome !

Simple Ionic 1 application running  Firebase 3 backend. With the arrival of the new version of Firebase, it is important to update our applications.
This template allows us to understand the new change in the authentication procedure.

# Features
- Log in / Log out
- Register
- Tabbed application
- Slide page before registration
- Simple profile and favorites page

# Screenshot

<p align="center">
  <img src="https://github.com/Seao/ionic-tab-firebase-3/blob/master/screnshoot/1.png" width="250"/>
  <img src="https://github.com/Seao/ionic-tab-firebase-3/blob/master/screnshoot/2.png" width="250"/>
  <img src="https://github.com/Seao/ionic-tab-firebase-3/blob/master/screnshoot/3.png" width="250"/>
</p>

# How to use it

You must first set up the project with your personal firebase ids. For this change the following lines in the file ```www/js/factory``` :

```javascript
.factory("Firebase", function() {
  var config = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    databaseURL: "<databaseURL>",
    storageBucket: "<storageBucket>",
  };
  return firebase.initializeApp(config);
});
```

You can find his informations in the Firebase console at [https://console.firebase.google.com](https://console.firebase.google.com), in your project page.
```Project settings > Add Firebase to your web app```

Use following commands :
- ```cd ionic-tab-firebase-3```
- ```npm install```
- ```ionic serve``` or use [lab.ionic.io](http://lab.ionic.io) software

# Thanks

- [Dede Hamzah](https://github.com/dehamzah), for his Ionic 1 template with Firebase 3 and our email exchanges. [His work here](https://github.com/dehamzah/ionic-chat-firebase3-simple)
