(function () {
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[scripts.length - 1];

    var queryString = myScript.src.replace(/^[^\?]+\??/, '');
    var params = parseQuery(queryString);

    function parseQuery(query) {
        var Params = new Object();
        if (!query) return Params; // return empty object
        var Pairs = query.split(/[;&]/);
        for (var i = 0; i < Pairs.length; i++) {
            var KeyVal = Pairs[i].split('=');
            if (!KeyVal || KeyVal.length != 2) continue;
            var key = unescape(KeyVal[0]);
            var val = unescape(KeyVal[1]);
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }

    var vendorName = "RescueRush";

    if (vendorName) {
        var hPos = params['Hpos'] == 'left' ? 'left' : 'right';
        var vPos = params['Vpos'] == 'top' ? 'top' : 'bottom';
        var lang = 'de';
        var isFrench = false;
        if (params['Lang'] && params['Lang'] == 'fr') {
            isFrench = true;
        } else if (!params['Lang']) {
            var currentUrl = window.location.pathname.substr(1)
            currentUrl = currentUrl.split('/');

            if (Array.isArray(currentUrl) && currentUrl[0] == 'fr') {
                isFrench = true;
            } else if (Array.isArray(currentUrl) && currentUrl[0] == 'de') {
                isFrench = false;
            } else {
                var userLang = navigator.language || navigator.userLanguage;
                userLang = userLang.substr(0, 2)
                if (userLang == 'fr') {
                    isFrench = true;
                }
            }
        }

        if (isFrench === true) {
            lang = 'fr';
        }

        var textImgSrc = vPos == 'top' ? 'tooltips-reversed.png' : 'tooltips.png';

        var stickyButton = document.createElement("div");
        stickyButton.className = 'letzshop-sticky-button';
        stickyButton.innerHTML =
            '<img class="letzshop-button-default responsive" src="https://content.letzshop.lu/banner.jpg" />' +
            '<img class="letzshop-button-hover responsive" src="https://content.letzshop.lu/banner-hover.jpg" />' +
            '<img class="letzshop-button-text ' + vPos + '" src="https://content.letzshop.lu/' + textImgSrc + '" />' +
            '<img class="letzshop-button-default" src="https://content.letzshop.lu/letzshop.png" />' +
            '<img class="letzshop-button-hover" src="https://content.letzshop.lu/letzshop-hover.png" />';
        
        stickyButton.addEventListener("click", function() {
            const language = getCurrentLanguage();
            console.log(language);
            switch (language) {
                case "en":window.open("https://letzshop.lu/en/products/rescue-rush-023a3c", "_blank"); break;
                case "de":window.open("https://letzshop.lu/de/products/rescue-rush-023a3c", "_blank");break;
                case "fr":window.open("https://letzshop.lu/fr/products/rescue-rush-023a3c", "_blank");break;
                case "lu":window.open("https://letzshop.lu/de/products/rescue-rush-023a3c", "_blank");break;
              }
        });
        
        document.body.appendChild(stickyButton);

        var css = '.letzshop-sticky-button { position: fixed;' + vPos + ':0;' + hPos + ':0; margin: 20px 10px; width: 127.5px; height: 127.5px; z-index:9999; line-height: 0; cursor: pointer; }' +
            '.letzshop-sticky-button img { border: none !important; outline: none !important;}' +
            '.letzshop-sticky-button img.letzshop-button-default, .letzshop-sticky-button img.letzshop-button-hover { width: 100%}' +
            '.letzshop-sticky-button a { position: relative; display: block; border-radius: 100%; } ' +
            '.letzshop-sticky-button .letzshop-button-default { position: absolute; opacity: 1; transition: all 350ms; }' +
            '.letzshop-sticky-button:hover .letzshop-button-default { opacity: 0; }' +
            '.letzshop-sticky-button .letzshop-button-hover { position: absolute; opacity: 1; opacity: 0; transition: all 350ms; }' +
            '.letzshop-sticky-button:hover .letzshop-button-hover { opacity: 1; }' +
            '.letzshop-sticky-button .letzshop-button-text { position: absolute; transform: translate(0, 30px); left: 5px; width: 117.5px; opacity: 0; transition: all 350ms; }' +
            '.letzshop-sticky-button .letzshop-button-text.top { position: absolute; transform: translate(0, 80px); }' +
            '.letzshop-sticky-button:hover .letzshop-button-text.bottom { transform: translate(0, -40px); opacity: 1; }' +
            '.letzshop-sticky-button:hover .letzshop-button-text.top { transform: translate(0, 130px); opacity: 1; }' +
            '.letzshop-sticky-button .letzshop-button-default.responsive, .letzshop-sticky-button .letzshop-button-hover.responsive { opacity: 0; }' +
            ' @media (max-width: 1100px) { .letzshop-sticky-button { display: none; } }';
        var style = document.createElement('style');

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);
    }
})();
