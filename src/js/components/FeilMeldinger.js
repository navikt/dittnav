import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeilMeldinger extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.errors.length > 0 &&
        <section className="service-notification">
          <h1 className="typo-element">
            {this.props.errors.map(e => (<span key={e}>{e}</span>))}
          </h1>
        </section>}
      </React.Fragment>
    );
  }
}

FeilMeldinger.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

FeilMeldinger.defaultProps = {
  errors: [],
};

export default FeilMeldinger;
