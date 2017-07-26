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
app.controller('WelcomeCtrl', function(Firebase, Auth, $scope, $stateParams, $ionicModal, $location, $rootScope) {

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
      $rootScope.userName = authData.email;
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
app.controller('playlistCtrl', function($scope, $stateParams, Database, Auth, $ionicModal, $http, $ionicPopup, $rootScope, $location) {
	$scope.roomName = $stateParams.roomName;
	$rootScope.$currentUser = $rootScope.userName;
	Database.ref('rooms/' + $scope.roomName + '/users').push($rootScope.userName || 'unknown').then(function () {

	}, function (err) {

	});
	Database.ref('rooms/' + $scope.roomName).on("value", function(snapshot) {
		$scope.allSongs = snapshot.val().songs;
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {

			$scope.$apply();
		}
	});

	$scope.logOut = function () {
		$location.path('/search');
	};

/**********************************
 * [CONTROLLER] SONGS
 *********************************/

	$scope.addNewSong = function () {
		$ionicModal.fromTemplateUrl('templates/addSongModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modalAddSong = modal;
			$scope.modalAddSong.show();
		});
	};

  $scope.findSongID = function(song, roomName) {

		return Database.ref("rooms/" + roomName + "/songs").once("value", function(childSnapshot) {
			childSnapshot.forEach(function(snapshot) {
				var childKey = snapshot.key;
				var childValue = snapshot.val();

				console.log(childKey + ":" + childValue);

				if(snapshot.val()["name"] === song.name)
					return childKey;
			})
		});
	}

	$scope.removeSongFromDB = function(song, roomName) {
		Database.ref("rooms/" + roomName + "/songs").child(song.id).remove();
	};

  $scope.removeSongFromList = function(song, roomName) {
		var myPopup = $ionicPopup.show({
			template: '<p style="direction: rtl">אחי אתה בטוח?</p>',
			scope: $scope,
			buttons: [
				{ text: 'ביטול', type:'button-calm' },
				{
					text: '<b>אישור</b>',
					type: 'button-positive',
					onTap: function(e) {
						var id = $scope.findSongID(song, roomName);
						$scope.removeSongFromDB(id, roomName);
					}
				}
			]
		});
	};

	$scope.addSongToDBList = function (song) {
		$http.get('https://www.googleapis.com/youtube/v3/videos', {
			params: {
				key: "AIzaSyC-0pj2WMY25D3OzmB-Icl3GmBPI4PICjg",
				part: 'snippet, contentDetails',
				id: song.id.videoId
			}
		}).then(function (data) {
			var duration = convertISO8601ToSeconds(data.data.items[0].contentDetails.duration) / 60;
			Database.ref('rooms/' + $scope.roomName + '/songs').push({"length": duration, "name":song.snippet.title, "requester":$rootScope.userName || 'unknown', "thumb":song.snippet.thumbnails.default.url, "url":song.id.videoId}).then(function (data) {

			}, function (err) {

			});
		}, function (err) {

		});
	};

	function convertISO8601ToSeconds(input) {

		var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
		var hours = 0, minutes = 0, seconds = 0, totalseconds;

		if (reptms.test(input)) {
			var matches = reptms.exec(input);
			if (matches[1]) hours = Number(matches[1]);
			if (matches[2]) minutes = Number(matches[2]);
			if (matches[3]) seconds = Number(matches[3]);
			totalseconds = hours * 3600  + minutes * 60 + seconds;
		}

		return (totalseconds);
	}

	$scope.addSongToList = function (song) {
		var myPopup = $ionicPopup.show({
			template: '<p style="direction: rtl">להוסיף שיר לרשימה?</p>',
			scope: $scope,
			buttons: [
				{ text: 'בטל', type:'button-calm' },
				{
					text: '<b>הוסף</b>',
					type: 'button-positive',
					onTap: function(e) {
						$scope.addSongToDBList(song);
					}
				}
			]
		});
	};

	$scope.getYoutubeData = function(searchText){
		$http.get('https://www.googleapis.com/youtube/v3/search', {
			params: {
				key: "AIzaSyC-0pj2WMY25D3OzmB-Icl3GmBPI4PICjg",
				type: 'audio',
				maxResults: '12',
				pageToken: $scope.nextPage ? $scope.nextPage : '',
				part: 'id,snippet',
				fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken,prevPageToken',
				q: searchText
			}
		}).then(function (data) {
			$scope.suggestions = data.data.items;
		}, function (err) {

		})
	};
});

/**********************************
 * [CONTROLLER] SEARCH
 *********************************/
app.controller('SearchCtrl', function($scope, roomsService, Database, $ionicPopup, $state) {

		$scope.logInToRoom = function (roomName, pin) {
			Database.ref('rooms/' + roomName).on("value", function(snapshot) {
				if(snapshot.val() && pin == snapshot.val().pin) {
					$state.go('playlist', {roomName: roomName}, {reload: true})
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
