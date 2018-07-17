import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const translations = {
  'meldekort.se.oversikt': 'Oversikt over meldekort',
  'meldekort.trekk': '(Send inn nå, du risikerer trekk!)',
  'meldekort.flere': 'Du har {0} meldekort klare for innsending',
  'meldekort.melding.fremtidig': 'Neste meldekort kan sendes fra {0}',
  'meldekort.feriedager': 'Du har gjenstående {0} feriedager ved dagpenger.',
  'meldekort.ett': 'Du har ett meldekort for uke {0} ({1} - {2}) klart for innsending',
  'meldekort.send': 'Send meldekort',
  'meldekort.info.om.trekk': '(Siste innsendingsfrist før trekk: {0})',
};

const formatDate = date => new Date(date).toLocaleDateString('nb-NO');
const ARBEID_PATH = '/sbl/nav_security_check';
const MELDEKORT_PATH = '/meldekort/';

class Meldekort extends Component {
  render() {
    const { meldekort } = this.props;

    if (!meldekort) return null;

    const { count } = meldekort.newCards;

    const risikererTrekk = meldekort.newCards.nextCard && meldekort.newCards.nextCard.risikererTrekk;
    const fremtidig = meldekort.nextSendingDate && this.props.getCurrentDate.getTime() < meldekort.nextSendingDate ? (<span>{translations['meldekort.melding.fremtidig'].format(formatDate(meldekort.nextSendingDate))}</span>) : null;
    const advarsel = risikererTrekk ? (<span>{translations['meldekort.trekk']}</span>) : null;
    const feriedager = meldekort.remainingHolidays && meldekort.remainingHolidays > 0 ? (<span>{translations['meldekort.feriedager'].format(meldekort.remainingHolidays)}</span>) : null;

    if (count > 0) {
      const next = meldekort.newCards.nextCard;
      const trekk = !risikererTrekk ? (<span>{translations['meldekort.info.om.trekk'].format(formatDate(next.datoForTrekk))}</span>) : null;
      const melding = next ? (<span>{translations[count === 1 ? 'meldekort.ett' : 'meldekort.flere'].format(next.week, formatDate(next.from), formatDate(next.until))}</span>) : null;
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${conf.dittNav.SERVICES_URL}${ARBEID_PATH}?goto=${MELDEKORT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{fremtidig} </span>
            <span>{melding} </span>
            <span>{trekk} </span>
            <span>{advarsel} </span>
            <p id="meldekort.lenkeTekst">{(count > 1 ? translations['meldekort.se.oversikt'] : translations['meldekort.send'])}</p>
            <p>{feriedager}</p>
          </span>
        </a>
      );
    }

    return (
      <div data-ga="Dittnav/Varsel" className="message meldekort">
        <span className="icon meldekort-icon" aria-label="alarm-ikon" />
        <span className="texts">
          <span>{fremtidig} </span>
          <span>{advarsel} </span>
          <p>{feriedager}</p>
        </span>
      </div>
    );
  }
}

const NextCard = PropTypes.shape({
  datoForTrekk: PropTypes.number,
  risikererTrekk: PropTypes.bool,
  week: PropTypes.string,
  canBeSubmittedFrom: PropTypes.number,
  until: PropTypes.number,
  from: PropTypes.number,
});

const NewCards = PropTypes.shape({
  count: PropTypes.number,
  nextSendingDate: PropTypes.number,
  nextCard: NextCard,
});

export const MeldekortType = PropTypes.shape({ newCards: NewCards, remainingHolidays: PropTypes.number });

Meldekort.propTypes = {
  meldekort: MeldekortType,
  getCurrentDate: PropTypes.func,
};

Meldekort.defaultProps = {
  meldekort: null,
  getCurrentDate: () => new Date(),
};

export default Meldekort;
