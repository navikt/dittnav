import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { arrayOf } from 'prop-types';
import { KoronaVarsel } from './KoronaVarsel';
import { getForskuddToggle } from './DagpengerForskuddToggle';
import Config from '../../globalConfig';
import SakstemaType from '../../types/SakstemaType';
import BeskjedType from '../../types/BeskjedType';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const visForskuddLenkeFra = '01-03-2020';
const harForskuddBeskjed = beskjeder => beskjeder && beskjeder
  .some(beskjed => beskjed.tekst.toLowerCase().includes('forskudd på dagpenger'));

const KoronaSpesial = ({ sakstema, beskjeder, inaktiveBeskjeder, isLoaded }) => {
  const [forskuddToggle, setForskuddToggle] = useState(null);

  const harDagpengerSakNyligOppdatert = sakstema && sakstema.sakstemaList && sakstema.sakstemaList
    .some(tema => tema.temakode === 'DAG'
      && moment(tema.sisteOppdatering).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY')));

  useEffect(() => {
    if (harDagpengerSakNyligOppdatert) {
      getForskuddToggle(setForskuddToggle);
    }
  }, [harDagpengerSakNyligOppdatert]);

  const harForskuddSoknadKvittering = harForskuddBeskjed(beskjeder)
    || harForskuddBeskjed(inaktiveBeskjeder);

  const venstreLenke = forskuddToggle
    ? Config.LENKER.dagpengerForskudd
    : Config.LENKER.koronaBehandlingstid

  const venstreTekst = !forskuddToggle
    ? 'korona.behandlingstid.ingress'
    : (harForskuddSoknadKvittering
      ? 'korona.dagpenger-forskudd.ingress.runde2'
      : 'korona.dagpenger-forskudd.ingress');

  const loaded = isLoaded && (!harDagpengerSakNyligOppdatert || forskuddToggle !== null);

  return (
    <div className={`korona-spesial${loaded ? ' korona-spesial--loaded' : ''}`}>
      <KoronaVarsel
        tittel={venstreLenke.tittel}
        href={venstreLenke.url}
        className="blaa-bakgrunn"
      >
        <Normaltekst>
          <FormattedMessage id={venstreTekst} />
        </Normaltekst>
      </KoronaVarsel>
      <KoronaVarsel
        tittel={Config.LENKER.koronaVeiviser.tittel}
        href={Config.LENKER.koronaVeiviser.url}
      >
        <Normaltekst>
          <FormattedMessage id={'korona.virus-varsel.ingress'} />
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
