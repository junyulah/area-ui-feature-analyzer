'use strict';

let {
    genPositionDetectionRule
} = require('./position');

let {
    genContentDetectionRules
} = require('./content');

/**
 * extract features from node
 */

module.exports = (node, {
    rectBlurRatio = 1.5, minGridWidth = 0, minGridHeight = 0, contentRules
} = {}) => {
    let pageSize = getPageSize();

    let scope = {
        x: 0,
        y: 0,
        width: pageSize.width,
        height: pageSize.height
    };

    return {
        content: genContentDetectionRules(node, {
            contentRules
        }),

        scope,
        position: genPositionDetectionRule(node, {
            scope,
            rectBlurRatio,
            minGridWidth,
            minGridHeight
        }),
        style: []
    };
};

let getPageSize = () => {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var width = Math.max(body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth);

    return {
        height,
        width
    };
};
