'use strict';

module.exports = function(grunt) {
  grunt.config.set('wiredep', {
    app: {
      src: '.tmp/index.html'
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
};
