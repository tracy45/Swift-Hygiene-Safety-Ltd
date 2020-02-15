var sm_meta = sm_meta || {};sm_meta.sm_uber = { name:"sm_uber", version:"", buildDate:"2020-01-21T10:50:20", env:"production"};
;
/**
 * Declaration of the root namespace for Selectable Media modules
 */


var SM = SM || {};

SM.Lib = function(module) {
	'use strict';

	if (typeof console === "undefined" || typeof console.log === "undefined") {
		module.console = {
			log:function() {},
			warn:function() {},
			error: function() {},
			dir: function() {}
		};
	} else {
		module.console = console;
	}

	return module;

}(SM.Lib || {});

var smtrace = function() {
	if (typeof console !== "undefined" && typeof console.log !== "undefined") {
		SM.Utils.each(arguments, function(a) { console.log(a); });
	}
};
var sminfo = function() {
	if (typeof console !== "undefined" && typeof console.info !== "undefined") {
		SM.Utils.each(arguments, function(a) { console.info(a); });
	}
};
var smwarn = function() {
	if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
		SM.Utils.each(arguments, function(a) { console.warn(a); });
	}
};
var smerror = function() {
	if (typeof console !== "undefined" && typeof console.error !== "undefined") {
		SM.Utils.each(arguments, function(a) { console.error(a); });
	}
};
/**
 * Object, Array and String utilities
 * 
 * @module SM.Utils
 * @class SM.Utils
 * @static
 */
