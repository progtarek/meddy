'use strict';

module.exports = function(grunt) {
  grunt.config.set('clean', {
    dev: ['.tmp']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
