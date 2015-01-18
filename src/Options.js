define(function(){ 'use strict';

var Options = {},
	width   = 600,
	height  = 480;

Options.pixelRatio  = window.devicePixelRatio || 1;

// Fix potential 3x or higher screens
if (Options.pixelRatio > 2) {
	Options.pixelRatio = 2;
}

Options.width  = Options.pixelRatio * width;
Options.height = Options.pixelRatio * height;

// Used for scaling sprites
Options.spriteScale = Options.pixelRatio / 2;

// Used for scaling the canvas display
Options.canvasScale = 1 / Options.pixelRatio;

return Options;

});
