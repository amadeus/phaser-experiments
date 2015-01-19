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
			Options.worldX,
			Options.worldY
		);

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.restitution = 0.2;
		// Remove world physics bounds
		game.physics.p2.setBounds(
			null,  null,  null,  null,
			false, false, false, false
		);
		game.physics.p2.onBeginContact.add(this._handleCollision, this);

		this.background = game.add.group(undefined, 'background');

		this.group = game.add.physicsGroup(
			Phaser.Physics.P2JS,
			undefined,
			'planets'
		);


		this.suns.push(
			this.group.add(
				new Sun(
					game,
					Options.worldWidth  / 2,
					Options.worldHeight / 2
				)
			)
		);

		game.camera.focusOn(this.suns[0]);

		// Add lone orbiting planet
		this.group.add(
			new Planet(
				game,
				this.suns[0].x - 200,
				this.suns[0].y,
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

		planet.destroy();
	},

	setupPathRendering: function(game){
		var blurX = game.add.filter('BlurX');
		var blurY = game.add.filter('BlurY');

		blurX.blur = 3;
		blurY.blur = 3;

		this.renderedPathsTexture = game.make.renderTexture(
			Options.rtWidth,
			Options.rtHeight
		);

		this.renderedPathsTexture._durp = true;

		this.renderedPaths = game.make.sprite(
			Options.worldWidth  / 2,
			Options.worldHeight / 2,
			this.renderedPathsTexture
		);
		this.renderedPaths.anchor.set(0.5);
		this.renderedPaths.smoothed = true;
		this.renderedPaths.filters = [blurX, blurY];
		this.renderedPaths.alpha = 0.2;

		this.background.add(this.renderedPaths);
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

		if (this.active) {
			this.debug1 = 'force.x: ' + this.active.body.force.x;
			this.debug2 = 'force.y: ' + this.active.body.force.y;
		}
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
			// game.camera.follow(planet);
			// this.active = planet;
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
			this.renderedPathsTexture.renderXY(
				this.group,
				(Options.worldWidth - Options.rtWidth)   / 2 * -1,
				(Options.worldHeight - Options.rtHeight) / 2 * -1,
				false
			);
		}
	},

	// Example debug - REALLY slows down iPhone
	render: function(game){
		if (this.active) {
			game.debug.text(
				this.debug1,
				20,
				20
			);
			game.debug.text(
				this.debug2,
				20,
				40
			);
		}
	}

};

return States.Game;

});
