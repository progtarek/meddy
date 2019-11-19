'use strict';

(function() {
  var app = angular.module('app');
  app.directive('calendar', function(calendarService) {
    return {
      restrict: 'E',
      templateUrl: 'shared/directives/calendar/calendar.html',
      scope: {
        today: '=',
        tenants: '=',
        pickedDate: '=',
        getTenants: '&',
        addTenant: '&',
        deleteTenant: '&'
      },
      link: function(scope, elements, attrs) {
        var date = new Date();
        scope.monthToggle = false;
        scope.months = calendarService.months;

        /**
         * Generate month's days handler.
         */
        var _buildMonth = function() {
          scope.days = calendarService.buildMonth(
            scope.pickedDate.month + 1,
            scope.pickedDate.year
          );
        };

        /**
         * Add Tenants data to the calendar handler.
         * @param { Tenants List } tenants
         */
        var _addTenantsToCalendar = function(tenants) {
          for (var index = 0; index < tenants.length; index++) {
            var convertedUnix = calendarService.timeConverter(
              tenants[index].time
            );

            if (
              scope.pickedDate.month === convertedUnix.month &&
              scope.pickedDate.year === convertedUnix.year
            ) {
              for (
                var j = 0;
                j < scope.days[convertedUnix.dayName].length;
                j++
              ) {
                if (
                  convertedUnix.day ===
                  scope.days[convertedUnix.dayName][j]['dayNumber']
                ) {
                  scope.days[convertedUnix.dayName][j]['tenant'] =
                    tenants[index].tennantName;
                  if (
                    scope.pickedDate.day ===
                    scope.days[convertedUnix.dayName][j]['dayNumber']
                  ) {
                    scope.pickedDate.tenant = tenants[index].tennantName;
                  }
                }
              }
            }
          }
        };

        /**
         * Get Tenants list between two dates
         * @param { start date } start
         * @param { end date } start
         */
        var _getTenantsBetween = function(start, end) {
          scope
            .getTenants()(start, end)
            .then(
              function(res) {
                scope.tenants = res.data.reserved;
                _addTenantsToCalendar(scope.tenants);
              },
              function(err) {
                window.alert(err.data);
              }
            );
        };

        /**
         * Build next month's days handler
         * on click on next button in calendar.
         */
        scope._buildNextMonth = function() {
          scope.pickedDate.day = null;
          if (scope.pickedDate.month === 11) {
            scope.pickedDate.month = 0;
            scope.pickedDate.year += 1;
          } else {
            scope.pickedDate.month += 1;
          }
          _buildMonth();
          _getTenantsBetween(
            calendarService.dateToUnix(
              scope.pickedDate.month + 1 + '/' + 1 + '/' + scope.pickedDate.year
            ),
            calendarService.dateToUnix(
              calendarService.getLastDay(
                scope.pickedDate.year,
                scope.pickedDate.month + 1
              )
            )
          );
        };

        /**
         * Build previous month's days handler
         * on click on next button in calendar.
         */
        scope._buildPreviousMonth = function() {
          scope.pickedDate.day = null;
          if (scope.pickedDate.month === 0) {
            scope.pickedDate.month = 11;
            scope.pickedDate.year -= 1;
          } else {
            scope.pickedDate.month -= 1;
          }
          _buildMonth();
          _getTenantsBetween(
            calendarService.dateToUnix(
              scope.pickedDate.month + 1 + '/' + 1 + '/' + scope.pickedDate.year
            ),
            calendarService.dateToUnix(
              calendarService.getLastDay(
                scope.pickedDate.year,
                scope.pickedDate.month + 1
              )
            )
          );
        };

        /**
         * Picking day from calendar handler.
         * @param { picked day object contains
         *          day number and tenant name
         *          if exists } day
         */
        scope._pickDay = function(day) {
          scope.pickedDate.day = day.dayNumber;
          scope.pickedDate.tenant = day.tenant;
        };

        /**
         * Toggle switch month handler
         * on click on month picker in calendar.
         */
        scope._toggleMonth = function() {
          scope.monthToggle = !scope.monthToggle;
        };

        /**
         * Moth picker handler
         * on click on month from months list.
         * @param { month index } day.
         */
        scope._pickMonth = function(index) {
          scope.pickedDate.day = null;
          scope.pickedDate.month = index;
          _buildMonth();
          _getTenantsBetween(
            calendarService.dateToUnix(
              scope.pickedDate.month + 1 + '/' + 1 + '/' + scope.pickedDate.year
            ),
            calendarService.dateToUnix(
              calendarService.getLastDay(
                scope.pickedDate.year,
                scope.pickedDate.month + 1
              )
            )
          );
          scope.monthToggle = false;
        };

        /**
         * Cancel tenant stay handler.
         * on cancelling tenant reservation
         * if it exists.
         */
        scope._cancelStay = function() {
          var tenant = {
            tennantName: scope.pickedDate.tenant,
            time: calendarService.dateToUnix(
              scope.pickedDate.month +
                1 +
                '/' +
                scope.pickedDate.day +
                '/' +
                scope.pickedDate.year
            )
          };
          scope.pickedDate.tenant = '';
          scope
            .deleteTenant()(tenant)
            .then(
              function(res) {
                window.alert('Tenant Deleted Successfully');
                _getTenantsBetween(
                  calendarService.dateToUnix(
                    scope.pickedDate.month +
                      1 +
                      '/' +
                      1 +
                      '/' +
                      scope.pickedDate.year
                  ),
                  calendarService.dateToUnix(
                    calendarService.getLastDay(
                      scope.pickedDate.year,
                      scope.pickedDate.month + 1
                    )
                  )
                );
              },
              function(err) {
                window.alert(err.data);
              }
            );
          _buildMonth();
        };

        /**
         * Confirm stay handler for
         * adding new Tenant.
         */
        scope._confirmStay = function() {
          var tenant = {
            tennantName: scope.userForm.name.$viewValue,
            time: calendarService.dateToUnix(
              scope.pickedDate.month +
                1 +
                '/' +
                scope.pickedDate.day +
                '/' +
                scope.pickedDate.year
            )
          };

          scope
            .addTenant()(tenant)
            .then(
              function(res) {
                window.alert('Tenant Added Successfully');
                _getTenantsBetween(
                  calendarService.dateToUnix(
                    scope.pickedDate.month +
                      1 +
                      '/' +
                      1 +
                      '/' +
                      scope.pickedDate.year
                  ),
                  calendarService.dateToUnix(
                    calendarService.getLastDay(
                      scope.pickedDate.year,
                      scope.pickedDate.month + 1
                    )
                  )
                );
              },
              function(err) {
                window.alert(err.data);
              }
            );
        };

        /**
         * Format Date on given custom options
         * @param { given date in unix timestamp } date
         * @param  { date format, optional parameter } format
         */
        scope._formatDate = function(date) {
          return calendarService.formatDate(date);
        };

        // init
        _buildMonth();
        scope.$watch('tenants', function(tenants, old) {
          console.log('tenants list here', tenants);
          if (tenants.length) {
            _buildMonth();
            _addTenantsToCalendar(tenants);
          }
        });
      }
    };
  });
})();
