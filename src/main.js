requirejs.config({

	baseUrl: 'src/',
	enforceDefine: true,

	paths: {
		'phaser' : 'libs/phaser',
		'debug'  : 'libs/phaser-debug',
		'dbg'    : 'libs/dbg',
		'base'   : 'libs/base',

		'filters/BinarySerpents' : 'libs/filters/BinarySerpents',
		'filters/BlurX'          : 'libs/filters/BlurX',
		'filters/BlurY'          : 'libs/filters/BlurY',
		'filters/CausticLight'   : 'libs/filters/CausticLight',
		'filters/CheckerWave'    : 'libs/filters/CheckerWave',
		'filters/ColorBars'      : 'libs/filters/ColorBars',
		'filters/Fire'           : 'libs/filters/Fire',
		'filters/Gray'           : 'libs/filters/Gray',
		'filters/HueRotate'      : 'libs/filters/HueRotate',
		'filters/LazerBeam'      : 'libs/filters/LazerBeam',
		'filters/LightBeam'      : 'libs/filters/LightBeam',
		'filters/Marble'         : 'libs/filters/Marble',
		'filters/Pixelate'       : 'libs/filters/Pixelate',
		'filters/Plasma'         : 'libs/filters/Plasma',
		'filters/SampleFilter'   : 'libs/filters/SampleFilter',
		'filters/Tunnel'         : 'libs/filters/Tunnel'
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
		},

		'filters/BinarySerpents':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.BinarySerpents'
		},
		'filters/BlurX':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.BlurX'
		},
		'filters/BlurY':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.BlurY'
		},
		'filters/CausticLight':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.CausticLight'
		},
		'filters/CheckerWave':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.CheckerWave'
		},
		'filters/ColorBars':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.ColorBars'
		},
		'filters/Fire':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.Fire'
		},
		'filters/Gray':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.Gray'
		},
		'filters/HueRotate':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.HueRotate'
		},
		'filters/LazerBeam':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.LazerBeam'
		},
		'filters/LightBeam':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.LightBeam'
		},
		'filters/Marble':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.Marble'
		},
		'filters/Pixelate':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.Pixelate'
		},
		'filters/Plasma':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.Plasma'
		},
		'filters/SampleFilter':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.SampleFilter'
		},
		'filters/Tunnel':{
			deps: ['phaser'],
			exports: 'Phaser.Filter.Tunnel'
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
