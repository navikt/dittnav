import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { KoronaVarsel } from './KoronaVarsel';
import { getForskuddToggle } from './DagpengerForskuddToggle';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../../utils/googleAnalytics';
import { lenker } from '../../utils/lenker';
import { useSakstema } from '../../hooks/useSaker';

const visForskuddLenkeFra = '01-03-2020';

const KoronaSpesial = ({ isLoaded }) => {
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

  const loaded = isLoaded && (!harDagpengerSakNyligOppdatert || forskuddToggle !== null);

  return (
    <>
      <div className={`korona-spesial${loaded ? ' korona-spesial--loaded' : ''}`}>
        {forskuddToggle ? (
          <KoronaVarsel
            tittel={lenker.koronaSituasjon.tittel}
            href={lenker.koronaSituasjon.url}
            gaCategory={GoogleAnalyticsCategory.Forside}
            gaAction={GoogleAnalyticsAction.KoronaSituasjon}
          >
            <Normaltekst>
              <FormattedMessage id="korona.din.situasjon.ingress" />
            </Normaltekst>
          </KoronaVarsel>
        ) : null}
        <KoronaVarsel
          tittel={lenker.koronaVeiviser.tittel}
          href={lenker.koronaVeiviser.url}
          gaCategory={GoogleAnalyticsCategory.Forside}
          gaAction={GoogleAnalyticsAction.Koronaveiviser}
        >
          <Normaltekst>
            <FormattedMessage id="korona.virus-varsel.ingress" />
          </Normaltekst>
        </KoronaVarsel>
      </div>
    </>
  );
};

KoronaSpesial.propTypes = {
  isLoaded: bool,
};

KoronaSpesial.defaultProps = {
  isLoaded: false,
};

export default KoronaSpesial;
