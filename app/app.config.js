(function() {
  'use strict';

  angular
    .module('app')
    .constant('env', window._env)
    .config(appConfig);

  appConfig.$inject = ['$urlRouterProvider'];

  function appConfig($urlRouterProvider) {
    // the known route, with missing '/' - let's create alias
    $urlRouterProvider.when('', '/home');

    // the unknown
    $urlRouterProvider.otherwise('/home');
  }
})();
