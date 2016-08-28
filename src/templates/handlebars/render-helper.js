const _ = require('lodash');
const pages = require('../../../demo/_data/pages.json');

module.exports = function(template, response, data = {}) {
    _.merge(data, {
        'demo-pages': pages
    });
    response.render(template, data);
};
