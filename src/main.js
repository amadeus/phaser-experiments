requirejs.config({

	baseUrl: 'src/',
	enforceDefine: true,

	paths: {
		phaser : 'libs/phaser',
		dbg    : 'libs/dbg',
		base   : 'libs/base'
	},

	shim: {
		'phaser': {
			exports: 'Phaser'
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
