const AskUser = {
	name: 'AskUser',
	steps: [
		{
			action: 'message',
			type: 'text',
			value: 'What text would you like to mutate (type in text in any language)?',
			timeout: 1000,
			typing: false
		},
		{
			action: 'func',
			name: 'AskUser',
			controller: {
				status: true,
				placeholder: 'Type in text in any language',
				value: '',
				type: 'text'
			},
		},
		
	]
};

export default AskUser;