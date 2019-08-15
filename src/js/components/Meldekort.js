import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import conf from '../Config';
import i18n from '../../translations/i18n';

const fremtidig = (nyeMeldekort, formatDateMonth) => (nyeMeldekort.nesteInnsendingAvMeldekort
  ? (<F id="meldekort.melding.fremtidig" values={{ dato: formatDateMonth(nyeMeldekort.nesteInnsendingAvMeldekort) }} />)
  : null);

const feriedager = meldekort => (meldekort.resterendeFeriedager && meldekort.resterendeFeriedager > 0
  ? (<F id="meldekort.feriedager" values={{ feriedager: meldekort.resterendeFeriedager }} />)
  : null);

const advarsel = risikererTrekk => (risikererTrekk ? (<span><F id="meldekort.trekk" /></span>) : null);

const melding = (next, count, formatDayAndMonth, numberToWord) => (next ? (
  <F
    id={count === 1 ? 'meldekort.ett' : 'meldekort.flere'}
    values={{
      count: numberToWord(count), next: next.uke, from: formatDayAndMonth(next.fra), until: formatDayAndMonth(next.til),
    }}
  />
) : null);

const trekk = (skalViseTrekkdato, formatDateMonth, next) => (skalViseTrekkdato ? (<F id="meldekort.info.om.trekk" values={{ dato: formatDateMonth(next.sisteDatoForTrekk) }} />) : null);

class Meldekort extends Component {
  render() {
    const { meldekort, intl } = this.props;
    const { formatDateMonth, formatDayAndMonth, numberToWord } = i18n[intl.locale];
    if (!meldekort) return null;

    const { antallNyeMeldekort: count } = meldekort.nyeMeldekort;
    const risikererTrekk = meldekort.nyeMeldekort.nesteMeldekort && meldekort.nyeMeldekort.nesteMeldekort.risikererTrekk;

    if (count > 0) {
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${conf.dittNav.NAV_URL}${conf.MELDEKORT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
            <span>{melding(meldekort.nyeMeldekort.nesteMeldekort, count, formatDayAndMonth, numberToWord)} </span>
            <span>{trekk(!risikererTrekk, formatDateMonth, meldekort.nyeMeldekort.nesteMeldekort)} </span>
            <span>{advarsel(risikererTrekk)} </span>
            <p id="meldekort.lenkeTekst">{(count > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}</p>
            <p>{feriedager(meldekort)}</p>
          </span>
        </a>
      );
    }

    if (meldekort.nyeMeldekort.nesteInnsendingAvMeldekort) {
      return (
        <div data-ga="Dittnav/Varsel" className="message meldekort">
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
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
  sisteDatoForTrekk: PropTypes.number,
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

export const MeldekortType = PropTypes.shape({
  nyeMeldekort: NewCards,
  resterendeFeriedager: PropTypes.number,
  etterregistrerteMeldekort: PropTypes.number,
});

Meldekort.propTypes = {
  meldekort: MeldekortType,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

Meldekort.defaultProps = {
  meldekort: null,
};

export default injectIntl(Meldekort);