SM.Utils = function(module) {
	'use strict';
	
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
	// module.bind = function(func, obj) {
	// 	if (typeof func !== 'function') {
	// 		// closest thing possible to the ECMAScript 5
	// 		// internal IsCallable function
	// 		throw new TypeError('SM.Utils.bind: arg not a function: ', func);
	// 	}
	// 
	// 	var aArgs = Array.prototype.slice.call(arguments, 1),
	// 		fToBind = func,
	// 		fNOP = function() {},
	// 		fBound = function() {
	// 			return fToBind.apply(func instanceof fNOP ? func : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
	// 		};
	// 
	// 	fNOP.prototype = func.prototype;
	// 	fBound.prototype = new fNOP();
	// 
	// 	return fBound;
	// };
	
       /**
        * Determine if object is an array
        * 
        * @method isArray
        * @param {*} obj - variable to be determined as array or not
        * @returns {Boolean} true if Array; false if not.
        */
	module.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	};

       /**
        * Find element in an array based on passed comparer function
        * inspiration: http://stackoverflow.com/questions/1988349/array-push-if-does-not-exist
        * 
        * @method inArray
        * @param {Array} arr array to test
        * @param {Function} comparer tests each element for truthiness
        * @param {Object} context comparer context
        * @returns {Boolean}
        */
	module.inArray = function(arr, comparer, context) {
		var ctx = context || window;
		var l = arr.length;
		for(var i = 0; i < l; i++) {
			if(comparer.call(ctx, arr[i])) { 
				return true; 
			}
		}
		return false;
	};
	
       /**
        * Find index of an element in an array. Used as alternative to native Array.prototype.indexOf for IE8
        * 
        * @method indexOf
        * @param {Array} arr array to search
        * @param {*} searchElement value to search for
        * @param {Number} fromIndex start position in array
        * @returns {Integer} index of element or -1 if not found
        */
	module.indexOf = function(arr, searchElement, fromIndex) {
		if(!Array.prototype.indexOf) {
			for(var i = (fromIndex || 0), l = arr.length; i < l; i++) {
				if(arr[i] === searchElement) {
					return i;
				}
			}
			return -1;
		} else {
			return arr.indexOf(searchElement, fromIndex);
		}
	};
	
       /**
        * Count of number of properties on an object
        * 
        * @method objLength
        * @param {Object} obj on which to count
        * @returns {Number} count of object properties
        */
	module.objLength = function(obj) {
		var length = 0;
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				length++;
			}
		}
		return length;
	};
	
       /**
        * Loop through array or object and apply callback to each element
        * 
        * @method each
        * @param {Array|Object} list list to be looped through
        * @param {Function} callback function to apply to each element of list
        * @param {Object} ctx context on which to call callback function
        */
	module.each = function(list, callback, ctx) {
		var context = ctx || window;
		if(module.isArray(list)) {
			var length = list.length;
			for(var i = 0; i < length; i++) {
				callback.call(context, list[i], i, list);
			}
		} else {
			for(var key in list) {
				callback.call(context, list[key], key, list);
			}
		}
	};

       /**
        * Find an array or object element that evaluates true to test function arg
        * 
        * @method find
        * @param {Array|Object} list list to be tested
        * @param {Function} test returns true if condition met
        * @param {Object} ctx context on which to call test function
        * @returns {Object|null} first element found that passes test or null
        */
	module.find = function(list, test, ctx) {
		var context = ctx || window;
		var value = null;

		if(module.isArray(list)) {
			var length = list.length;
			for(var i = 0; i < length; i++) {
				if(test.call(module, list[i], i, list)) {
					value = list[i];
					break;
				}
			}
		} else {
			for(var key in list) {
				if(test.call(module, list[key], key, list)) {
					value = list[key];
					break;
				}
			}
		}
		return value;
	};
	
       /**
        * Create copy of object, array, date
        * 
        * @method clone
        * @param {Date|Array|Object} obj to be copied
        * @returns {Date|Array|Object} copy of original
        */
	module.clone = function(original) {
		var copy; 
		if (null === original || 'object' !== typeof original) {
			return original;
		}
		// if(module.toType(original) === 'undefined') {
		// 	return original;
		// }

		if(module.toType(original) === 'date') {
			copy = new Date();
			copy.setTime(original.getTime());
		}

		if(module.toType(original) === 'array') {
			copy = [];
			for (var i = 0, len = original.length; i < len; i++) {
				copy.push(module.clone(original[i]));
			}
		}

		if(module.toType(original) === 'object') {
			copy = {};
			for(var key in original) {
				if (original.hasOwnProperty(key)) {
					copy[key] = module.clone(original[key]);
				}
			}
		}
		return copy;
	};
	
       /**
        * Removes a property from an object, returning it
        * @method extract
        * @param {Object} obj object to extract from
        * @param {String} key property to extract
        * @returns {*} value of object property extracted
        */
	module.extract = function(obj, key) {
		if(!obj.hasOwnProperty(key)) {
			return;
		}
		
		var val = obj[key];
		if(obj !== window) { 
			delete obj[key]; 
		}
		return val;
	};

       /**
        * Adds properties of src object to dest objcect, overwriting values if dest has same property
        * 
        * @method extend
        * @param {Object} dest object to be extended
        * @param {Object} src object being added to dest
        * @uses SM.Utils.isHTMLNode
        * @returns {Object} extended version of dest
        */
	module.extend = function(dest, src) {
		dest = dest || {};
		for(var key in src) {
			if(src.hasOwnProperty(key)) {
				if(dest[key] instanceof Object && src[key] instanceof Object && !SM.Utils.isHTMLNode(dest[key]) && !SM.Utils.isHTMLNode(src[key])) {
					dest[key] = module.extend(dest[key], src[key]);
				} else {
					dest[key] = src[key]; 
				}
			}
		}
		// smtrace('post extend, dest = ', dest);
		return dest;
	};

        /**
         * Checks if an object is a DOM object
         * inspired by: 
         * http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
         * @param {Object} obj the object that will be checked
         * @returns {Boolean}
         */
	module.isHTMLNode = function(obj) {
		return !!(typeof obj == "object" && "nodeType" in obj && obj.nodeType === 1 && obj.cloneNode);
	};
	
       /**
        * Inheritance core -- creates sub class from super class
        * 
        * @method inherits
        * @param {Class} sub child class
        * @param {Class} sup parent class
        */
	module.inherits = function(sub, sup) {
		   sub = module.extend(sub, sup);
		   function Fn() { module.constructor = sub; }
		   Fn.prototype = sub._super = sup.prototype;
		   sub.prototype = new Fn();
	};

       /**
        * Randomize order of array elements
        * 
        * @method randomize
        * @param {Array} array - list to be randomized
        * @returns {Array} original array with order randomized
        */
	module.randomize = function(array) {
		   var currentIndex = array.length;
		   var temporaryValue;
		   var randomIndex;

		   // While there remain elements to shuffle...
		   while (0 !== currentIndex) {

		     // Pick a remaining element...
		     randomIndex = Math.floor(Math.random()* currentIndex);
		     currentIndex -= 1;

		     // And swap it with the current element.
		     temporaryValue = array[currentIndex];
		     array[currentIndex] = array[randomIndex];
		     array[randomIndex] = temporaryValue;
		   }

		   return array;
  	};
	
       /**
        * Parses current location querystring params into an object
        * 
        * @method parseQueryString
        * @uses SM.Utils.queryStringToObj
        * @returns {Object} key/value query string params
        */
	module.parseQueryString = function() {
		var url = window.location.search.substring(1);	
		return module.queryStringToObj(url);
	};

       /**
        * Parses a url's querysting params into an object.
        * 
        * @method queryStringToObj
        * @param {String} url url to parse
        * @returns {Object} object of key/value querystring params
        */
	module.queryStringToObj = function(url) {
		var params = {};
		var a = /\+/g;  // Regex for replacing addition symbol with a space
		var r = /([^&|\?=]+)=?([^&|\?]*)/g;
		var d = function(s) { return decodeURIComponent(s.replace(a, " ")); };
		var p = unescape(url);
		var q;
			
		if(p.indexOf('?') === -1) {
			return params;
		}

		q = p.substr(p.indexOf('?'), p.length);
		
		for (var e = r.exec(q); e; e = r.exec(q)) {
			params[d(e[1])] = d(e[2]);
		}

		return params;
	};

       /**
        * Converts and object into querysting formatted string
        * 
        * @method objToQueryString
        * @param {Object} obj source of converted querystring
        * @param {Boolean} encode true uses encodeURIComponent for keys and values
        * @returns {String} ampersand delimited string from obj
        */
	module.objToQueryString = function(obj, encode) {
		var params = [];
		var arrParams = '&';
		
		module.each(
			obj,
			function(val, key) {
				
				if(module.toType(val) === 'array') {
					var arrKey = key + '[]=';
					module.each(val, function(el) {
						arrParams += arrKey + el + '&';
					});
				} else if(module.toType(val) === 'object') {
					params.push(key + '=' + JSON.stringify(val));
				} else {
					var param = (encode) ? (encodeURIComponent(key) + '=' + encodeURIComponent(val)) : (key + '=' + val);
					params.push(param);
				}
			},
			module
		);
		return params.join('&') + arrParams;
	};

       /**
        * Formats url to later accept appended querystring
        * 
        * @method formatUrlForQueryString
        * @param {String} url url to be formatted
        * @returns {String} formatted url
        */
	module.formatUrlForQueryString = function(url) {
		if(url.indexOf('?') === -1) {
			url += '?';						// a ? needs appending to end of url
		} else if(url.indexOf('?') !== (url.length - 1) && url.indexOf('&') !== (url.length - 1)) {
			url += '&';						// a ? exists, but not last char, and qs present but & not last char
		}
		return url;
	};

       /**
        * Test if argument is a String
        * 
        * @param {*} str value to be tested
        * @returns {Boolean} true is str is a String literal or type of is string
        */
	module.isString = function(str) {
		return typeof(str) === 'string' || str instanceof String;
	};

       /**
        * String handling to insert values from an Object
        * 
        * @method parseMarkup
        * @param {String} str original string to be modified
        * @param {Object} reference object with values to be inserted
		* @param {Regex} pattern optional RegEx to override default ~{expression}~
        * @returns {String} parsed version of str arg with values inserted
        */
	module.parseMarkup = function(str, reference, pattern) {
		var parsed = str;
		pattern = pattern || /~\{[A-Z]*\}~/gi;
		var patternMatch = str.match(pattern);

		if(patternMatch) {
			for(var num in patternMatch) {
				var match = String(patternMatch[num]);

				var matchLength = match.length;
				var matchKey = match.substring(2, matchLength - 2); // strip ~{ and }~

				var output = reference[matchKey];

				if(output === undefined || output === null) {
					output = match;
				} else {
					output = output.toString();
				}

				parsed = parsed.replace(match, output);
			}
		}
		return parsed;
	};

       /**
        * Improved typeof that returns object type
        * from javascriptweblog: Fixing the JavaScript typeof operator
        * https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
        * 
        * @method toType
        * @param {Object} obj object whose type is needed
        * @returns {String} type of object in string format, ex. "JSON"
        */
	module.toType = function(obj){
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};

	return module;
}(SM.Utils || {});

// TODO: remove these polyfills and any references; replace with an SM.Utils alternative. Modifying js internal
// prototypes can lead to issues when host on 3rd party sites. 
/*
	from mdn: add support for array filter for older browsers
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
*/
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisArg*/)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
/* global Function, SM */

