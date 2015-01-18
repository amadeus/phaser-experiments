define([
	'Orbital/States',
	'Orbital/Sprite/Sun',
	'Orbital/Sprite/Planet',
	'Options',
	'phaser',
	'dbg'
],
function(
	States,
	Sun,
	Planet,
	Options,
	Phaser
){ 'use strict';

States.Game = {

	assets: {
		'sun'    : 'assets/sprites/sun.png',
		'planet' : 'assets/sprites/planet.png'
	},

	preload: function(game){
		var key;

		for (key in this.assets) {
			game.load.image(key, this.assets[key]);
		}
	},

	planets: [],

	create: function(game){
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 0;
		game.physics.p2.restitution = 0.2;
		game.physics.p2.setImpactEvents(true);

		this.group = game.add.physicsGroup(
			Phaser.Physics.P2JS,
			undefined,
			'planets'
		);

		this.sun = this.group.add(
			new Sun(
				game,
				Options.width  / 2,
				Options.height / 2
			)
		);

		this.fired = true;
		dbg.log('States.Game has loaded');
	},

	update: function(game){
		var planet;

		if (this.fired && game.input.mousePointer.isDown) {
			this.fired = false;
		}

		if (!this.fired && game.input.mousePointer.isUp) {
			this.fired = true;
			planet = new Planet(game, game.input.mousePointer.x, game.input.mousePointer.y);
			this.group.add(planet);
		}

		this.group.forEachAlive(this.accellerateToObject, this);
	},

	accellerateToObject: function(planet){
		var angle, force;

		force = (1000 - Phaser.Point.distance(planet, this.sun));
		if (force <= 0) {
			force = 0.1;
		}

		angle = Math.atan2(this.sun.y - planet.y, this.sun.x - planet.x);
		planet.body.rotation = angle;
		planet.body.force.x = Math.cos(angle) * force;
		planet.body.force.y = Math.sin(angle) * force;
	}

};

return States.Game;

});
