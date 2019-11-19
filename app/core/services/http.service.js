(function() {
  'use strict';

  angular.module('app').factory('http', http);

  http.$inject = ['$http', 'env'];

  function http($http, env) {
    var baseUrl = env.apiUrl;
    var client = {
      get: function(path) {
        return $http({
          method: 'GET',
          url: baseUrl + '/' + path
        });
      },
      post: function(path, payload) {
        payload = payload ? payload : {};
        return $http({
          method: 'POST',
          data: payload,
          url: baseUrl + '/' + path
        });
      },
      delete: function(path) {
        return $http({
          method: 'DELETE',
          url: baseUrl + '/' + path
        });
      },
      update: function(path) {
        return $http({
          method: 'PUT',
          url: baseUrl + '/' + path
        });
      }
    };

    function call(name, path, payload) {
      if (!client[name]) {
        return {};
      }
      return client[name](path, payload);
    }

    return {
      call: call
    };
  }
})();
