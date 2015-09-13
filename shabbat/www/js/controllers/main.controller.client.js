app.controller("mainController", function($scope, $cordovaMedia, $ionicLoading,$timeout,$cordovaDeviceMotion) {
  console.log('controller running');

  // Setup
  $scope.fontColor = 'black';
  $scope.bgColor = 'white';
  var androidSourceString = '/android_asset/';


  // Play music related functions
  var play = function(src) {
    var media = new Media(src, null, null, mediaStatusCallback);
    $cordovaMedia.play(media);
  }

  var mediaStatusCallback = function(status) {
    if(status == 1) {
      $ionicLoading.show({template: 'Loading...'});
    } else {
      $ionicLoading.hide();
    }
  };

  $scope.playSequence = function(){
    toggleColors();
    playSound();
  };

  var playSound = function(){
    console.log('played sound');
    var src_string = isAndroid ? androidSourceString +getSoundSrc() : getSoundSrc();
    play(src_string);
  };


  var getSoundSrc = function(){
    var fileName = 's1.mp3';
    var pathString = 'www/mp3/';
    return pathString + fileName;
  };


  // Shake listener
  // Start watching for shake gestures and call "onShake"
  // with a shake sensitivity of 40 (optional, default 30)
  //console.log($window);
  $timeout(function(){
    window.shake.startWatch(console.log('shake'), 30 /*, onError */);
  },1000);


  // Stop watching for shake gestures
  //shake.stopWatch();

  // Misc functions
  var toggleColors = function(){
    $scope.fontColor = 'white';
    $scope.bgColor = 'black';
    $timeout(function(){
      $scope.fontColor = 'black';
      $scope.bgColor = 'white';
    },200);
  };

  var isAndroid = function(){
    return ionic.Platform.isAndroid()
  };
});
