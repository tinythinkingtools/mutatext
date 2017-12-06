'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _methods = require('./api/_methods');

exports.default = function () {
	var routes = (0, _express.Router)();

	routes.post('/mutatext', _methods.mutatext);

	return routes;
};