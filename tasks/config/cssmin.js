'use strict';

module.exports = function(grunt) {
  grunt.config.set('cssmin', {
    main: {
      files: {
        '.tmp/main.min.css': ['.tmp/main.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
