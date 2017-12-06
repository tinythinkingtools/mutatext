import React from 'react';
import {observer} from "mobx-react";
import Message from '../Message';
import Typing from './components/Typing';
import './styles.less';

@observer
class Dialog extends React.Component {
	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}	
	componentDidMount() {
		this.scrollToBottom();
	}
	componentDidUpdate() {
		this.scrollToBottom();
	}
	componentWillReact() {
		this.scrollToBottom();
	}
	preRender = () => {
		const dialogMessages = this.props.dialogMessages;
		if (dialogMessages.length) {
			let List = [];
			dialogMessages.forEach((message, index) => {
				List.push(
					<Message key={index} value={message.value} type={message.type} side={message.side}  />
				)
			});
			return List;
		} else{
			return(<div></div>)
		}
	}
  render() {
		let renderList = this.preRender();
    return (
			<div className='dialog'>
				<div className='dialog__container'>
					{ renderList }
					<span className="dialog__viewPoint" ref={(el) => { this.messagesEnd = el; }}></span>
					{ this.props.typingText ? <Typing /> : '' }
				</div>
			</div>
    )
  }
};

export default Dialog;