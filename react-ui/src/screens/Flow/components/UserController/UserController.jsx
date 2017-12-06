import React from 'react';
import './styles.less';

import {observer} from "mobx-react"
@observer
class UserController extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			opened: false,
			message: '',
			label: '',
			focused: false,
			readOnly: false,
		}
	}
	onFocus = () => {
		this.setState({
			focused: true
		});
  }
	onChange = (e) => {
		const controller = this.props.controller;
		controller['value'] = e.target.value;
		this.props.propSetState({
			controller
		});
	}
	onBlur = () => {
		this.setState({
			focused: false
		})
  }
	sendToDialog = () => {
		if (this.props.controller.value) {
			const controller = this.props.controller;
			const value = this.props.controller.value;
			this.props.userWriteToDialog(value);
			this.props.propSetState({
				activeMessageFromUser: value
			});
			controller.value = '';
			this.props.propSetState({
				controller
			}, () => {
				this.props.moveConversation()
			});
		}
	}
	_handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendToDialog();
    }
  }
	showActions = () => {
		if (this.props.userActions) {
			let DOM = [];
			const buttons = this.props.userActions.buttons ? this.props.userActions.buttons.slice() : [];
			if (buttons) {
				buttons.forEach((button, index) => {
					DOM.push(
						<button key={index} className={"UserController__btn" + (button.class ? ` ${button.class}`: '') } onClick={button.func}  dangerouslySetInnerHTML={{__html : button.text }}></button>
					)
				});
			}
			return DOM;
		}
		return [];
	}
  render() {
		let style = {
			display: this.props.userActions.active ? 'block' : 'none'
		}
    return (
			<div>
				<div className="control__tableRow" style={style}>
					<div className="control__box-controller">
						<div className="UserController">
							{ this.props.userActions.label ? <div className="UserController__label">{this.props.userActions.label}</div> : '' }
							{ this.props.userActions ? <div className="UserController__group"> { this.showActions() } </div> : '' }
						</div>
					</div>
				</div>
				<div className={"control__tableRow" + (this.props.controller.status ? '' : ' disabled' )} style={this.state.styles}>
					<div className="control__box-controller">
						<div className="control__container">
							<label htmlFor="controllerValue" className="control__label">{this.props.controller.label ? this.props.controller.label : "Let's make an action" }</label>
							<div className="control__group">
								<input
									readOnly={ this.state.readOnly }
									onFocus={ this.onFocus }
									onBlur={ this.onBlur }
									onChange={this.onChange}
									onKeyPress={this._handleKeyPress}
									className={"control__controller" + (this.props.controller.status ? '' : ' disabled') }
									type={this.props.controller.type ? this.props.controller.type : 'text' }
									name="controllerValue"
									id="controllerValue"
									value={this.props.controller.value ? this.props.controller.value : ''}
									placeholder={this.props.controller.placeholder ? this.props.controller.placeholder : '' }
								/>
								<button
									className="control__button-send"
									type="button"
									onClick={this.sendToDialog}
									style = {
										{
											'display' : this.state.focused || this.props.controller.value ? '' : 'none' 
										}
									}
									>
									SEND
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
    )
  }
};

export default UserController;