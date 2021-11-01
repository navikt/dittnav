import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import KoronaVarsel from './KoronaVarsel';
import { getForskuddToggle } from './DagpengerForskuddToggle';
import { listOfActions, listOfComponentNames } from '../../utils/amplitudeUtils';
import { lenker } from '../../utils/lenker';
import { useSakstema } from '../../hooks/useSaker';

const visForskuddLenkeFra = '01-03-2020';

const KoronaSpesial = () => {
  const [forskuddToggle, setForskuddToggle] = useState(null);
  const [{ data: sakstema }] = useSakstema();

  const harDagpengerSakNyligOppdatert = sakstema && sakstema.content.sakstemaList && sakstema.content.sakstemaList
    .some(tema => tema.temakode === 'DAG'
      && moment(tema.sisteOppdatering).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY')));

  useEffect(() => {
    if (harDagpengerSakNyligOppdatert) {
      getForskuddToggle(setForskuddToggle);
    }
  }, [harDagpengerSakNyligOppdatert]);

  return (
    <>
      <div className={forskuddToggle ? 'korona-container' : ''}>
        {forskuddToggle ? (
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
