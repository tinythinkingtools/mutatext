import { app } from '../config/express';
import api from './api';

export default () => {
	app.use('/api/v1', api());
};
