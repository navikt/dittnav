import React, { useContext } from 'react';
import { arrayOf } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import Api from '../../Api';
import BeskjedContext from '../../context/BeskjedContext';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';

const removeHendelse = (beskjeder, updateBeskjeder, eventId, uid) => {
  updateBeskjeder(beskjeder.filter(b => eventId !== b.eventId));

  Api.postDone({
    eventId,
    uid,
  });
};

const Beskjed = ({ beskjed, beskjeder, innlogging }) => {
  const updateBeskjeder = useContext(BeskjedContext);
  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innlogging);

  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Normaltekst" />;
  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';

  return (
    <PanelMedIkon
      className="beskjed"
      data-ga="Dittnav/Varsel"
      alt="Beskjed"
      overskrift={overskrift}
      onClick={() => removeHendelse(beskjeder,
        updateBeskjeder,
        beskjed.eventId,
        beskjed.uid)}
      lenke={sikkerhetsnivaa.lenke}
      lenkeTekst={lenkeTekst}
      knapp={!sikkerhetsnivaa.skalMaskeres}
    >
      <IkonBeskjed />
    </PanelMedIkon>
  );
};

Beskjed.propTypes = {
  beskjed: BeskjedType,
  beskjeder: arrayOf(BeskjedType),
  innlogging: InnloggingType,
};

Beskjed.defaultProps = {
  beskjed: null,
  beskjeder: null,
  innlogging: null,
};

export default Beskjed;
