define([
	'Orbital/States',
	'Options',
	'phaser',
	'debug',
	'dbg'
],
function(
	States,
	Options,
	Phaser,
	Debug
){ 'use strict';

States.Init = {

	init: function(){
		this.setScale();
		this.game.stage.backgroundColor = 0x02223a;
	},

	setScale: function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setUserScale(Options.canvasScale);
	},

	create: function(game){
		// game.add.plugin(Debug);
		game.state.start('Game');
	}

};

return States.Init;

});
