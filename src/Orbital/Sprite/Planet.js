define([
	'Options',
	'phaser',
	'dbg'
],
function(
	Options,
	Phaser
){ 'use strict';

var Planet = function(game, x, y){
	Phaser.Sprite.call(this, game, x, y, Planet.Texture);
	this.scale.set(Options.spriteScale);
	game.physics.p2.enable(this);
	this.body.mass = 1;
	this.body.damping = 0.01;
	this.body.velocity.y = -200;
};

Planet.Texture = 'planet';
Planet.size = 2 / Options.spriteScale;

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

return Planet;

});
