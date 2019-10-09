import React, { Component } from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';

import nb from 'react-intl/locale-data/nb';
import en from 'react-intl/locale-data/en';
import nn from 'react-intl/locale-data/nn';

addLocaleData([...nb, ...en, ...nn]);

class NavApp extends Component {
  render() {
    return (
      <IntlProvider locale={this.props.defaultSprak} messages={this.props.messages[this.props.defaultSprak]}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

export default NavApp;
