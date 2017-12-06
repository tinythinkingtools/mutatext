import http from 'http';
import settings from 'config';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

// server config
export const app = express();

app.use(compression());

// reserve application with https
const server = (function StartApp() {
	return http.createServer(app);
}());

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({ limit: settings.bodyLimit }));

app.use(express.static(settings.staticPath, { redirect: false }));

process.on('uncaughtException', (err) => {
	console.log(err);
});

export default server;
