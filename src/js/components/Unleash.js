import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from 'js/Api';

class Unleash extends Component {
  constructor(props) {
    super(props)
    this.state = { hidden: true };
  }

  componentDidMount() {
    Api.fetchUnleashFeatures([this.props.feature])
      .then((f) => {
        if (!!f[this.props.feature]) {
          this.setState({ hidden: false })
        }
      })
      .catch((e) => {console.info(e)})
  }

  render() {
    const { children } = this.props;
    return this.state.hidden ? null : ( <React.Fragment>{children}</React.Fragment>);
  }
}

Unleash.propTypes = {
  feature: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Unleash;
