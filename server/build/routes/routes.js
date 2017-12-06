'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('../config/express');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	_express.app.use('/api/v1', (0, _api2.default)());
};