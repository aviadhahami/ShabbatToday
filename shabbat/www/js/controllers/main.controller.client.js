app.controller("mainController", function($scope, $cordovaMedia, $ionicLoading) {
  console.log('controller running');
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
  }
  $scope.playSound = function(){
    console.log('played sound');
    var src_string = isAndroid ? androidSourceString +getSoundSrc() : getSoundSrc();
    //play(src_string);
    play(getSoundSrc());
  };
  var isAndroid = function(){
    return ionic.Platform.isAndroid()
  };
  var androidSourceString = '/android_asset/';
  var getSoundSrc = function(){
    return 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3';
  }

});
