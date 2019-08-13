import React, {Component} from 'react';

import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl-relativetimeformat/polyfill';
import nb from 'intl-relativetimeformat/dist/locale-data/nb';
import en from 'intl-relativetimeformat/dist/locale-data/en';
import nn from 'intl-relativetimeformat/dist/locale-data/nn';

addLocaleData([...nb, ...en, ...nn]);

class NavApp extends Component {
  render () {
    return (
      <IntlProvider locale={this.props.defaultSprak} messages={this.props.messages[this.props.defaultSprak]}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

export default NavApp;
