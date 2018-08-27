import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

const fremtidig = (meldekort, getCurrentDate, formatDate) => (meldekort.nextSendingDate && getCurrentDate.getTime() < meldekort.nextSendingDate
  ? (<span><F id="meldekort.melding.fremtidig" values={{ dato: formatDate(meldekort.nextSendingDate) }} /></span>)
  : null);

const feriedager = meldekort => (meldekort.remainingHolidays && meldekort.remainingHolidays > 0
  ? (<span><F id="meldekort.feriedager" values={{ feriedager: meldekort.remainingHolidays }} /></span>)
  : null);

const advarsel = risikererTrekk => (risikererTrekk ? (<span><F id="meldekort.trekk" /></span>) : null);

const melding = (next, count, formatDate) =>
  (next ? (
    <span>
      <F
        id={count === 1 ? 'meldekort.ett' : 'meldekort.flere'}
        values={{
          count, next: next.week, from: formatDate(next.from), until: formatDate(next.until),
        }}
      />
    </span>) : null);

const trekk = (risikererTrekk, formatDate, next) =>
  (!risikererTrekk ? (<span><F id="meldekort.info.om.trekk" values={{ dato: formatDate(next.datoForTrekk) }} /></span>) : null);

class Meldekort extends Component {
  render() {
    const { meldekort, intl, getCurrentDate } = this.props;
    const { formatDate } = i18n[intl.locale];
    if (!meldekort) return null;

    const { count } = meldekort.newCards;
    const risikererTrekk = meldekort.newCards.nextCard && meldekort.newCards.nextCard.risikererTrekk;

    if (count > 0) {
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDEKORT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{fremtidig(meldekort, getCurrentDate, formatDate)} </span>
            <span>{melding(meldekort.newCards.nextCard, count, formatDate)} </span>
            <span>{trekk(risikererTrekk, formatDate, meldekort.newCards.nextCard)} </span>
            <span>{advarsel(risikererTrekk)} </span>
            <p id="meldekort.lenkeTekst">{(count > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}</p>
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
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

Meldekort.defaultProps = {
  meldekort: null,
  getCurrentDate: () => new Date(),
};

export default injectIntl(Meldekort);
