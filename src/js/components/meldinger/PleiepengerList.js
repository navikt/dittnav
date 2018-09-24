import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';

class PleiepengerList extends Component {
  render() {
    if (!this.props.pleiepenger || this.props.pleiepenger.length === 0) return null;

    return (
      <div className="message">
        <span className="icon pleiepenger-icon" aria-label="pleiepenger-ikon" />
        <div className="texts">
          {this.props.pleiepenger.map(l => (
            <p key={l.child + l.usedPerToday} ><F id="pleiepenger.peridag" values={{ child: l.child }} /> <b>{l.usedPerToday}</b></p>
            ))}
        </div>
      </div>
    );
  }
}

export const Pleiepenger = PropTypes.shape({ child: PropTypes.string, usedPerToday: PropTypes.string });

PleiepengerList.propTypes = {
  pleiepenger: PropTypes.arrayOf(Pleiepenger),
};

PleiepengerList.defaultProps = {
  pleiepenger: null,
};

export default PleiepengerList;
