define([
	'Options',
	'phaser',

	'Orbital/States',
	'Orbital/State/Init',
	'Orbital/State/Game',

	'dbg'
],
function(
	Options,
	Phaser,
	States
){ 'use strict';

var Orbital = function(){
	var state;

	Phaser.Game.call(
		this,
		Options.width,
		Options.height,
		Phaser.WEBGL,
		document.body,
		null,
		false,
		true,
		null
	);

	for (state in States) {
		this.state.add(state, States[state]);
	}

	this.toDestroy = [];

	this.state.start('Init');
};

Orbital.prototype = Object.create(Phaser.Game.prototype);
Orbital.prototype.constructor = Orbital;

Orbital.prototype.deferDestroy = function(sprite){
	this.toDestroy.push(sprite);
	return this;
};

// Extend all Sprites to utilized .deferDestroy
Phaser.Sprite.prototype.deferDestroy = function(){
	if (!this.game) {
		return this;
	}
	this.game.toDestroy.push(this);
	return this;
};

return Orbital;

});
