import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron';
import { listOfActions, listOfComponentNames, logAmplitudeEvent } from '../utils/amplitudeUtils';

const InngangVarslinger = () => {
  const MinSideVarslingerUrl = `${window.env.NAVNO_URL}/minside/varslinger`;

  return (
    <div className="varslinger-inngang-wrapper">
      <Undertittel className="varslinger-inngang">
        <a
          id="varslinger-inngang__lenke-id"
          href={MinSideVarslingerUrl}
          onClick={() => logAmplitudeEvent(listOfComponentNames.brukernotifikasjon.TidligereBeskjederOgOppgaver, listOfActions.TrykkPaaLenke)}
        >
          <FormattedMessage id="dittnav.infomeldinger.inngang.varslinger" />
        </a>
        <HoyreChevron className="varslinger-inngang__chevron" />
      </Undertittel>
    </div>
  );
};

export default InngangVarslinger;
