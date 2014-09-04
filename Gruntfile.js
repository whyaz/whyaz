module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    s3: {
      options: {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        access: 'public-read',
        bucket: 'whyaz'
      },
      dev: {
        // These options override the defaults
        options: {
          encodePaths: true,
          maxOperations: 20
        },
        // Files to be uploaded.
        upload: [
          {
            src: 'out/*.html',
            dest: ''
          },
          {
            src: 'out/*.ico',
            dest: ''
          },
          {
            src: 'out/vendor/*.js',
            dest: 'vendor/'
          },
          {
            src: 'out/vendor/*.css',
            dest: 'vendor/'
          },
          {
            src: 'out/images/*',
            dest: 'images'
          },
          {
            src: 'out/assets/js/*.js',
            dest: 'assets/js'
          },
          {
            src: 'out/assets/css/*.css',
            dest: 'assets/css'
          }
        ]
      }
    },

    clean: ['./out'],

    exec: {
      run: {
        cmd: './node_modules/.bin/docpad run'
      },

      buildSite: {
        cmd: './node_modules/.bin/docpad generate --env=production'
      },

      production: {
        cmd: './node_modules/.bin/docpad run --env=production'
      }
    }
  });


  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-node-version');

  grunt.registerTask('prestart', ['clean', 'node_version']);
  grunt.registerTask('build', ['prestart', 'exec:buildSite']);
  grunt.registerTask('run', ['prestart', 'exec:run']);
  grunt.registerTask('production', ['prestart', 'exec:production']);
  grunt.registerTask('deploy', ['build', 's3']);
  grunt.registerTask('default', ['deploy']);
};
