var path = require('path');

var rootPath = path.join(__dirname, '/../..');
var staticPath = path.join(__dirname, '/../react-ui/build/');

var settings = {
	rootPath: rootPath,
	staticPath: staticPath,
	envPath: __dirname,
	port: process.env.PORT || 5000,
	bodyLimit: '100kb',
	adminEmail: 'dus.blinov@gmail.com',
	emailFrom: 'noreply@mutatext.co',
	mailgun: {
		apiKey: 'key-e6e4cfd91ba4c399b3a714b416fe6979',
		domain: 'mg.meetpa.co'
	}
}
module.exports = settings;