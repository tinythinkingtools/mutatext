export default (props) => {
	const scenario = props.state.scenario ? props.state.scenario.slice() : [];
	if (scenario) {
		if (scenario[props.state.activeModule]) {
			const activeModule = scenario[props.state.activeModule].steps;
			const activeStep = props.state.activeStep;
			if (activeModule.length > activeStep) {
				if (activeModule[activeStep].action === 'message') {
					let timeout = activeModule[activeStep].timeout ? activeModule[activeStep].timeout : 0;
					let typingTimeout = 500;
					let states = { 
						activeStep: activeStep + 1
					};
					states.typingText = true;
					if (activeModule[activeStep].typing === false) {
						typingTimeout = 0;
						states.typingText = false;
					}
					setTimeout(() => {
						props.sendMessageToDialog(activeModule[activeStep]);
						props.propSetState(states, () => {
							setTimeout(() => {
								props.moveConversation();
							}, timeout);
						});
					}, typingTimeout);
				}
				if (activeModule[activeStep].action === 'func') {
					props.doAction(activeModule[activeStep]);
				}
			} else {
				let activeModuleNumber = props.state.activeModule + 1;
				props.propSetState({
					activeModule: activeModuleNumber,
					activeStep: 0
				}, () => {
					props.moveConversation();
				});
			}
		}
	}
}