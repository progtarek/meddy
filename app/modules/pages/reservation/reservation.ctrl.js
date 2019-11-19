'use strict';
(function() {
  angular.module('app').controller('reservationCtrl', reservationCtrl);

  reservationCtrl.$inject = ['$scope', 'http', 'calendarService'];

  function reservationCtrl($scope, http, calendarService) {
    var vm = this;
    $scope.tenants = [];
    var date = new Date();

    vm.today = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };

    vm.pickedDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      tenant: ''
    };

    // Init component
    vm.init = function() {
      vm.getTenants(
        calendarService.dateToUnix(
          vm.today.month + 1 + '/' + 1 + '/' + vm.today.year
        ),
        calendarService.dateToUnix(
          calendarService.getLastDay(vm.today.year, vm.today.month + 1)
        )
      ).then(
        function(res) {
          $scope.tenants = res.data.reserved;
        },
        function(err) {
          window.alert(err);
        }
      );
    };

    /**
     * Remove tenant handler
     * @param { Tenant to remove } tenant
     */
    vm.removeTenant = function(tenant) {
      tenant.reserved = false;

      http.call('post', 'reserve', tenant).then(
        function(res) {
          vm.getTenants(
            calendarService.dateToUnix(
              vm.pickedDate.month + 1 + '/' + 1 + '/' + vm.pickedDate.year
            ),
            calendarService.dateToUnix(
              calendarService.getLastDay(
                vm.pickedDate.year,
                vm.pickedDate.month + 1
              )
            )
          ).then(
            function(res) {
              $scope.tenants = res.data.reserved;
              $scope.pickedDate.tenant = null;
            },
            function(err) {
              window.alert(err);
            }
          );
          window.alert('Tenant Deleted Successfully');
        },
        function(err) {
          window.alert(err.data);
        }
      );
    };

    /**
     * Delete Tenant from calendar handler
     * ( Passed to Calendar Directive )
     * @param { Tenant to remove } tenant
     */
    vm.deleteTenant = function(tenant) {
      tenant.reserved = false;
      return http.call('post', 'reserve', tenant);
    };

    /**
     * Add Tenant in Calendar handler
     * ( Passed to Calendar Directive )
     * @param { Tenant to add } tenant
     */
    vm.addTenant = function(tenant) {
      var payload = tenant;
      payload.reserved = true;
      return http.call('post', 'reserve', payload);
    };

    /**
     * Get Tenants list handler.
     * (Shared in reservation component and Calendar directive)
     * @param { start date in timeStamp } start
     * @param { end date in timeStamp } end
     */
    vm.getTenants = function(start, end) {
      var path = 'reserve/' + start + '/' + end;
      return http.call('get', path);
    };

    /**
     * Format date from timestamp
     * to get human readable date.
     * @param { date formate of type timeStamp } timeStamp
     */
    vm.formatDate = function(timeStamp) {
      return calendarService.formatTimeStamp(timeStamp);
    };

    vm.init();
  }
})();
