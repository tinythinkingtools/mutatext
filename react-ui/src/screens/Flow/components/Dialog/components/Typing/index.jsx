import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './styles.less';

class Typing extends React.Component {
  render() {
    return (
			<div className='dialog__row left'>
				<ReactCSSTransitionGroup
				transitionName="smoothies"
        transitionAppear={true}
        transitionAppearTimeout={800}
        transitionEnter={false}
        transitionLeave={false}>
				<div className='dialog__message'>
					<div className="dialog__spinner">
						<div className="dialog__bounce dialog__bounce1"></div>
						<div className="dialog__bounce dialog__bounce2"></div>
						<div className="dialog__bounce dialog__bounce3"></div>
					</div>
				</div>
				</ReactCSSTransitionGroup>
			</div>
    )
  }
};

export default Typing;