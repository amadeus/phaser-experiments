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
	'phaser',
	'base',
	'dbg'
],
function(
	Phaser,
	Base
){ 'use strict';

dbg.log('Main has loaded!');

});
