define([
	'Options',
	'phaser',
	'dbg'
],
function(
	Options,
	Phaser
){ 'use strict';

var Sun = function(game, x, y){
	if (!x && x !== 0) {
		x = game.rnd.realInRange(300, Options.width - 300);
	}

	if (!y && y !== 0) {
		y = game.rnd.realInRange(300, Options.height - 300);
	}

	Phaser.Sprite.call(this, game, x, y, Sun.key);
	this.scale.set(Options.spriteScale);
	game.physics.p2.enable(this);
	this.body.setCircle(Sun.size / 2);
	// this.body.static = true;
	this.body.mass = 332946;
	// this.body.mass = 33332946;
};

Sun.key = 'sun';
Sun.size = 80 * Options.spriteScale;

Sun.prototype = Object.create(Phaser.Sprite.prototype);
Sun.prototype.constructor = Sun;
Sun.prototype._isSun = true;

return Sun;

});
