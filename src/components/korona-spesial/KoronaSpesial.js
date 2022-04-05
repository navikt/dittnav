import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import KoronaVarsel from './KoronaVarsel';
import { listOfActions, listOfComponentNames } from '../../utils/amplitudeUtils';
import { lenker } from '../../utils/lenker';
import { useSakstema } from '../../hooks/useSaker';

const visForskuddLenkeFra = '01-03-2020';

const KoronaSpesial = () => {
  const [showTilbakebetaling, setShowTilbakebetaling] = useState(false);
  const [{ data: sakstema }] = useSakstema();

  const harDagpengerSakNyligOppdatert = sakstema && moment(sakstema?.content?.dagpengerSistEndret).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY'));

  useEffect(() => {
    if (harDagpengerSakNyligOppdatert) {
      setShowTilbakebetaling(true);
    }
  }, [harDagpengerSakNyligOppdatert]);

  return (
    <>
      <div className={true ? 'korona-container' : ''}>
        {showTilbakebetaling ? (
          <KoronaVarsel
            tittel={lenker.koronaSituasjon.tittel}
            href={lenker.koronaSituasjon.url}
            className="tilbakebetaling"
            amplitudeAction={listOfActions.TrykkPaaLenke}
            amplitudeComponentName={listOfComponentNames.TilbakebetalingsFlis}
          >
            <Normaltekst>
              <FormattedMessage id="korona.din.situasjon.ingress" />
            </Normaltekst>
          </KoronaVarsel>
        ) : null}
        <KoronaVarsel
          tittel={lenker.koronaVeiviser.tittel}
          href={lenker.koronaVeiviser.url}
          amplitudeAction={listOfActions.TrykkPaaLenke}
          amplitudeComponentName={listOfComponentNames.KoronaSpesialFlis}
        >
          <Normaltekst>
            <FormattedMessage id="korona.virus-varsel.ingress" />
          </Normaltekst>
        </KoronaVarsel>
      </div>
    </>
  );
};

export default KoronaSpesial;
