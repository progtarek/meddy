'use strict';
(function() {
  angular.module('app').controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'http', 'calendarService'];

  function homeCtrl($scope, http, calendarService) {
    var vm = this;
    vm.tenants = [];

    /**
     * Initialize component
     */
    function init() {
      vm.getTenants();
    }

    /**
     * Delete Tenant from the list
     * @param { tenant to remove } tenant
     */
    vm.deleteTenant = function(tenant) {
      tenant.reserved = false;
      http.call('post', 'reserve', tenant).then(
        function(res) {
          vm.getTenants();
          window.alert('Tenant Deleted Successfully');
        },
        function(err) {
          window.alert(err.data);
        }
      );
    };

    /**
     * Get list of all tenants.
     */
    vm.getTenants = function() {
      http.call('get', 'reserve').then(
        function(res) {
          vm.tenants = res.data.reserved;
        },
        function(err) {
          window.alert(err.data);
        }
      );
    };

    /**
     * Format date from timestamp
     * to get human readable date.
     * @param { date formate of type timeStamp } timeStamp
     */
    vm.formatDate = function(timeStamp) {
      return calendarService.formatTimeStamp(timeStamp);
    };

    init();
  }
})();
