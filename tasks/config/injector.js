'use strict';

module.exports = function(grunt) {
  grunt.config.set('injector', {
    options: {
      ignorePath: '.tmp',
      addRootSlash: true
    },
    local_dependencies: {
      files: {
        '.tmp/index.html': [
          [
            '.tmp/env.js',
            '.tmp/app.js',
            '.tmp/!(env)*.js',

            '.tmp/services/**/*.js',
            '.tmp/directives/**/*.js',
            '.tmp/filters/**/*.js',

            '.tmp/**/**/*.js',
            '.tmp/**/!(shared)/module/module.js',
            '.tmp/**/!(shared)/module/!(module).js',
            '.tmp/**/!(shared)/!(module)/*.js'
          ],
          ['.tmp/**/shared/**/*.css', '.tmp/**/!(shared)/**/*.css']
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-injector');
};
