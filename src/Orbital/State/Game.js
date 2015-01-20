define([
	'Orbital/States',
	'Orbital/Sprite/Sun',
	'Orbital/Sprite/Planet',
	'Orbital/Sprite/Camera',
	'Orbital/Launcher',
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
	Camera,
	Launcher,
	Options,
	Phaser
){ 'use strict';

States.Game = {

	assets: {
		'sun'    : 'assets/sprites/sun.png',
		'planet' : 'assets/sprites/planet.png',

		'bg-stars-0' : 'assets/sprites/bg-stars-0.png',
		'bg-stars-1' : 'assets/sprites/bg-stars-1.png',
		'bg-stars-2' : 'assets/sprites/bg-stars-2.png'
	},

	preload: function(game){
		var key;

		for (key in this.assets) {
			game.load.image(key, this.assets[key]);
		}
	},

	suns: [],
	erase: false,
	maxPower: 600,

	create: function(game){
		game.world.setBounds(0, 0, Options.worldX, Options.worldY);

		this.setupPhysics(game);
		this.setupGroups(game);
		this.setupInitialObjects(game);
		this.setupPathRendering(game);

		this.charged = 0;
		window.durp = this.game;
	},

	setupGroups: function(game){
		this.background = game.add.group(undefined, 'background');

		this.group = game.add.physicsGroup(
			Phaser.Physics.P2JS,
			undefined,
			'planets'
		);

		this.overlay = game.add.group(undefined, 'overlay');
	},

	setupPhysics: function(game){
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.restitution = 0.2;
		game.physics.p2.setImpactEvents(true);
		// Remove world physics bounds
		game.physics.p2.setBounds(
			null,  null,  null,  null,
			false, false, false, false
		);
		this.spaceCollision = game.physics.p2.createCollisionGroup();
		this.miscCollision  = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();
	},

	setupInitialObjects: function(game){
		var blurX = game.add.filter('BlurX');
		var blurY = game.add.filter('BlurY');
		blurX.blur = 2;
		blurY.blur = 2;

		this.stars1 = game.add.tileSprite(
			0, 0,
			Options.width,
			Options.height,
			'bg-stars-0',
			undefined,
			this.background
		);
		this.stars1.filters = [blurX, blurY];

		this.stars2 = game.add.tileSprite(
			0, 0,
			Options.width,
			Options.height,
			'bg-stars-1',
			undefined,
			this.background
		);

		this.stars3 = game.add.tileSprite(
			0, 0,
			Options.width,
			Options.height,
			'bg-stars-2',
			undefined,
			this.background
		);

		this.stars1.fixedToCamera = true;
		this.stars2.fixedToCamera = true;
		this.stars3.fixedToCamera = true;

		this.suns.push(
			this.group.add(
				new Sun(
					game,
					Options.worldWidth  / 2,
					Options.worldHeight / 2,
					this.spaceCollision
				)
			)
		);

		var camera = new Camera(
			game,
			this.suns[0].x,
			this.suns[0].y,
			this.miscCollision
		);
		this.background.add(camera);
		game.camera.follow(camera);

		// Add lone orbiting planet
		this.launchPlanet(
			this.suns[0].x - 200,
			this.suns[0].y,
			0, -260
		);

		this.launcher = new Launcher(
			game,
			this.overlay,
			this._launchPlanet.bind(this)
		);
		this.overlay.add(this.launcher);
	},

	_launchPlanet: function(x, y, angle, power){
		this.launchPlanet(
			x,
			y,
			Math.cos(angle) * (power * this.maxPower),
			Math.sin(angle) * (power * this.maxPower)
		);
	},

	launchPlanet: function(x, y, velX, velY){
		this.group.add(
			new Planet(
				this.game,
				x, y,
				velX, velY,
				this.spaceCollision
			)
		);
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

		this.renderedPaths = game.make.sprite(
			Options.worldWidth  / 2,
			Options.worldHeight / 2,
			this.renderedPathsTexture
		);
		this.renderedPaths.anchor.set(0.5);
		this.renderedPaths.smoothed = true;
		// this.renderedPaths.blendMode = Phaser.blendModes.SATURATION;
		// this.renderedPaths.filters = [blurX, blurY];
		this.renderedPaths.alpha = 0.1;

		this.background.add(this.renderedPaths);
		this.eraseKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
	},

	update: function(game){
		var planets = this.group.children,
			p, len, planet;

		this.handleInput(game);

		// Destroy killed planets
		if (game.toDestroy.length) {
			for (p = 0, len = game.toDestroy.length; p < len; p++) {
				game.toDestroy[p].destroy();
			}
			game.toDestroy.length = 0;
		}

		for (p = 0, len = planets.length; p < len; p++) {
			planet = planets[p];
			if (planet.accellerateToObject) {
				planet.accellerateToObject(this.suns);
			}
		}
		planet = null;

		this.updateParallax(game);

		if (this.active) {
			this.debug1 = 'force.x: ' + this.active.body.force.x;
			this.debug2 = 'force.y: ' + this.active.body.force.y;
		}

		if (this.eraseKey.isDown) {
			this.erase = true;
		} else {
			this.erase = false;
		}
	},

	updateParallax: function(game){
		this.stars1.tilePosition.x = -(game.camera.x * 0.2);
		this.stars1.tilePosition.y = -(game.camera.y * 0.2);

		this.stars2.tilePosition.x = -(game.camera.x * 0.5);
		this.stars2.tilePosition.y = -(game.camera.y * 0.5);

		this.stars3.tilePosition.x = -(game.camera.x * 0.7);
		this.stars3.tilePosition.y = -(game.camera.y * 0.7);
	},

	handleInput: function(game){
		// var planet;

		// if (this.charged && game.input.mousePointer.isUp) {
		//     planet = new Planet(
		//         game,
		//         game.input.mousePointer.worldX,
		//         game.input.mousePointer.worldY,
		//         this.spaceCollision
		//     );
		//     this.group.add(planet);
		//     // this.active = planet;
		//     this.charged = 0;
		// }

		// if (game.input.mousePointer.isDown) {
		//     this.charged += 40;
		//     if (this.charged > 1000) {
		//         this.charged = 1000;
		//     }
		// }
	},

	preRender: function(){
		if (this.renderedPathsTexture) {
			this.renderedPathsTexture.renderXY(
				this.group,
				(Options.worldWidth - Options.rtWidth)   / 2 * -1,
				(Options.worldHeight - Options.rtHeight) / 2 * -1,
				this.erase
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
