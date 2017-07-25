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
  };

  $scope.cleanVariables = function() {
    $scope.error = null;
  };

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
      // // Redirect correct page
      // if($scope.register) {
      //   $location.path('/slide');
      // } else {
			$location.path('/search');
      // }
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
app.controller('playlistCtrl', function($scope, $stateParams, Database) {
	$scope.roomName = $stateParams.roomName;

	Database.ref('rooms').orderByChild('name').equalTo($scope.roomName).limitToFirst(1).on("value", function(snapshot) {
		$scope.allSongs = snapshot.val()["2"].songs;
		console.log(snapshot.val());
		$scope.$apply();
	});

	$scope.addNewSong = function () {
		
	}
});

/**********************************
 * [CONTROLLER] SEARCH
 *********************************/
app.controller('SearchCtrl', function($scope, roomsService, Database, $ionicPopup, $state) {

		$scope.logInToRoom = function (roomName, pin) {
			Database.ref('rooms').orderByChild('name').equalTo(roomName).limitToFirst(1).on("value", function(snapshot) {
				if(snapshot.val() && pin == snapshot.val()["2"].pin) {
					$state.go('playlist', {roomName: roomName})
				} else {
					var myPopup = $ionicPopup.show({
						title: 'שגיאה בשם חדר או קוד',
						buttons: [
							{ text: 'סגור', type: 'assertive' }
						]
					});
					$scope.room = null;
				}
			});
		};

		$scope.getTestItems = function () {
			return $scope.allRoomsNames;
		};
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
