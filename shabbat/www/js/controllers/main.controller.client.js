app.controller("mainController", function($scope, $cordovaMedia, $ionicLoading,$timeout) {
  console.log('controller running');
  $scope.dayToday = '?שבת היום';
  var play = function(src) {
    //var media = new Media(src, null, null, mediaStatusCallback);
    //$cordovaMedia.play(media);
  }

  var mediaStatusCallback = function(status) {
    if(status == 1) {
      $ionicLoading.show({template: 'Loading...'});
    } else {
      $ionicLoading.hide();
    }
  };

  $scope.playSequence = function(){
    updateString();
    $timeout(restoreString, 200);
    playSound();
  };
  var updateString = function(){
    $scope.dayToday = '!שבת היום';
  };
  var restoreString = function(){
    $scope.dayToday = '?שבת היום';
  }
  var playSound = function(){
    console.log('played sound');
    var src_string = isAndroid ? androidSourceString +getSoundSrc() : getSoundSrc();
    //play(src_string);
  };
  var isAndroid = function(){
    return ionic.Platform.isAndroid()
  };
  var androidSourceString = '/android_asset/';
  var getSoundSrc = function(){
    return 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3';
  }

});