/**
	Utility for device, OS and browser information

	@module SM.DeviceUtils
	@class SM.DeviceUtils
	@requires SM.Protocolizer
	@static
*/
SM.DeviceUtils = function(module) {
	'use strict';

	var ua = navigator.userAgent.toLowerCase();

	var _initialized = false;
	var _platformInfo = {};

	/**
         * List of browser types
         * 
         * @property browsers
         * @type {Object}
         */	
	module.browsers = {
		IPHONE: 'Iphone',
		ANDROID: 'Android',
		CHROME: 'Chrome',
		SAFARI: 'Safari',
		FIREFOX: 'Firefox',
		OPERA: 'Opera',
		IE: 'IE'
	};

	/**
         * Determines is browser is on a mobile device by testing for iphone, 
         * ipad or android in user agent
         * 
         * @method isMobile
         * @return {Boolean} - true if mobile | false if not
	*/
	module.isMobile = function() {
		return ua.match(/iphone|ipad|android/i);
	};
	
	/**
         * Test if device is iPhone via user agent match
         * 
         * @method isIphone
         * @return {Boolean} true if iPhone | false if not
         */
	module.isIphone = function() {
		return ua.match(/iphone/i);
	};
	
	/**
         * Test if device is iPad via user agent match
         * 
         * @method isIpade
         * @return {Boolean} - true if iPad | false if not
         */
	module.isIpad = function() {
		return ua.match(/ipad/i);
	};
	
	/**
         * Test if device is Android via user agent match
         * 
         * @method isAndroid
         * @return {Boolean} true if Android | false if not
         */
	module.isAndroid = function() {
		return ua.match(/android/i);
	};

	/**
         * Test if browser is Chrome
         * 
         * @method isChrome
         * @return {Boolean} true if Chrome | false if not
         * @uses isOpera
         */
	module.isChrome = function() {
		return !!window.chrome && !module.isOpera(); // Chrome 1+
		// return ua.match(/chrome/);
	};

	/**
         * Test if browser is Safari
         * 
         * @method isSafari
         * @return {Boolean} true if Safari | false if not
         */
	module.isSafari = function() {
		//return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
			  // At least Safari 3+: "[object HTMLElementConstructor]"
		// return ua.match(/safari/);
		return ua.indexOf('safari') != -1 && ua.indexOf('chrome') === -1;
	};
	
	/**
         * Test if browser is Firefox
         * 
         * @method isFirefox
         * @return {Boolean} true if Firefox | false if not
         */
	module.isFirefox = function() {
		return typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	};

	/**
         * Test if browser is Opera
         * 
         * @method isOpera
         * @return {Boolean} true if Opera | false if not
         */
	module.isOpera = function() {
		return !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
			  // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	};

	/**
         * Test if browser is Internet Explorer
         * 
         * @method isIE
         * @return {*} false if not | IE version number
         */
	module.isIE = function() {
		// http://stackoverflow.com/questions/10964966/detect-ie-version-in-javascript
		var ie = false;
		if(ua.indexOf('msie') !== -1) {
			ie = parseInt(ua.split('msie')[1]);
		} else if(navigator.appVersion.indexOf('Trident/') > 0) {
			ie = 11;
		} else if(ua.indexOf('edge/') > 0){
			ie = parseInt(ua.split('edge/')[1]);
		}
		return ie;
		// return /*@cc_on!@*/false || !!document.documentMode; // At least IE6
	};

	/**
         * Test if browser has the Flash player plugin installed. Used by ad 
         * server to determine if device can support SWFs
         * 
         * @method hasFlash
         * @return {Boolean} true if Flash player plugin installed | false if not
         */
	module.hasFlash = function() {
		var flash = false;

		try {
			if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) {
				flash = true;
			} 
		} catch(e) {
			if(navigator.mimeTypes ["application/x-shockwave-flash"] !== undefined) {
				flash = true;
			}
		}
		return flash;
	};

	/**
         * Calls the modules is[ browser ] method, if type passed is a valid 
         * browser name
         * 
         * @method getType
         * @param {String} type - Browser name
         * @return {Boolean} - result of SM.DeviceUtils.is[ type ] test | false is not a valid browser name. 
         */
	module.getType = function(type) {
		var method = 'is' + type;
		if(!module[method] instanceof Function) {
			return false;
		}
		return module[method]();
	};

	module.getSafariVersion = function () {
		var verOffset;
		if ((verOffset = ua.indexOf("safari")) != -1) {
			var fullVersion = ua.substring(verOffset + 7);
			if ((verOffset = ua.indexOf("version")) != -1) {
				fullVersion = ua.substring(verOffset + 8, verOffset + 14);
			}
			return Number.parseFloat(fullVersion);
		}
		return 0;
	};

	module.getiOSVersion = function () {
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	};

	module.getChromeVersion = function () {
		var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	
		return raw ? parseInt(raw[2], 10) : 0;
	};

	/**
         * Gets the browser name
         * 
         * @method getBrowser
         * @return {String} browser name
         */
	module.getBrowser = function() {
		if(!_initialized) {
			var browser = '';
			var browsers = module.browsers; 

			for(var key in browsers) {
				if(module.getType(browsers[key])) {
					browser = browsers[key];
					break;
				}
			}
			return browser;
		} else {
			return _platformInfo.sm_brw;
		}
	};

	/**
         * Get Android version number
         * 
         * @method getAndroidVersion
         * @return {Number|Boolean} returns the version number, if matched | false if not
         */
	module.getAndroidVersion = function() {
		// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
		var match = ua.match(/Android\s([0-9\.]*)/i);
		return match ? match[1] : false;
	};

	/**
         * Get the operating system name
         * 
         * @method getOs
         * @return
         */
	module.getOs = function() {
		if(!_initialized) {
			_init();
		}
		return _platformInfo.sm_os;
	};

	/**
         * Returns info on device/browser/platform, with server param names. 
         * Uses {{#crossLink "SM.Protocolizer/getProtocol:method"}}
         * SM.Protocolizer.getProtocol{{/crossLink}}
         * 
         * @method getPlatformInfo
         * @return {Object} - platform info
         *      @example
         *      var info = SM.DeviceUtils.getPlatformInfo();
         *      console.log(info) // outputs:
         *      {
         *          sm_os: 'Macintosh', 	
         *          sm_plt: 'mouse',
         *          sm_brw: 'Chrome',
         *          sm_pr: 1
         *      }
         *      // properties =
         *      // sm_o: operating system
         *      // sm_plt: platform - touch|mouse
         *      // sm_brw: browser
         *      // sm_pr: pixel ratio
         */
	module.getPlatformInfo = function() {
		if(!_initialized) {
			_init();
		}
		return _platformInfo;
	};

	/**
         * Check if browser sends devicemotion events
         *
         * @method checkForDeviceMotion
         * @return {Number} if no devicemotion returns 0, else returns 1
         */
	module.checkForDeviceMotion = function() {
		return typeof window.DeviceMotionEvent !== "undefined" && window.DeviceMotionEvent ? 1 : 0;
	};

	/**
         * Determines if browser supports and has enabled WebGL
         * 
         * @method isWebGLEnabled
         * @return {Boolean} - true if mobile | false if not
	*/
    module.isWebGLEnabled = function() {
    	if (!!window.WebGLRenderingContext) {
    		var canvas = document.createElement("canvas");
    		var names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
    		var context = false;

    		for (var i = 0, l = names.length; i < l; i++) {
    			try {
    				context = canvas.getContext(names[i]);
    				if (context && typeof context.getParameter == "function") {
    					// WebGL is enabled
    					return true;
    				}
    			} catch (e) {}
    		}

    		// WebGL is supported, but disabled
    		return false;
    	}

    	// WebGL not supported
    	return false;
    };
    
	function _init() {
		var operatingSystems = {
			'Android': /Android/i,
			'iPhone': /iPhone/i,
			'iPad': /iPad/i,
			'iOS': /iOS/i,
			'Macintosh': /Macintosh/i,
			'Windows': /Windows/i,
			'Linux': /Linux/i,
			'WebOS': /webOS/i,
			'Blackberry': /BlackBerry/i
		};

		var isTouchDevice = false;
		var operatingSystem = '';

		var osMatch = false;
		var platform = '';

		for(var sys in operatingSystems) {
			osMatch = operatingSystems[sys].test(ua);
			if(osMatch) {
				operatingSystem = sys.split(' ').join('_');
				break;
			}
		}

		if(operatingSystem === '') {
			operatingSystem = navigator.platform;
		}

		isTouchDevice = ('ontouchstart' in document.documentElement) || (navigator.userAgent.match(/ipad|iphone|android/i) !== null);

		if (isTouchDevice) {
			platform = 'touch';
		} else { 
			platform = 'mouse';
		}

		var pixelRatio = window.devicePixelRatio || 1; 

		_platformInfo = {
			sm_os: operatingSystem,
			sm_plt: platform,
			sm_brw: module.getBrowser(),
			sm_pr: pixelRatio
		};

		_initialized = true;
	}

	return module;
}(SM.DeviceUtils || {});
/* global SM */

