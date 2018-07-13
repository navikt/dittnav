import React, { Component } from 'react';
import PropTypes from 'prop-types';

const translations = {
  'meldekort.se.oversikt': 'Oversikt over meldekort',
  'meldekort.trekk': '(Send inn nå, du risikerer trekk!)',
  'meldekort.flere': 'Du har {0} meldekort klare for innsending',
  'meldekort.melding.fremtidig': 'Neste meldekort kan sendes fra {0}',
  'meldekort.feriedager': 'Du har gjenstående {0} feriedager ved dagpenger.',
  'meldekort.ett': 'Du har ett meldekort for uke {0} ({1}-{2}) klart for innsending',
  'meldekort.send': 'Send meldekort',
  'meldekort.info.om.trekk': '(Siste innsendingsfrist før trekk: {0})',
};

class Meldekort extends Component {
  render() {
    const { meldekort } = this.props;
    const { count } = meldekort.newCards;

    const fremtidig = meldekort.nextSendingDate && meldekort.nextSendingDate.after(new Date()) ? (<span>{translations['meldekort.melding.fremtidig'].format(meldekort.nextSendingDate)}</span>) : null;
    const risikererTrekk = true;
    const advarsel = risikererTrekk ? (<span>{translations['meldekort.trekk']}</span>) : null;
    const feriedager = meldekort.remainingHolidays && meldekort.remainingHolidays > 0 ? (<span>{translations['meldekort.feriedager'].format(meldekort.remainingHolidays)}</span>) : null;


    if (count > 0) {
      // deep link
      // tjenesterUrl + ARBEID_PATH + "?goto=" + MELDEKORT_PATH;
      const ARBEID_PATH = '13';
      const MELDEKORT_PATH = '13';
      const tjenesterUrl = '13';
      const trekk = count > 0 && risikererTrekk ? (<span>{translations['meldekort.info.om.trekk'].format('datoForTrekkFormatert')}</span>) : null;
      const next = meldekort.newCards.nextCard;
      const melding = next ? (<span>{translations[count === 1 ? 'meldekort.ett' : 'meldekort.flere'].format(next.week, next.fromDate, next.untilDate)}</span>) : null;
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${tjenesterUrl}${ARBEID_PATH}?goto=${MELDEKORT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            {fremtidig}
            {melding}
            {trekk}
            {advarsel}
            <p id="meldekort.lenkeTekst">{(count > 1 ? translations['meldekort.se.oversikt'] : translations['meldekort.send'])}</p>
            {feriedager}
          </span>
        </a>
      );
    }

    return (
      <div data-ga="Dittnav/Varsel" className="message meldekort">
        <span className="icon meldekort-icon" aria-label="alarm-ikon" />
        <span className="texts">
          {fremtidig}
          {advarsel}
          {feriedager}
        </span>
      </div>
    );
  }
}

Meldekort.propTypes = {
  meldekort: PropTypes.shape({}),
};

Meldekort.defaultProps = {
  meldekort: null,
};


export default Meldekort;
