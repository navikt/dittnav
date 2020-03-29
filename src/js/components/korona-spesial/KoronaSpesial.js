import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SakstemaType from "../../types/SakstemaType";
import { KoronaVarsel } from "./KoronaVarsel";
import Config from "../../globalConfig";
import BeskjedType from "../../types/BeskjedType";

const KoronaSpesial = ({ sakstema, beskjeder, isLoaded }) => {
  const naaTid = moment();
  const harDagpengerSakSiste14Dager = sakstema && sakstema.sakstemaList
    .some(tema =>
      tema.temakode === 'DAG' &&
      naaTid.diff(moment(tema.sisteOppdatering), 'days') <= 14
    );
  // TODO: finn ut hva jeg kan sjekke på her av tekst/id
  const harForskuddSoknad = beskjeder && beskjeder.some(beskjed => beskjed.tekst.includes("Forskudd på dagpenger"));

  return (
    <div className={`korona-spesial${isLoaded ? ' korona-spesial--loaded' : ''}`}>
      {harDagpengerSakSiste14Dager || harForskuddSoknad ? (
        <KoronaVarsel
          tittel={Config.LENKER.dagpengerForskudd.tittel}
          href={Config.LENKER.dagpengerForskudd.url}
          ingressId={"korona.dagpenger-forskudd.ingress"}
          className={"blaa-bakgrunn"}
        />
      ) : (
        <KoronaVarsel
          tittel={Config.LENKER.koronaBehandlingstid.tittel}
          href={Config.LENKER.koronaBehandlingstid.url}
          ingressId={"korona.behandlingstid.ingress"}
          className={"blaa-bakgrunn"}
        />
      )}
      <KoronaVarsel
        tittel={Config.LENKER.koronaVeiviser.tittel}
        href={Config.LENKER.koronaVeiviser.url}
        ingressId={"korona.virus-varsel.ingress"}
      />
    </div>
  );
};

KoronaSpesial.propTypes = {
  sakstema: SakstemaType,
  beskjeder: PropTypes.arrayOf(BeskjedType),
};

KoronaSpesial.defaultProps = {
  sakstema: null,
  beskjeder: null,
};

export default KoronaSpesial;
