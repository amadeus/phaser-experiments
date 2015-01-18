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

	suns: [],

	create: function(game){
		var x = 2;
		game.world.setBounds(
			0,
			0,
			Options.width  * 2,
			Options.height * 2
		);
		game.camera.x = ((Options.width  * 2) / 2) - (Options.width  / 2);
		game.camera.y = ((Options.height * 2) / 2) - (Options.height / 2);

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.restitution = 0.2;
		// game.physics.p2.setImpactEvents(true);

		this.group = game.add.physicsGroup(
			Phaser.Physics.P2JS,
			undefined,
			'planets'
		);

		dbg.log(
			game.world.width  / 2,
			game.world.height / 2
		);
		while (x) {
			this.suns.push(
				this.group.add(
					new Sun(
						game,
						game.world.width  / 2,
						game.world.height / 2
					)
				)
			);
			x--;
		}

		// Add lone orbiting planet
		this.group.add(
			new Planet(
				game,
				game.world.width  / 2 - 200,
				game.world.height / 2 + (x * 2),
				500
			)
		);

		this.charged = 0;
	},

	update: function(game){
		var planet;

		if (this.charged && game.input.mousePointer.isUp) {
			planet = new Planet(
				game,
				game.input.mousePointer.worldX,
				game.input.mousePointer.worldY,
				this.charged
			);
			this.group.add(planet);
			this.charged = 0;
		}

		if (game.input.mousePointer.isDown) {
			this.charged += 40;
			if (this.charged > 1000) {
				this.charged = 1000;
			}
		}

		this.group.forEachAlive(this.setupForces, this);
	},

	// Example debug - REALLY slows down iPhone
	// render: function(game){
	//     game.debug.text('Charge: ' + this.charged, 10, 30);
	// },

	setupForces: function(planet){
		var s, len;
		for (s = 0, len = this.suns.length; s < len; s++) {
			this.accellerateToObject(planet, this.suns[s]);
		}
	},

	accellerateToObject: function(planet, sun){
		var angle, force;

		force = (2000 - Phaser.Point.distance(planet, sun)) * 0.7;
		if (force <= 0) {
			force = 0;
		}

		angle = Math.atan2(sun.y - planet.y, sun.x - planet.x);
		// planet.body.rotation = angle;
		planet.body.force.x += Math.cos(angle) * force;
		planet.body.force.y += Math.sin(angle) * force;
	}

};

return States.Game;

});
