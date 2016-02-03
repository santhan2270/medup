(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ngCordova', 'ionic-material'])
    .controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'MedService', 'Medications'];

  function DashboardCtrl($scope, $state, $stateParams, $timeout, MedService, Medications) {
    /* Get med data when user enters dashboard */
    var getMedData = function() {
      MedService.getMeds()
        .then(function(medInfoArr) {
          $scope.medications = medInfoArr;
          Medications.userMeds.dbMeds = medInfoArr;
        }).catch(function(err) {
          console.error("unable to fetch medication data from server");
          console.dir(err);
        });
    };
<<<<<<< 530f112276a5c25761db524668534b13b40e3a18

    $scope.$on('$viewContentLoaded', function(event) {
      getMedData();
    });
    
    $scope.getMeds = function () {
      console.log('get meds!');
    };
    $scope.medications = {};
    getMedData();
    
    $scope.editMedication = function(medication) {
      $state.go('medsForm', {
        medId: medication.id
      });
    };
      /**

        TODO:
        - route to medsForm state passing in the information for placeholder
        - should update the database when information is edited and reflect on dashboard
        - should route to dashboard when editing is complete
        - should be able to add multiple alarms on medForm for that medication

       */

    //};

    $scope.moreInformation = function(e, medication) {
      $scope.medication = medication;
      $scope.modal.show();
    };

    $scope.removeReminder = function(medication) {
      MedService.deleteMeds(medication.id)
        .then(function (data) {
          console.info(data);
	  $scope.medications = {};
          getMedData();
	}).catch(function (err) {
          console.error(err);
	});
    };

    // $ionicPlatform.ready(function() {
    //   // testing notifs
    //   var now = new Date().getTime();
    //   var _5SecondsFromNow = new Date(now + 5000);

    //   var notifs = {
    //     id: 12,
    //     at: _5SecondsFromNow,
    //     every: 'minute',
    //     text: "Don't forget to take your medication",
    //     title: "Medication Reminder",
    //   };

    //   $timeout(function() {
    //     Notifications.scheduleNotifications(notifs);
    //   }, 5000);
    // });
  }

})();
