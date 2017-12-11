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
	emailFrom: 'noreply@mutatext.co'
}
module.exports = settings;