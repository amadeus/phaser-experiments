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
		// var p;
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 0;
		game.physics.p2.restitution = 0.8;

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

		// for (p = 0; p < 100; p++) {
		//     this.planets.push(
		//         new Planet(
		//             game,
		//             game.rnd.realInRange(0, Options.width),
		//             game.rnd.realInRange(0, Options.height)
		//         )
		//     );
		//     this.group.add(this.planets[this.planets.length - 1]);
		// }
		// dbg.log(this.planets[0].body.damping);

		dbg.log('States.Game has loaded');
		this.fired = true;
	},

	update: function(game){
		var p, len, planet;

		if (this.fired && game.input.mousePointer.isDown) {
			this.fired = false;
		}

		if (!this.fired && game.input.mousePointer.isUp) {
			this.fired = true;
			planet = new Planet(game, game.input.mousePointer.x, game.input.mousePointer.y);
			this.planets.push(planet);
			this.group.add(planet);
		}

		for (p = 0, len = this.planets.length; p < len; p++) {
			this.accellerateToObject(this.planets[p], this.sun);
		}
	},

	accellerateToObject: function(planet, sun){
		var angle, force;

		// force = this.sun.mass / 1000;
		// speed = 20
		force = (1000 - Phaser.Point.distance(planet, sun)) * 0.5;
		if (force <= 0) {
			force = 0.1;
		}

		angle = Math.atan2(sun.y - planet.y, sun.x - planet.x);
		planet.body.rotation = angle;
		planet.body.force.x = Math.cos(angle) * force;
		planet.body.force.y = Math.sin(angle) * force;
	}

};

return States.Game;

});
