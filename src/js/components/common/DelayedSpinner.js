import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';

class DelayedSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = { showSpinner: false };
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => this.setState({ showSpinner: true }),
      this.props.delay,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.showSpinner && (
      <div className={this.props.spinnerClass}>
        <NavFrontendSpinner className="spinner" aria="hidden" />
        <Undertittel>
          <FormattedMessage id="spinner.melding" />
        </Undertittel>
      </div>
    );
  }
}

DelayedSpinner.propTypes = {
  delay: PropTypes.number.isRequired,
  spinnerClass: PropTypes.string,
};

DelayedSpinner.defaultProps = {
  spinnerClass: '',
};

export default DelayedSpinner;