/**
 * 
 * @module
 * @class SM.Macros
 */
SM.Macros = function (module) {
	'use strict';

	var CLICK_TRACKER_PREPEND_VARIABLE = 'smDfpRedirectMacro';

	var regexes = {
		PROTOCOL: /\[sm_protocol\]:?/i,
		LOCATION: /\[location\]/i,
		REFERRER: /\[referrer\]/i,
		TIMESTAMP: /\[timestamp\]/i,
		REDIRECT_URL: /\[redirect_url]/i,
	};

	var macros = {
		PROTOCOL: function (str) {
			return str.split(regexes.PROTOCOL).join(_protocol);
		},
		LOCATION: function (str) {
			return str.split(regexes.LOCATION).join(window.location.href);
		},
		REFERRER: function (str) {
			return str.split(regexes.REFERRER).join(document.referrer);
		},
		TIMESTAMP: function (str) {
			return str.split(regexes.TIMESTAMP).join(Date.now());
		},
		REDIRECT_URL: function (str) {
			return str.split(regexes.REDIRECT_URL).join(window[CLICK_TRACKER_PREPEND_VARIABLE]);
		},
	};

	var _protocol = ('https:' == document.location.protocol) ? 'https:' : 'http:';

	/**
	 * @property protocol
	 * @type {String}
	 * @default "http:"
	 */
	module.protocol = _protocol;

	/**
	 * Proceses a given parameter adding protocol, location, referer and timestamp
	 * 
	 * @method process
	 * @param {Object|String} param
	 * @returns {Object|String}
	 */
	module.process = function (param) {
		return _process(param, module.processStr);
	};

	/**
	 * Proceses a given parameter replacing from all existing regexes
	 * 
	 * @method processList
	 * @param {Array} list
	 * @returns {Array}
	 */
	module.processList = function (list) {
		return _processList(list, module.processStr);
	};

	/**
	 * Proceses a given String replacing from all existing regexes
	 * 
	 * @method processStr
	 * @param {String} str
	 * @returns {String}
	 */
	module.processStr = function (str) {
		SM.Utils.each(
			regexes,
			function (macro, key) {
				str = macros[key](str);
			},
			module
		);
		return str;
	};

	/**
	 * Adds a protocol to a given parameter
	 * 
	 * @method protocolize
	 * @param {Object|String} param
	 * @returns {Object|String}
	 */
	module.protocolize = function (param) {
		return _process(param, module.protocolizeStr);
	};

	/**
	 * Adds a protocol to a given list of parameters
	 * 
	 * @method protocolizeList
	 * @param {Array} list
	 * @returns {Array}
	 */
	module.protocolizeList = function (list) {
		return _processList(list, module.protocolizeStr);
	};

	/**
	 *  Adds a protocol to a given String
	 *  
	 * @method protocolizeStr
	 * @param {String} str
	 * @returns {String}
	 */
	module.protocolizeStr = function (str) {
		return macros.PROTOCOL(str);
	};

	module.prependClickTrackersToList = function(list) {
		return _processList(list, module.prependClickTrackersToStr);
	};

	module.prependClickTrackersToStr = function(str) {
		return macros.REDIRECT_URL(str);
	};

	function _processList(list, strMethod) {
		SM.Utils.each(
			list,
			function (value, key) {
				var type = SM.Utils.toType(value);
				if (type === 'string') {
					list[key] = strMethod(value);
				} else if (type === 'object' || type === 'array') {
					list[key] = _processList(list[key], strMethod);
				}
			},
			module
		);
		return list;
	}

	function _process(param, strMethod) {
		var type = SM.Utils.toType(param);
		if (type !== 'string' && type !== 'object' && type !== 'array') {
			return param;
		}
		if (type === 'string') {
			param = strMethod(param);
		} else {
			param = _processList(param, strMethod);
		}
		return param;
	}

	return module;
}(SM.Macros || {});
/**
 * Utilities for browser size, orientation and dimensions
 * 
 * @module SM.BrowserSize
 * @class SM.BrowserSize
 * @static
 */
