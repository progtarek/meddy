(function() {
  'use strict';

  angular.module('app').config(routes);

  routes.$inject = ['$stateProvider'];
  function routes($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'modules/pages/home/home.html',
      controller: 'homeCtrl as ctrl',
      data: {}
    });
  }
})();
