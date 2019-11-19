(function() {
  'use strict';

  angular.module('app').service('calendarService', calendarService);

  function calendarService() {
    var _locale = 'en-US';
    var _days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
    var _local = 'en-US';
    var _months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'September',
      'october',
      'november',
      'december'
    ];
    var _defaultDateFormat = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    var formatTimeStamp = function(timestamp, format) {
      format = format || _defaultDateFormat;
      var event = new Date(timestamp * 1000);
      return event.toLocaleDateString(_local, format);
    };

    var formatDate = function(date, format) {
      format = format || _defaultDateFormat;
      var event = new Date(date);
      return event.toLocaleDateString(_local, format);
    };

    var dateToUnix = function(date) {
      return new Date(date).getTime() / 1000;
    };

    var getLastDay = function(year, month) {
      return new Date(year, month, 0).toISOString().slice(0, 10);
    };
    var _isLeapYear = function(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    var _mod = function(n, x) {
      return ((n % x) + x) % x;
    };

    var _daysInMonth = function(year, month) {
      if (isNaN(year) || isNaN(month)) {
        return NaN;
      }
      var modMonth = _mod(month, 12);
      year += (month - modMonth) / 12;

      if (modMonth === 1) {
        if (_isLeapYear(year)) {
          return 29;
        } else {
          return 28;
        }
      } else {
        return 31 - ((modMonth % 7) % 2);
      }
    };

    var buildMonth = function(month, year) {
      var hashmap = {};
      for (var i = 0; i < _daysInMonth(month, year); i++) {
        var date = month + '-' + (i + 1) + '-' + year;
        var dayName = _days[new Date(date).getDay()];
        if (Array.isArray(hashmap[dayName])) {
          hashmap[dayName].push({
            dayNumber: i + 1,
            tenant: ''
          });
        } else {
          hashmap[dayName] = [
            {
              dayNumber: i + 1,
              tenant: ''
            }
          ];
        }
      }
      return hashmap;
    };

    var timeConverter = function(UNIX_timestamp) {
      var date = new Date(UNIX_timestamp * 1000);
      return {
        dayName: _days[date.getDay()],
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      };
    };

    return {
      weekdays: _days,
      months: _months,
      buildMonth: buildMonth,
      timeConverter: timeConverter,
      formatTimeStamp: formatTimeStamp,
      formatDate: formatDate,
      dateToUnix: dateToUnix,
      getLastDay: getLastDay
    };
  }
})();
