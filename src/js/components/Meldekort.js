import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import conf from '../Config';
import i18n from '../../translations/i18n';
import { IkonPille, LenkepanelMedIkon } from './LenkepanelMedIkon';

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
    const ingressTekst = (
      <>
        {!meldekort.nyeMeldekort.nesteInnsendingAvMeldekort && (count > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}
        {feriedager(meldekort)}
      </>
    );
    const visMeldingOgTrekk = (
      <>
        {count > 0 && (
          <>
            <span>{melding(meldekort.nyeMeldekort.nesteMeldekort, count, formatDayAndMonth, numberToWord)} </span>
            <span>{trekk(!risikererTrekk, formatDateMonth, meldekort.nyeMeldekort.nesteMeldekort)} </span>
          </>
        )}
      </>
    );
    const overskrift = (
      <>
        <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
        {visMeldingOgTrekk}
        {advarsel(risikererTrekk)}
      </>
    );

    return (
      <>
        {(count > 0 || meldekort.nyeMeldekort.nesteInnsendingAvMeldekort)
        && (
        <LenkepanelMedIkon
          className="infoMeldinger"
          data-ga="Dittnav/Varsel"
          alt="fliser.ditt.sykevravaer"
          overskrift={overskrift}
          ingress={ingressTekst}
          href={`${conf.dittNav.NAV_URL}${conf.MELDEKORT_PATH}`}
        >
          <IkonPille />
        </LenkepanelMedIkon>
        )}
      </>
    );
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
