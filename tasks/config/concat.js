'use strict';

module.exports = function(grunt) {
  grunt.config.set('concat', {
    js: {
      src: [
        '.tmp/app.js',
        '.tmp/*.js',
        '.tmp/**/**/*.js',
        '.tmp/**/**/*.js',
        '.tmp/**/!(shared)/**/*.js'
      ],
      dest: '.tmp/main.js'
    },
    css: {
      src: ['.tmp/**/**/*.css', '.tmp/**/!(shared)/**/*.css'],
      dest: '.tmp/main.css'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
