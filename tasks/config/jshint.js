'use strict';

module.exports = function(grunt) {
  grunt.config.set('jshint', {
    options: {
      jshintrc: true,
      reporter: require('jshint-stylish')
    },
    all: [
      'Gruntfile.js',
      'tasks/**/*.js',
      'app/**/*.js'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
