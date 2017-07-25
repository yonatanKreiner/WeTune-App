angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})
	
	.filter('numberToTime', function (input) {
		return function () {
			return 0;
		};
	})

	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider

		/**********************************
		 * WELCOME
		 *********************************/
			.state('welcome', {
				url: '/welcome',
				templateUrl: 'templates/welcome/intro.html',
				controller: 'WelcomeCtrl'
			})

			/**********************************
			 * SLIDE
			 *********************************/
			.state('slide', {
				url: '/slide',
				templateUrl: 'templates/slide/slide.html',
				controller: 'SlideCtrl'
			})

			/**********************************
			 * TAB. SEARCH
			 *********************************/
			.state('search', {
				url: '/search',
					templateUrl: 'templates/search/tab-search.html',
					controller: 'SearchCtrl'
			})

			.state('playlist', {
				url: '/playlist/{roomName}',
				templateUrl: 'templates/playlist.html',
				controller: 'playlistCtrl'
			});

		/**********************************
		 * DEFAULT ROUTE
		 *********************************/
		$urlRouterProvider.otherwise('/welcome');
	});
