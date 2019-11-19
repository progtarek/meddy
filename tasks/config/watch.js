'use strict';

module.exports = function(grunt) {
  grunt.config.set('watch', {
    options: {
      livereload: true
    },
    index: {
      files: ['app/index.pug'],
      tasks: ['pug:index', 'wiredep', 'injector']
    },
    pug: {
      files: ['app/**/!(index).pug'],
      tasks: ['pug:components']
    },
    sass: {
      files: ['app/**/*.scss'],
      tasks: ['sass']
    },
    js: {
      files: ['Gruntfile.js', 'tasks/**/*.js', 'app/**/*.js'],
      tasks: ['jshint', 'copy:js', 'injector']
    },
    assets: {
      files: ['app/assets/**/*.*'],
      tasks: ['copy:assets']
    },
    bower: {
      files: ['bower_components'],
      tasks: ['wiredep']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
