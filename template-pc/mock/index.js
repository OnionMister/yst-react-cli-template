const delay = require('mocker-api/lib/delay');
const home = require('./home');

module.exports = delay({
    ...home,
}, 500);
