export default (props) => {
	const dialogMessages = props.state.dialogMessages;
	dialogMessages.push(
		{
			type: false,
			value: props.module,
			side: false
		}
	);
	props.propSetState({
		dialogMessages
	});
}