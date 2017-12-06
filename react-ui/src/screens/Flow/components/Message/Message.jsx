import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {observer} from "mobx-react"
import './styles.less';

@observer
class Message extends React.Component {
  renderMessage = () => {
    if (!this.props.type || this.props.type === 'text') {
      return (
        <div className='dialog__message' dangerouslySetInnerHTML={{__html : this.props.value }}></div>
      );
    }
    if (!this.props.type || this.props.type === 'error') {
      return (
        <div className='dialog__message dialog__message--error' dangerouslySetInnerHTML={{__html : this.props.value }}></div>
      );
    }
		if (!this.props.type || this.props.type === 'choice-result') {
      let choice = [];
			let variants = this.props.value.values ? this.props.value.values.slice() : [];
			if (variants) {
				 variants.forEach((obj, index) => {
					choice.push(
						<button className={"dialog__choices-btn" + (obj.class ? ' '+obj.class : '' )} key={index} onClick={obj.func}>
							{obj.path ? <span className="dialog__choices-path">{obj.path}</span> : null}
							{obj.title}
						</button>
					);
				});
			}
      return (
        <div className="dialog__choices">
					<div className="dialog__choices-title">{this.props.value.message}</div>
          {choice}
        </div>
      );
    }
		
		
  }
  render() {
    return (
      <div className={'dialog__row' + (this.props.side ? ' left' : ' right')}>
        <ReactCSSTransitionGroup
				transitionName="smoothies"
        transitionAppear={this.props.side ? true : false}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        {this.renderMessage()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
};

export default Message;