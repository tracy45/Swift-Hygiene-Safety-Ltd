var paywall = (function (_window, $) {
  'use strict';

  /* global window: false */
  var defer = function (method) {
    if (window.jQuery) {
      $ = window.jQuery;
      return method();
    } else {
      setTimeout(function () {
        return defer(method);
      }, 1000);
    }
  };

  var _paywall = {};
  /**
   * Initializes the application
   *
   * @return undefined
   */
  _paywall.init = function () {
    var sio = new signupOverlay();
    sio.attachEventHandlers();
    return sio;
  };

  var signupOverlay = function () {
    this.register_desktop_url = '//lucie.timeinc.com/webservices/register/sm/paywallregisternew/index.html';
    this.register_mobile_url = '//lucie.timeinc.com/webservices/register/sm/paywallregisternew/index.html';
    this.signin_desktop_url = '//subscription-assets.realsimple.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/sm-paywalllogin/login.html?intent=ss';
    this.signin_mobile_url = '//subscription-assets.realsimple.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/sm-paywallloginmobile/login.html?intent=ss';
    this.breakpoint = this.getResponsiveBreakpoint();
    this.activeBox = null;
    this.activeSigninUrl = null;
    this.activeRegisterUrl = null;
    this.width = '650';
    this.height = '760';
    this.env = 'www';

    if (!/www/.test(window.location.host)) {
      this.env = 'qa';
      this.register_desktop_url = '//qa-lucie.timeinc.com/webservices/register/sm/paywallregisternew/index.html';
      this.register_mobile_url = '//qa-lucie.timeinc.com/webservices/register/sm/paywallregisternew/index.html';
      this.signin_desktop_url = '//subscription-assets.realsimple.com/qa/assets/themes/magazines/SUBS/templates/velocity/site/sm-paywalllogin/login.html?intent=ss';
      this.signin_mobile_url = '//subscription-assets.realsimple.com/qa/assets/themes/magazines/SUBS/templates/velocity/site/sm-paywallloginmobile/login.html?intent=ss';
    }
  };

  signupOverlay.prototype.displaySignin = function () {
    this.activeBox = 'signin';
    this.setIframe(this.activeSigninUrl);
    this.updateLmpCookie();
    this.openOverlay();
  };

  signupOverlay.prototype.openOverlay = function () {
    $.colorbox({
      inline: true,
      href: '#colorboxOverlay',
      width: this.width,
      height: this.height,
      transition: 'none',
      closeButton: false
      // fixed: true
    });
  };

  signupOverlay.prototype.setIframe = function (url) {
    var iframeHtml = '<iframe scrolling="no" id="colorboxOverlay" width="' + (this.width - 50) + '" height="' + (this.height - 50) + '" src="' + url + '"></iframe>';
    $('#colorboxOverlay').remove();
    $('body').append(iframeHtml);
  };

  signupOverlay.prototype.removeIframe = function () {
    $('#colorboxOverlay').remove();
  };

  signupOverlay.prototype.displayRegister = function () {
    this.activeBox = 'register';
    var url = '//' + window.location.host + '/solution-seekers';
    this.setIframe(this.activeRegisterUrl);
    this.updateLmpCookie(url);
    this.openOverlay();
  };

  signupOverlay.prototype.updateLmpCookie = function (url) {
    if (url === undefined) {
      // current page
      url = '//' + window.location.host + window.location.pathname;
    }
    document.cookie = 'LMP=' + encodeURI(url) + '; path=/; domain=.realsimple.com;';
  };

  signupOverlay.prototype.attachEventHandlers = function () {
    var _this = this;

    $('#signinLink, #hambSignin').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.displaySignin();
    });

    $('#registerLink, #hambRegister').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.displayRegister();
    });

    $('#logoutLink, #hambLogout').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.logout();
    });

    $(document).bind('cbox_closed', function () {
      _this.overlayClosed();
    });

    this.updateColorboxSettings();
    this.setLinks();
  };

  signupOverlay.prototype.overlayClosed = function () {
    this.activeBox = null;
    this.removeIframe();
  };

  signupOverlay.prototype.updateColorboxSettings = function (newPoint) {
    if (newPoint !== undefined) {
      this.breakpoint = newPoint;
    }

    this.activeSigninUrl = this.signin_desktop_url;
    this.activeRegisterUrl = this.register_desktop_url;
    this.width = '650';
    if (this.breakpoint === 'micro' || this.breakpoint === 'small') {
      this.activeSigninUrl = this.signin_mobile_url;
      this.activeRegisterUrl = this.register_mobile_url;
      this.width = '350';
    }
    if (this.activeBox === 'signin') {
      $.colorbox.close();
      this.displaySignin();
    }
    if (this.activeBox === 'register') {
      $.colorbox.close();
      this.displayRegister();
    }
  };

  signupOverlay.prototype.logout = function () {
    var $form = $('<form></form>'),
      $field = $('<input></input>');
    var wls_post_settings = {
      method: 'post',
      action: 'https://auth.realsimple.com/logout.php'
    };
    var wls_field_settings = {
      type: 'hidden',
      name: 'turl',
      value: '//www.realsimple.com'
    };
    if (this.env === 'qa') {
      wls_post_settings.action = 'https://qa-auth.realsimple.com/logout.php';
      wls_field_settings.value = '//qa.realsimple.com';
    }
    $form.attr(wls_post_settings);
    $field.attr(wls_field_settings);
    $form.append($field);
    $(document.body).append($form);
    $form.submit();
    this.setLinks();
  };

  signupOverlay.prototype.is_logged_in = function () {
    return this.getCookie('TISub') || this.getCookie('mdp_partner') ? true : false;
  };

  signupOverlay.prototype.getCookie = function (name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
  };

  signupOverlay.prototype.setLinks = function () {
    if (this.is_logged_in()) {
      $('body').addClass('authenticated');
    } else {
      $('body').removeClass('authenticated');
    }
  };

  signupOverlay.prototype.breakPoints = [
    [450, 'micro'],
    [750, 'small'],
    [800, 'medium'],
    [1024, 'large'],
    [1206, 'larger']
  ];

  signupOverlay.prototype.getBrowserWidth = function () {
    var width;
    if (document.body && document.body.offsetWidth) {
      width = document.body.offsetWidth;
    }
    if (document.compatMode === 'CSS1Compat' &&
      document.documentElement &&
      document.documentElement.offsetWidth) {
      width = document.documentElement.offsetWidth;
    }
    if (window.innerWidth) {
      width = window.innerWidth;
    }

    return width;
  };

  // Get current break point
  signupOverlay.prototype.getResponsiveBreakpoint = function () {
    var i, point, browser_width = this.getBrowserWidth();
    for (i = 0; i < this.breakPoints.length; i++) {
      point = this.breakPoints[i];
      if (browser_width <= point[0]) {
        return point[1];
      }
    }

    // If browser_width isn't less than any of the breakpoints, return the last/largest size.
    return point[1];
  };

  // Initialize the applcation.
  return defer(_paywall.init);
}(window, window.jQuery || window.$));
