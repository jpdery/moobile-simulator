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
	
	element: null,
	
	window: null,
	
	loader: null,
	
	axis: {
		s: null,
		r: null
	},
	
	options: {
		windowSelector: '#window',
		loaderSelector: '#loader'
	},
				
	initialize: function(element, options) {
		this.setOptions(options);
		this.element = document.id(element);
		this.window = this.element.getElement(this.options.windowSelector);
		this.loader = this.element.getElement(this.options.loaderSelector);
		this.axis.s = this.element.getElement('[data-axis=s]');
		this.axis.r = this.element.getElement('[data-axis=r]');
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
	},
	
	zoom: function(zoom) {
		this.axis.s.removeClass('normal');
		this.axis.s.removeClass('medium');
		this.axis.s.removeClass('small');
		this.axis.s.addClass(zoom);
		return this;
	},
	
	orient: function(direction) {
		this.axis.r.removeClass('portrait');
		this.axis.r.removeClass('landscape');
		this.axis.r.addClass(direction);
		return this;
	}
		
});
