import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { arrayOf } from 'prop-types';
import { KoronaVarsel } from './KoronaVarsel';
import { skalViseForskuddLenke } from './DagpengerForskuddToggle';
import Config from '../../globalConfig';
import SakstemaType from '../../types/SakstemaType';
import BeskjedType from '../../types/BeskjedType';
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

const visForskuddLenkeFra = '01-03-2020';

const KoronaSpesial = ({ sakstema, beskjeder, inaktiveBeskjeder, isLoaded }) => {
  const [skalViseForskudd, setSkalViseForskudd] = useState(null);

  const harDagpengerSakNyligOppdatert = sakstema && sakstema.sakstemaList && sakstema.sakstemaList
    .some(tema => tema.temakode === 'DAG'
      && moment(tema.sisteOppdatering).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY')));

  const forskuddTekst = beskjed => beskjed.tekst.toLowerCase().includes('forskudd på dagpenger');
  const harForskuddSoknadKvittering = (beskjeder && beskjeder.some(forskuddTekst))
    || (inaktiveBeskjeder && inaktiveBeskjeder.some(forskuddTekst));

  const skalKalleForskuddAppen = harDagpengerSakNyligOppdatert && !harForskuddSoknadKvittering;

  useEffect(() => {
    if (skalKalleForskuddAppen) {
      skalViseForskuddLenke(setSkalViseForskudd);
    }
  }, [skalKalleForskuddAppen]);

  const loaded = isLoaded && (!skalKalleForskuddAppen || skalViseForskudd !== null);

  return (
    <div className={`korona-spesial${loaded ? ' korona-spesial--loaded' : ''}`}>
      {skalViseForskudd ? (
        <KoronaVarsel
          tittel={Config.LENKER.dagpengerForskudd.tittel}
          href={Config.LENKER.dagpengerForskudd.url}
          className="blaa-bakgrunn"
        >
          <Normaltekst>
            <FormattedMessage id={"korona.dagpenger-forskudd.ingress"} />
          </Normaltekst>
        </KoronaVarsel>
      ) : (
        <KoronaVarsel
          tittel={Config.LENKER.koronaBehandlingstid.tittel}
          href={Config.LENKER.koronaBehandlingstid.url}
          className="blaa-bakgrunn"
        >
          <Normaltekst>
            <FormattedMessage id={"korona.behandlingstid.ingress"} />
          </Normaltekst>
        </KoronaVarsel>
      )}
      <KoronaVarsel
        tittel={Config.LENKER.koronaVeiviser.tittel}
        href={Config.LENKER.koronaVeiviser.url}
      >
        <Normaltekst>
          <FormattedMessage id={"korona.virus-varsel.ingress"} />
        </Normaltekst>
      </KoronaVarsel>
    </div>
  );
};

KoronaSpesial.propTypes = {
  sakstema: SakstemaType,
  beskjeder: arrayOf(BeskjedType),
  inaktiveBeskjeder: arrayOf(BeskjedType),
};

KoronaSpesial.defaultProps = {
  sakstema: null,
  beskjeder: null,
  inaktiveBeskjeder: null,
};

export default KoronaSpesial;
