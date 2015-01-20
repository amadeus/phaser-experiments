define([
	'Options',
	'phaser',
	'dbg'
],
function(
	Options,
	Phaser
){ 'use strict';

var Camera = function(game, x, y, collisionGroup){
	Phaser.Sprite.call(this, game, x, y, 'reticle');

	game.physics.p2.enable(this);
	this.body.mass = 1;
	this.body.damping = 0.99;
	this.body.setCollisionGroup(collisionGroup);
	this.body.collides(collisionGroup);

	this.cursors = game.input.keyboard.createCursorKeys();
	this.cursors.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.cursors.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.cursors.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.cursors.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
};

Camera.prototype = Object.create(Phaser.Sprite.prototype);
Camera.prototype.constructor = Camera;

Camera.prototype.preUpdate = function(){
	Phaser.Sprite.prototype.update.call(this);

	if (this.cursors.down.isDown || this.cursors.s.isDown) {
		this.body.force.y += 2000;
	}
	if (this.cursors.up.isDown || this.cursors.w.isDown) {
		this.body.force.y -= 2000;
	}
	if (this.cursors.left.isDown || this.cursors.a.isDown) {
		this.body.force.x -= 2000;
	}
	if (this.cursors.right.isDown || this.cursors.d.isDown) {
		this.body.force.x += 2000;
	}
};

return Camera;

});
