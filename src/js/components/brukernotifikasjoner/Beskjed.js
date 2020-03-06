import React, { useContext } from 'react';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import Api from '../../Api';
import {
  finnTekstForSikkerhetsnivaa,
  finnLenkeForSikkerhetsnivaa,
  harSensitivTekst,
} from '../../utils/SikkerhetsNivaa';
import HendelseContext from '../../context/HendelseContext';
import HendelserType from '../../types/HendelserType';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';

const isLoading = (beskjed, hendelser, innlogging) => !beskjed || !hendelser || !innlogging;

const Beskjed = ({ beskjed, hendelser, innlogging }) => {
  if (isLoading(beskjed, hendelser, innlogging)) {
    return null;
  }

  const updateHendelser = useContext(HendelseContext);
  const tekst = finnTekstForSikkerhetsnivaa(beskjed, innlogging);
  const lenke = finnLenkeForSikkerhetsnivaa(beskjed, innlogging);

  const removeHendelse = (eventId, uid) => {
    updateHendelser(hendelser.filter(h => eventId !== h.eventId));

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
      key={beskjed.eventId}
      lenke={lenke}
      knapp={!harSensitivTekst(beskjed, innlogging)}
    >
      <IkonBeskjed />
    </PanelMedIkon>
  );
};

Beskjed.propTypes = {
  beskjed: BeskjedType,
  hendelser: HendelserType,
  innlogging: InnloggingType,
};

Beskjed.defaultProps = {
  beskjed: null,
  hendelser: null,
  innlogging: null,
};

export default Beskjed;
