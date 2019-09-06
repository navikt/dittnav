import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavFrontendSpinner from 'nav-frontend-spinner';

class DelayedSpinner extends Component {
  state = { showSpinner: false };

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
    return this.state.showSpinner && <NavFrontendSpinner className={this.props.spinnerClass} />;
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
