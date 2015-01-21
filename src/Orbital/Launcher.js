define([
	'Options',
	'phaser'
],
function(
	Options,
	Phaser
){ 'use strict';

var Launcher = function(game, target, renderGroup, callback){
	this.game     = game;
	this.input    = game.input;
	this.callback = callback;
	this._target   = target;

	this._current = new Phaser.Point(0, 0);
	this.last = [];

	this.graphics    = new Phaser.Graphics(game, 0, 0);
	this.renderGroup = renderGroup;
	this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Launcher.prototype = {

	maxDistance: 900 * Options.spriteScale,
	visible: false,
	_dirty: true,
	added: false,

	postUpdate: function(){
		var input = this.input,
			distance;

		this._current.set(
			input.mousePointer.worldX,
			input.mousePointer.worldY
		);

		if (!this.callOnce && this.spacebar.isDown && this.last.length) {
			this.callOnce = true;
			this.callback(
				this._target.x,
				this._target.y,
				this.last[0],
				this.last[1]
			);
		}

		if (this.callOnce && this.spacebar.isUp) {
			this.callOnce = false;
		}

		if (input.mousePointer.isDown && !this.added) {
			this.renderGroup.add(this.graphics);
			this.added = true;
		} else if (input.mousePointer.isUp && this.added) {
			this.renderGroup.remove(this.graphics, false, true);
			this.launch(
				new Phaser.Point(
					input.mousePointer.worldX,
					input.mousePointer.worldY
				)
			);
			this.added = false;
			this.target = null;
		}

		if (input.mousePointer.isUp && !this.target) {
			return;
		}

		// Set target location
		if (this.added && !this.target && input.mousePointer.isDown) {
			this.target = this._target;
		}

		this.graphics.clear();
		distance = Phaser.Point.distance(
			this.target,
			this._current
		);
		this.graphics.lineStyle(
			4 * Options.spriteScale,
			0xFFFFFF,
			Math.min(1, distance / this.maxDistance)
		);
		this.graphics.moveTo(this.target.x, this.target.y);
		this.graphics.lineTo(
			this._current.x,
			this._current.y
		);
	},

	launch: function(point){
		var angle, distance;

		angle = Math.atan2(
			this.target.y - point.y,
			this.target.x - point.x
		);

		distance = Math.min(
			Phaser.Point.distance(this.target, point),
			this.maxDistance
		) / this.maxDistance;

		this.last[0] = angle;
		this.last[1] = distance;

		this.callback(this.target.x, this.target.y, angle, distance);
	},

	// None of these are used, simply used to allow
	// the class to be added like a Sprite
	setStageReference: function(){},
	updateTransform: function(){},
	preUpdate: function(){},
	update: function(){},
	_renderWebGL: function(){},
	render: function(){}

};

return Launcher;

});
