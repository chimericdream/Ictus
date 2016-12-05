'use strict';

define('ictus-core', ['jquery'], function ($) {
    'use strict';

    $('#sidebar-toggle').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        $('#main-sidebar').toggleClass('off-canvas');
    });
});