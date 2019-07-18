import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Unleash extends Component {
  constructor(props) {
    super(props);
    this.state = { isFeatureEnabled: null };
  }

  componentDidMount() {
    this.props.api.fetchUnleashFeatures([this.props.feature])
      .then((f) => {
        if (f[this.props.feature]) {
          this.setState({ isFeatureEnabled: true });
        } else {
          this.setState({ isFeatureEnabled: false });
        }
      })
      .catch((e) => {
        console.info(`Problem fetch unleash feature ${this.props.feature}: ${e}`); // eslint-disable-line no-console
      });
  }

  render() {
    const { isFeatureEnabled } = this.state;
    return <React.Fragment>{isFeatureEnabled === null ? null : React.cloneElement(this.props.children, { isFeatureEnabled })}</React.Fragment>;
  }
}

Unleash.propTypes = {
  feature: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  api: PropTypes.shape({
    fetchUnleashFeatures: PropTypes.func.isRequired,
  }).isRequired,
};

export default Unleash;
