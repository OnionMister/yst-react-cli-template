const delay = require('mocker-api/lib/delay');
const global = require('./global');
const home = require('./home');
const menus1 = require('./menus1');

module.exports = delay({
    ...global,
    ...home,
    ...menus1,
}, 500);
