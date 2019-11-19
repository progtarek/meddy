'use strict';

module.exports = function(grunt) {
  grunt.config.set('copy', {
    favicon: {
      src: './app/favicon.ico',
      dest: '.tmp/favicon.ico'
    },
    js: {
      files: [
        {
          expand: true,
          cwd: './app',
          src: ['**/*.js'],
          dest: '.tmp'
        }
      ]
    },
    assets: {
      files: [
        {
          expand: true,
          cwd: './app/assets',
          src: ['**/*.*'],
          dest: '.tmp/assets'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
