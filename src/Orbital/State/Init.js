define([
	'Orbital/States',
	'phaser',
	'dbg'
],
function(
	States,
	Phaser
){ 'use strict';

States.Init = {

	init: function(){
		this.setScale();
	},

	setScale: function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.setUserScale(1 / this.game._scale);
	},

	create: function(game){
		dbg.log('Orbital.init');
		game.state.start('Game');
	}

};

return States.Init;

});
