var OneTrustStub = function (t) {
    "use strict";

    var e = (n.prototype.addToStubQueue = function (t, e, n) {
        window.__cmp.a = window.__cmp.a || [], "ping" === t ? n({
            gdprAppliesGlobally: l().oneTrustIABgdprAppliesGlobally,
            cmpLoaded: !1
        }, !0) : window.__cmp.a.push([t, e, n])
    }, n.prototype.processQueue = function () {
        if (window.__cmp.a) {
            var t = window.__cmp.a;
            window.__cmp.a = [];
            for (var e = 0; e < t.length; e++) {
                var n = t[e];
                this.excuteAPI(n[0], n[1], n[2])
            }
        }
    }, n);

    function n() {
        //Captures errors on the page and stores them in the error variable
        window.onerror = function (msg, url, line) {
            var error = (msg + " " + line);
            // console.log(error);
            }
        var eu = true;
        window.jsoniab = function(options) {
            var euCountries = "BE,BG,CZ,DK,DE,EE,IE,GR,ES,FR,IT,CY,LV,LT,LU,HU,MT,NL,AT,PL,PT,RO,SI,SK,FI,SE,GB,HR,LI,NO,IS";
            if(euCountries.includes(options.country)){
                eu = true;
                this.initializeCMP();
                window.__cmp = u().excuteAPI;
            }
            else{
                console.log("nonEU");
                eu = false;
            }
        };

        // Call geo-location JSONP service
        var jsonpiab = document.createElement('script');
        jsonpiab.setAttribute('src', 'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location/jsoniab');
        document.head.appendChild(jsonpiab);

        // Standard functionality begins
        var o = this;
        
        this.initializeCMP = function () {
            window.__cmp, o.addFrame(), window.receiveOTMessage = o.receiveMessage, (window.attachEvent || window.addEventListener)("message", window.receiveOTMessage, !1)
        }, this.excuteAPI = function (t, e, n) {
            if (n && t)
                if (l().isStubReady && l().IABCookieValue) switch (t) {
                    case "ping":
                        o.getPingRequest(n);
                        break;
                    case "getConsentData":
                        o.getConsentDataRequest(n);
                        break;
                    default:
                        o.addToStubQueue(t, e, n)
                } else o.addToStubQueue(t, e, n)
        }, this.getPingRequest = function (t) {
            t ? t({
                gdprAppliesGlobally: l().oneTrustIABgdprAppliesGlobally,
                cmpLoaded: !0
            }, !0) : t({}, !1)
        }, this.getConsentDataRequest = function (t) {
            t && l().IABCookieValue && t({
                gdprApplies: l().oneTrustIABgdprAppliesGlobally,
                hasGlobalScope: l().hasIABGlobalScope,
                consentData: l().IABCookieValue
            }, !0)
        }, this.addFrame = function () {
            if (!window.frames.__cmpLocator)
                if (document.body) {
                    var t = document.body,
                        e = document.createElement("iframe");
                    e.setAttribute("style", "display:none"), e.name = "__cmpLocator", e.setAttribute("title", "CMP Locator"), t.appendChild(e)
                } else setTimeout(o.addFrame, 5)
        }, this.receiveMessage = function (t) {
            var e = t.data,
                n = t.origin,
                o = t.source;
            if (e && e.__cmpCall) {
                var a = e.__cmpCall.callId,
                    i = e.__cmpCall.command,
                    r = e.__cmpCall.parameter;
                u().excuteAPI(i, r, function (t, e) {
                    o.postMessage({
                        __cmpReturn: {
                            returnValue: t,
                            success: e,
                            callId: a,
                            command: i
                        }
                    }, n)
                })
            }
        }
    }
    var o = function () {
            this.optanonCookieName = "OptanonConsent", this.optanonHtmlGroupData = [], this.IABCookieValue = "", this.oneTrustIABCookieName = "eupubconsent", this.oneTrustIsIABCrossConsentEnableParam = "isIABGlobal", this.isStubReady = !0, this.geolocationCookiesParam = "geolocation", this.EUCOUNTRIES = ["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "GR", "ES", "FR", "IT", "CY", "LV", "LT", "LU", "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE", "GB", "HR", "LI", "NO", "IS"], this.stubFileName = "otSDKStub", this.DATAFILEATTRIBUTE = "data-domain-script", this.bannerScriptName = "otBannerSdk.js", this.mobileOnlineURL = [], this.isMigratedURL = !1, this.migratedCCTID = "[[OldCCTID]]", this.migratedDomainId = "[[NewDomainId]]"
        },
        a = (i.prototype.initConsentSDK = function () {
            this.initCustomEventPolyfill(), this.ensureHtmlGroupDataInitialised(), this.updateGtmMacros(), this.fetchBannerSDKDependency()
        }, i.prototype.fetchBannerSDKDependency = function () {
            this.setDomainDataFileURL(), this.otFetch(l().bannerDataParentURL, this.addBannerSDKScript)
        }, i.prototype.addBannerSDKScript = function (t) {
            if (!1 === t.UseSDKRefactor) {
                var e = l().stubScriptElement.cloneNode(!0);
                l().isMigratedURL && (e.src = l().storageBaseURL + "/scripttemplates/old/scripttemplates/" + l().stubFileName + ".js");
                var n = l().storageBaseURL + "/scripttemplates/old/scripttemplates/5.11.0/" + l().bannerScriptName;
                window.otStubData && (l().mobileOnlineURL = window.otStubData.mobileOnlineURL.concat(l().mobileOnlineURL)), window.otStubData = {
                    domainData: t,
                    stubElement: e,
                    bannerBaseDataURL: l().bannerBaseDataURL,
                    mobileOnlineURL: l().mobileOnlineURL
                }, c().jsonp(n, null)
            } else e = l().stubScriptElement.cloneNode(!0), l().isMigratedURL && (e.src = l().storageBaseURL + "/scripttemplates/" + l().stubFileName + ".js"), n = l().storageBaseURL + "/scripttemplates/" + t.Version + "/" + l().bannerScriptName, window.otStubData = {
                domainData: t,
                stubElement: e,
                bannerBaseDataURL: l().bannerBaseDataURL,
                mobileOnlineURL: l().mobileOnlineURL
            }, c().jsonp(n, null)
        }, i.prototype.otFetch = function (t, e) {
            if (new RegExp("^(http|https)://", "i").test(t)) {
                l().mobileOnlineURL.push(t);
                var n = new XMLHttpRequest;
                n.onload = function () {
                    e(JSON.parse(this.responseText))
                }, n.open("GET", t), n.send()
            } else this.otFetchOfflineFile(t, e)
        }, i.prototype.otFetchOfflineFile = function (t, e) {
            var n = (t = t.replace(".json", ".js")).split("/"),
                o = n[n.length - 1].split(".js")[0];
            this.jsonp(t, function () {
                e(window[o])
            })
        }, i.prototype.jsonp = function (t, e) {
            var n = document.createElement("script");
            n.setAttribute("src", t), n.async = !0, n.type = "text/javascript", document.getElementsByTagName("head")[0].appendChild(n), new RegExp("^(http|https)://", "i").test(t) && l().mobileOnlineURL.push(t), e && (n.onload = function () {
                e()
            })
        }, i.prototype.ensureHtmlGroupDataInitialised = function () {
            this.initializeIABData(), this.initializeGroupData()
        }, i.prototype.initializeGroupData = function () {
            this.readCookieParam(l().optanonCookieName, "groups") && (l().optanonHtmlGroupData = this.deserialiseStringToArray(this.readCookieParam(l().optanonCookieName, "groups")))
        }, i.prototype.initializeIABData = function () {
            this.validateIABGDPRApplied(), this.validateIABGlobalScope()
        }, i.prototype.validateIABGlobalScope = function () {
            var t = this.readCookieParam(l().optanonCookieName, l().oneTrustIsIABCrossConsentEnableParam);
            t ? "true" === t ? (l().hasIABGlobalScope = !0, l().isStubReady = !1) : (l().hasIABGlobalScope = !1, l().IABCookieValue = this.getCookie(l().oneTrustIABCookieName)) : l().isStubReady = !1
        }, i.prototype.validateIABGDPRApplied = function () {
            var t = this.readCookieParam(l().optanonCookieName, l().geolocationCookiesParam).split(";")[0];
            t ? this.isBoolean(t) ? l().oneTrustIABgdprAppliesGlobally = t : l().oneTrustIABgdprAppliesGlobally = 0 <= l().EUCOUNTRIES.indexOf(t) : l().isStubReady = !1
        }, i.prototype.isBoolean = function (t) {
            return "true" === t || "false" === t
        }, i.prototype.readCookieParam = function (t, e) {
            var n, o, a, i, r = this.getCookie(t);
            if (r) {
                for (o = {}, a = r.split("&"), n = 0; n < a.length; n += 1) i = a[n].split("="), o[decodeURIComponent(i[0])] = decodeURIComponent(i[1]).replace(/\+/g, " ");
                return e && o[e] ? o[e] : e && !o[e] ? "" : o
            }
            return ""
        }, i.prototype.getCookie = function (t) {
            var e, n, o = t + "=",
                a = document.cookie.split(";");
            for (e = 0; e < a.length; e += 1) {
                for (n = a[e];
                    " " == n.charAt(0);) n = n.substring(1, n.length);
                if (0 == n.indexOf(o)) return n.substring(o.length, n.length)
            }
            return null
        }, i.prototype.updateGtmMacros = function () {
            var t, e = [];
            for (t = 0; t < l().optanonHtmlGroupData.length; t++) this.endsWith(l().optanonHtmlGroupData[t], ":1") && e.push(l().optanonHtmlGroupData[t].replace(":1", ""));
            var n = "," + this.serialiseArrayToString(e) + ",";
            window.OnetrustActiveGroups = n, window.OptanonActiveGroups = n, void 0 !== window.dataLayer ? window.dataLayer.constructor === Array && (window.dataLayer.push({
                OnetrustActiveGroups: n
            }), window.dataLayer.push({
                OptanonActiveGroups: n
            })) : window.dataLayer = [{
                event: "OneTrustLoaded",
                OnetrustActiveGroups: n
            }, {
                event: "OptanonLoaded",
                OptanonActiveGroups: n
            }], setTimeout(function () {
                var t = new CustomEvent("consent.onetrust", {
                    detail: e
                });
                window.dispatchEvent(t)
            })
        }, i.prototype.deserialiseStringToArray = function (t) {
            return t ? t.split(",") : []
        }, i.prototype.endsWith = function (t, e) {
            return -1 !== t.indexOf(e, t.length - e.length)
        }, i.prototype.serialiseArrayToString = function (t) {
            return t.toString()
        }, i.prototype.setStubScriptElement = function () {
            l().stubScriptElement = document.querySelector("script[src*='" + l().stubFileName + "'][data-domain-script*='-']"), l().stubScriptElement && l().stubScriptElement.hasAttribute(l().DATAFILEATTRIBUTE) ? l().domainDataFileName = l().stubScriptElement.getAttribute(l().DATAFILEATTRIBUTE) : l().stubScriptElement || (l().stubScriptElement = document.querySelector("script[src*='" + l().migratedCCTID + "'][data-domain-script*='-']"), l().stubScriptElement && (l().isMigratedURL = !0, l().domainDataFileName = l().migratedDomainId))
        }, i.prototype.setDomainDataFileURL = function () {
            this.setStubScriptElement();
            var t = l().stubScriptElement.getAttribute("src");
            t && (l().isMigratedURL ? l().storageBaseURL = t.split("/consent/" + l().migratedCCTID)[0] : l().storageBaseURL = t.split("/scripttemplates/" + l().stubFileName)[0]), l().bannerBaseDataURL = l().storageBaseURL && l().storageBaseURL + "/consent/" + l().domainDataFileName, l().bannerDataParentURL = l().bannerBaseDataURL + "/" + l().domainDataFileName + ".json"
        }, i.prototype.initCustomEventPolyfill = function () {
            if ("function" == typeof window.CustomEvent) return !1;

            function t(t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
            }
            t.prototype = window.Event.prototype, window.CustomEvent = t
        }, i);

    function i() {}
    var r = null,
        s = null,
        p = null;

    function l() {
        return r = r || new o
    }

    function u() {
        return s = s || new e
    }

    function c() {
        return p = p || new a
    }
    c().initConsentSDK();
    var d = (m.prototype.initConsentSDK = function () {
        this.initCustomEventPolyfill(), this.ensureHtmlGroupDataInitialised(), this.updateGtmMacros(), this.fetchBannerSDKDependency()
    }, m.prototype.fetchBannerSDKDependency = function () {
        this.setDomainDataFileURL(), this.otFetch(l().bannerDataParentURL, this.addBannerSDKScript)
    }, m.prototype.addBannerSDKScript = function (t) {
        if (!1 === t.UseSDKRefactor) {
            var e = l().stubScriptElement.cloneNode(!0);
            l().isMigratedURL && (e.src = l().storageBaseURL + "/scripttemplates/old/scripttemplates/" + l().stubFileName + ".js");
            var n = l().storageBaseURL + "/scripttemplates/old/scripttemplates/5.11.0/" + l().bannerScriptName;
            window.otStubData && (l().mobileOnlineURL = window.otStubData.mobileOnlineURL.concat(l().mobileOnlineURL)), window.otStubData = {
                domainData: t,
                stubElement: e,
                bannerBaseDataURL: l().bannerBaseDataURL,
                mobileOnlineURL: l().mobileOnlineURL
            }, c().jsonp(n, null)
        } else e = l().stubScriptElement.cloneNode(!0), l().isMigratedURL && (e.src = l().storageBaseURL + "/scripttemplates/" + l().stubFileName + ".js"), n = l().storageBaseURL + "/scripttemplates/" + t.Version + "/" + l().bannerScriptName, window.otStubData = {
            domainData: t,
            stubElement: e,
            bannerBaseDataURL: l().bannerBaseDataURL,
            mobileOnlineURL: l().mobileOnlineURL
        }, c().jsonp(n, null)
    }, m.prototype.otFetch = function (t, e) {
        if (new RegExp("^(http|https)://", "i").test(t)) {
            l().mobileOnlineURL.push(t);
            var n = new XMLHttpRequest;
            n.onload = function () {
                e(JSON.parse(this.responseText))
            }, n.open("GET", t), n.send()
        } else this.otFetchOfflineFile(t, e)
    }, m.prototype.otFetchOfflineFile = function (t, e) {
        var n = (t = t.replace(".json", ".js")).split("/"),
            o = n[n.length - 1].split(".js")[0];
        this.jsonp(t, function () {
            e(window[o])
        })
    }, m.prototype.jsonp = function (t, e) {
        var n = document.createElement("script");
        n.setAttribute("src", t), n.async = !0, n.type = "text/javascript", document.getElementsByTagName("head")[0].appendChild(n), new RegExp("^(http|https)://", "i").test(t) && l().mobileOnlineURL.push(t), e && (n.onload = function () {
            e()
        })
    }, m.prototype.ensureHtmlGroupDataInitialised = function () {
        this.initializeIABData(), this.initializeGroupData()
    }, m.prototype.initializeGroupData = function () {
        this.readCookieParam(l().optanonCookieName, "groups") && (l().optanonHtmlGroupData = this.deserialiseStringToArray(this.readCookieParam(l().optanonCookieName, "groups")))
    }, m.prototype.initializeIABData = function () {
        this.validateIABGDPRApplied(), this.validateIABGlobalScope()
    }, m.prototype.validateIABGlobalScope = function () {
        var t = this.readCookieParam(l().optanonCookieName, l().oneTrustIsIABCrossConsentEnableParam);
        t ? "true" === t ? (l().hasIABGlobalScope = !0, l().isStubReady = !1) : (l().hasIABGlobalScope = !1, l().IABCookieValue = this.getCookie(l().oneTrustIABCookieName)) : l().isStubReady = !1
    }, m.prototype.validateIABGDPRApplied = function () {
        var t = this.readCookieParam(l().optanonCookieName, l().geolocationCookiesParam).split(";")[0];
        t ? this.isBoolean(t) ? l().oneTrustIABgdprAppliesGlobally = t : l().oneTrustIABgdprAppliesGlobally = 0 <= l().EUCOUNTRIES.indexOf(t) : l().isStubReady = !1
    }, m.prototype.isBoolean = function (t) {
        return "true" === t || "false" === t
    }, m.prototype.readCookieParam = function (t, e) {
        var n, o, a, i, r = this.getCookie(t);
        if (r) {
            for (o = {}, a = r.split("&"), n = 0; n < a.length; n += 1) i = a[n].split("="), o[decodeURIComponent(i[0])] = decodeURIComponent(i[1]).replace(/\+/g, " ");
            return e && o[e] ? o[e] : e && !o[e] ? "" : o
        }
        return ""
    }, m.prototype.getCookie = function (t) {
        var e, n, o = t + "=",
            a = document.cookie.split(";");
        for (e = 0; e < a.length; e += 1) {
            for (n = a[e];
                " " == n.charAt(0);) n = n.substring(1, n.length);
            if (0 == n.indexOf(o)) return n.substring(o.length, n.length)
        }
        return null
    }, m.prototype.updateGtmMacros = function () {
        var t, e = [];
        for (t = 0; t < l().optanonHtmlGroupData.length; t++) this.endsWith(l().optanonHtmlGroupData[t], ":1") && e.push(l().optanonHtmlGroupData[t].replace(":1", ""));
        var n = "," + this.serialiseArrayToString(e) + ",";
        window.OnetrustActiveGroups = n, window.OptanonActiveGroups = n, void 0 !== window.dataLayer ? window.dataLayer.constructor === Array && (window.dataLayer.push({
            OnetrustActiveGroups: n
        }), window.dataLayer.push({
            OptanonActiveGroups: n
        })) : window.dataLayer = [{
            event: "OneTrustLoaded",
            OnetrustActiveGroups: n
        }, {
            event: "OptanonLoaded",
            OptanonActiveGroups: n
        }], setTimeout(function () {
            var t = new CustomEvent("consent.onetrust", {
                detail: e
            });
            window.dispatchEvent(t)
        })
    }, m.prototype.deserialiseStringToArray = function (t) {
        return t ? t.split(",") : []
    }, m.prototype.endsWith = function (t, e) {
        return -1 !== t.indexOf(e, t.length - e.length)
    }, m.prototype.serialiseArrayToString = function (t) {
        return t.toString()
    }, m.prototype.setStubScriptElement = function () {
        l().stubScriptElement = document.querySelector("script[src*='" + l().stubFileName + "'][data-domain-script*='-']"), l().stubScriptElement && l().stubScriptElement.hasAttribute(l().DATAFILEATTRIBUTE) ? l().domainDataFileName = l().stubScriptElement.getAttribute(l().DATAFILEATTRIBUTE) : l().stubScriptElement || (l().stubScriptElement = document.querySelector("script[src*='" + l().migratedCCTID + "'][data-domain-script*='-']"), l().stubScriptElement && (l().isMigratedURL = !0, l().domainDataFileName = l().migratedDomainId))
    }, m.prototype.setDomainDataFileURL = function () {
        this.setStubScriptElement();
        var t = l().stubScriptElement.getAttribute("src");
        t && (l().isMigratedURL ? l().storageBaseURL = t.split("/consent/" + l().migratedCCTID)[0] : l().storageBaseURL = t.split("/scripttemplates/" + l().stubFileName)[0]), l().bannerBaseDataURL = l().storageBaseURL && l().storageBaseURL + "/consent/" + l().domainDataFileName, l().bannerDataParentURL = l().bannerBaseDataURL + "/" + l().domainDataFileName + ".json"
    }, m.prototype.initCustomEventPolyfill = function () {
        if ("function" == typeof window.CustomEvent) return !1;

        function t(t, e) {
            e = e || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
        }
        t.prototype = window.Event.prototype, window.CustomEvent = t
    }, m);

    function m() {}
    return t.OtSDKStub = d, t
}({});
