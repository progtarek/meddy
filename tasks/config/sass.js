'use strict';

module.exports = function(grunt) {
  grunt.config.set('sass', {
    dev: {
      options: {
        sourcemap: 'none'
      },
      files: [
        {
          expand: true,
          cwd: './app',
          src: ['**/*.scss', '*.scss'],
          dest: '.tmp/',
          ext: '.css'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
