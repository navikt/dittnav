import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

const fremtidig = (meldekort, getCurrentDate, formatDate) => (meldekort.nesteInnsendingAvMeldekort && getCurrentDate.getTime() < meldekort.nesteInnsendingAvMeldekort
  ? (<F id="meldekort.melding.fremtidig" values={{ dato: formatDate(meldekort.nesteInnsendingAvMeldekort) }} />)
  : null);

const feriedager = meldekort => (meldekort.resterendeFeriedager && meldekort.resterendeFeriedager > 0
  ? (<F id="meldekort.feriedager" values={{ feriedager: meldekort.resterendeFeriedager }} />)
  : null);

const advarsel = risikererTrekk => (risikererTrekk ? (<span><F id="meldekort.trekk" /></span>) : null);

const melding = (next, count, formatDate) => (next ? (
  <F
    id={count === 1 ? 'meldekort.ett' : 'meldekort.flere'}
    values={{
      count, next: next.uke, from: formatDate(next.fra), until: formatDate(next.til),
    }}
  />
) : null);

const trekk = (risikererTrekk, formatDate, next) => (!risikererTrekk ? (<F id="meldekort.info.om.trekk" values={{ dato: formatDate(next.datoForTrekk) }} />) : null);

class Meldekort extends Component {
  render() {
    const { meldekort, intl, getCurrentDate } = this.props;
    const { formatDate } = i18n[intl.locale];
    if (!meldekort) return null;

    const { antallNyeMeldekort: count } = meldekort.nyeMeldekort;
    const risikererTrekk = meldekort.nyeMeldekort.nesteMeldekort && meldekort.nyeMeldekort.nesteMeldekort.risikererTrekk;

    if (count > 0) {
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDEKORT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{fremtidig(meldekort, getCurrentDate, formatDate)} </span>
            <span>{melding(meldekort.nyeMeldekort.nesteMeldekort, count, formatDate)} </span>
            <span>{trekk(risikererTrekk, formatDate, meldekort.nyeMeldekort.nesteMeldekort)} </span>
            <span>{advarsel(risikererTrekk)} </span>
            <p id="meldekort.lenkeTekst">{(count > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}</p>
            <p>{feriedager(meldekort)}</p>
          </span>
        </a>
      );
    }

    if (meldekort.nyeMeldekort.nesteMeldekort) {
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
    return null;
  }
}

const NextCard = PropTypes.shape({
  datoForTrekk: PropTypes.number,
  risikererTrekk: PropTypes.bool,
  uke: PropTypes.string,
  kanSendesFra: PropTypes.number,
  til: PropTypes.number,
  fra: PropTypes.number,
});

const NewCards = PropTypes.shape({
  antallNyeMeldekort: PropTypes.number,
  nesteInnsendingAvMeldekort: PropTypes.number,
  nesteMeldekort: NextCard,
});

export const MeldekortType = PropTypes.shape({ nyeMeldekort: NewCards, remainingHolidays: PropTypes.number });

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
