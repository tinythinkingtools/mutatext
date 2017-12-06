const Welcome = {
	name: 'welcome',
	steps: [
		{
			action: 'message',
			type: 'text',
			value: 'Mutatext allows you to mutate text using google translate. Follow instructions below to try it out.',
			timeout: 2000,
			typing: true
		},
		{
			action: 'message',
			type: 'text',
			value: 'Happy Mutatexting!',
			timeout: 1000,
			typing: true
		}
	]
};

export default Welcome;