define([
	'Orbital/States',
	'Orbital/Sprite/Sun',
	'Orbital/Sprite/Planet',
	'Options',
	'phaser',
	'filters/BlurX',
	'filters/BlurY',
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
		// Remove world physics bounds
		game.physics.p2.setBounds(
			null,  null,  null,  null,
			false, false, false, false
		);
		game.physics.p2.onBeginContact.add(this._handleCollision, this);
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
					game //,
					// game.world.width  / 2,
					// game.world.height / 2
				)
			)
		);

		this.suns.push(
			this.group.add(
				new Sun(
					game //,
					// game.world.width  / 2,
					// game.world.height / 2
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

		this.setupPathRendering(game);

		this.charged = 0;
	},

	_handleCollision: function(bodyA, bodyB){
		var planet, sun;
		if (bodyA.parent.sprite._isPlanet) {
			planet = bodyA.parent.sprite;
		}
		if (bodyB.parent.sprite._isPlanet) {
			planet = bodyB.parent.sprite;
		}

		if (bodyA.parent.sprite._isSun) {
			sun = bodyA.parent.sprite;
		}
		if (bodyB.parent.sprite._isSun) {
			sun = bodyB.parent.sprite;
		}

		if (!planet || !sun) {
			return;
		}

		planet.kill();
	},

	setupPathRendering: function(game){
		var blurX = game.add.filter('BlurX');
		var blurY = game.add.filter('BlurY');

		blurX.blur = 3;
		blurY.blur = 3;

		this.renderedPathsTexture = game.make.renderTexture(
			game.camera.width  * 2,
			game.camera.height * 2
		);

		this.renderedPathsTexture._durp = true;

		this.renderedPaths = game.make.sprite(0, 0, this.renderedPathsTexture);
		this.renderedPaths.smoothed = true;
		this.renderedPaths.filters = [blurX, blurY];

		this.overlay.add(this.renderedPaths);
		this.overlay.alpha = 0.2;
	},

	update: function(game){
		var planets = this.group.children,
			p, len, planet;

		this.handleInput(game);

		for (p = 0, len = planets.length; p < len; p++) {
			planet = planets[p];
			if (planet.accellerateToObject) {
				planet.accellerateToObject(this.suns);
			}
		}
		planet = null;
	},

	handleInput: function(game){
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
	},

	preRender: function(){
		if (this.renderedPathsTexture) {
			this.renderedPathsTexture.renderXY(this.group, 0, 0, false);
		}
	}

	// Example debug - REALLY slows down iPhone
	// render: function(game){
	//     game.debug.text('Charge: ' + this.charged, 10, 30);
	// },

};

return States.Game;

});
