/*
---

name: Device

description: Create a device that can be scaled to fit on the screen and
             rotated.

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Core/Class
	- Core/Class.Extras
	- Core/Element
	- Core/Element.Style
	- Class-Extras/Class.Binds

provides:
	- Device

...
*/

window.Moobile = {};

Moobile.Device = new Class({

	Implements: [
		Events,
		Options,
		Class.Binds
	],

	application: null,

	applicationWindow: null,

	element: null,

	window: null,

	loader: null,

	axis: {
		s: null,
		r: null
	},

	options: {
		windowSelector: '#window',
		loaderSelector: '#loader',
		barSelector: '#bar'
	},

	initialize: function(element, options) {
		this.setOptions(options);
		this.element = document.id(element);
		this.window = this.element.getElement(this.options.windowSelector);
		this.loader = this.element.getElement(this.options.loaderSelector);
		this.statusBar = this.element.getElement(this.options.barSelector);
		this.axis.s = this.element.getElement('[data-axis=s]');
		this.axis.r = this.element.getElement('[data-axis=r]');
		this.pollForApplication();
		return this;
	},

	enableAnimations: function() {
		this.element.addClass('animated');
		return this;
	},

	disableAnimations: function() {
		this.element.removeClass('animated');
		return this;
	},

	use: function(device) {
		this.disableAnimations();
		this.element.removeClass('iphone');
		this.element.removeClass('ipad');
		this.element.addClass(device);
		this.enableAnimations.delay(15, this);
		return this;
	},

	load: function(app) {
		this.loader.set('src', app);
		return this;
	},

	zoom: function(zoom) {
		this.axis.s.set('class', zoom);
		return this;
	},

	orient: function(orientation) {
		this.axis.r.removeClass('portrait');
		this.axis.r.removeClass('landscape');
		this.axis.r.addClass(orientation);

		if (this.application) {
			(function() {

				var angle = null;

				switch (orientation) {
					case 'portrait':
						angle = 0;
						break;
					case 'landscape':
						angle = 90;
						break;
				}

				this.applicationWindow.orientation = angle;
				this.applicationWindow.fireEvent('orientationchange');

			}).delay(750, this); // seems to be a good number
		}

		return this;
	},

	bar: function(type) {
		this.statusBar.set('class', type);
		
		// show the app under the translucent bar
		if (type == 'black-translucent') {
			this.window.addClass('fullsize');
		} else {
			this.window.removeClass('fullsize');
		}
		
		// adjust for the button bar
		if (type == 'browser') {
			this.window.addClass('showbuttons');
		} else {
			this.window.removeClass('showbuttons');
		}
	},

	pollForApplication: function() {

		if (this.loader) {
			if (this.loader.contentWindow.$moobile) {
				this.applicationWindow = this.loader.contentWindow;
				this.application       = this.loader.contentWindow.$moobile;
				return this;
			}
		}

		this.pollForApplication.delay(250, this);

		return this;
	}

});
