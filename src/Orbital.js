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
		false,
		null
	);

	for (state in States) {
		this.state.add(state, States[state]);
	}

	this.state.start('Init');
};

Orbital.prototype = Object.create(Phaser.Game.prototype);
Orbital.prototype.constructor = Orbital;

return Orbital;

});
