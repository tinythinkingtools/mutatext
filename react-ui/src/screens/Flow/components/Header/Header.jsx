import React from 'react';

import './styles.less';
import Logo from './components/images/mutatext-logo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
				<img src={Logo} alt="" className="header__logo" />
				<div className="header__brand">Mutatext</div>
			</div>
    )
  }
};

export default Header;