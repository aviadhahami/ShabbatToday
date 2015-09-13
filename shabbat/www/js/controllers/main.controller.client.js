app.controller("mainController", function($scope, $cordovaMedia, $ionicLoading,$timeout) {
  console.log('controller running');


  $scope.fontColor = 'black';
  $scope.bgColor = 'white';


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
  var toggleColors = function(){
    $scope.fontColor = 'white';
    $scope.bgColor = 'black';
    $timeout(function(){
      $scope.fontColor = 'black';
      $scope.bgColor = 'white';
    },100);

  };
  var playSound = function(){
    console.log('played sound');
    var src_string = isAndroid ? androidSourceString +getSoundSrc() : getSoundSrc();
    play(src_string);
  };
  var isAndroid = function(){
    return ionic.Platform.isAndroid()
  };

  var androidSourceString = '/android_asset/';
  var getSoundSrc = function(){
    var fileName = 's1.mp3';
    var pathString = 'www/mp3/';
    return pathString + fileName;
  }

});
