
module.exports = function(grunt) {

  grunt.initConfig({
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
    }
  });


  grunt.loadNpmTasks('grunt-s3');
  grunt.registerTask('default', ['s3']);
};
