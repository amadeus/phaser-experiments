define([
	'Options',
	'phaser',
	'dbg'
],
function(
	Options,
	Phaser
){ 'use strict';

var Satellite = function(game, x, y, velX, velY, collisionGroup){
	Phaser.Sprite.call(this, game, x, y, Satellite.Texture);
	this.scale.set(Options.spriteScale);
	game.physics.p2.enable(this);
	this.body.setCircle(4);
	this.body.mass = 1;
	this.body.damping = 0.00;
	this.body.velocity.x = velX;
	this.body.velocity.y = velY;
	this.smoothed = true;
	this.body.setCollisionGroup(collisionGroup);
	this.body.collides(collisionGroup, this._handleCollision, this);
};

Satellite.Texture = 'satellite';
Satellite.size = 2 / Options.spriteScale;

Satellite.prototype = Object.create(Phaser.Sprite.prototype);
Satellite.prototype.constructor = Satellite;
Satellite.prototype._isSatellite = true;

Satellite.prototype._handleCollision = function(body1, body2){
	// If we have collided with the sun, destroy ourselves
	if (body2.sprite._isSun) {
		this.deferDestroy();
	}
};

Satellite.prototype.accellerateToObject = function(suns){
	var s, len, sun, angle, force, distanceFromCenter;

	for (s = 0, len = suns.length; s < len; s++) {
		sun = suns[s];
		force = (1 / Math.pow(Phaser.Point.distance(this, sun), 2)) * sun.body.mass;
		force *= 60;

		angle = Math.atan2(sun.y - this.y, sun.x - this.x);
		this.body.rotation = angle + this.game.math.degToRad(90);
		this.body.force.x += Math.cos(angle) * force;
		this.body.force.y += Math.sin(angle) * force;
	}

	distanceFromCenter = Phaser.Point.distance(this, {
		x: Options.worldWidth  / 2,
		y: Options.worldHeight / 2
	});

	if (distanceFromCenter > 8000) {
		this.deferDestroy(this);
	}
};

return Satellite;

});
