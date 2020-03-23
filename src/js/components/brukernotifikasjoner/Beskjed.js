import React, { useContext } from 'react';
import { arrayOf } from 'prop-types';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import Api from '../../Api';
import {
  finnTekstForSikkerhetsnivaa,
  finnLenkeForSikkerhetsnivaa,
  finnLenkeTekstIdForSikkerhetsnivaa,
  skalMaskeres,
} from '../../utils/Sikkerhetsnivaa';
import BeskjedContext from '../../context/BeskjedContext';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';

const Beskjed = ({ beskjed, beskjeder, innlogging }) => {
  const updateBeskjeder = useContext(BeskjedContext);
  const erMaskert = skalMaskeres(beskjed, innlogging);
  const tekst = finnTekstForSikkerhetsnivaa(beskjed, 'beskjed', innlogging);
  const lenke = finnLenkeForSikkerhetsnivaa(beskjed, innlogging);
  const lenkeTekstId = finnLenkeTekstIdForSikkerhetsnivaa(beskjed, innlogging);

  const removeHendelse = (eventId, uid) => {
    updateBeskjeder(beskjeder.filter(b => eventId !== b.eventId));

    Api.postDone({
      eventId,
      uid,
    });
  };

  return (
    <PanelMedIkon
      className="beskjed"
      data-ga="Dittnav/Varsel"
      alt="Beskjed"
      overskrift={<PanelOverskrift overskrift={tekst} type="Normaltekst" />}
      onClick={() => removeHendelse(beskjed.eventId, beskjed.uid)}
      lenke={lenke}
      lenkeTekstId={lenkeTekstId}
      knapp={!erMaskert}
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