SM.BrowserSize = function(module) {
	'use strict';
	
	/**
         * Current browser orientation
         * 
         * @property {String} orientation - "l" (landscape) | "p" (portrait)
         * @default "l" (landscape)
         */
	module.orientation = 'l';

	/**
         * Gets the current document.documentElement.clientWidth and 
         * document.documentElement.clientHeight
         * 
         * @method getDimensions
         * @return {Object} width and height properties
         * @uses _getDimensions
         */
	module.getDimensions = function() {
		return _getDimensions();
	};

	/**
         * Gets the smaller value between document.documentElement.clientWidth 
         * and document.documentElement.clientHeight
         * 
         * @method getMinDimension
         * @return {Number} smaller width or height value
         * @uses _getDimension
	*/
	module.getMinDimension = function() {
		var dimensions = _getDimensions();
		return (dimensions.width > dimensions.height) ? dimensions.height : dimensions.width;
	};

	/**
         * Get current device width/height and orientation params
         * 
         * @method getParams
         * @uses SM.BrowserSize
         * @return {Object} width, height and orientation as sm_w, sm_h and sm_o properties
	*/
	module.getParams = function() {
		var orientation = window.orientation;
		var o = SM.BrowserSize.getOrientation();
		var dimensions = SM.BrowserSize.getDimensions();
		var deviceParams;

		if(dimensions.height > dimensions.width) {
			var deviceH = window.screen.height;
			var uiH = deviceH - dimensions.height;
			deviceParams = {
				sm_w: deviceH,
				sm_h: dimensions.width - uiH,
				sm_o: 'l'
			};
		} else {
			deviceParams = {
				sm_w: dimensions.width,
				sm_h: dimensions.height,
				sm_o: o
			};
		};
		return deviceParams;
	};

	/**
         * Get the current orientation of the device via window.orientation, if 
         * available, or dimensions calculation
         * 
         * @method getOrientation
         * @uses SM.BrowserSize
         * @return {String} "l" (landscape) | "p" (portrait)
	*/
	module.getOrientation = function() {
		var orientation = window.orientation;
		var	o;
		var dimensions = SM.BrowserSize.getDimensions();
		var deviceParams;

		if(typeof(orientation) !== 'undefined') {
			o = (orientation === 0 || orientation === 180) ? 'p' : 'l';
		} else {
			if(dimensions.height > dimensions.width) {
				o = 'p';
			} else {
				o = 'l';
			}
		}
		return o;
	};

	/**
         * Get the window width adn height of the browser based on 
         * document.documentElement
         * 
         * @method _getDimensions
         * @private
         * @return {Object} width and height of browser
	*/
	function _getDimensions() {	
		var winW = document.documentElement.clientWidth;
		var winH = document.documentElement.clientHeight;
		var deviceW = window.screen.width;
		var deviceH = window.screen.height;
		var uiW = deviceW - winW;
		var uiH = deviceH - winH;

		return { width: winW, height: winH };
	};

	return module;
}(SM.BrowserSize || {});
/**
 * Utility for loading JavaScripts
 * 
 * @module SM.JsLoader
 * @class SM.JsLoader
 * @static
 */
