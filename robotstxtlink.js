// ==UserScript==
// @name         robots.txt create path hyperlink
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Make robots.txt more usable by adding links to viable paths
// @author       https://www.twitter.com/berg618
// @match        http*://*/robots.txt
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    var elem = document.querySelector('pre');
    var ll = elem.textContent.split('\n');
    var nh = '';
    for (var i = 0; i < ll.length; i++) {
        var t = ll[i].replace(/(\w+\-\w+|\w+)\:/i, '').replace(/\s/, '');
        if (ll[i].match(/(\w+\-\w+|\w+)\:/i)) {
            if (ll[i].match(/Disallow\:/ig) || ll[i].match(/Allow\:/ig)) {
                if (t.match(/\*/g) || t.match(/\s\/$/) || t.match(/^$/)) {
                    nh += ll[i] + '\n';
                } else if(t.match(/^http/i)) {
                    nh += ll[i] + ' - <a href=' + t + '>==></a>\n';
                } else {
                    nh += ll[i] + ' - <a href=' + location.protocol + '//' + location.hostname + t + '>==></a>\n';
                }
            } else if (ll[i].match(/Sitemap/i)) {
                nh += ll[i] + ' - <a href=' + t + '>==></a>\n';
            } else {
                nh += ll[i] + '\n';
            }
        } else {
            nh += ll[i] + '\n';
        }
    }
    elem.innerHTML = nh;
})();
