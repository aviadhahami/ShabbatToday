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
    var fileName = 's1.mp3';
    var pathString = 'www/mp3/';
    return pathString + fileName;
  };


  // Shake listener

  // watch Acceleration options
  $scope.options = {
    frequency: 100, // Measure every 100ms
    deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
  };

  // Current measurements
  $scope.measurements = {
    x : null,
    y : null,
    z : null,
    timestamp : null
  }

  // Previous measurements
  $scope.previousMeasurements = {
    x : null,
    y : null,
    z : null,
    timestamp : null
  }

  // Watcher object
  $scope.watch = null;

  // Start measurements when Cordova device is ready
  $ionicPlatform.ready(function() {

    // FIXME
    console.log('in init');

    //Start Watching method
    $scope.startWatching = function() {

      // Device motion configuration
      $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);

      // Device motion initilaization
      $scope.watch.then(null, function(error) {
        console.log('Error');
      },function(result) {

        // FIXME
        console.log('watch promise');

        // Set current data
        $scope.measurements.x = result.x;
        $scope.measurements.y = result.y;
        $scope.measurements.z = result.z;
        $scope.measurements.timestamp = result.timestamp;

        // Detect a shake
        $scope.detectShake(result);

      });
    };

    // Stop watching method
    $scope.stopWatching = function() {
      $scope.watch.clearWatch();
    }

    // Detect shake method
    $scope.detectShake = function(result) {

      // FIXME
      console.log('shake detecting')

      //Object to hold measurement difference between current and old data
      var measurementsChange = {};

      // Calculate measurement change only if we have two sets of data, current and old
      if ($scope.previousMeasurements.x !== null) {
        measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
        measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
        measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
      }

      // If measurement change is bigger then predefined deviation
      if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
        $scope.stopWatching();  // Stop watching because it will start triggering like hell
        console.log('Shake detected'); // shake detected
        setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sec

        // Clean previous measurements after successful shake detection, so we can do it next time
        $scope.previousMeasurements = {
          x: null,
          y: null,
          z: null
        }

      } else {

        console.log('in else');

        // On first measurements set it as the previous one
        $scope.previousMeasurements = {
          x: result.x,
          y: result.y,
          z: result.z
        }
      }

    }

  });

  $scope.$on('$ionicView.beforeLeave', function(){
    $scope.watch.clearWatch(); // Turn off motion detection watcher
  });



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
