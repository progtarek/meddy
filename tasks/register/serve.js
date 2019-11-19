'use strict';

module.exports = function(grunt) {
  grunt.registerTask('serve', [
    'clean',
    'jshint',
    'sass',
    'pug',
    'copy',
    'wiredep',
    'injector',
    'connect',
    'watch'
  ]);
};
