import { Router } from 'express';

import {
  mutatext
} from './api/_methods';

export default () => {
	const routes = Router();

	routes
		.post('/mutatext', mutatext);
	
	return routes;
}