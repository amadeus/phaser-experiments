define([
	'phaser',

	'Orbital/States',
	'Orbital/State/Init',
	'Orbital/State/Game',

	'dbg'
],
function(
	Phaser,
	States
){ 'use strict';

var Orbital = function(){
	var state;

	Phaser.Game.call(
		this,
		600 * this._scale,
		480 * this._scale,
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
Orbital.prototype._scale = window.devicePixelRatio;

return Orbital;

});
