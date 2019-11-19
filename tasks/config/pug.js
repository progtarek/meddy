'use strict';

module.exports = function(grunt) {
  grunt.config.set('pug', {
    index: {
      options: {
        pretty: true
      },
      files: { '.tmp/index.html': './app/index.pug' }
    },
    components: {
      options: {
        pretty: true
      },
      files: [{
        expand: true,
        cwd: './app',
        src: ['**/!(index).pug'],
        dest: '.tmp',
        ext: '.html'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-pug');
};
