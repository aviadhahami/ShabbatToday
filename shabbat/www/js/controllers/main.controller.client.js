app.controller("mainController", function($scope, $cordovaMedia, $ionicLoading,$timeout,$cordovaDeviceMotion,$ionicPlatform) {
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
    var fileNames = [];
    fileNames.push('s1.mp3');
    fileNames.push('s2.mp3');
    fileNames.push('s3.mp3');
    fileNames.push('s4.mp3');

    // Generate different file
    var pos = Math.round(Math.random()+fileNames.length-1);

    var pathString = 'www/mp3/';
    return pathString + fileNames[pos];
  };


  // Shake listener


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
