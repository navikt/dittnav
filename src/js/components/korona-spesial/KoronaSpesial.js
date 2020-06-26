import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { KoronaVarsel } from './KoronaVarsel';
import { getForskuddToggle } from './DagpengerForskuddToggle';
import Config from '../../globalConfig';
import SakstemaType from '../../types/SakstemaType';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../../utils/GoogleAnalytics';

const visForskuddLenkeFra = '01-03-2020';

const KoronaSpesial = ({ sakstema, isLoaded }) => {
  const [forskuddToggle, setForskuddToggle] = useState(null);

  const harDagpengerSakNyligOppdatert = sakstema && sakstema.sakstemaList && sakstema.sakstemaList
    .some(tema => tema.temakode === 'DAG'
      && moment(tema.sisteOppdatering).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY')));

  useEffect(() => {
    if (harDagpengerSakNyligOppdatert) {
      getForskuddToggle(setForskuddToggle);
    }
  }, [harDagpengerSakNyligOppdatert]);

  const venstreLenke = forskuddToggle
    ? Config.LENKER.dagpengerForskudd
    : Config.LENKER.koronaBehandlingstid;

  const venstreTekst = forskuddToggle
    ? 'korona.dagpenger-forskudd.ingress'
    : 'korona.behandlingstid.ingress';

  const venstreGaAction = forskuddToggle
    ? GoogleAnalyticsAction.DagpengerForskudd
    : GoogleAnalyticsAction.Behandlingstid;

  const loaded = isLoaded && (!harDagpengerSakNyligOppdatert || forskuddToggle !== null);

  return (
    <>
      {forskuddToggle ? (
        <KoronaVarsel
          tittel={Config.LENKER.koronaSituasjon.tittel}
          href={Config.LENKER.koronaSituasjon.url}
          gaCategory={GoogleAnalyticsCategory.Forside}
          gaAction={GoogleAnalyticsAction.KoronaSituasjon}
        >
          <Normaltekst>
            <FormattedMessage id="korona.din.situasjon.ingress" />
          </Normaltekst>
        </KoronaVarsel>
      ) : null}
      <div className={`korona-spesial${loaded ? ' korona-spesial--loaded' : ''}`}>
        <KoronaVarsel
          tittel={venstreLenke.tittel}
          href={venstreLenke.url}
          className="blaa-bakgrunn"
          gaCategory={GoogleAnalyticsCategory.Forside}
          gaAction={venstreGaAction}
        >
          <Normaltekst>
            <FormattedMessage id={venstreTekst} />
          </Normaltekst>
        </KoronaVarsel>
        <KoronaVarsel
          tittel={Config.LENKER.koronaVeiviser.tittel}
          href={Config.LENKER.koronaVeiviser.url}
          gaCategory={GoogleAnalyticsCategory.Forside}
          gaAction={GoogleAnalyticsAction.Koronaveiviser}
        >
          <Normaltekst>
            <FormattedMessage id={'korona.virus-varsel.ingress'} />
          </Normaltekst>
        </KoronaVarsel>
      </div>
    </>
  );
};

KoronaSpesial.propTypes = {
  sakstema: SakstemaType,
  isLoaded: bool,
};

KoronaSpesial.defaultProps = {
  sakstema: null,
  isLoaded: false,
};

export default KoronaSpesial;
