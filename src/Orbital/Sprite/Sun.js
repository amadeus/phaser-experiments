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
		x = game.rnd.realInRange(Options.width - 500, Options.width + 500);
	}

	if (!y && y !== 0) {
		y = game.rnd.realInRange(Options.height - 500, Options.height + 500);
	}

	Phaser.Sprite.call(this, game, x, y, Sun.key);
	this.scale.set(Options.spriteScale);
	game.physics.p2.enable(this);
	this.body.setCircle(Sun.size / 2);
	this.body.mass = 332946;
	this.body.damping = 1;
	this.body._sprite = this;
};

Sun.key = 'sun';
Sun.size = 80 * Options.spriteScale;

Sun.prototype = Object.create(Phaser.Sprite.prototype);
Sun.prototype.constructor = Sun;
Sun.prototype._isSun = true;

return Sun;

});
