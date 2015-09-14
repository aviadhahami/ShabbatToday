app.controller("mainController", function($scope, $cordovaMedia, $ionicLoading,$timeout,$cordovaDeviceMotion,$ionicPlatform,$window) {
  console.log('controller running');

  var count= 0;
  // Setup
  var colorSchemes = [];
  colorSchemes.push({'bg':'#3C4049','text':'#141518'});
  colorSchemes.push({'bg':'#605E50','text':'#1F1E1B'});
  colorSchemes.push({'bg':'#3B0F7B','text':'#2D0863'});
  colorSchemes.push({'bg':'#29153F','text':'#6C508C'});
  colorSchemes.push({'bg':'#133B24','text':'#46775A'});
  colorSchemes.push({'bg':'#663726','text':'#D3A18E'});

  $scope.fontColor = 'black';
  $scope.bgColor = 'white';
  var androidSourceString = '/android_asset/';


  // Sign files
  var fileNames = [];
  fileNames.push('s1.mp3');
  fileNames.push('s2.mp3');
  fileNames.push('s3.mp3');
  fileNames.push('s4.mp3');


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
    console.log(++count);
    if (count === 10 ){
      showAdAndReload()
    }
    toggleColors();
    playSound();
  };

  var showAdAndReload = function(){
    $window.location.reload();
  };

  var playSound = function(){
    console.log('played sound');
    var src_string = isAndroid ? androidSourceString +getSoundSrc() : getSoundSrc();
    play(src_string);
  };


  var getSoundSrc = function(){

    // Generate different file
    var pos = getRandomNumberInRange(fileNames.length);

    var pathString = 'www/mp3/';
    console.log('should play '+ fileNames[pos], pos );
    return pathString + fileNames[pos];
  };

  var getRandomNumberInRange = function(max){
    return Math.round(Math.random()*(max-1));
  }

  // Misc functions
  var toggleColors = function(){
    // in toggle colors
    var randomizedColorScheme = colorSchemes[getRandomNumberInRange(colorSchemes.length)];
    $scope.bgColor = randomizedColorScheme.bg;
    $scope.fontColor = randomizedColorScheme.text;
  };

  var isAndroid = function(){
    return ionic.Platform.isAndroid()
  };
});
