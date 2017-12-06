export default (props) => {
	props.propSetState({
		controller: props.activeStep.controller
	});
	if (props.state.activeMessageFromUser) {
		const userActions = {
			active: true,
			label: 'Choose a count of languages',
			buttons: []
		}
		for (let index = 1; index < 11; index++) {
			userActions.buttons.push(
				{
					text: index,
					class: 'small',
					func: (e) => {
						const next = props.state.activeStep + 1;
						props.userWriteToDialog(`${index} languages`);
						props.propSetState({ 
							typingText: true,
							activeStep: next,
							numberLanguages: index,
							userActions: {}
						}, () => {
							props.moveConversation();
						});
					}
				}
			)
		}
		// Show interim steps?
		props.propSetState({
			controller: {},
			typingText: true,
			userActions
		}, () => {
			props.sendMessageToDialog({ 'type': 'text', 'value': 'How many languages do you want to translate to before going back to the original language?'});
		});
	}
}