export default (props) => {
	const dialogMessages = props.state.dialogMessages;
	dialogMessages.push(
		{
			value: props.module.value,
			type: props.module.type,
			side: true
		}
	);
	props.propSetState({
		typingText: false,
		dialogMessages
	})
}