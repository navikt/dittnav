import React from 'react';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useStore from '../../hooks/useStore';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import PanelOverskrift from '../common/PanelOverskrift';
import { postDigisosDone, postDone } from '../../Api';
import IkonBeskjed from '../../assets/IkonBeskjed';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import BeskjedType from '../../types/BeskjedType';
import { listOfActions, listOfComponentNames, logAmplitudeEvent } from '../../utils/amplitudeUtils';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';

const remove = (beskjed, removeBeskjed) => {
  if (beskjed.produsent === 'digiSos') {
    postDigisosDone({
      eventId: beskjed.eventId,
      grupperingsId: beskjed.grupperingsId,
    });
  } else {
    postDone({
      eventId: beskjed.eventId,
      uid: beskjed.uid,
    });
  }

  removeBeskjed(beskjed);
};

const addTilInaktiveHvisErAktiv = (beskjed, addInaktivBeskjed, erAktiv) => {
  if (erAktiv) {
    addInaktivBeskjed(beskjed);
  }
};

const Beskjed = ({ beskjed, innloggingsstatus, erAktiv }) => {
  const { removeBeskjed, addInaktivBeskjed, visInnloggingsModal } = useStore();

  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innloggingsstatus);
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const overskriftInnlogging = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="LoginLenke" />;
  
  const handleArkiverBeskjed = (skalMaskeres) => {
    if (skalMaskeres) {
      logAmplitudeEvent(listOfComponentNames.brukernotifikasjon.BeskjedMottatt, listOfActions.LoggInn);
      return;
    }

    remove(beskjed, removeBeskjed, visInnloggingsModal);
    addTilInaktiveHvisErAktiv(beskjed, addInaktivBeskjed, erAktiv);
    logAmplitudeEvent(listOfComponentNames.brukernotifikasjon.BeskjedMottatt, listOfActions.TrykkPaaArkiverKnapp);
  };
  
  return (
    <LenkepanelMedIkon
      className="beskjed"
      alt="Beskjed"
      overskrift={sikkerhetsnivaa.skalMaskeres ? overskriftInnlogging : overskrift}
      etikett={lokalDatoTid}
      href={sikkerhetsnivaa.lenke}
      sikkerhetsnivaa={sikkerhetsnivaa}
      onClick={handleArkiverBeskjed}
      amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
      amplitudeComponentName={listOfComponentNames.brukernotifikasjon.BeskjedMottatt}
    >
      <IkonBeskjed />
    </LenkepanelMedIkon>
  );
};

Beskjed.propTypes = {
  beskjed: BeskjedType,
  innloggingsstatus: InnloggingsstatusType,
  erAktiv: bool,
};

Beskjed.defaultProps = {
  beskjed: null,
  innloggingsstatus: null,
  erAktiv: false,
};

export default Beskjed;
