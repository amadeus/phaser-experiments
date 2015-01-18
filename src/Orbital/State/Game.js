define([
	'Orbital/States',
	'phaser',
	'dbg'
],
function(
	States,
	Phaser
){ 'use strict';

States.Game = {

	create: function(){
		dbg.log('States.Game has loaded');
	}

};

return States.Game;

});
