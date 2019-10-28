import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PersonInfo extends Component {
  render() {
    if (!this.props.ident) return null;

    const { navn } = this.props.person ? this.props.person : null;
    const { ident } = this.props.ident;

    return (
      <div className="person-info">
        <h1 className="person-info">
          {navn ? navn.toLowerCase() : ident}
        </h1>
      </div>
    );
  }
}

PersonInfo.propTypes = {
  person: PropTypes.shape({
    navn: PropTypes.string.isRequired,
  }),
  ident: PropTypes.shape({
    ident: PropTypes.number.isRequired,
  }),
};

PersonInfo.defaultProps = {
  person: null,
  ident: null,
};

export default PersonInfo;
