/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'file-text': '&#xe922;',
            'file': '&#xe922;',
            'files-empty': '&#xe925;',
            'files': '&#xe925;',
            'price-tags': '&#xe936;',
            'coin-dollar': '&#xe93b;',
            'money': '&#xe93b;',
            'envelop': '&#xe945;',
            'mail': '&#xe945;',
            'mobile': '&#xe958;',
            'cell-phone': '&#xe958;',
            'spinner6': '&#xe97f;',
            'loading7': '&#xe97f;',
            'checkmark': '&#xea10;',
            'tick': '&#xea10;',
            'arrow-right2': '&#xea3c;',
            'right4': '&#xea3c;',
            'circle-up': '&#xea41;',
            'up3': '&#xea41;',
            'circle-down': '&#xea43;',
            'down3': '&#xea43;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
