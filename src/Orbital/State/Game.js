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
		game.world.setBounds(
			0,
			0,
			Options.width  * 2,
			Options.height * 2
		);
		game.camera.x = Options.width  - (Options.width  / 2);
		game.camera.y = Options.height - (Options.height / 2);

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.restitution = 0.2;
		// game.physics.p2.setImpactEvents(true);

		this.overlay = game.add.group(undefined, 'overlay');

		this.group = game.add.physicsGroup(
			Phaser.Physics.P2JS,
			undefined,
			'planets'
		);

		this.suns.push(
			this.group.add(
				new Sun(
					game,
					game.world.width  / 2,
					game.world.height / 2
				)
			)
		);

		// Add lone orbiting planet
		this.group.add(
			new Planet(
				game,
				game.world.width  / 2 - 200,
				game.world.height / 2,
				500
			)
		);

		this.renderedPaths = game.add.renderTexture(
			game.camera.width  * 2,
			game.camera.height * 2
		);

		this.overlay.add(
			game.make.sprite(0, 0, this.renderedPaths)
		);

		this.overlay.alpha = 0.2;

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

	preRender: function(){
		if (this.renderedPaths) {
			this.renderedPaths.renderXY(this.group, 0, 0, false);
		}
	},

	// Example debug - REALLY slows down iPhone
	// render: function(game){
	//     game.debug.text('Charge: ' + this.charged, 10, 30);
	// },

	dirtyCounter: 0,

	setupForces: function(planet){
		var s, len;

		if (!planet._isPlanet) {
			return;
		}

		for (s = 0, len = this.suns.length; s < len; s++) {
			this.accellerateToObject(planet, this.suns[s]);
		}
	},

	accellerateToObject: function(planet, sun){
		var angle, force;

		force = (1 / Math.pow(Phaser.Point.distance(planet, sun), 2)) * sun.body.mass;
		force *= 40;
		if (force <= 0) {
			force = 0;
		}

		angle = Math.atan2(sun.y - planet.y, sun.x - planet.x);
		planet.body.force.x += Math.cos(angle) * force;
		planet.body.force.y += Math.sin(angle) * force;
	}

};

return States.Game;

});
