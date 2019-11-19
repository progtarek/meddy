'use strict';

module.exports = function(grunt) {
  // display the elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);

  // load the include-all library in order to require all of our grunt
  // configurations and task registrations dynamically.
  var includeAll = require('include-all');

  // loads Grunt configuration modules from the specified
  // relative path. These modules should export a function
  // that, when run, should either load/configure or register
  // a Grunt task.
  function loadTasks(relPath) {
    return includeAll({
      dirname: require('path').resolve(__dirname, relPath),
      filter: /(.+)\.js$/,
      excludeDirs: /^\.git$/
    }) || {};
  }

  // invokes the function from a Grunt configuration module with
  // a single argument - the `grunt` object.
  function invokeConfigFn(tasks) {
    for(var taskName in tasks) {
      if(tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }

  // load task functions
  var taskConfigurations = loadTasks('./tasks/config');
  var registerDefinitions = loadTasks('./tasks/register');

  // ensure that a default task exists
  if(!registerDefinitions.default) {
    registerDefinitions.default = function(grunt) {
      grunt.registerTask('default', []);
    };
  }

  // run task functions to configure Grunt
  invokeConfigFn(taskConfigurations);
  invokeConfigFn(registerDefinitions);
};
