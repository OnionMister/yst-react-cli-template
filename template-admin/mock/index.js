const delay = require('mocker-api/lib/delay');
const global = require('./global');
const home = require('./home');

module.exports = delay({
    ...global,
    ...home,
}, 500);
