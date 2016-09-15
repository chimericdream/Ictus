const _ = require('lodash');
const pages = require('../../../demo/_data/pages.json');

module.exports = function(template, request, response, data = {}) {
    _.merge(data, {
        'site-title': 'Ictus',
        'site-pages': pages,
        'current-page': request.path
    });
    response.render(template, data);
};
