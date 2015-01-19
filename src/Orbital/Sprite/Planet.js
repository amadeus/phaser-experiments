define([
	'Options',
	'phaser',
	'dbg'
],
function(
	Options,
	Phaser
){ 'use strict';

var Planet = function(game, x, y, charge){
	Phaser.Sprite.call(this, game, x, y, Planet.Texture);
	this.scale.set(Options.spriteScale);
	game.physics.p2.enable(this);
	this.body.setCircle(4);
	this.body.mass = 1;
	this.body.damping = 0.00;
	this.body.velocity.y = -(260);
	this.smoothed = true;
};

Planet.Texture = 'planet';
Planet.size = 2 / Options.spriteScale;

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;
Planet.prototype._isPlanet = true;

Planet.prototype.accellerateToObject = function(suns){
	var s, len, sun, angle, force;

	for (s = 0, len = suns.length; s < len; s++) {
		sun = suns[s];
		force = (1 / Math.pow(Phaser.Point.distance(this, sun), 2)) * sun.body.mass;
		force *= 40;
		if (force <= 0) {
			force = 0;
		}

		angle = Math.atan2(sun.y - this.y, sun.x - this.x);
		this.body.rotation = angle + this.game.math.degToRad(90);
		this.body.force.x += Math.cos(angle) * force;
		this.body.force.y += Math.sin(angle) * force;
	}
};

return Planet;

});
