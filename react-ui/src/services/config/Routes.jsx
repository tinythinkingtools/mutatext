import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import Flow from 'screens/Flow'

const router = () => (
	<BrowserRouter>
		<App>
			<Switch>
				<Route exact path='/' component={Flow} />
			</Switch>
		</App>
	</BrowserRouter>
);

export default router;
