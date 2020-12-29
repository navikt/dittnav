import React from 'react';
import { FormattedMessage as F } from 'react-intl';

const fremtidig = (nyeMeldekort, formatDateMonth) => {
  if (nyeMeldekort.nesteInnsendingAvMeldekort) {
    return (
      <F id="meldekort.melding.fremtidig" values={{ dato: formatDateMonth(nyeMeldekort.nesteInnsendingAvMeldekort) }} />
    );
  }
  return null;
};

const feriedager = (meldekort) => {
  if (meldekort.resterendeFeriedager && meldekort.resterendeFeriedager > 0) {
    return (
      <F id="meldekort.feriedager" values={{ feriedager: meldekort.resterendeFeriedager }} />
    );
  }
  return null;
};

const advarsel = (risikererTrekk) => {
  if (risikererTrekk) {
    return <span><F id="meldekort.trekk" /></span>;
  }
  return null;
};

const melding = (next, count, formatDayAndMonth, numberToWord) => {
  if (next) {
    return (
      <F
        id={count === 1 ? 'meldekort.ett' : 'meldekort.flere'}
        values={{
          count: numberToWord(count),
          next: next.uke,
          from: formatDayAndMonth(next.fra),
          until: formatDayAndMonth(next.til),
        }}
      />
    );
  }
  return null;
};

const trekk = (skalViseTrekkdato, formatDateMonth, next) => {
  if (skalViseTrekkdato) {
    return (
      <F id="meldekort.info.om.trekk" values={{ dato: formatDateMonth(next.sisteDatoForTrekk) }} />
    );
  }
  return null;
};

export { fremtidig, feriedager, advarsel, melding, trekk };
