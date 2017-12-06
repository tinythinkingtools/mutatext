// MainScenario - folder contain all scenarios step for users
import * as MainScenario from './components/MainScenario';

/**
/* Scenario - generate scerario
/* local - @string (like 'en')
/* plan - @array (contain name of steps like ['Welcome'])
/* return object with steps
**/
const Scenario = (plan = []) => {
	const steps = [];
	plan.forEach((item, index) => {
		steps.push(MainScenario[item]);
	})
	return steps;
};

export default Scenario;
