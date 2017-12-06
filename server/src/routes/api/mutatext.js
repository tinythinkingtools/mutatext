import { Router } from 'express';
import _ from 'lodash';
import Q from 'q';
import translate from 'google-translate-api';

export default (req, res, next) => {
	
	const say = console.log;
	const supportedLangs = require('../middleware/langs.js').supportedLangs;
	const optionsNum = 3; 
	let transformHistory = [];
	let opts = {};

	//showOptions
	const showOptions = ({options, numTrans}) => {
		//console.log({options, numTrans});
		if(opts.showInterimSteps) {
			//console.log(options);
		}
		//console.log(transformHistory);
		let choices = _.map(options, (opt) => {
			//TODO: show transofmration history like this (en->ru->zh)
			const transformsLangs = _.map(opt, (transform) => {
				return getLangName(transform.lang);
			});
			return {
				path: '[' + _.join(transformsLangs, '->') + '] ',
				text: _.last(opt).text
			}
		});
		
		
		res.json({
			code: 200,
			choices: choices
		});
	}

	//detectLanguage (async, thenable)
	const detectLanguage = (text) => {
		let dfr = Q.defer();
		translate(text, {to: 'en'}).then(res => {
			dfr.resolve(res.from.language.iso);
		}).catch(err => {
			dfr.reject(err);
		});
		return dfr.promise;
	};

	//translateOptions
	const translateOptions = ({answers, optionsNum}) => {
		//detect original language and add to history
		detectLanguage(answers.text)
		.then((res) => {
			//console.log('lang detected: '+res);
			transformHistory.push({
				text: answers.text,
				lang: res
			});
		});
		let options = [];
		for(let i=0; i<optionsNum; i++) {
			let dfr = Q.defer();
			fitr({
				step: 0, //current step
				numTrans: answers.numTrans, //number of transformations required
				textChain: [
					{
						text: answers.text
					}
				]
			})
			.then(res => {
				dfr.resolve(res);
			});
			options[i] = dfr.promise;
		}
		Q.all(options)
			.then(() => {
				//so options are ready. now show them to the user
				showOptions({options:options, numTrans: answers.numTrans});
			});
	};

	//get random lang
	const getRandomLang = (except) => {
		//TODO: exclude already used languages
		return _.sample(supportedLangs).code;
	};

	//get language name from code
	const getLangName = (code) => {
		const lang = _.find(supportedLangs, ['code', code]);
		if(lang && lang.name) {
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
	const fitr = ({textChain, step, numTrans}) => {
		//first create a deferred
		let deferred = Q.defer();
		if(step == numTrans) { //if we have transformed text enough times - translate once back to the original language and then return
			//console.log(transformHistory);
			translate(_.last(textChain).text, {to: transformHistory[0].lang}).then(res => {
				textChain.push({
					text: res.text,
					lang: textChain[0].lang
				});
				deferred.resolve(textChain);
			});
		} else { //else -> translate one more time
			let toLang = getRandomLang();
			translate(_.last(textChain).text, {to: toLang}).then(res => {
				textChain[step].lang = res.from.language.iso;
				textChain.push({
					text: res.text,
					lang: toLang
				});
				step++;
				fitr({
					textChain,
					step,
					numTrans
				}).then(res => {
					deferred.resolve(textChain);
				});
			}).catch(err => {
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
	const answers = {};
	answers.text = req.body.text;
	answers.numTrans = parseInt(req.body.number, 10);
	opts.showInterimSteps = true;

	translateOptions({answers, optionsNum});
	
};