SM.JsLoader = function(module) {
	'use strict';

	var LOAD_TIMEOUT = 5000;
	
	var _head = document.getElementsByTagName('head')[0];

	/**
	 * Loads an Array of scripts
	 *
	 * @class SM.JsLoader.BatchController
     * @param {Array} urls array of js urls to load
     * @param {String} key - key assigned to this load/script
     * @param {Function} complete function to call as each file loads
     * @param {Function} batchComplete function to call upon all files loaded
     * @param {Object} context completed callback context
     * @param {Function} timeout function to call upon load timeout
     * @param {Number} max milliseconds before timeout, overrides default of 5000.
     * @param {Boolean} async if true, all files will begin being requested immediately. false will load files sequentially.
	 * @return {BatchController} new BatchController instance
	 */
	function BatchController(urls, key, complete, batchComplete, timeout, error, context, max, async) {
		this.urls = urls;
		this.id = key || new Date().getTime();
		this.completeCallback = complete || null;
		this.batchComplete = batchComplete || null;
		this.timeoutCallback = timeout || null;
		this.callbackContext = context || window;
		this.max = max || LOAD_TIMEOUT;
		this.async = async || false;
		this.loaded = 0;
		this.count = 0;
		this.total = urls.length;
		
		if(async) {
			while(this.urls.length > 0) {
				new LoaderController(this.urls.shift(), (this.id + this.loaded), this.onFileLoaded.bind(this), this.onTimeout.bind(this), this, this.max);
			}
		} else {
			new LoaderController(this.urls.shift(), (this.id + this.loaded), this.onFileLoaded.bind(this), this.onTimeout.bind(this), this, this.max);
		}
		return this;
	}
	
    /**
     * Callback for when the file loads on the page
     * 
     * @method onFileLoaded
	 * @for SM.JsLoader.BatchController
     * @param {String} url - the script url that was loaded
     * @param {Boolean} success - true if the file loaded succesfully
     * @param {String} key - a key that will be passed to the complete callback
     */
	BatchController.prototype.onFileLoaded = function(url, success, key) {
		if(this.completeCallback instanceof Function) {
			this.completeCallback.call(this.callbackContext, url, success, key);
		}
		_batchNext(this);
	};
	
    /**
     * Callback for when the file load timeouts
     * 
     * @method onTimeout
	 * @for SM.JsLoader.BatchController
     * @param {String} url the script url that was loaded
     * @param {Boolean} success true if the file loaded succesfully
     * @param {String} key a key that will be passed to the complete callback
     */
	BatchController.prototype.onTimeout = function(url, success, key) {
		if(this.timeoutCallback instanceof Function) {
			this.timeoutCallback.call(this.callbackContext, url, false, key);
		}
		_batchNext(this);
	};
	
    /**
     * Callback for when the file fails to load on the page
     * 
     * @method onError
	 * @for SM.JsLoader.BatchController
     * @param {String} url the script url that was loaded
     * @param {Boolean} success true if the file loaded succesfully
     * @param {String} key a key that will be passed to the complete callback
     */
	BatchController.prototype.onError = function(url, success, key) {
		if(this.errorCallback instanceof Function) {
			this.errorCallback.call(this.callbackContext, url, false, key);
		}
		_batchNext(this);
	};
	
	/**
	 * Creates instances of window method, passed to request, in order to clear callbacks on complete
     * 
     * @class SM.JsLoader.JsonpController
     * @param {String} url the JavaScript url to load
     * @param {String} key key assigned to this load/script
     * @param {Function} complete callback for completeful load
     * @param {Function} timeout callback for load timeout
	 * @param {Function} error callback for script onerror
     * @param {Object} context context for complete/fail callbacks
     * @param {Number} max override for default LOAD_TIMEOUT (5000ms)
     */
	function JsonpController(url, key, complete, timeout, error, context, max, cb) {
		this.script = _addScript(url, key, complete, timeout, error, context, max, true, cb);
	}
	
	/**
     * Loads a URL into a script element
     * 
     * @class SM.JsLoader.LoaderController
     * @param {String} url the JavaScript url to load
     * @param {String} key key assigned to this load/script
     * @param {Function} complete callback for completeful load
     * @param {Function} timeout callback for load timeout
	 * @param {Function} error callback for script onerror
     * @param {Object} context context for complete/fail callbacks
     * @param {Number} max override for default LOAD_TIMEOUT (5000ms)
	 * @param {Object} timer optional timer var from caller
	 * @return {Loader} new LoaderController instance
     */
	function LoaderController(url, key, complete, timeout, error, context, max, timer) {
		this.script = _addScript(url, key, complete, timeout, error, context, max, false);
	}

	/**
     * Loads multiple JavaScripts either synchronously or asynchronously.
     * 
     * @method batchLoad
	 * @for SM.JsLoader
	 * @uses SM.JsLoaderBatchController
     * @param {Array} urls array of js urls to load
     * @param {String} key - key assigned to this load/script
     * @param {Function} complete function to call as each file loads
     * @param {Function} batchComplete function to call upon all files loaded
     * @param {Object} context completed callback context
     * @param {Function} timeout function to call upon load timeout
     * @param {Number} max milliseconds before timeout, overrides default of 5000.
     * @param {Boolean} async if true, all files will begin being requested immediately. false will load files sequentially.
	 * @return {BatchController} new BatchController instance
     */
	module.batchLoad = function(urls, key, complete, batchComplete, timeout, error, context, max, async) {
		return new BatchController(urls, key, complete, batchComplete, timeout, error, context, max, async);
	};

	/**
     * Load a JavaScript file
     * 
     * @method load
	 * @for SM.JsLoader
	 * @uses LoaderController
     * @param {String} url - the JavaScript url to load
     * @param {String} key - key assigned to this load/script
     * @param {Function} complete - callback for completeful load
     * @param {Function} timeout - callback for load timeout
	 * @param {Function} error - callback for script onerror
     * @param {Object} context - context for complete/fail callbacks
     * @param {Number} max - override for default LOAD_TIMEOUT (5000ms)
	 * @param {Object} timer - optional timer var from caller
	 * @return {LoaderController} new LoaderController instance
     */
	module.load = function(url, key, complete, timeout, error, context, max, timer) {
		return new LoaderController(url, key, complete, timeout, error, context, max, timer);
	};

	/**
	 * Creates a new JsonpController to handle window callback 
     * 
     * @method jsonp
	 * @for SM.JsLoader
	 * @uses JsonpController
     * @param {String} url - the JavaScript url to load
     * @param {String} key - key assigned to this load/script
     * @param {Function} complete - callback for successful load
     * @param {Function} timeout - callback for load timeout
	 * @param {Function} error - callback for script onerror
     * @param {Object} context - context for complete/fail callbacks
     * @param {Number} max - override for default LOAD_TIMEOUT (5000ms)
	 * @param {String} cb - override sm_cb for jsonp callback param name
	 * @return {JsonpController} new JsonpController instance
     */
	module.jsonp = function(url, key, complete, timeout, error, context, max, cb) {
		return new JsonpController(url, key, complete, timeout, error, context, max, cb);
	};
	
    /**
     * Cleans up a given URL, so it can load properly
     * 
     * @method _cleanUrl
	 * @for SM.JsLoader
     * @param {String} url the url that will be cleaned
     * @return {String} the clean url
     */
	function _cleanUrl(url) {
		var cleaned = url.replace(/\?\&/g, '?');
		cleaned = cleaned.replace(/\?{2,}/g, '?');
		cleaned = cleaned.replace(/\&{2,}/g, '&');
		return cleaned;
	}
	
	/**
	 * Adds the new script element to the DOM, with complete, timeout and error handling
	 * 
	 * @method _addScript
	 * @for SM.JsLoader
     * @param {String} url the JavaScript url to load
     * @param {String} key key assigned to this load/script
     * @param {Function} complete callback for completeful load
     * @param {Function} timeout callback for load timeout
	 * @param {Function} error callback for script onerror
     * @param {Object} context context for complete/fail callbacks
     * @param {Number} max override for default LOAD_TIMEOUT (5000ms)
	 * @param {Boolean} jsonp set to true if making a jsonp request
	 * @param {String} cb override sm_cb for jsonp callback param name
	 */
	function _addScript(url, key, complete, timeout, error, context, max, jsonp, cb) {
		var script;
		var tmr = timer || -1;
		var maxLoadTime = max || LOAD_TIMEOUT; 
		var ctx = context || window;

		var id = key || '';
		var cbParam = cb || 'sm_cb';
		var cbName = 'sm' + id + String(Math.floor(Math.random() * 99999999));

		var onComplete = complete || function() {};
		var onTimeout = timeout || function() {};
		var onError = error || function() {}; 
		
		var timer = window.setTimeout(function() {
			window[cbName] = function() {};
			onTimeout.call(ctx, null, false, key);
		}, maxLoadTime);
		
		window[cbName] = function(response) {
			window.clearTimeout(timer);
			onComplete.call(ctx, response, true, key);
			window[cbName] = function() {};
		};
		
		script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('id', id);
		script.async = true; 

		url = _cleanUrl(url);

		if(jsonp) {
			url += '&' + cbParam + '=' + cbName;
		} else {
			if (script.readyState) { 
				script.onreadystatechange = function() {
					if(script.readyState == 'loaded' || script.readyState == 'complete') {
						window[cbName](url);
					}
				};
			} else {
				script.onload = function() {
					window[cbName](url);
				};
			}
		}

		script.src = url;
		script.onerror = onError;

		_head.appendChild(script);
		
		return script;
	}
	
	/**
	 * Called on each success, timeout or error of BatchController load. 
	 * Loads next URL or calls batchComplete function, if present.
	 * 
	 * @method _batchNext
	 * @for SM.JsLoader
	 * @param {BatchContoller} controller - instance used as context
	 */
	function _batchNext(controller) {
		controller.loaded++;
		
		if(!controller.async && controller.urls.length > 0) {
			new LoaderController(
				controller.urls.shift(), 
				(controller.id + controller.loaded), 
				controller.onFileLoaded.bind(controller), 
				controller.onTimeout.bind(controller), 
				controller, 
				controller.max
			);
		} else if(controller.loaded >= controller.total && controller.batchComplete instanceof Function) {
			controller.batchComplete.call(controller.callbackContext);
		}
	}
	
	return module;
}(SM.JsLoader || {});
/**
 * module for connection to Karam code
 * 
 * @module SM.KarmaAdapter
 * @class SM.KarmaAdapter
 * @static
 */
SM.KarmaAdapter = function (module) {

    module.paramPrefx = 'ka_';

    /**
     * Utility for retrival of Karma page targeting params
     * 
     * @method getParams
     * @return {Object} all pageTargetingValues added to an object with ka_ prefix to param key
     */
    module.getParams = module.getParams || function (callback, attempts) {
        var params = {};
        attempts = attempts ? attempts : 1;

        function processParams(nonMeredith){
            if(!nonMeredith && window.karma.config.targeting) {
                var karmaParams = window.karma.config.targeting;
                SM.Utils.each(
                    karmaParams,
                    function (param, key) {
                        if(param !== null) {
                            // if(typeof param === 'object') { param = JSON.stringify(param); }
                            params[module.paramPrefx + key] = param;
                        }
                    }
                );
            }

            if(callback){
                callback(params);
            }
            return params;
        }


        if (window.adService || window.karma){
            window.karma = window.karma || {};
            window.karma.vars = window.karma.vars || {};

            if(typeof karma.vars.version === "undefined"){
                if(callback){
                    callback(params);
                }
                return params;
            }

            if(!window.karma.vars.targetingReady){
              if (typeof window.dispatchEvent === 'function') {
                window.addEventListener('karmaTargetingReady', function(){
                    return processParams();
                });
              } else {
                if(attempts > 5){
                    return processParams();
                } else {
                    attempts++;
                    return module.getParams(callback,attempts);
                }
              }
          } else {
            return processParams();
          }
        } else {
            return processParams(true);
        }
    };

    return module;
}(SM.KarmaAdapter || {});

