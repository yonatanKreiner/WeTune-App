angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {

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
   * [ABSTRACT] TAB
   *********************************/
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  /**********************************
   * TAB. CAMERA
   *********************************/
  .state('tab.photo', {
    url: '/photo',
    views: {
      'tab-photo': {
        templateUrl: 'templates/photo/tab-photo.html',
        controller: 'PhotoCtrl'
      }
    }
  })

  /**********************************
   * TAB. SEARCH
   *********************************/
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/search/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  /**********************************
   * TAB. FAVORITE
   *********************************/
  .state('tab.favorite', {
    url: '/favorite',
    views: {
      'tab-favorite': {
        templateUrl: 'templates/favorite/tab-favorite.html',
        controller: 'SearchCtrl'
      }
    }
  })

  /**********************************
   * TAB. ACCOUNT
   *********************************/
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  /**********************************
   * DEFAULT ROUTE
   *********************************/
  $urlRouterProvider.otherwise('/welcome');
});
