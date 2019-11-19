(function() {
  'use strict';

  angular.module('app').config(routes);

  routes.$inject = ['$stateProvider'];
  function routes($stateProvider) {
    $stateProvider.state('reserve', {
      url: '/reservation',
      templateUrl: 'modules/pages/reservation/reservation.html',
      controller: 'reservationCtrl as ctrl',
      data: {}
    });
  }
})();