SM.UberTag = function(module) {

	var TAG_FILES_REGEX = /(sm_uber|sm_app_touch|sm_app_mouse|selectablemedia\.js|selectablemedia\.com\/ng\/pub)/gi;
	var PATH_TOKEN_REGEX = /selectablemedia.com\/tg\/p\/([a-zA-Z0-9]{0,})/;
	
	var RESPONSE_TIMEOUT = 5000; 
	var API_LOAD_TIMEOUT = 10000; 

	var _events = {
		ERROR: 'error',
		PRODUCT_ERROR: 'productError',
		MISSING_PLACEMENT: 'missingPlacementOrPlacementBucket',
		PUBLISHER_API_TIMEOUT: 'publisherApiTimeout',
		PUBLISHER_API_ERROR: 'publisherApiError',
		PRODUCT_LOAD_ERROR: 'productLoadError',
		NO_PRODUCTS_AVAILABLE: 'noProductsAvailable',
		LOADING_PASSBACK: 'loadingPassback'
	};
	
	var _serverParamMap = {
		_sm_plcmnt: 'sm_pb',
		_sm_uid: 'uid',
		placement: 'sm_pb',
		redirectURL: 'sm_rdrct',
		ipAddress: 'ipaddr',
		userAgent: 'sm_ua',
		origin: 'sm_or',
		callback: 'sm_pcb'
	};

	var _baseConfig = {
		w5: '//api.sele.co/ub/v1.jsonp?',
		debugLevel: 5
	};
	
	var _commandQueue = [];
	var _productBatchId = 'sm_product_batch';
	
	var _version = '0.13.2.6';
	
	var _synchronousProductLoad = true; 

	var _externalCallbacks = []; 
	var _loadedProducts = [];
	var _isLogOn = false; 
	
	var _urlQueryString = document.location.search; 
	var _urlParams = {}; 
	
	module.controllers = module.controllers || {};
	
	function Controller(config) {
		var onApiSuccess;
		var onApiTimeout;
		var onApiError;
		
		this.pubResponse = {};
		this.config = SM.Utils.extend(SM.Utils.clone(module.config), config);
		this.id = this.config.sm_pb;
		this.url = this.config.w5; 
		delete this.config.w5;

		this.config = _pluckCallback(this.config);

		this.url += SM.Utils.objToQueryString(this.config, true);
		this.url += '&utid=' + String(new Date().getTime());
		this.url += '&loc=' + encodeURIComponent(window.location.href) + '&ref=' + encodeURIComponent(document.referrer); 

		this.onProductScriptLoaded = function(controller) {
			return function(url, success, idx) {
				idx = parseInt(idx.replace(_productBatchId, ''));
				
				_onProductScriptLoaded(url, success, idx, controller);
			};
		}(this);
		
		onApiSuccess = function(controller) {
			return function(response) {
				_pubApiResponse(response, controller);
			};
		}(this);
		
		onApiTimeout = function() {
			_sendEventToCallbacks({ token: this.id, type: _events.PRODUCT_ERROR, status: _events.PUBLISHER_API_TIMEOUT });
		};
		
		onApiError = function() {
			_sendEventToCallbacks({ token: this.id, type: _events.PRODUCT_ERROR, status: _events.PUBLISHER_API_ERROR });
		};
		
		SM.JsLoader.jsonp(this.url, 'pubApi' + this.config.sm_pb, onApiSuccess, onApiTimeout, onApiError, this);
	}
	
	module.init = function() {
		function finishSmConfig(karmaParams){
			config = SM.Utils.extend(karmaParams, config);

			if(config.hasOwnProperty('adTestKeyValues')) {
				config = SM.Utils.extend(config, _processAdTestKeyValues(config.adTestKeyValues));
			}

			config = _pluckCallback(config);

			module.config = config;
			_urlParams = _parseUrlParams(_urlQueryString);
			_isLogOn = (_urlParams.sm_logs === '1') ? true : false;
			_log('SM.UberTag/init, _urlParams = ', _urlParams);

			_createControllers();


			end = new Date().getTime();
			_log('sm UT built:\n' + end + '\n' + start + '\nms: ' + (end - start));
		}

		var start = new Date().getTime();
		var end;
		var config = _translateParams(window.smConfig || {});
		
		config = SM.Utils.extend(_baseConfig, config);
		config = SM.Utils.extend(config, SM.Utils.queryStringToObj(window.location.href));
		config = SM.Utils.extend(config, SM.DeviceUtils.getPlatformInfo());
		config = SM.Utils.extend(config, SM.BrowserSize.getParams());
		
		SM.KarmaAdapter.getParams(finishSmConfig);
	};
	
	module.startContentUnlockSession = function(params) {
		_handleExternalMethodCall(SM.VeApp, 'startContentUnlockSession', params);
	};
	
	module.startPlayerSession = function(params) {
		_handleExternalMethodCall(SM.VeApp, 'startPlayerSession', params);
	};
	
	module.checkAdsAvailable = function(params) {
		_handleExternalMethodCall(SM.VeApp, 'checkAdsAvailable', params);
	};
	
	module.addCallback = function(callback) {
		_addCallback(callback);
	};
		
	module.setCallback = module.addCallback; // alias for trans tag legacy calls

	// INITIALIZATION
	function _parseUrlParams(str) {
		var a = str.split('&');
		var b = {};
		a.forEach(function(c) {
			var d = c.split('=');
			b[d[0].replace('?','')] = d[1];
		});
		return b;
	}
	
	function _createControllers() {
		var match;
		var pathToken;
		var params;
		var src;
		var scripts = document.getElementsByTagName('script');

		for(var i = 0, l = scripts.length; i < l; i++) {
			src = scripts[i].src;
			match = src.match(TAG_FILES_REGEX);

			if(match) {
				pathToken = src.match(PATH_TOKEN_REGEX);
				_log('\tpathToken = ' + pathToken);
				if(pathToken && pathToken.length > 1) {
					// only add token if sm_pb not already included in querystring
					src += (src.indexOf('?') > -1) ? '&' : '?';
					src += 'sm_pb=' + pathToken[1];
				}

				params = _translateParams(SM.Utils.queryStringToObj(src));
				params = SM.Utils.extend(params, _urlParams);
				
				if(params.hasOwnProperty('sm_pb')) {
					_createController(params);
				} else if(typeof(smConfig) !== 'undefined' && smConfig.hasOwnProperty('sm_pb')) {
					params.sm_pb = smConfig.sm_pb;
					delete smConfig.sm_pb;
					_createController(params);
				}
			}
		}
	}

	function _createController(config) {
		_log('SM.Uber/_createController, config = ', config);
		if(!module.controllers.hasOwnProperty(config.sm_pb)) {
			module.controllers[config.sm_pb] = new Controller(config);
		}
	}
	
	function _processAdTestKeyValues(values) {
		_log('SM.Uber/_processTestKeyValues');
		var keyValues = {};
		var a = values.split('-');
		a.forEach(function(b) {
			var kv = b.split(',');
			keyValues['ka_' + kv[0]] = kv[1];
		});
		return keyValues;
	}
	
	function _pluckCallback(config) {
		if(config.sm_pcb) {
			_addCallback(config.sm_pcb);
			delete config.sm_pcb;
		}
		return config;
	}

	function _addCallback(callback) {
		var cb;
		
		if(SM.Utils.toType(window[callback]) === 'function') {
			cb = window[callback];
		} else if(SM.Utils.toType(callback) === 'function') {
			cb = callback;
		}
		for(var i = 0, l = _externalCallbacks.length; i < l; i++) {
			if(_externalCallbacks[i].toString() === cb.toString()) {
				_log('WARNING: callback already registered, halting add');
				return;
			}
		}
		_externalCallbacks.push(cb);
	}
	
	function _translateParams(params) {
		SM.Utils.each(
			_serverParamMap,
			function(server, readable) {
				if(params.hasOwnProperty(readable)) {
					params[server] = params[readable];
					delete params[readable];
				}
			},
			module
		);
		return params;
	}
	
	// API RESPONSE & PRODUCT INITIALIZATION
	function _pubApiResponse(response, controller) {
		_log('SM.Uber/_pubApiResponse['+controller.id+'], response = ', response);
		var async = !(response.sync || _synchronousProductLoad);
		var productUrls = [];

		controller.pubResponse = response;
		
		if(response.hasOwnProperty('products') && response.products.length > 0) {
			SM.Utils.each(
				response.products,
				function(product, idx) {
					productUrls.push(SM.Macros.protocolize(product.url));

					if(product.windowVars) {
						SM.Utils.each(
							product.windowVars,
							function(value, key) {
								window[key] = value;
							},
							controller
						);
					}
				},
				controller
			);
		
			SM.JsLoader.batchLoad(
				productUrls, 
				_productBatchId,
				controller.onProductScriptLoaded, 
				null, 
				null,
				null,
				controller, 
				API_LOAD_TIMEOUT, 
				async
			);
		} else {
			_sendEventToCallbacks({ token: controller.id, type: _events.PRODUCT_ERROR, status: _events.NO_PRODUCTS_AVAILABLE });
		}
	}
	
	function _onProductScriptLoaded(url, success, idx, controller) {
		var product = controller.pubResponse.products[idx];

		_log('SM.Uber/_onProductScriptLoaded, success = ' + success + ' product = ', product);

		if(success) {
			_initProduct(idx, controller, product);
		} else {
			_sendEventToCallbacks({ token: controller.id, type: _events.PRODUCT_ERROR, status: _events.PRODUCT_LOAD_ERROR });
		}
	}
	
	function _initProduct(idx, controller, product) {
		var prod = SM[product.type] || window[product.type] || null;
		
		if((prod) && (prod.init instanceof Function)){
			var uberConfig = SM.Utils.clone(controller.config);
			var pConfig = product.config || {};

			pConfig.apis = pConfig.apis || {};
			pConfig.params = pConfig.params || {};
			
			if(uberConfig) {
				pConfig = _extendProductConfig(uberConfig, pConfig);
				pConfig = SM.Utils.extend(pConfig, _urlParams);
			}

			pConfig.callback = function(id, controller) {
				return function(event) {
					_onEvent(event, id, controller);
				};
			}(product.id, controller);
			
			prod.init(pConfig);
			
			if(_commandQueue.length > 0) {
				_clearCommandQueue(prod);
			}


			_loadedProducts.push(prod);
		}
	}
	
	function _extendProductConfig(uberConfig, pConfig) {
		if(uberConfig.apis) {
			pConfig.apis = SM.Utils.extend(uberConfig.apis, pConfig.apis);
			delete uberConfig.apis;
		}
		
		if(pConfig.params) {
			pConfig.params = SM.Utils.extend(uberConfig.params, pConfig.params);
			delete uberConfig
			 .params;
		}
		pConfig = SM.Utils.extend(uberConfig, pConfig);
		return pConfig;
	}
	
	// SESSION PROCESSING
	function _onEvent(event, id, controller) {
		_log('SM.Uber/_onEvent, event = ', event);
		var type = event.type;
		switch(type) {
			case SM.Events.ADS_AVAILABLE_RESPONSE: 
				if(!event.status) {
					var pid = (event.pid) ? event.pid : id;
					if(controller.pubResponse.passbacks && controller.pubResponse.passbacks[pid]) {
						_sendEventToCallbacks({ type: _events.LOADING_PASSBACK, pid: pid });
						SM.JsLoader.load(controller.pubResponse.passbacks[pid]);
					}
				}
			break;
			
			case SM.Events.TAG_REDIRECT:
				window.location.href = event.status;
			break;
			
			case SM.Events.USER_CLOSED:
			case SM.Events.BEHAVIOR_CLOSED:
			break;
			
			default:
			break;
		}
		
		event.token = event.token || controller.id; 
		_sendEventToCallbacks(event);
	}
	
	function _sendEventToCallbacks(event) {
		SM.Utils.each(
			_externalCallbacks,
			function(callback) {
				callback(event);
			},
			module
		);
	}
	
	function _handleExternalMethodCall(mod, method, params) {
		if(typeof(mod) !== 'undefined') {
			if(mod[method] instanceof Function) {
				mod[method](params);
			}
		} else {
			_commandQueue.push({ method: method, params: params });
		}
	}
	
	function _clearCommandQueue(mod) {
		var command;
		while(_commandQueue.length > 0) {
			command = _commandQueue.pop();
			if(mod[command.method] instanceof Function) {
				mod[command.method](command.params);
			}
		}
	}

	function _log() {
		if(!_isLogOn) {
			return;
		}
		if (typeof console !== "undefined" && typeof console.log !== "undefined") {
			SM.Utils.each(arguments, function(a) { console.log(a); });
		}
	}
	
	
	return module;
}(SM.UberTag || {});

// console.log('doc ready state = ' + document.readyState);
// if(SM.hasOwnProperty('Ready') && SM.Ready instanceof Function) {
// 	SM.Ready(function() {
// 		console.log('sm ready callback\n\tSM.UberTag =');
// 		console.log(SM.UberTag);
// 		console.log('\n\tSM.UberTag.init = ');
// 		console.log(SM.UberTag.init);
// 		SM.UberTag.init();
// 	});
// }

(function() {
	SM.UberTag.init();
})();