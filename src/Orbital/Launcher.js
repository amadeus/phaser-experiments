define([
	'Options',
	'phaser'
],
function(
	Options,
	Phaser
){ 'use strict';

var Launcher = function(game, renderGroup, callback){
	this.game     = game;
	this.input    = game.input;
	this.callback = callback;

	this._target  = new Phaser.Point(0, 0);
	this._current = new Phaser.Point(0, 0);

	this.graphics    = new Phaser.Graphics(game, 0, 0);
	this.renderGroup = renderGroup;
	dbg.log('Launcher created', this);
};

Launcher.prototype = {

	maxDistance: 300,
	visible: false,

	_dirty: true,

	added: false,

	update: function(){
		var input = this.input,
			distance;

		this._current.set(
			input.mousePointer.worldX,
			input.mousePointer.worldY
		);

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
			this.target.copyFrom(this._current);
		}

		this.graphics.clear();
		distance = Phaser.Point.distance(
			this.target,
			this._current
		);
		this.graphics.lineStyle(
			2,
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

		this.callback(this.target.x, this.target.y, angle, distance);
	},

	// None of these are used, simply used to allow
	// the class to be added like a Sprite
	setStageReference: function(){},
	updateTransform: function(){},
	preUpdate: function(){},
	postUpdate: function(){},
	_renderWebGL: function(){},
	render: function(){}

};

return Launcher;

});
