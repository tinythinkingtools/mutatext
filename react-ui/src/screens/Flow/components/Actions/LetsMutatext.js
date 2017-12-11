import API from 'services/utils/Api';

export default (props) => {
	
	console.log(props.state.activeMessageFromUser, props.state.numberLanguages);
	// call API
	API('/api/v1/mutatext', {
		method: 'post',
		body: {
			text: props.state.activeMessageFromUser,
			number: props.state.numberLanguages
		}
	}).then(data => {
		if (data.code === 200) {
			const valuesList = [];
			if (data.choices) {
				data.choices.forEach((item, index) => {
					valuesList.push({
						title: item.text,
						path: item.path,
						func: (e) => {
							var Children = [...e.target.parentNode.getElementsByClassName("dialog__choices-btn")];
							Children.forEach((obj, index) => {
								obj.setAttribute('disabled', 'true');
							});
							Children = [...e.target.parentNode.getElementsByClassName("dialog__choices-path")];
							Children.forEach((obj, index) => {
								obj.setAttribute('disabled', 'true');
							});
							props.userWriteToDialog(item.text);

							props.propSetState({
								activeMessageFromUser: item.text,
								userActions: {},
								typingText: true
							}, () => {
								props.moveConversation({name: 'LetsMutatext'});
							});
						},
					})
				})
				valuesList.push({
					title: 'Start over',
					class: 'start-over',
					func: (e) => {
						var Children = [...e.target.parentNode.getElementsByClassName("dialog__choices-btn")];
						Children.forEach((obj, index) => {
							obj.setAttribute('disabled', 'true');
						});
						props.userWriteToDialog('Start over');
						props.propSetState({
							activeMessageFromUser: '',
							userActions: {},
							typingText: true
						}, () => {
							props.moveConversation({name: 'AskUser'});
						});
					},
				})
			}

			props.sendMessageToDialog({
				type: 'choice-result',
				value: {
					message: 'Which mutation would you like to continue with?',
					values: valuesList
				}
			});
		} else {
			props.sendMessageToDialog({ 'type': 'error', 'value': data.message });
			props.propSetState({
				activeMessageFromUser: '',
				userActions: {},
				typingText: true
			}, () => {
				props.moveConversation({name: 'AskUser'});
			});
		}
		
	}).catch(error => {
		console.log(error);
	});
	
}