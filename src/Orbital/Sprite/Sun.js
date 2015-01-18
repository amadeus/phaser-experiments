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
	Phaser.Sprite.call(this, game, x, y, Sun.key);
	this.scale.set(Options.spriteScale);
	game.physics.p2.enable(this);
	this.body.setCircle(Sun.size / 2);
	this.body.static = true;
	this.mass = 332946;
};

Sun.key = 'sun';
Sun.size = 80 * Options.spriteScale;

Sun.prototype = Object.create(Phaser.Sprite.prototype);
Sun.prototype.constructor = Sun;

return Sun;

});
