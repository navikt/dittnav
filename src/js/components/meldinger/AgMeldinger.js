import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const i18n = {
  'ag.se': 'Se melding',
  'ag.se.oversikt': 'Oversikt over meldinger',
  'ag.melding.flere': 'Du har fått {0} nye meldinger fra arbeidsgiver',
  'ag.melding.en': 'Du har fått en ny melding fra arbeidsgiver',
};

class AgMeldinger extends Component {
  render() {
    const { agMessagesCount } = this.props;
    if (agMessagesCount === 0) return null;

    return (
      <a data-ga="Dittnav/Varsel/Arbeidsgiver" className="message clickable" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDINGER_NAV_PATH}`}>
        <span className="icon ag-icon" aria-label="snakkeboble-ikon" />
        <div className="texts">
          <p>{i18n[agMessagesCount === 1 ? 'ag.melding.en' : 'ag.melding.flere'].format(agMessagesCount)}</p>
          <p>{i18n[agMessagesCount === 1 ? 'ag.se' : 'ag.se.oversikt']}</p>
        </div>
      </a>
    );
  }
}

AgMeldinger.propTypes = {
  agMessagesCount: PropTypes.number.isRequired,
};

export default AgMeldinger;
