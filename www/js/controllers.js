/**********************************
 * [MODULE] PLAIN TEXT
 *********************************/

var app = angular.module('starter.controllers', ["firebase"]).
  filter('plainText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

/**********************************
 * [CONTROLLER] WELCOME
 *********************************/
app.controller('WelcomeCtrl', function(Firebase, Auth, $scope, $stateParams, $ionicModal, $location) {

  $scope.error = null;
  $scope.register = false;

  /**********************************
   * [FUNCTIONS] UTILS
   *********************************/

  $scope.isIncorrectValue = function(val) {
    return angular.isUndefined(val) || val === null || val == "";
  }

  $scope.cleanVariables = function() {
    $scope.error = null;
  }

  /**********************************
   * [FIREBASE]
   *********************************/

  Auth.$onAuthStateChanged(function(authData) {
    if (authData) {
      // Define signed user
      console.log("Signed in as :", authData.email);
      $scope.loggedInUser = authData;
      // Close register modal in register case
      $scope.closeRegister();
      // Redirect correct page
      if($scope.register) {
        $location.path('/slide');
      } else {
        $location.path('/tab/photo');
      }
    } else {
      console.log("Signed out");
      $scope.loggedInUser = null;
    }
  });

  $scope.createUser = function(form) {
    if($scope.isIncorrectValue(form.email) || $scope.isIncorrectValue(form.password)) {
      $scope.error = "Vous avez oublié de remplir des champs ...";
    } else {
      // Create the user on Auth instance
      Auth.$createUserWithEmailAndPassword(form.email, form.password)
      .then(function() {
        $scope.register = true;
        // If this is a success, log in
        return Auth.$signInWithEmailAndPassword(form.email, form.password)
      }).catch(function(error) {
        // If we have an error, catch and print it
        $scope.error = ""+error;
      });
    }
  };

  $scope.loginUser = function(user) {
    if($scope.isIncorrectValue(user.email) || $scope.isIncorrectValue(user.password)) {
      $scope.error = "Vous avez oublié de remplir des champs ...";
    } else {
      Auth.$signInWithEmailAndPassword(user.email, user.password)
      .then(function(authData) {
        
        $scope.loggedInUser = authData;
      }).catch(function(error) {
        $scope.error = ""+error;
      });
    }
  }

  /**********************************
   * [MODAL] LOGIN
   *********************************/

  // Configuration (File, animation, function)
  $ionicModal.fromTemplateUrl('templates/welcome/forget.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalForget = modal;
  });

  // Open the modal
  $scope.openForget = function() {
    $scope.cleanVariables();
    $scope.modalForget.show();
  };

  // Close the modal
  $scope.closeForget = function() {
    $scope.cleanVariables();
    $scope.modalForget.hide();
  };

  /**********************************
   * [MODAL] REGISTER
   *********************************/

  // Configuration (File, animation, function)
  $ionicModal.fromTemplateUrl('templates/welcome/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalRegister = modal;
  });

  // Open the modal
  $scope.openRegister = function() {
    $scope.cleanVariables();
    $scope.modalRegister.show();
  };

  // Close the modal
  $scope.closeRegister = function() {
    $scope.cleanVariables();
    $scope.modalRegister.hide();
  };
});

/**********************************
 * [CONTROLLER] CAMERA
 *********************************/
app.controller('PhotoCtrl', function($scope) {


});

/**********************************
 * [CONTROLLER] SEARCH
 *********************************/
app.controller('SearchCtrl', function($scope) {
/*  
  $scope.bieres = [];

  $scope.$watch('query', function() {
    if($scope.query.length > 1) {
      $scope.getBiere();
    } else {
      $scope.details = [];
    }
  });

  $scope.getBiere = function() {
    searchSrv.getBiere().then(
      function(bieres) {
        applyRemoteData(bieres);
      }
    );
  };

  function applyRemoteData(newBieres) {
    $scope.bieres = newBieres;
    alert($scope.bieres);
  }
*/
});


/**********************************
 * [CONTROLLER] ACCOUNT
 *********************************/
app.controller('AccountCtrl', function(Firebase, Auth, $scope, $location) {
  
  /**********************************
   * [FIREBASE]
   *********************************/

  Auth.$onAuthStateChanged(function(authData) {
    if(!authData) {
      console.log("Signed out");
      $scope.loggedInUser = null;
      $location.path('/welcome');
    }
  }); 

  $scope.logout = function() {
    Auth.$signOut();
  }
});

/**********************************
 * [CONTROLLER] SLIDE
 *********************************/
app.controller('SlideCtrl', function($scope) {

});