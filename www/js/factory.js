angular.module('starter.services', [])

/***************************************************************************************
 * FACTORY
 **************************************************************************************/

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

.factory("Firebase", function() {
  var config = {
        apiKey: "AIzaSyC1ZOik1IDQixDMTy29Azpt9lVxmz2W7Yw",
        authDomain: "wetune-730b4.firebaseapp.com",
        databaseURL: "https://wetune-730b4.firebaseio.com/",
        storageBucket: "wetune-730b4.appspot.com",
        messagingSenderId: "440789496733"
      };
     return firebase.initializeApp(config);
})

.factory("Database", ["Firebase",  function (Firebase) {
  return Firebase.database();
}]);
