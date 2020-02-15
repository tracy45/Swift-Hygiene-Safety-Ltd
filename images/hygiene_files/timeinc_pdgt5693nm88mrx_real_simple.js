/* funnel-relay version 2  - do the magic here 2019-07-31 11:00 */

trx = window.trx || {};


(function () {
        "use strict";


        trx.MagicLinks = class {


            /**
             * Check the settings and add missing attributes if some corruption occur to settings or when new settings are added.
             *
             * @public
             * @static
             */
            static prepareDefaultSettings(baseSettings) {
                if (typeof baseSettings.detection_rules !== "object") {
                    baseSettings.detection_rules = {
                        auto: true,
                        custom: [],
                        exclude_urls: [],
                        page_url_filter: ""
                    }
                }

                if (baseSettings.detection_rules.auto == null) {
                    baseSettings.detection_rules.auto = true;
                }
                if (baseSettings.detection_rules.auto_networks == null) {
                    baseSettings.detection_rules.auto_networks = {
                        "amazon": false,
                        "ls": true,
                        "cj": true,
                        "sas": false,
                        "awin": false,
                        "pj": false,
                        "sl": false,
                        "vl": false,
                        "ir": false,
                        "td": false,
                        "wg": false,
                        "pt": false,
                        "dynamic": false,
                    };
                }
                if (!(baseSettings.detection_rules.custom instanceof Array)) {
                    baseSettings.detection_rules.custom = [];
                }
                if (!(baseSettings.detection_rules.exclude_urls instanceof Array)) {
                    baseSettings.detection_rules.exclude_urls = [];
                }
                if (baseSettings.detection_rules.page_url_filter == null) {
                    baseSettings.detection_rules.page_url_filter = "";
                }
                if (baseSettings.detection_rules.amazon_no_append == null) {
                    baseSettings.detection_rules.amazon_no_append = false;
                }

                if (typeof baseSettings.features !== "object") {
                    baseSettings.features = {}
                }

                if (baseSettings.features.append_referrer == null) {
                    baseSettings.features.append_referrer = {
                        enabled: true,
                        attr_name: "referrer",
                        new_query_param: false
                    };
                }
                if (baseSettings.features.attributes_forwarding == null) {
                    baseSettings.features.attributes_forwarding = {
                        enabled: false,
                        attributes: [],
                    };
                }
                if (baseSettings.features.append_timing == null) {
                    baseSettings.features.append_timing = {
                        enabled: false,
                        t_load: false,
                        t_clicked: false,
                        t_toclick: false,
                        new_query_param: false
                    };
                }
                if (baseSettings.features.append_attributes == null) {
                    baseSettings.features.append_attributes = {
                        enabled: false,
                        attributes: ""
                    };
                }
                if (baseSettings.features.track_events == null) {
                    baseSettings.features.track_events = {
                        enabled: false,
                        pageview: false,
                        clicks: false,
                        props_map: {
                            xid: "prop1",
                            link: "prop2",
                            label: "prop3",
                            referrer: "prop4",
                            origin: "prop5",
                        },
                        props_map_custom: []
                    };
                }
                if (baseSettings.features.auto_optimize_link == null) {
                    baseSettings.features.auto_optimize_link = {
                        enabled: false
                    };
                }
                if (baseSettings.features.link_preview == null) {
                    baseSettings.features.link_preview = {
                        enabled: false,
                        show_icon: false,
                        show_metadata: false,
                        show_coupons: false
                    };
                }
                if (baseSettings.features.shorten_extra_param == null) {
                    baseSettings.features.shorten_extra_param = {
                        enabled: false
                    };
                }
                if (baseSettings.features.metadata == null) {
                    baseSettings.features.metadata = {
                        enabled: false,
                        selectors: ""
                    };
                }

                return baseSettings;
            }


            constructor(autoRun) {
                try {
                    if (autoRun == null) {
                        autoRun = true;
                    }
                    if (env == null) {
                        env = "prod";
                    }

                    this._paramsBuffer = {};
                    this._autoRun = autoRun;
                    this.init(autoRun);
                } catch (e) {
                    this._error(e, e.stack);
                }
            }

            /**
             * Initialize script settings
             */
            init() {
                try {
                    this._onPageSettings = trx.magic_links_settings || {};

                    //@formatter:off
                    this._envSettings = {"events_recording_env":"timeinc","events_recording_api":"https://kltis49a85.execute-api.us-east-1.amazonaws.com/Prod","app_key":"gsd65fgr0hgTTT"}; //do not change this token.
                    //@formatter:on

                    //@formatter:off
                    this._serverSettings = {"detection_rules":{"auto":"false","exclude_urls":["facebook.com","google.com","pinterest.com","twitter.com"],"auto_networks":{"amazon":"false","awin":"true","cj":"true","ir":"true","ls":"true","sas":"true","sl":"true","vg":"false","pj":"true","td":"false","wg":"false","pt":"true","dynamic":"true"},"page_url_filter":"","amazon_no_append":"false"},"features":{"append_referrer":{"enabled":"true","attr_name":"referrer"},"attributes_forwarding":{"enabled":"true","attributes":["utm_source","utm_medium","utm_campaign","utm_name","utm_content"]},"append_timing":{"enabled":"false","t_load":"false","t_clicked":"false","t_toclick":"false"},"append_attributes":{"enabled":"false","attributes":""},"track_events":{"enabled":"false","pageview":"false","clicks":"false","analytics_code":"","props_map":{"xid":"prop1","link":"prop2","label":"prop3","referrer":"prop4","origin":"prop5"}},"link_preview":{"enabled":"false","show_icon":"false","show_metadata":"false","show_coupons":"false"},"metadata":{"enabled":"true","selectors":"Author | document.evaluate(\"\/\/a[@class='bold author-name']\", document, null, XPathResult.STRING_TYPE, null).stringValue\nTags | js::window.karma.config.targeting.tags\nDate | js::document.getElementsByClassName(\"published-date\")[0].innerText\nChannel | js::window.karma.config.targeting.ch\nSubChannel | js::window.karma.config.targeting.sch\nContent_Type | js::window.karma.config.targeting.ctype"}},"program":{"features":{"append_referrer":{"enabled":"true"},"attributes_forwarding":{"enabled":"true"},"append_timing":{"enabled":"true"},"track_events":{"enabled":"true"},"link_preview":{"enabled":"true","options_state":{"show_icon":"true","show_metadata":"false","show_coupons":"false"}},"append_attributes":{"enabled":"false"},"shorten_extra_param":{"enabled":"false"},"auto_optimize_link":{"enabled":"false"}}},"dynamic_domains":[""]}; //do not change this token.
                    //@formatter:on

                    if (this._envSettings["events_recording_env"] == null) {
                        this._envSettings["events_recording_env"] = "prod";
                    }
                    this._embedUrlToken = "FR-EMBEDDED-RF";
                    this._delimiter1 = "|";
                    this._delimiter2 = "~";
                    this._logPrefix = "FunnelRelay:: ";
                    this._loadTime = Date.now();
                    this._links = [];
                    this._customLinks = new Map();
                    this._report = {};
                    this._exclude_urls_regex = [];
                    this._scriptEm = document.getElementById("funnel-relay-installer");
                    if (this._scriptEm == null) {
                        this._error('Installation script is missing  id="funnel-relay-installer" attribute. Funnel Relay will not run');
                        return;
                    }

                    if (trx.amp_redirect !== undefined && trx.amp_redirect == true) {
                        this.ampRedirectNow();
                    } else {
                        this._prepareSettings();
                        this._prepareExcludeRegExp();
                        if (this._autoRun) {
                            this.run();
                        }
                    }


                } catch (exp) {
                    console.error("Magic Links 'init' procedure fail! Details: " + exp);
                    if (exp.stack) {
                        console.error(exp.stack);
                    }
                }
            }

            /**
             * Parse query parameters.
             *
             * @param queryString
             */
            parseQueryString(queryString) {
                var params = {}, queries, temp, i, l;
                // Split into key/value pairs
                queries = queryString.split("&");
                // Convert the array of strings into an object
                for (i = 0, l = queries.length; i < l; i++) {
                    temp = queries[i].split('=');
                    params[temp[0]] = temp[1];
                }
                return params;
            }

            /**
             * Handle funnel-relay logic for AMP pages.
             */
            ampRedirectNow() {
                // get parameters from url
                this.targetUrl = null;
                let params = this.parseQueryString(location.search);

                if (params.anchor_href) {
                    this.targetUrl = params.anchor_href;
                } else {
                    return;
                }
                // plant anchor in page
                let anchor = document.getElementById("fr-link");
                anchor.href = decodeURIComponent(this.targetUrl);

                // change source
                if (params.source) {
                    trx.source = decodeURIComponent(params.source);
                }
                // change referrer
                if (params.referrer) {
                    trx.referrer = decodeURIComponent(params.referrer);
                }
                //  run logic
                this._prepareSettings();
                this._prepareExcludeRegExp();
                this.run();

                // redirect to anchor
                // location.href = anchor.href;
                anchor.click();
            }

            /**
             * Get on-page settings
             * @return {*|{}}
             * @public
             */
            get onPageSettings() {
                return this._onPageSettings;
            }

            /**
             * Get server settings. If not set return empty object.
             * @return {*|{}}
             * @public
             */
            get serverSettings() {
                if (this._serverSettings.hasOwnProperty("SETTINGS_PLACEHOLDER")) {
                    return {};
                } else {
                    return this._serverSettings;
                }
            }

            /**
             * Get the buffer used to collect parameters to send with affiliate link.
             * @return {{}}
             */
            get paramsBuffer() {
                return this._paramsBuffer;
            }

            /**
             *
             * @param {String} mlId
             * @param event
             */
            static renderLinkPreview(mlId, event) {
                let imgEm = document.querySelector('iframe[data-ml-preview="' + mlId + '"]');
                if (imgEm != null) {
                    imgEm.parentNode.removeChild(imgEm);
                    return;
                }

                let anchor = document.querySelector('a[data-ml-id="' + mlId + '"]');
                if (anchor != null) {
                    let iframeEm = document.createElement("iframe");
                    iframeEm.setAttribute("data-ml-preview", mlId);
                    iframeEm.setAttribute("scrolling", "no");
                    iframeEm.setAttribute("frameborder", "0");
                    iframeEm.style.borderStyle = "solid";
                    iframeEm.style.borderWidth = "2px";
                    iframeEm.style.borderColor = "grey";
                    iframeEm.style.borderRadius = "3px";
                    iframeEm.style.position = "absolute";
                    iframeEm.style.width = "120px";
                    iframeEm.style.height = "90px";
                    iframeEm.style.background = "#fff";

                    let docElem = document.documentElement;
                    let box = anchor.getBoundingClientRect();
                    iframeEm.style.top = box.top + (window.pageYOffset - docElem.clientTop) - 100 + "px";
                    iframeEm.style.left = box.left + (window.pageXOffset - docElem.clientLeft) + (box.width - 60) + "px";

                    document.body.appendChild(iframeEm);

                    let iframeDoc = (iframeEm.contentWindow || iframeEm.contentDocument);
                    if (iframeDoc.document) {
                        iframeDoc = iframeDoc.document;
                    }

                    let imgEm = iframeDoc.createElement("img");
                    let url = "http://images.shrinktheweb.com/xino.php?stwembed=1&stwaccesskeyid=4abc115f8a632c5&stwsize=120x90&stwurl=" + anchor.href;
                    imgEm.setAttribute("src", url);
                    imgEm.style.width = "100%";
                    imgEm.style.height = "auto";
                    iframeDoc.body.appendChild(imgEm);
                    iframeDoc.body.style.padding = "1px";
                }

                event.stopImmediatePropagation();
            }

            /**
             * Run eh features
             *
             * @param {boolean}[reset] reset When working with simulator we want to reset the links before apply the ML logic again.
             */
            run(reset) {
                try {
                    if (!this._scriptEm.hasAttribute("data-property-id")
                        || !this._scriptEm.hasAttribute("data-customer-id")
                        || this._isEmpty(this._scriptEm.hasAttribute("data-property-id"))
                        || this._isEmpty(this._scriptEm.hasAttribute("data-customer-id"))
                    ) {
                        this._error("Missing one of the mandatory script attributes 'data-customer-id' and/or 'data-property-id'");
                        return;
                    }

                    if (this._isEmpty(this._envSettings.events_recording_api)) {
                        this._error("Missing environment settings. Check that you setup $ENV_SETTINGS in my.cfg.php and that 'events_recording_api' is set there!");
                        return;
                    }

                    //if page_url_filter is set check that page url match the condition
                    if (!this._checkPageUrlMatch()) {
                        return;
                    }

                    //reset the link url to original state.Used when working with simulator to prevent multiple append of link parameters.
                    if (reset === true && document.links.length > 0) {
                        for (let i = 0; i < document.links.length; i++) {
                            let anchor = document.links[i];
                            let origUrl = anchor.getAttribute("data-orig-url");
                            if (!this._isEmpty(origUrl)) {
                                anchor.href = origUrl;
                            }
                            anchor.removeAttribute("data-ml-dynamic-type");
                            anchor.removeAttribute("data-ml-dynamic");
                            anchor.removeAttribute("data-ml-id");
                            anchor.removeAttribute("data-xid");
                            anchor.removeAttribute("data-ml");

                            if (anchor.hasAttribute("data-skimlinks-tracking")) {
                                anchor.setAttribute("data-skimlinks-tracking", this._cleanupXid(anchor.getAttribute("data-skimlinks-tracking")));
                            }
                        }
                    }
                    //find links to manipulate
                    this._detectLinks();

                    //apply magic-links features
                    if (this._links.length > 0) {
                        this._appendUUID();
                        this._runFeatures();
                    }

                    //append xid to anchor's href. In the case of embedded link, append to the embedded part and replace this part in original href.
                    for (let i = 0; i < this._links.length; i++) {
                        let item = this._links[i];
                        if (item.info.dynamic) {
                            continue;
                        }
                        if (item.info.embedded) {
                            item.anchor.href = item.info.wrapping_url.replace(this._embedUrlToken, encodeURIComponent(item.info.url));
                        } else {
                            item.anchor.href = item.info.url;
                        }
                    }

                    //is specified prepare and send report data to listeners
                    if (scriptEm != null) {
                        if (scriptEm.getAttribute("data-report") === "true") {
                            this._postReport();
                        }
                    }
                } catch (exp) {
                    this._error("'run' procedure fail! Details: " + exp, exp.stack);
                }
            }

            /**
             * This method can be used by external api in order to apply funnel-relay logic on custom url or link elements
             * create by javascript. The method will add new hidden anchor elements to page, run fuynnel-relay loagic
             * and set in the map, the response url.
             *
             *
             * @param {Map<string, string>} urlMap map between identifier and url. We process each entry and return corresponding map
             * with identifier and resulted link, as well as resulted and
             * @public
             */
            registerCustomLinks(urlMap) {
                for (let [id, url] of  urlMap) {
                    this.registerCustomLink(id, url);
                }
            }

            /**
             * Register single custom link.
             *
             * @param {string} id unique identifier
             * @param {string} url the url to process
             */
            registerCustomLink(id, url) {
                if (!this._isEmpty(id) && !this._isEmpty(url)) {
                    let a = document.getElementById(id);
                    if(a != null) {
                        a.parentNode.removeChild(a);
                    }

                    a = document.createElement("a");
                    a.href = url;
                    a.id = id;
                    a.style.display = "none";
                    a.setAttribute("data-ml-custom-link", "true");
                    a.setAttribute("target", "_blank");
                    document.body.append(a);
                    this._customLinks.set(id, {orig_url: url});
                } else {
                    this._error("registerCustomLink method was invoked with either empty 'id' or empty 'url' arguments." +
                        " Check you call to method(s) 'registerCustomLink' / 'registerCustomLinks'")
                }
            }

            /**
             * Get map of custom urls with indicator of processing, and resulted url.
             * Each entry value include three properties:
             * 1. 'orig_url' - this is the original url provided to method {@link registerCustomLink}
             * 2. 'processed' - true indicate that url was detected by funnel-relay as required processing. false indicate that no processing occur.
             * 3. 'fr_url' - if funnel-relay processed the url this property include the processed url with xid attribute.
             *
             * @return {Map<string, object>}
             */
            getProcessedCustomLinks() {
                for (let [id, obj] of  this._customLinks) {
                    let a = document.getElementById(id);
                    obj.processed = a.hasAttribute("data-ml");
                    if (obj.processed) {
                        obj.fr_url = a.href;
                    }
                }
                return this._customLinks;
            }

            /**
             * Trigger custom link, that was previously prepared by {@link registerCustomLinks}.
             *
             * @param id
             * @param {Object}[args] args optional object of arguments to add into record's data
             * @public
             */
            recordCustomLinkClick(id, args) {
                try {
                    let found = false;
                    for (let i = 0; i < this._links.length; i++) {
                        let link = this._links[i];
                        if (link.anchor.id === id) {
                            let event = {type: "custom-url"};
                            this._linkClicked(link, event, args);
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        this._error("recordCustomLinkClick was invoked with unrecognized id: '" + id + "'." +
                            " The id should be the same as the value used when you invoked registerCustomLink(...) or registerCustomLinks(...)");
                    }
                } catch (e) {
                    this._error("Fail to trigger custom link. Details: " + e, e.stack);
                }
            }

            /**
             * Check the enabled features and run corresponding feature logic.
             * We prepare feature's related data on {@link _paramsBuffer} and we write it to events-recording service when user click a link.
             * Unlike funnel_relay version 1 we do not change link URLS
             *
             * @private
             */
            _runFeatures() {
                //first write static data to params buffer
                this._paramsBuffer["origin"] = this.href;
                this._paramsBuffer["property_id"] = this._scriptEm.getAttribute("data-property-id");
                this._paramsBuffer["customer_id"] = this._scriptEm.getAttribute("data-customer-id");

                this._paramsBuffer["cidp1"] = this._paramsBuffer["customer_id"];
                this._paramsBuffer["cidp2"] = "-";
                if (this._paramsBuffer["customer_id"].indexOf("_") !== -1) {
                    const arr = this._paramsBuffer["customer_id"].split("_");
                    if (arr.length > 2) {
                        let subArr = arr.slice(0, arr.length - 1);
                        this._paramsBuffer["cidp1"] = subArr.join("_");
                        this._paramsBuffer["cidp2"] = arr[arr.length - 1];
                    }
                }
                this._paramsBuffer["source"] = location.href;
                if (trx.source!==undefined) {this._paramsBuffer["source"] =  trx.source;} 
                this._paramsBuffer["event_type"] = "click";

                //now apply features and add features data to params buffer
                let obj = this._settings.features;
                for (let featureId in obj) {
                    if (obj.hasOwnProperty(featureId)) {
                        let options = obj[featureId];
                        if (!this._asBoolean(options["enabled"])) {
                            continue;
                        }

                        switch (featureId) {
                            case "append_referrer":
                                this._appendReferrer(options);
                                break;
                            case "append_timing":
                                this._appendTiming(options);
                                break;
                            case "append_attributes":
                                this._appendAttributes(options);
                                break;
                            case "attributes_forwarding":
                                this._attributesForwarding(options);
                                break;
                            case "track_events":
                                this._prepareEventTracking(options);
                                break;
                            case "auto_optimize_link":
                                this._autoOptimizeLinks(options);
                                break;
                            case "link_preview":
                                this._preparePreview(options);
                                break;
                            case "shorten_extra_param":
                                this._prepareShortExtraParam(options);
                                break;
                            case "metadata":
                                this._prepareMetadata(options);
                                break;
                        }
                    }
                }

                //for each of the detected link register event that prepare the URL with added parameters, when user click the link
                for (let i = 0; i < this._links.length; i++) {
                    let link = this._links[i];
                    if (link.anchor.click_fn != null && typeof (link.anchor.click_fn) === "function") {
                        link.anchor.removeEventListener("click", link.anchor.click_fn);
                    }
                    let fn = this._linkClicked.bind(this, link);
                    link.anchor.addEventListener("click", fn);
                    link.anchor.click_fn = fn;

                    //add event of contextmenu
                    if (link.anchor.contextmenu_fn != null && typeof (link.anchor.contextmenu_fn) === "function") {
                        link.anchor.removeEventListener("contextmenu", link.anchor.contextmenu_fn);
                    }
                    let fn1 = this._linkClicked.bind(this, link);
                    link.anchor.addEventListener("contextmenu", fn1);
                    link.anchor.contextmenu_fn = fn1;
                }

                this._setSkimDynamicXcust();
            }

            /**
             * Set 'data-skimlinks-tracking' attribute of Dkimlinks dynamic links
             * @private
             */
            _setSkimDynamicXcust() {
                //for skimlinks dynamic links we set the relevant attribute in advance, and not on click
                if (this._asBoolean(this._settings.detection_rules.auto_networks["dynamic"])) {
                    for (let i = 0; i < this._links.length; i++) {
                        let link = this._links[i];
                        if (link.info.dynamic && link.info.dynamicType === "sl") {
                            let xcust = link.anchor.hasAttribute("data-skimlinks-tracking") ? link.anchor.getAttribute("data-skimlinks-tracking") : "";
                            xcust = this._cleanupXid(xcust);
                            if (!this._isEmpty(xcust)) {
                                xcust += "|";
                            }
                            xcust += "xid:" + link.info.xid;
                            link.anchor.setAttribute("data-skimlinks-tracking", xcust); //set the xcust value on data-skimlinks-tracking of the link
                        }
                    }
                }
            }


            /**
             * Handle dynamic links.
             * <p/>
             * For vigLink we set the "cuid" option of VigLink API with the params value collected on link. VigLink create new page
             * and then set inside a script element that to the actual redirection, using parameters set for link. If you want to see where is this
             * happen, put VigLink script in Pritify mode and search for this code section:
             * <pre>
             *     l.document.write("<html><head><title>" + a.getActualHref(d) + '</title><script type="text/javascript" src="' +
             * this.api.now("click", h, a.extend(n, { fn: "callback",
             *           "return": !0
             *       })) + '">\x3c/script></head></html>');
             * </pre>
             * <p>
             * For Skimlinks, we set the xid value on attribute data-skimlinks-tracking of the link that is used to set the 'xcust' of redirecting
             * link. You can see where this happen by put Skimlinks javascript in pritify mode and search for:
             * <pre>
             *     var l = m(a, "data-skimlinks-tracking") || ea;
             *     ......
             *     b = r + "/?id=" + ra + (l ? "&xcust=" + l : "") + (!1 !== e ? "&xs=9" : "&xs=2") + "&url=" + B(b) + "&xguid=" + f.cookie +
             * "&xuuid=" + f.uuid + "&xsessid=" + f.sessid + "&isjs=1&xword=" + (q ? q : "") + "&xcreo=" + (n ? n : "") + "&xpid=" + (c ? c : "") +
             * "&xed=" + g + "&sref=" + B(k.location) + d + (O ? "&dnt=1" : "") + (X ? "&fdnt=1" : "") + (!1 !== e ? "&slmcid=" + e : "") + (!1 !==
             * f.timezone ? "&xtz=" + f.timezone : "")
             * <pre>
             * @param {Object} link link item
             * @param event
             * @param {Object}[args] args optional object of arguments to add into record's data
             * @private
             */
            _linkClicked(link, event, args) {
                if (link.info.dynamic) {
                    let apiType = link.anchor.getAttribute("data-ml-dynamic-type");
                    if (apiType === "vg") {
                        let cuid = vglnk.opt("cuid");
                        cuid = this._cleanupXid(cuid);
                        if (!this._isEmpty(cuid)) {
                            cuid += "|";
                        }
                        cuid += "xid:" + link.info.xid;
                        vglnk.opt("cuid", cuid); //set the cuid option within VigLink API

                    }
                }

                this._collectClickTimeParams();
                this._writeDataToEventsService(link, event.type, args);
            }

            /**
             * Cleanup xid section  |xid:fr<timestamp><tho random chars>  or xid:fr<timestamp><three random chars>
             * It is assumed that <timestamp> length is 13
             *
             * @param {string} str
             * @param {string}[replacement] optional replacement
             * @return {string}
             * @private
             */
            _cleanupXid(str, replacement) {
                if (str == null) {
                    return "";
                }
                if (replacement == null) {
                    replacement = "";
                }

                let inx1, pfxLen;
                if (!this._isEmpty(str)) {
                    inx1 = str.indexOf("|xid:fr");
                    pfxLen = "|xid:fr".length;
                    if (inx1 === -1) {
                        inx1 = str.indexOf("xid:fr");
                        pfxLen = "xid:fr".length;
                    }

                    if (inx1 !== -1) {
                        str = this._insertSubstringToString(str, replacement, inx1, inx1 + pfxLen + 16);
                    }
                }
                return str;
            }

            /**
             * Append UUID to link so we can later match between clicks and conversions
             * @private
             */
            _appendUUID() {
                let noAppendMap = {
                    "amazon": this._asBoolean(this._settings.detection_rules.amazon_no_append)
                };

                for (let i = 0; i < this._links.length; i++) {
                    let item = this._links[i];
                    let url = item.info.url;
                    let network = item.network;
                    let uuid = this._generateUUID();
                    item.info.xid = uuid;
                    if (noAppendMap[network] == null || noAppendMap[network] === false) {
                        if (item.info.embedded && item.info.wrapping_url != null) {
                            //in the case of embedded link append xid on trimmed version of wrapping url
                            item.info.wrapping_url = this._appendExtraParam(item.info.wrapping_net, item.info.wrapping_url, "xid", uuid, false);
                        }

                        item.info.url = this._appendExtraParam(network, url, "xid", uuid, false);
                    }
                    item.anchor.setAttribute("data-xid", uuid);
                }
            }

            /**
             * Appen referrer to the link
             *
             * @param options
             * @private
             */
            _appendReferrer(options) {
                if (this._asBoolean(options.enabled)) {
                    let attrName = options.attr_name;
                    let newQueryParam = this._asBoolean(options.new_query_param);
                    let referrer = document.referrer;

                    if (trx.referrer!==undefined) {referrer =  trx.referrer;} 

                    if (referrer.charAt(referrer.length - 1) === "/") {
                        referrer = referrer.substring(0, referrer.length - 1);
                    }
                    this._paramsBuffer[attrName] = referrer;
                }
            }

            /**
             * Appen timind properties to the link.
             *
             * @param options
             * @private
             */
            _appendTiming(options) {
                if (this._asBoolean(options.enabled)) {
                    let newQueryParam = this._asBoolean(options.new_query_param);
                    let recordLoad = options.t_load;
                    if (recordLoad) {
                        this._paramsBuffer["t_loaded"] = this._loadTime;
                    }
                }
            }

            /**
             * Append custom static attributes to affiliate link.
             *
             * @param options
             * @private
             */
            _appendAttributes(options) {
                if (this._asBoolean(options.enabled)
                    && !this._isEmpty(options.attributes) > 0) {

                    let params = this._parseQuery(options.attributes);
                    params.forEach((value, key, map) => {
                        for (let i = 0; i < this._links.length; i++) {
                            let item = this._links[i];
                            this._paramsBuffer[key] = value;
                        }
                    });
                }
            }

            /**
             * Attributes forwarding takes attributes from page query and forward to affiliate link
             *
             * @param options
             * @private
             */
            _attributesForwarding(options) {
                if (this._asBoolean(options.enabled)
                    && options.attributes instanceof Array
                    && options.attributes.length > 0) {

                    let str = location.search;
                    if (!this._isEmpty(str) && str.length > 1) {
                        let params = this._parseQuery(str.substring(1));
                        params.forEach((value, key, map) => {
                            if (options.attributes.includes(key)) {
                                this._paramsBuffer[key] = value;
                            }
                        });
                    }
                }
            }

            /**
             *
             * @param options
             * @private
             */
            _prepareEventTracking(options) {
                if (this._asBoolean(options.enabled)) {

                    if (!this._isEmpty(options.analytics_code) && options.analytics_code.indexOf("UA-") === 0 && typeof ga !== "undefined") {
                        this.trackerObj = new trx.GATracker(options.analytics_code);
                    } else if (!this._isEmpty(options.analytics_code) && typeof s != "undefined" && typeof s.tl == "function") {
                        this.trackerObj = new trx.AdobeTracker(options.analytics_code);
                    } else {
                        return;
                    }


                    if (this._asBoolean(options.pageview)) {
                        this.trackerObj.trackPageView();
                    }
                    if (this._asBoolean(options.clicks)) {
                        for (let i = 0; i < this._links.length; i++) {
                            let item = this._links[i];
                            let anchor = item.anchor;
                            let xid = item.info.xid;
                            anchor.addEventListener("click", () => {
                                let label = this._getAnchorLabel(anchor, 50) + " [" + anchor.href + "]";
                                this.trackerObj.trackEvent("magic-links", "click", label, "1", {
                                    xid: xid,
                                    anchor: anchor,
                                    props_map: options.props_map,
                                    props_map_custom: options.props_map_custom,
                                    data: this.paramsBuffer
                                });
                            });
                            this._markLink("feature", "track_events", anchor);
                        }
                    }
                }
            }

            /**
             *
             * @param options
             * @private
             */
            _autoOptimizeLinks(options) {
                if (this._asBoolean(options.enabled)) {
                    //todo
                }
            }

            /**
             * Prepare links to show icon of target page using shrink the web service.
             *
             * @param options
             * @private
             */
            _preparePreview(options) {
                if (this._asBoolean(options.enabled)) {
                    if (options.show_icon) {
                        for (let i = 0; i < this._links.length; i++) {
                            let item = this._links[i];
                            let anchor = item.anchor;
                            let handleEm = document.createElement("span");
                            handleEm.style.cursor = "pointer";
                            handleEm.innerHTML = "&nearr;";
                            handleEm.addEventListener("click", trx.MagicLinks.renderLinkPreview.bind(this, anchor.getAttribute("data-ml-id")));
                            anchor.insertAdjacentElement("afterend", handleEm);
                            this._markLink("feature", "preview", anchor);
                        }
                    }
                    if (options.show_metadata) {

                    }
                    if (options.show_coupons) {

                    }
                }
            }

            /**
             * Take the data in extra parameter and prepare short url from it. This intend to solve problem fo too long extra data.
             *
             * @param options
             * @private
             */
            _prepareShortExtraParam(options) {
                if (this._asBoolean(options.enabled)) {
                    //todo
                }
            }

            /**
             * Check is metadata selectors are defined and collect for defined selectors.
             * @param options
             * @private
             */
            _prepareMetadata(options) {
                if (!this._isEmpty(options.selectors)) {
                    let attrName, path, pathResult;
                    let lines = options.selectors.split("\n");
                    for (let i = 0; i < lines.length; i++) {
                        try {
                            let line = lines[i];
                            if (!this._isEmpty(line)) {
                                let arr = line.split("|");
                                if (arr.length > 1) {
                                    attrName = arr[0].trim();
                                    path = arr[1].trim();
                                    if (path.length === 0) {
                                        continue;
                                    }

                                    if (path.indexOf("js::") === 0) {
                                        let jsExpr = path.replace("js::", "").trim();
                                        pathResult = trx.MagicLinks._getObjectByPath(jsExpr);
                                        if(pathResult == null) {
                                            // validate expression
                                            // if function exsit using attrName run it.
                                            if (typeof trx.get[attrName] === "function") { 
                                                // safe to use the function
                                                pathResult = trx.get[attrName]();
                                            } else {
                                                this._log("Missing function get_"+attrName);
                                            }

                                            // pathResult = eval(jsExpr);

                                        }
                                    } else if (typeof document.evaluate === "function") {
                                        let result = document.evaluate(path, document, null, XPathResult.STRING_TYPE, null);
                                        pathResult = result.stringValue;
                                    }
                                    if (!this._isEmpty(pathResult)) {
                                        this._paramsBuffer[attrName] = pathResult;
                                    }
                                } else {
                                    this._log("Invalid metadata line. Line must have name and Xpath value in this format: name | xpath ")
                                }
                            } else {
                                this._log("Ignoring empty line in metadata settings.")
                            }
                        } catch (e) {
                            this._log(e);
                        }
                    }
                }
            }

            /**
             * Detect the links to manipulate and prepare list of anchor elements.
             *
             * @private
             */
            _detectLinks() {
                if (this._asBoolean(this._settings.detection_rules.auto)) {
                    if (this._asBoolean(this._settings.detection_rules.auto_networks["dynamic"])) {
                        this._markDynamicDomainLinks();
                    }
                    this._autoDetectByUrl();
                }

                for (let options  of this._settings.detection_rules.custom) {
                    switch (options.type) {
                        case "url":
                            this._detectByUrlToken(options);
                            break;
                        case "element" :
                            this._detectByElementSelector(options);
                            break;
                    }
                }

                for (let i = 0; i < this._links.length; i++) {
                    let item = this._links[i];
                    item.anchor.setAttribute("data-ml-id", i);
                    item.anchor.setAttribute("data-ml", "true");
                }
            }

            /**
             * Use auto detection of URLS to recognize known links.
             * @private
             */
            _autoDetectByUrl() {
                let url, network;
                let settings = this._settings.detection_rules.auto_networks;

                for (let i = 0; i < document.links.length; i++) {
                    let link = document.links[i];
                    url = link.href;
                    if (this._isAbsolute(url) && !this._isEmpty(url) && !this._isExcludedUrl(url)) {
                        let info = {
                            inxStart: 0,
                            inxEnd: 0,
                            embedded: false,
                            dynamic: false,
                            dynamicType: null,
                            url: "",
                            network: ""
                        };
                        network = this._detectKnownAffiliateLink(url, info);
                        this._checkEmbeddedLink(url, info);

                        if (network !== false && this._asBoolean(settings[network])) {
                            info.network = network;
                            this._links.push({network: network, anchor: link, info: info});
                            if (!link.hasAttribute("data-orig-url")) {
                                link.setAttribute("data-orig-url", url)
                            }
                        } else if (network === false && this._asBoolean(settings["dynamic"]) && link.getAttribute("data-ml-dynamic") === "true") {
                            info.inxStart = 0;
                            info.inxEnd = 0;
                            info.embedded = false;
                            info.dynamic = true;
                            info.dynamicType = link.getAttribute("data-ml-dynamic-type");
                            info.url = "";
                            info.network = link.getAttribute("data-ml-dynamic-type");
                            this._links.push({network: network, anchor: link, info: info});
                            if (!link.hasAttribute("data-orig-url")) {
                                link.setAttribute("data-orig-url", url)
                            }
                        }
                    }
                }
            }

            /**
             * Detect links by given url token.
             *
             * @param options
             * @private
             */
            _detectByUrlToken(options) {
                let url, network;

                for (let i = 0; i < document.links.length; i++) {
                    let link = document.links[i];
                    url = link.href;
                    if (this._isAbsolute(url) && !this._isEmpty(url) && !this._isExcludedUrl(url)) {
                        let regexp = new RegExp(options.pattern);
                        if (regexp.test(url)) {
                            let info = {
                                inxStart: 0,
                                inxEnd: 0,
                                embedded: false,
                                dynamic: false,
                                dynamicType: null,
                                url: url
                            };
                            network = this._detectKnownAffiliateLink(url, info);
                            if (network === false) {
                                network = "other";
                            }
                            this._checkEmbeddedLink(url, info);
                            info.network = network;
                            this._links.push({network: network, anchor: link, info: info});
                            if (!link.hasAttribute("data-orig-url")) {
                                link.setAttribute("data-orig-url", url)
                            }
                        }
                    }
                }
            }


            /**
             * Detect links by element selector.
             *
             * @param options
             * @private
             */
            _detectByElementSelector(options) {
                let url, network;
                let links = document.querySelectorAll(options.selector);
                links.forEach((link) => {
                    if (link.nodeName === "A") {
                        url = link.href;
                        if (this._isAbsolute(url) && !this._isEmpty(url) && !this._isExcludedUrl(url)) {
                            let regexp = new RegExp(options.pattern);
                            if (regexp.test(url)) {
                                let info = {
                                    inxStart: 0,
                                    inxEnd: 0,
                                    embedded: false,
                                    dynamic: false,
                                    dynamicType: null,
                                    url: url
                                };
                                network = this._detectKnownAffiliateLink(url, info);
                                if (network === false) {
                                    network = "other";
                                }
                                this._checkEmbeddedLink(url, info);
                                info.network = network;
                                this._links.push({network: network, anchor: link, info: info});
                                if (!link.hasAttribute("data-orig-url")) {
                                    link.setAttribute("data-orig-url", url)
                                }
                            }
                        }
                    }
                });
            }

            /**
             * Detect affiliate links by structure and move to corresponding buffer.
             *
             * @param url
             * @param info
             */
            _detectKnownAffiliateLink(url, info) {
                let net;
                let inxNet;
                if (url.indexOf("/dp/") !== -1 && url.includes("tag=") && (inxNet = url.indexOf("amazon.")) !== -1) {
                    net = "amazon";
                } else if ((inxNet = url.indexOf("linksynergy")) !== -1) {
                    net = "ls";
                } else if ((inxNet = url.indexOf("anrdoezrs.net")) !== -1
                    || (inxNet = url.indexOf("jdoqocy.com")) !== -1
                    || (inxNet = url.indexOf("tqlkg.com")) !== -1
                    || (inxNet = url.indexOf("tkqlhce.com")) !== -1
                    || (inxNet = url.indexOf("dpbolvw.net")) !== -1
                    || (inxNet = url.indexOf("jqoqocy.com")) !== -1
                    || (inxNet = url.indexOf("kqzfj.com")) !== -1
                    || (inxNet = url.indexOf("kqzyfj.com")) !== -1
                    || (inxNet = url.indexOf("ftjcfx.com")) !== -1
                    || (inxNet = url.indexOf("lduhtrp.net")) !== -1) {
                    net = "cj";
                } else if ((inxNet = url.indexOf("shareasale.com")) !== -1) {
                    net = "sas";
                } else if ((inxNet = url.indexOf("awin1.com")) !== -1) {
                    net = "awin";
                } else if ((inxNet = url.indexOf("pepperjamnetwork.com")) !== -1
                    || (inxNet = url.indexOf("pjtra.com/t/")) !== -1
                    || (inxNet = url.indexOf("gopjn.com/t/")) !== -1
                    || (inxNet = url.indexOf("pjatr.com/t/")) !== -1
                    || (inxNet = url.indexOf("pntra.com/t/")) !== -1
                    || (inxNet = url.indexOf("pntrs.com/t/")) !== -1
                    || (inxNet = url.indexOf("pntrac.com/t/")) !== -1) {
                    net = "pj";
                } else if ((inxNet = url.indexOf("track.webgains.com")) !== -1) {
                    net = "wg";
                } else if ((inxNet = url.indexOf("prf.hn/click")) !== -1) {
                    net = "pt";
                } else if ((inxNet = url.indexOf("tradedoubler.com/click?")) !== -1
                    || (inxNet = url.indexOf("pf.tradedoubler.com/pf/")) !== -1) {
                    net = "td";
                } else if ((inxNet = url.search(/\/c\/(\d+)\/(\d+)\//)) !== -1 || (inxNet = url.search(/%2F(\d+)%2F(\d+)%2F/)) !== -1) {
                    net = "ir";
                } else if ((inxNet = url.indexOf("go.redirectingat.com")) !== -1 || url.indexOf("go.skimresources.com") !== -1) {
                    net = "sl";
                } else if ((inxNet = url.indexOf("redirect.viglink.com")) !== -1) {
                    net = "vg"; //it is important to place vg and "sl" in last condition because if other aff link id embedded we wat to treat the
                                // link as belong to network of embedded link
                } else {
                    return false;
                }

                info.inxNext = inxNet; //we use inxNext in method _checkEmbeddedLink to find the beginning of embedded link
                return net;
            }

            /**
             * Check if link is embedded and prepare required link info details accordingly.
             *
             * @param url
             * @param info
             * @private
             */
            _checkEmbeddedLink(url, info) {
                let inxNet = info.inxNext;
                let inxStart = url.lastIndexOf("=", inxNet);
                if (inxStart !== -1 && inxStart < inxNet) {
                    //the affiliate link is probably embedded
                    info.inxStart = inxStart + 1;
                    let inxEnd = url.indexOf("&", inxNet);
                    if (inxEnd === -1) {
                        inxEnd = url.length;
                    }
                    info.inxEnd = inxEnd;
                    info.embedded = true;
                    info.url = decodeURIComponent(url.substring(info.inxStart, info.inxEnd));

                    //mark the embedded part so it will not mislead the append algorithm of wrapping url (see _appendUUID)
                    let p1 = url.substring(0, info.inxStart);
                    let p2 = url.substring(info.inxEnd);
                    info.wrapping_url = p1 + this._embedUrlToken + p2;

                    //check the wrapping network
                    if (url.indexOf("go.redirectingat.com") !== -1 || url.indexOf("go.skimresources.com") !== -1) {
                        info.wrapping_net = "sl";
                    } else if (url.indexOf("redirect.viglink.com") !== -1) {
                        info.wrapping_net = "vg";
                    }

                } else {
                    info.inxStart = 0;
                    info.inxEnd = url.length;
                    info.embedded = false;
                    info.url = url;
                }
            }

            /**
             * Check if one of the dynamic link APIs is installed. If yes, get list of domains processed by dynamic linking.
             * @private
             */
            _markDynamicDomainLinks() {
                let apiType;
                let domains;
                if (typeof (__SKIM_JS_GLOBAL__) !== "undefined" && typeof (__SKIM_JS_GLOBAL__.getDebugInfo) === "function") {
                    apiType = "sl";
                    domains = __SKIM_JS_GLOBAL__.getDebugInfo().runTimeInfo.aff_domains;
                } else if (typeof (vglnk) !== "undefined" && typeof (vglnk.opt) === "function") {
                    apiType = "vg";
                    domains = vglnk.opt("commercial_domains")
                } else {
                    return;
                }

                if (domains != null) {
                    for (let i = 0; i < document.links.length; i++) {
                        try {
                            let link = document.links[i];
                            let domain = link.hostname;
                            domain = domain.replace("www.", "");
                            if (domains[domain] === true) {
                                link.setAttribute("data-ml-dynamic", "true");
                                link.setAttribute("data-ml-dynamic-type", apiType);
                            }
                        } catch (e) {
                            this._log(e);
                        }
                    }
                    try {
                        this._debug("FR find dynamic domains: " + JSON.stringify(domains));
                    } catch (e) {
                    }
                } else {
                    this._debug("FR didn't find dynamic domains");
                }
            }

            /**
             * Check if url need to be excluded and not being analyzed.
             *
             * @param url
             * @private
             */
            _isExcludedUrl(url) {
                let excludeRegs = this._exclude_urls_regex;
                for (let i = 0; i < excludeRegs.length; i++) {
                    if (excludeRegs[i].test(url)) {
                        return true;
                    }
                }
                return false;
            }


            /**
             * 1. Load on-page settings if found.
             * 2. Complete missing settings by running prepareDefaultSettings()
             * 3. Merge with settings loaded from server
             *
             * @private
             */
            _prepareSettings() {
                this._settings = trx.MagicLinks.prepareDefaultSettings({});

                //merge with settings set on
                if (Object.keys(this.serverSettings).length > 0) {
                    this._settings = this._extendForte(this._settings, this.serverSettings);
                }

                //Get on-page settings and add missing settings if require
                if (Object.keys(this.onPageSettings).length > 0) {
                    this._settings = this._extendForte(this._settings, this.onPageSettings);
                }
            }

            /**
             * Collect that data that we can only collect when user actually click the link
             * @private
             */
            _collectClickTimeParams() {
                let options = this._settings.features["append_timing"];
                if (this._asBoolean(options.enabled)) {
                    let recordClicked = options.t_clicked;
                    let recordToClick = options.t_toclick;
                    let now = Date.now();
                    if (recordClicked) {
                        this._paramsBuffer["t_clicked"] = now;
                    }
                    if (recordToClick) {
                        this._paramsBuffer["t_toclick"] = (now - this._loadTime);
                    }
                }
            }


            /**
             * Write funnel-relay data associate with clicked link, on events-recording-service.
             *
             * @param {string} link
             * @param {string} eventType
             * @param {Object}[args] args optional object of arguments to add into record's data
             * @return {Promise}
             * @private
             */
            _writeDataToEventsService(link, eventType, args) {
                //clone the buffer
                let cloneBuffer;
                try {
                    cloneBuffer = JSON.parse(JSON.stringify(this._paramsBuffer));
                } catch (e) {
                    cloneBuffer = this._paramsBuffer;
                }

                //set per/click values. Values per/click are not define in  _runFeatures()
                cloneBuffer["uuid"] = link.info.xid;
                cloneBuffer["client_time"] = new Date().toISOString();
                cloneBuffer["anchor_id"] = this._emptyIfNull(link.anchor.id);
                cloneBuffer["anchor_href"] = link.anchor.href;
                cloneBuffer["anchor_label"] = link.anchor.innerText;
                cloneBuffer["page_title"] = document.title;
                cloneBuffer["spot_id"] = "";
                cloneBuffer["network"] = link.info.network;
                if (eventType != null) {
                    cloneBuffer["event_type"] = eventType;
                }

                if (args != null && typeof args === "object") {
                    for (let key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (key.indexOf("custom_") === 0) {
                                cloneBuffer[key] = args[key];
                            }
                        }
                    }

                }

                //prepare the body
                let apiUrl = this._envSettings.events_recording_api + "/write";
                let body = {
                    "env": this._envSettings["events_recording_env"],
                    "id": link.info.xid,
                    "app_key": this._envSettings.app_key,
                    "property_id": cloneBuffer["property_id"],
                    "customer_id": cloneBuffer["customer_id"],
                    "cidp1": cloneBuffer["cidp1"],
                    "cidp2": cloneBuffer["cidp2"],
                    "event_type": cloneBuffer["event_type"],
                    "network": cloneBuffer["network"],
                    "data": encodeURIComponent(JSON.stringify(cloneBuffer)),
                };

                let sBody = JSON.stringify(body);

                //prepare the object we show in log
                let bodyLogObj = JSON.parse(sBody); //safe clone
                bodyLogObj.data = cloneBuffer;
                let bodyLog = JSON.stringify(bodyLogObj);

                //delete per/click values set on body. This is only for caution in the case this._paramsBuffer couldn't be clone above.
                delete cloneBuffer["uuid"];
                delete cloneBuffer["client_time"];
                delete cloneBuffer["anchor_href"];
                delete cloneBuffer["anchor_label"];
                delete cloneBuffer["page_title"];
                delete cloneBuffer["spot_id"];

                //send the date to events-recorder service
                return fetch(apiUrl, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    redirect: "follow",
                    referrer: "*client",
                    //keepalive: true, //Fetch with the keepalive flag is a replacement for the Navigator.sendBeacon() API. NOT SUPPORTED WITH POST'S
                    // OPTIONS
                    body: sBody, // body data type must match "Content-Type" header
                }).then((response) => {
                    if (!response.ok) {
                        this._log('Fail to write event data. HTTP error, status = ' + response.status);
                        return response.json();
                    } else {
                        let writeMsg = "Write to events-recording service. Body:\n" + bodyLog;
                        if (this._scriptEm.hasAttribute("data-simulator")) {
                            this._log(writeMsg);
                        }
                        this._debug(writeMsg);

                        return Promise.resolve({});
                    }
                }).then((response) => {
                    //if we have error message print it
                    if (response.message) {
                        this._log(response.message);
                    }
                });
            }

            /**
             * Write log message to console.
             *
             * @param message
             * @private
             */
            _log(message) {
                console.log(this._logPrefix + message)
            }

            /**
             * Write error message to console.
             *
             * @param message
             * @param stack
             * @private
             */
            _error(message, stack) {
                console.error(this._logPrefix + message);
                if (stack != null) {
                    console.error(stack);
                }
            }

            /**
             * Write debug messages to console if 'trxdebug' property is set
             * @param message
             * @private
             */
            _debug(message) {
                if (window["trxdebug"] != null) {
                    console.log(this._logPrefix + message)
                }
            }

            /**
             * Prepare regular expressions for checking exclude tokens, so that we compile only once and reuse the regexp object.
             * @private
             */
            _prepareExcludeRegExp() {
                this._exclude_urls_regex = [];
                let excludes = this._settings.detection_rules.exclude_urls;
                if (excludes.length > 0) {
                    for (let i = 0; i < excludes.length; i++) {
                        this._exclude_urls_regex.push(new RegExp(excludes[i], "i"));
                    }
                }
            }

            /**
             * Extend obj1 with he content of obj2, using deep copy.
             *
             * @param obj1
             * @param obj2
             * @return {{}}
             */
            _extendForte(obj1, obj2) {
                if (obj1 == null || obj2 == null) {
                    throw  "Null object provided to extendForte!";
                }
                const result = {};
                let key;
                for (key in obj1) {
                    if (obj1.hasOwnProperty(key)) {
                        let val1 = obj1[key];
                        const val2 = obj2[key];
                        if (val1 != null && val2 != null) {
                            if (val1 instanceof Array) {
                                result[key] = val2; //in the case of array override
                            } else if (typeof val1 === "object") {
                                result[key] = this._extendForte(val1, val2);
                            } else {
                                result[key] = val2;
                            }
                        } else if (val1 == null) {
                            result[key] = val2;
                        } else if (val2 == null) {
                            result[key] = val1;
                        } else {
                            result[key] = null;
                        }

                    }
                }
                for (key in obj2) {
                    if (obj2.hasOwnProperty(key)) {
                        if (!(key in obj1) || obj1[key] == null) {
                            result[key] = obj2[key];
                        }
                    }
                }
                return result;
            }

            /**
             * Post report that can be used by other tools to analyze magic-links activity.
             *
             * @private
             */
            _postReport() {
                this._report = {
                    links: []
                };


                for (let i = 0; i < this._links.length; i++) {
                    let anchor = this._links[i].anchor;
                    let label = this._getAnchorLabel(anchor, 100);
                    this._report.links.push({network: this._links[i].network, url: anchor.href, label: label});
                }

                window.postMessage({
                    type: "MSG_FROM_MAGIC_LINKS",
                    action: "report",
                    report: JSON.stringify(this._report),
                }, "*");
            }

            /**
             * Add mark to link so we know that it was manipulated.
             *
             * @param type
             * @param value
             * @param anchor
             * @private
             */
            _markLink(type, value, anchor) {
                let val = anchor.getAttribute("data-" + type);
                val += "," + value;
                anchor.setAttribute("data-" + type, val);
            }


            /**
             * When appending extra parameter we must refer to affiliate link type, and detect the special parameter in the URL used to carry
             * extra information. Then we append the value to this parameter by concatenating using pipe delimiter. If we do not found the special
             * parameter for extra info, create one according to link type, and set it correctly in the url.
             *
             * @param {String} network
             * @param {String} url
             * @param {String} name
             * @param {*} value
             * @param {boolean} forceNewQueryParams set true to ignore searching for known extra info param, and force the 'name' as new query param
             * @private
             */
            _appendExtraParam(network, url, name, value, forceNewQueryParams) {
                let queryParamToUse = null;
                let pathStyle = false;

                if (forceNewQueryParams) {
                    queryParamToUse = null;
                } else {
                    switch (network) {
                        case "cj":
                            //search for 'sid/'
                            queryParamToUse = "sid";
                            pathStyle = true;
                            break;
                        case "ls":
                            //search for 'u1='
                            queryParamToUse = "u1";
                            break;
                        case "sas":
                            //search for 'afftrack='
                            queryParamToUse = "afftrack";
                            break;
                        case "awin":
                            //search for 'clickref='
                            queryParamToUse = "clickref";
                            break;
                        case "pj":
                            //search for 'sid='
                            queryParamToUse = "sid";
                            break;
                        case "sl":
                            //search for 'xcust='
                            queryParamToUse = "xcust";
                            break;
                        case "vg":
                            //search for 'cuid='
                            queryParamToUse = "cuid";
                            break;
                        case "ir":
                            //search for 'subId1='
                            queryParamToUse = "subId1";
                            break;
                        case "wg":
                            //search for 'clickref='
                            queryParamToUse = "clickref";
                            break;
                        case "td":
                            //search for 'epi('
                            queryParamToUse = "epi(";
                            pathStyle = true;
                            break;
                        case "pt":
                            //search for 'pubref:'
                            queryParamToUse = "pubref:";
                            pathStyle = true;
                            break;
                        case "amazon":
                            //search for 'ascsubtag='
                            queryParamToUse = "ascsubtag";
                            break;
                        default:
                            queryParamToUse = null;
                    }
                }

                return this._appendNameValueToUrl(url, name, value, queryParamToUse, pathStyle, network);

            }

            /**
             * Append property to url. If the attribute name already set, append the new value with pipe delimiter.
             * Else set new attribute in the url string.
             *
             * @param {String} url
             * @param {String} name
             * @param {String} value Note! we run encodeURIComponent inside no need to encode the value
             * @param {String} queryParamToUse  the query parameter for setting the value. If not specified use the 'name' as new query parameter
             * @param {boolean} pathStyle if true the name value will be added to path. Else they will be added as query parameter
             * @param {String} network
             * @private
             */
            _appendNameValueToUrl(url, name, value, queryParamToUse, pathStyle, network) {
                let inx1, inx2, inx3, attr, appendValue, currentVal;
                value = encodeURIComponent(value);

                if (queryParamToUse != null) {
                    appendValue = name + ":" + value;

                    if (pathStyle) {
                        //attributes are saturated by "/" e.g. (CJ)
                        inx1 = url.indexOf(queryParamToUse + "/");
                        if (inx1 !== -1) {
                            inx1 += (queryParamToUse + "/").length;
                            inx2 = url.indexOf("/", inx1);

                            if (inx2 === -1) {
                                inx2 = url.length;
                            }

                            currentVal = url.substring(inx1, inx2);
                            if (currentVal.length > 0) {
                                appendValue = this._getDelimiter(url) + appendValue
                            }
                            return this._insertToString(url, appendValue, inx2);

                        } else {
                            if (network === "pt") {
                                return this._appendNameValueToUrl_PT(url, name, value, queryParamToUse, appendValue);
                            }

                            if (network === "cj") {
                                return this._appendNameValueToUrl_CJ(url, name, value, queryParamToUse, appendValue);
                            }

                            if (network === "td") {
                                return this._appendNameValueToUrl_TD(url, name, value, queryParamToUse, appendValue);
                            }

                            appendValue = "/" + queryParamToUse + "/" + appendValue;
                            return this._insertToString(url, appendValue, url.length);
                        }


                    } else {
                        //attributes are saturated by "&"
                        inx1 = url.toLocaleLowerCase().indexOf(queryParamToUse.toLocaleLowerCase() + "=");
                        if (inx1 !== -1) {
                            inx2 = url.indexOf("&", inx1);
                            if (inx2 === -1) {
                                inx2 = url.length;
                            }

                            currentVal = url.substring(inx1 + queryParamToUse.length + 1, inx2);
                            if (currentVal.length > 0) {
                                appendValue = this._getDelimiter(url) + appendValue
                            }
                        } else {
                            if (url.indexOf("?") !== -1) {
                                appendValue = "&" + queryParamToUse + "=" + appendValue;
                            } else {
                                appendValue = "?" + queryParamToUse + "=" + appendValue;
                            }
                            return this._insertToString(url, appendValue, url.length);
                        }

                        return this._insertToString(url, appendValue, inx2);

                    }

                }

                if (pathStyle) {
                    //inject the name value as part of url path.
                    url += name + "/" + value;
                } else {
                    //inject the name value as pary of url query param
                    if (url.indexOf("?") !== -1) {
                        url += ("&" + name + "=" + value);
                    } else {
                        url += ("?" + name + "=" + value);
                    }
                }
                return url;
            }


            _appendNameValueToUrl_TD(url, name, value, queryParamToUse, appendValue) {
                let inx1, inx2, inx3, inx4, currentVal;
                inx1 = url.indexOf("epi(");
                if (inx1 !== -1) {
                    inx1 += (queryParamToUse).length;
                    inx2 = url.indexOf(")", inx1);
                    if (inx2 !== -1) {
                        currentVal = url.substring(inx1, inx2);
                        if (currentVal.length > 0) {
                            appendValue = this._getDelimiter(url) + appendValue
                        }
                        return this._insertToString(url, appendValue, inx2);
                    }
                } else {
                    //decide if this is link with brackets
                    inx1 = url.indexOf("url(");
                    if (inx1 !== -1) {
                        //yes append epi(data)
                        return url + "epi(" + appendValue + ")";
                    } else {
                        //no append &epi=data
                        inx3 = url.indexOf("&epi=");
                        if (inx3 === -1) {
                            return url + "&epi=" + appendValue;
                        } else {
                            //append to existing data
                            inx4 = url.indexOf("&", inx3 + 5);
                            if (inx4 === -1) {
                                //epi=xyz at the end of url
                                return url + this._getDelimiter(url) + appendValue;
                            } else {
                                appendValue = this._getDelimiter(url) + appendValue;
                                return this._insertToString(url, appendValue, inx4);
                            }
                        }
                    }
                }
                return url; //do not process link
            }

            _appendNameValueToUrl_PT(url, name, value, queryParamToUse, appendValue) {
                let inx1, inx2, currentVal;
                inx1 = url.indexOf(queryParamToUse);
                if (inx1 !== -1) {
                    inx1 += (queryParamToUse).length;
                    inx2 = url.indexOf("/", inx1);
                    if (inx2 !== -1) {
                        currentVal = url.substring(inx1, inx2);
                        if (currentVal.length > 0) {
                            appendValue = this._getDelimiter(url) + appendValue
                        }
                        return this._insertToString(url, appendValue, inx2);
                    }
                } else {
                    inx1 = url.indexOf("/destination");
                    if (inx1 !== -1) {
                        appendValue = "/pubref:" + appendValue;
                        return this._insertToString(url, appendValue, inx1);
                    }
                }
                return url; //do not process link
            }

            /**
             * Append parameter to CJ link
             * @param url
             * @param name
             * @param value
             * @param queryParamToUse
             * @param appendValue
             * @return {string}
             * @private
             */
            _appendNameValueToUrl_CJ(url, name, value, queryParamToUse, appendValue) {
                let inx3 = url.indexOf("dlg/");
                if (inx3 !== -1) {
                    appendValue = queryParamToUse + "/" + appendValue + "/";
                    return this._insertToString(url, appendValue, inx3 + 4);
                } else if (url.indexOf("?") === -1) {
                    //url does not have parameters. Add  ?sid=value
                    return url + "?sid=" + appendValue;
                } else {
                    //url already have parameters prefix by ?

                    let inx11 = url.indexOf("?");
                    let inx12 = url.indexOf("sid=", inx11 + 1);
                    if (inx12 === -1) {
                        inx12 = url.indexOf("&sid=", inx11 + 1);
                    }
                    if (inx12 !== -1) {
                        //url already have "sid=" parameter
                        let inx13 = url.indexOf("&", inx12 + 5);
                        if (inx13 === -1) {
                            //sid=xyz at the end of url
                            return url + this._getDelimiter(url) + appendValue;
                        } else {
                            appendValue = this._getDelimiter(url) + appendValue;
                            return this._insertToString(url, appendValue, inx13);
                        }
                    } else if (inx11 === url.length - 1) {
                        //url ends with "?"
                        return url + "sid=" + appendValue;
                    } else {
                        //url does not have "sid=" parameter
                        return url + "&sid=" + appendValue;
                    }
                }
            }

            /**
             * If 'page_url_filter' is defined, check that page URL match the filter
             * @return {boolean}
             * @private
             */
            _checkPageUrlMatch() {
                if (!this._isEmpty(this._settings.detection_rules.page_url_filter)) {
                    return location.href.includes(this._settings.detection_rules.page_url_filter);
                }

                return true;
            }


            /**
             * Append string is specified position.
             *
             * @param str
             * @param value
             * @param position
             * @return {string}
             * @private
             */
            _insertToString(str, value, position) {
                let str1, str2;

                str1 = str.substring(0, position);
                if (position < str.length) {
                    str2 = str.substring(position);
                } else {
                    str2 = "";
                }

                return str1 + value + str2;
            }

            /**
             * Insert string in between  from / to
             * @param str
             * @param value
             * @param from
             * @param to
             * @return {string}
             * @private
             */
            _insertSubstringToString(str, value, from, to) {
                let str1, str2;
                str1 = str.substring(0, from);
                str2 = str.substring(to);
                return str1 + value + str2;
            }


            /**
             * Parse query string
             * @param query
             * @return {Map}
             */
            _parseQuery(query) {
                let params = new Map();
                if (!query) {
                    return params;
                }

                const pairs = query.split(/[;&]/);
                for (let i = 0; i < pairs.length; i++) {
                    let KeyVal = pairs[i].split('=');
                    if (!KeyVal || KeyVal.length !== 2) {
                        continue;
                    }
                    const key = unescape(KeyVal[0]);
                    let val = unescape(KeyVal[1]);
                    val = val.replace(/\+/g, ' ');
                    params.set(key, val);
                }
                return params;
            }

            /**
             * Tool for getting anchor label
             *
             * @param anchor
             * @param maxSize
             * @private
             */
            _getAnchorLabel(anchor, maxSize) {
                let labelEm = document.createElement("label");
                labelEm.innerHTML = anchor.innerHTML;
                labelEm.normalize();
                let label = labelEm.innerHTML;
                label = label.trim();
                if (label.length > maxSize) {
                    label = label.substring(0, maxSize) + "...";
                }

                return label;
            }

            /**
             * Check is string is either null or empty
             * @param str
             * @return {boolean} true if the str is empty
             * @private
             */
            _isEmpty(str) {
                return str == null || str === "";
            }

            /**
             * If string is null return empty string.
             *
             * @param str
             * @return {string}
             * @private
             */
            _emptyIfNull(str) {
                return str == null ? "" : str;
            }

            /**
             * Check if url is absolute
             * @param url
             * @return {boolean}
             * @private
             */
            _isAbsolute(url) {
                return url.indexOf("http://") === 0 || url.indexOf("https://") === 0;
            }

            /**
             * Get the value as boolean type
             * @param val
             * @return {boolean}
             * @private
             */
            _asBoolean(val) {
                return val === "true" || val === true;
            }

            /**
             * Combine current time and random two characters.
             * Format: fr{timestamp}{3 random chars}
             *
             * @return {string}
             * @private
             */
            _generateUUID() {
                const ts = Date.now();
                const c1 = String.fromCharCode(Math.floor((Math.random() * 10) + 97));
                const c2 = String.fromCharCode(Math.floor((Math.random() * 10) + 97));
                const c3 = String.fromCharCode(Math.floor((Math.random() * 10) + 97));
                return `fr${ts}${c1}${c2}${c3}`;
            }

            /**
             * Get object from the DOM given a path. For example if the path is cg.ABC the finction return
             * the instance at window.cg.ABC
             *
             * @param {String} path
             * @param {Object}[parent] parent parent DOM object to search for value.
             * @return {Object} object in path or null if not found
             */
            static _getObjectByPath(path, parent) {
                if (parent == null) {
                    parent = window;
                }
                const arr = path.split(".");
                if (arr.length === 1) {
                    return parent[arr[0]]
                } else {
                    let obj = parent;
                    for (let i = 0; i < arr.length; i++) {
                        const token = arr[i];
                        if (token === "window") {
                            continue;
                        }

                        obj = obj[token];
                        if (obj == null && i < arr.length - 1) {
                            return null;
                        }
                    }
                    return obj;
                }
            }

            /**
             * Get delimiter to use for extended value params.
             *
             * @param url
             * @return {string}
             * @private
             */
            _getDelimiter(url) {
                if (url.includes("assoc-redirect.amazon")) {
                    return this._delimiter2
                } else {
                    return this._delimiter1;
                }
            }


            /**
             * Run the ready callback
             */
            _runFRCallback() {
                //if callback for registering external links exists, call it.
                try {
                    if (window["funnelRelayReady"] != null && typeof window["funnelRelayReady"] === "function") {
                        window.funnelRelayReady();
                    }
                } catch (e) {
                    this._error("Fail to run callback function 'funnelRelayReady'. Details: " + e);
                }
            }

        };

        /**
         * trx get will all methods to get parameters from page
        **/
        trx.get={};
trx.get.Tags = function(){return eval("window.karma.config.targeting.tags");};
trx.get.Date = function(){return eval("document.getElementsByClassName(\"published-date\")[0].innerText");};
trx.get.Channel = function(){return eval("window.karma.config.targeting.ch");};
trx.get.SubChannel = function(){return eval("window.karma.config.targeting.sch");};
trx.get.Content_Type = function(){return eval("window.karma.config.targeting.ctype");}

        /*
         * See https://developers.google.com/analytics/devguides/collection/analyticsjs/creating-trackers
         * See https://developers.google.com/analytics/devguides/collection/analyticsjs/tracker-object-reference
         */
        trx.GATracker = class {

            constructor(code) {
                /**
                 * Google Analytics code for current environment.
                 * If we can't get GA code from environment settings we keep this adapter as disabled.
                 */
                this.gaCode = code;
                window.ga = window.ga || function () {
                    (ga.q = ga.q || []).push(arguments)
                };
                ga.l = +new Date;

                ga('create', this.gaCode, 'auto', "mlTracker", {
                    'alwaysSendReferrer': true,
                    'allowAnchor': false
                });
                ga('mlTracker.set', 'referrer', document.referrer);
                ga('mlTracker.set', 'appName', "trackonomics-relay");
            }

            /**
             * Track event
             *
             * @param eventCategory    text    yes    Typically the object that was interacted with (e.g. 'Video')
             * @param  eventAction    text    yes    The type of interaction (e.g. 'play')
             * @param eventLabel    text    no    Useful for categorizing events (e.g. 'Fall Campaign')
             * @param eventValue    integer    no    A numeric value associated with the event (e.g. 42)
             * @param fieldsObject
             * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
             */
            trackEvent(eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
                ga(function (tracker) {
                    ga('mlTracker.send', 'event', {
                        eventCategory: eventCategory,
                        eventAction: eventAction,
                        eventLabel: eventLabel,
                        eventValue: eventValue,
                        fieldsObject: fieldsObject,
                        transport: 'beacon' //see https://developers.google.com/analytics/devguides/collection/analyticsjs/events for explanation of
                                            // this parameter
                    });
                });
            }

            /**
             * Track screenview.
             *
             * @param screenName
             */
            trackScreenView(screenName) {
                ga(function (tracker) {
                    ga('mlTracker.send', 'screenview', {
                        'screenName': screenName,
                        'appId': this.appId,
                        'appVersion': this.appVersion,
                        'appName': this.appName
                    });
                });
            }


            /**
             * Track page view
             *
             */
            trackPageView() {
                ga(function (tracker) {
                    ga('mlTracker.set', 'page', location.href);
                    ga('mlTracker.send', 'pageview', {
                        page: location.href,
                        title: document.title
                    });
                });
            }

        };

        /**
         * Tracked to used with adobe Analytics
         * @type {{new(): Window.trx.AdobeTracker, prototype: AdobeTracker}}
         * @see https://marketing.adobe.com/resources/help/en_US/sc/implement/function_tl.html
         */
        trx.AdobeTracker = class {

            constructor(code) {
                if (code != null && code.length > 0) {
                    this._rsId = code;
                } else {
                    this._rsId = null;
                }
            }

            /**
             * Track event
             *
             * @param eventCategory    text    yes    Typically the object that was interacted with (e.g. 'Video')
             * @param  eventAction    text    yes    The type of interaction (e.g. 'play')
             * @param eventLabel    text    no    Useful for categorizing events (e.g. 'Fall Campaign')
             * @param eventValue    integer    no    A numeric value associated with the event (e.g. 42)
             * @param fieldsObject
             * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events
             */
            trackEvent(eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
                if (typeof s.tl == "function") {
                    let tracker = s;
                    let rsId = this._rsId != null ? this._rsId : s_account;
                    if (rsId != null) {
                        tracker = s_gi(rsId);
                    }

                    let propsMap = fieldsObject.props_map;
                    if (propsMap == null) {
                        propsMap = {
                            xid: "prop1",
                            link: "prop2",
                            label: "prop3",
                            referrer: "prop4",
                            origin: "prop5",
                        }
                    }
                    let customProps = fieldsObject.props_map_custom;

                    let propsArr = [propsMap.xid, propsMap.link, propsMap.label, propsMap.referrer, propsMap.origin];
                    if (customProps != null) {
                        for (let i = 0; i < customProps.length; i++) {
                            let item = customProps[i];
                            propsArr.push(item.prop);
                        }
                    }

                    tracker.linkTrackVars = propsArr.join(",");
                    tracker[propsMap.xid] = fieldsObject.xid;
                    tracker[propsMap.link] = fieldsObject.anchor.href;
                    tracker[propsMap.label] = fieldsObject.anchor.innerHTML;
                    tracker[propsMap.referrer] = document.referrer;
                    tracker[propsMap.origin] = location.href;

                    if (customProps != null) {
                        for (let i = 0; i < customProps.length; i++) {
                            let item = customProps[i];
                            tracker[item.prop] = trx.MagicLinks._getObjectByPath(item.field, fieldsObject.data);
                        }
                    }

                    tracker.linkTrackEvents = 'funnel-relay';
                    tracker.events = 'funnel-relay';
                    let str = "funnel-relay-" + fieldsObject.xid;
                    tracker.tl(true, 'o', str, null);
                }
            }

            /**
             * Track screenview.
             *
             * @param screenName
             */
            trackScreenView(screenName) {
                //not supported
            }


            /**
             * Track page view
             *
             */
            trackPageView() {
                //not supported
            }
        };

        //Auto run logic
        //note - when using Google tag manager 'data-autorun' attributes is remove by the tag manager.
        //Therefore we only refer to this attribute is exist

        let env = "prod";
        let autoRun = true;
        let scriptEm = document.getElementById("funnel-relay-installer");
        if (scriptEm != null && scriptEm.hasAttribute("data-autorun")) {
            autoRun = scriptEm.getAttribute("data-autorun") !== "false";
        }

        let startDelay = 3000;
        let customStartDelay = "{START_DELAY}";
        let customStartDelayInt = parseInt(customStartDelay);
        if (Number.isInteger(customStartDelayInt)) {
            startDelay = customStartDelayInt;
        }

        if (startDelay > 0) {
            setTimeout(() => {
                trx.magicLinksEngine = new trx.MagicLinks(autoRun);
                trx.magicLinksEngine._runFRCallback();
            }, startDelay);
        } else {
            trx.magicLinksEngine = new trx.MagicLinks(autoRun);
            trx.magicLinksEngine._runFRCallback();
        }

    }
)();
