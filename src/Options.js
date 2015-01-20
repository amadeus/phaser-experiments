define(function(){ 'use strict';

var Options = {},
	width   = window.innerWidth,
	height  = window.innerHeight;

Options.pixelRatio = window.devicePixelRatio || 1;
// Options.pixelRatio = 1;

// Fix potential 3x or higher screens
if (Options.pixelRatio > 2) {
	Options.pixelRatio = 2;
}

Options.width  = Options.pixelRatio * width;
Options.height = Options.pixelRatio * height;

Options.worldWidth  = Math.pow(2, 16);
Options.worldHeight = Math.pow(2, 16);

Options.rtWidth  = Math.pow(2, 12);
Options.rtHeight = Math.pow(2, 12);

// Used for scaling sprites
Options.spriteScale = Options.pixelRatio / 2;

// Used for scaling the canvas display
Options.canvasScale = 1 / Options.pixelRatio;

return Options;

});
