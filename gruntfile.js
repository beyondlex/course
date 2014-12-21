
module.exports = function(grunt) {
	grunt.initConfig({
      	watch: {
	        express: {
	            files:  [ '**/*.js' ],
	            tasks:  [ 'express:dev' ],
	            options: {
	            	atBegin: true,
	                spawn: false 
	        	}
	        }
   		},
        express:{
        	
            dev: {
            	options:{
            		port: 3000,
                    script:"./bin/www"
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("default",['watch:express']);
}


