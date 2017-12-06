'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _googleTranslateApi = require('google-translate-api');

var _googleTranslateApi2 = _interopRequireDefault(_googleTranslateApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {

	var say = console.log;
	var supportedLangs = require('../middleware/langs.js').supportedLangs;
	var optionsNum = 3;
	var transformHistory = [];
	var opts = {};

	//showOptions
	var showOptions = function showOptions(_ref) {
		var options = _ref.options,
		    numTrans = _ref.numTrans;

		//console.log({options, numTrans});
		if (opts.showInterimSteps) {}
		//console.log(options);

		//console.log(transformHistory);
		var choices = _lodash2.default.map(options, function (opt) {
			//TODO: show transofmration history like this (en->ru->zh)
			var transformsLangs = _lodash2.default.map(opt, function (transform) {
				return getLangName(transform.lang);
			});
			return {
				path: '[' + _lodash2.default.join(transformsLangs, '->') + '] ',
				text: _lodash2.default.last(opt).text
			};
		});

		res.json({
			code: 200,
			choices: choices
		});
	};

	//detectLanguage (async, thenable)
	var detectLanguage = function detectLanguage(text) {
		var dfr = _q2.default.defer();
		(0, _googleTranslateApi2.default)(text, { to: 'en' }).then(function (res) {
			dfr.resolve(res.from.language.iso);
		}).catch(function (err) {
			dfr.reject(err);
		});
		return dfr.promise;
	};

	//translateOptions
	var translateOptions = function translateOptions(_ref2) {
		var answers = _ref2.answers,
		    optionsNum = _ref2.optionsNum;

		//detect original language and add to history
		detectLanguage(answers.text).then(function (res) {
			//console.log('lang detected: '+res);
			transformHistory.push({
				text: answers.text,
				lang: res
			});
		});
		var options = [];

		var _loop = function _loop(i) {
			var dfr = _q2.default.defer();
			fitr({
				step: 0, //current step
				numTrans: answers.numTrans, //number of transformations required
				textChain: [{
					text: answers.text
				}]
			}).then(function (res) {
				dfr.resolve(res);
			});
			options[i] = dfr.promise;
		};

		for (var i = 0; i < optionsNum; i++) {
			_loop(i);
		}
		_q2.default.all(options).then(function () {
			//so options are ready. now show them to the user
			showOptions({ options: options, numTrans: answers.numTrans });
		});
	};

	//get random lang
	var getRandomLang = function getRandomLang(except) {
		//TODO: exclude already used languages
		return _lodash2.default.sample(supportedLangs).code;
	};

	//get language name from code
	var getLangName = function getLangName(code) {
		var lang = _lodash2.default.find(supportedLangs, ['code', code]);
		if (lang && lang.name) {
			return lang.name;
		} else {
			res.json({
				code: 400,
				message: 'Lang code not recognized, something went wrong'
			});
			return;
		}
	};

	//found in translation (recursive and promise-based)
	var fitr = function fitr(_ref3) {
		var textChain = _ref3.textChain,
		    step = _ref3.step,
		    numTrans = _ref3.numTrans;

		//first create a deferred
		var deferred = _q2.default.defer();
		if (step == numTrans) {
			//if we have transformed text enough times - translate once back to the original language and then return
			//console.log(transformHistory);
			(0, _googleTranslateApi2.default)(_lodash2.default.last(textChain).text, { to: transformHistory[0].lang }).then(function (res) {
				textChain.push({
					text: res.text,
					lang: textChain[0].lang
				});
				deferred.resolve(textChain);
			});
		} else {
			//else -> translate one more time
			var toLang = getRandomLang();
			(0, _googleTranslateApi2.default)(_lodash2.default.last(textChain).text, { to: toLang }).then(function (res) {
				textChain[step].lang = res.from.language.iso;
				textChain.push({
					text: res.text,
					lang: toLang
				});
				step++;
				fitr({
					textChain: textChain,
					step: step,
					numTrans: numTrans
				}).then(function (res) {
					deferred.resolve(textChain);
				});
			}).catch(function (err) {
				res.json({
					code: 400,
					message: 'Lang code not recognized, something went wrong'
				});
				console.error(err);
				deferred.reject();
			});
		}
		//return promise
		return deferred.promise;
	};

	//{ text: 'some think', numTrans: '3', showInterimSteps: true }
	//numTrans
	var answers = {};
	answers.text = req.body.text;
	answers.numTrans = parseInt(req.body.number, 10);
	opts.showInterimSteps = true;

	translateOptions({ answers: answers, optionsNum: optionsNum });
};