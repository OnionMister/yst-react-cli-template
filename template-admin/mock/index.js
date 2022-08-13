const delay = require('mocker-api/lib/delay');
const global = require('./global');
const home = require('./home');
const studentManagement = require('./studentManagement');

module.exports = delay({
    ...global,
    ...home,
    ...studentManagement,
}, 500);
