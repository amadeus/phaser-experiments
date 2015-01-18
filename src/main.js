requirejs.config({

	baseUrl: 'src/',
	enforceDefine: true,

	paths: {
		phaser : 'libs/phaser',
		debug  : 'libs/phaser-debug',
		dbg    : 'libs/dbg',
		base   : 'libs/base'
	},

	shim: {
		'phaser': {
			exports: 'Phaser'
		},
		'debug': {
			deps: ['phaser'],
			exports: 'Phaser.Plugin.Debug'
		},
		'dbg': {
			exports: 'dbg'
		},
		'base': {
			exports: 'Base'
		}
	}

});

define([
	'Orbital',
	'dbg'
],
function(Orbital){ 'use strict';

dbg.log('Orbital Instance', new Orbital());

});
