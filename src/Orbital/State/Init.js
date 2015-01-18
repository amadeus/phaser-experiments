define([
	'Orbital/States',
	'Options',
	'phaser',
	'dbg'
],
function(
	States,
	Options,
	Phaser
){ 'use strict';

States.Init = {

	init: function(){
		this.setScale();
		this.game.stage.backgroundColor = 0x032F51;
	},

	setScale: function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setUserScale(Options.canvasScale);
	},

	create: function(game){
		dbg.log('States.Init has loaded');
		game.state.start('Game');
	}

};

return States.Init;

});
