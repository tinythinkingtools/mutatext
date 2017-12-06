import * as actions from '../Actions';

export default (props) => {
	switch (props.activeAction) {
		case 'MoveConversation': {
			actions.MoveConversation(props);
			break;
		}
		case 'SendMessageToDialog': {
			actions.SendMessageToDialog(props);
			break;
		}
		case 'UserWriteToDialog': {
			actions.UserWriteToDialog(props);
			break;
		}
		case 'LetsMutatext': {
			actions.LetsMutatext(props);
			break;
		}
		case 'AskUser': {
			actions.AskUser(props);
			break;
		}
		default: 
			props.sendMessageToDialog({ 'type': 'error', 'value': 'nothing to send' });
			break;
	}
}