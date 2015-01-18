// jshint node:true
module.exports = function(grunt){ 'use strict';

var copy, connect, clean;

grunt.loadNpmTasks('grunt-contrib-copy');
copy = {
	requirejs: {
		src: 'node_modules/requirejs/require.js',
		dest: 'src/libs/require.js'
	},

	phaser: {
		src: 'node_modules/phaser/build/phaser.js',
		dest: 'src/libs/phaser.js'
	},

	basejs: {
		src: 'node_modules/basejs/Base.js',
		dest: 'src/libs/base.js'
	},

	typjs: {
		src: 'node_modules/typ.js/typ-require.js',
		dest: 'src/libs/typ.js'
	},

	dbg: {
		src: 'node_modules/dbg/dbg.js',
		dest: 'src/libs/dbg.js'
	}
};

grunt.loadNpmTasks('grunt-contrib-clean');
clean = {
	libs: ['src/libs/']
};

grunt.loadNpmTasks('grunt-contrib-connect');
connect = {
	develop: {
		options: {
			port: 9000,
			keepalive: true,
			open: {
				target  : 'http://0.0.0.0:9000',
				appName : 'Google Chrome'
			}
		}
	}
};

grunt.initConfig({
	clean   : clean,
	copy    : copy,
	connect : connect
});

grunt.registerTask('setup', [
	'clean:libs',
	'copy:requirejs',
	'copy:phaser',
	'copy:basejs',
	'copy:typjs',
	'copy:dbg'
]);

grunt.registerTask('serve', 'connect:develop');

};
