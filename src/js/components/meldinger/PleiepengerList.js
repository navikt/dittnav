import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PleiepengerList extends Component {
  render() {
    if (!this.props.pleiepenger) return null;

    return (
      <div className="message">
        <span className="icon pleiepenger-icon" aria-label="pleiepenger-ikon" />
        <div className="texts">
          {this.props.pleiepenger.map(l => (
            <p key={l.child + l.usedPerToday} >Forbrukte pleiepengedager per i dag for barn med f.nr. {l.child}: <b>{l.usedPerToday}</b></p>
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
