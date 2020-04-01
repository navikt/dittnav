import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { arrayOf } from 'prop-types';
import { KoronaVarsel } from './KoronaVarsel';
import { skalViseForskuddLenke } from './DagpengerForskuddToggle';
import Config from '../../globalConfig';
import SakstemaType from '../../types/SakstemaType';
import BeskjedType from '../../types/BeskjedType';

const visForskuddLenkeFra = '01-03-2020';

const KoronaSpesial = ({ sakstema, beskjeder, inaktiveBeskjeder, isLoaded }) => {
  const [skalViseForskudd, setSkalViseForskudd] = useState(null);

  const harDagpengerSakNyligOppdatert = sakstema && sakstema.sakstemaList && sakstema.sakstemaList
    .some(tema => tema.temakode === 'DAG'
      && moment(tema.sisteOppdatering).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY')));

  // TODO: finn ut hva jeg kan sjekke på her av tekst/id
  const forskuddTekst = beskjed => beskjed.tekst.includes('Forskudd på dagpenger');

  const harForskuddSoknad = (beskjeder && beskjeder.some(forskuddTekst))
    || (inaktiveBeskjeder && inaktiveBeskjeder.some(forskuddTekst));

  useEffect(() => {
    if (harDagpengerSakNyligOppdatert) {
      skalViseForskuddLenke(setSkalViseForskudd);
    }
  }, [harDagpengerSakNyligOppdatert]);

  const loaded = isLoaded && (!harDagpengerSakNyligOppdatert || skalViseForskudd !== null);

  return (
    <div className={`korona-spesial${loaded ? ' korona-spesial--loaded' : ''}`}>
      {(harDagpengerSakNyligOppdatert && skalViseForskudd) && !harForskuddSoknad ? (
        <KoronaVarsel
          tittel={Config.LENKER.dagpengerForskudd.tittel}
          href={Config.LENKER.dagpengerForskudd.url}
          ingressId="korona.dagpenger-forskudd.ingress"
          className="blaa-bakgrunn"
        />
      ) : (
        <KoronaVarsel
          tittel={Config.LENKER.koronaBehandlingstid.tittel}
          href={Config.LENKER.koronaBehandlingstid.url}
          ingressId="korona.behandlingstid.ingress"
          className="blaa-bakgrunn"
        />
      )}
      <KoronaVarsel
        tittel={Config.LENKER.koronaVeiviser.tittel}
        href={Config.LENKER.koronaVeiviser.url}
        ingressId="korona.virus-varsel.ingress"
      />
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
