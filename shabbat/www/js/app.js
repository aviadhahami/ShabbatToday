// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova','ngFitText'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }


      // AdMob section

      // select the right Ad Id according to platform
      var admobid = {};
      if( /(android)/i.test(navigator.userAgent) ) { // for android
        admobid = {
          banner: 'ca-app-pub-4975922438318176/8922918248', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-xxx/yyy'
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
          banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-xxx/kkk'
        };
      } else { // for windows phone
        admobid = {
          banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-xxx/kkk'
        };
      }

      if(AdMob) AdMob.createBanner( {
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true } );
    });
  });
