'use strict';

module.exports = function(grunt) {
  grunt.config.set('uglify', {
    main: {
      files: {
        '.tmp/main.min.js': ['.tmp/main.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
