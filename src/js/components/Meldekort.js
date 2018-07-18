import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const i18n = {
  'meldekort.se.oversikt': 'Oversikt over meldekort',
  'meldekort.trekk': '(Send inn nå, du risikerer trekk!)',
  'meldekort.flere': 'Du har {0} meldekort klare for innsending',
  'meldekort.melding.fremtidig': 'Neste meldekort kan sendes fra {0}',
  'meldekort.feriedager': 'Du har gjenstående {0} feriedager ved dagpenger.',
  'meldekort.ett': 'Du har ett meldekort for uke {0} ({1} - {2}) klart for innsending',
  'meldekort.send': 'Send meldekort',
  'meldekort.info.om.trekk': '(Siste innsendingsfrist før trekk: {0})',
};

const ARBEID_PATH = '/sbl/nav_security_check';
const MELDEKORT_PATH = '/meldekort/';

const fremtidig = (meldekort, getCurrentDate, formatDate) => (meldekort.nextSendingDate && getCurrentDate.getTime() < meldekort.nextSendingDate
  ? (<span>{i18n['meldekort.melding.fremtidig'].format(formatDate(meldekort.nextSendingDate))}</span>)
  : null);

const feriedager = meldekort => (meldekort.remainingHolidays && meldekort.remainingHolidays > 0
  ? (<span>{i18n['meldekort.feriedager'].format(meldekort.remainingHolidays)}</span>)
  : null);

const advarsel = risikererTrekk => (risikererTrekk ? (<span>{i18n['meldekort.trekk']}</span>) : null);

const melding = (next, count, formatDate) =>
  (next ? (<span>{i18n[count === 1 ? 'meldekort.ett' : 'meldekort.flere'].format(next.week, formatDate(next.from), formatDate(next.until))}</span>) : null);

class Meldekort extends Component {
  render() {
    const { meldekort, formatDate, getCurrentDate } = this.props;

    if (!meldekort) return null;

    const { count } = meldekort.newCards;

    const risikererTrekk = meldekort.newCards.nextCard && meldekort.newCards.nextCard.risikererTrekk;

    if (count > 0) {
      const next = meldekort.newCards.nextCard;
      const trekk = !risikererTrekk ? (<span>{i18n['meldekort.info.om.trekk'].format(formatDate(next.datoForTrekk))}</span>) : null;
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${conf.dittNav.SERVICES_URL}${ARBEID_PATH}?goto=${MELDEKORT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{fremtidig(meldekort, getCurrentDate, formatDate)} </span>
            <span>{melding(next, count, formatDate)} </span>
            <span>{trekk} </span>
            <span>{advarsel(risikererTrekk)} </span>
            <p id="meldekort.lenkeTekst">{(count > 1 ? i18n['meldekort.se.oversikt'] : i18n['meldekort.send'])}</p>
            <p>{feriedager(meldekort)}</p>
          </span>
        </a>
      );
    }

    return (
      <div data-ga="Dittnav/Varsel" className="message meldekort">
        <span className="icon meldekort-icon" aria-label="alarm-ikon" />
        <span className="texts">
          <span>{fremtidig(meldekort, getCurrentDate, formatDate)} </span>
          <span>{advarsel(risikererTrekk)} </span>
          <p>{feriedager(meldekort)}</p>
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
  formatDate: PropTypes.func,
};

Meldekort.defaultProps = {
  meldekort: null,
  getCurrentDate: () => new Date(),
  formatDate: date => new Date(date).toLocaleDateString('nb-NO'),
};

export default Meldekort;
