define([
	'phaser'
],
function(
	Phaser
){ 'use strict';

var SunEmitter = function(game, target, callback){
	this.game     = game;
	this.callback = callback;
	this.target   = target;
	this.spawnKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
};

SunEmitter.prototype = {

	callOnce: false,

	update: function(){
		if (this.spawnKey.isDown && !this.callOnce) {
			this.callOnce = true;
			this.callback(this.target.x, this.target.y);
		} else if (this.spawnKey.isUp && this.callOnce) {
			this.callOnce = false;
		}
	},

	// None of these are used, simply used to allow
	// the class to be added like a Sprite
	setStageReference: function(){},
	updateTransform: function(){},
	preUpdate: function(){},
	postUpdate: function(){},
	_renderWebGL: function(){},
	render: function(){}
};

return SunEmitter;

});
