import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import conf from '../../Config';

class AgMeldinger extends Component {
  render() {
    const { agMessagesCount: count } = this.props;
    if (count === 0) return null;

    return (
      <a data-ga="Dittnav/Varsel/Arbeidsgiver" className="message clickable" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDINGER_NAV_PATH}`}>
        <span className="icon ag-icon" aria-label="snakkeboble-ikon" />
        <div className="texts">
          <p><F id={count === 1 ? 'ag.melding.en' : 'ag.melding.flere'} values={{ count }} /></p>
          <p><F id={count === 1 ? 'ag.se' : 'ag.se.oversikt'} /></p>
        </div>
      </a>
    );
  }
}

AgMeldinger.propTypes = {
  agMessagesCount: PropTypes.number.isRequired,
};

export default AgMeldinger;
