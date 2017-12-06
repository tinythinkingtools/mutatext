import React from 'react';
import Settings from 'services/config/Settings';
import _ from 'lodash';
import {observer} from "mobx-react"
import {observable} from "mobx"
import Background from './components/Background';
import Header from './components/Header';
import Dialog from './components/Dialog';
import Scenario from './components/Scenarios';
import ActionsController from './components/ActionsController';
import UserController from './components/UserController';

@observer
class Flow extends React.Component {
	@observable flow = {
		dialogMessages: [],
		scenario: {},
		activeModule: 0,
		activeStep: 0,
		loading: false,
		typingText: true,
		numberLanguages: 4,
		activeMessageFromUser: '',
		controller: {
			status: false,
			placeholder: 'Type a message',
			value: '',
			type: 'text'
		},
		userActions: [],
	}
	componentDidMount = () => {
		document.title = `${Settings.title}`;
		this.flow.scenario = Scenario(['Welcome', 'AskUser', 'LetsMutatext']);
		setTimeout(() => {
			this.moveConversation();
		}, 1000)
  }
	
	moveConversation = (module = false) => {
		if (module) {
			let scenario = this.flow.scenario;
			let newModule = _.findIndex(scenario, { name: module.name });
			if (newModule) {
				this.flow.activeModule = newModule;
				this.flow.activeStep = module.step ? module.step : 0;
				this.doAction('MoveConversation');
				return;
			}
		}
		
		this.doAction('MoveConversation');
	}
	doAction = (activeStep, module = null) => {
		const listOpts = {
			state: this.flow,
			propSetState: this.propSetState,
			sendMessageToDialog: this.sendMessageToDialog,
			moveConversation: this.moveConversation,
			userWriteToDialog: this.userWriteToDialog,
			params: this.props.match.params,
			doAction: this.doAction,
			module: module,
			activeAction: activeStep.name ? activeStep.name : activeStep,
			activeStep: activeStep,
		}
		ActionsController(listOpts);
	}
	sendMessageToDialog = (module) => {
		this.doAction('SendMessageToDialog', module);
	}
	showUserController = (module) => {
		this.doAction('ShowUserController', module);
	}
	propSetState = (set, next = false) => {
		Object.keys(set).forEach((key, index) => {
			this.flow[key] = set[key];
		});
		if (next) {
			next();
		}
  }
	userWriteToDialog = (value) => {
		this.doAction('UserWriteToDialog', value);
	}
	
	render() {
		return (
			<div className="app-container">
				<Background />
				<Header />
				<Dialog
					dialogMessages={this.flow.dialogMessages ? this.flow.dialogMessages.slice() : []}
					typingText = {this.flow.typingText}
					/>
				<UserController
						state = {this.flow}
						controller={this.flow.controller}
						propSetState={this.propSetState}
						moveConversation={this.moveConversation}
						userWriteToDialog={this.userWriteToDialog}
						userActions={this.flow.userActions}
					/>
			</div>
		);
	}
}

export default Flow;