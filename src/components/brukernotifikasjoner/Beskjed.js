import React, { useState } from 'react';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useStore from '../../hooks/useStore';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import { postDigisosDone, postDone } from '../../Api';
import IkonBeskjed from '../../assets/IkonBeskjed';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import BeskjedType from '../../types/BeskjedType';
import { listOfActions, listOfComponentNames, logAmplitudeEvent } from '../../utils/amplitudeUtils';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

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

const Beskjed = ({ beskjed, innloggingsstatus, erAktiv, erInaktiv }) => {
  const { removeBeskjed, addInaktivBeskjed, visInnloggingsModal } = useStore();

  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innloggingsstatus);
  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const overskriftInnlogging = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="LoginLenke" />;
  
  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv);

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
    <>
      { true
        ? (
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
        )
        : (
          <PanelMedIkon
            className={isBeingRemoved ? 'remove beskjed' : 'beskjed'}
            alt="Beskjed"
            overskrift={sikkerhetsnivaa.tekst}
            etikett={lokalDatoTid}
            onClick={() => onClickBeskjed()}
            onAnimationEnd={onAnimationEnd}
            skjermleserTekst="beskjed.knapp.skjermleser.tekst"
            lenke={sikkerhetsnivaa.lenke}
            lenkeTekst={lenkeTekst}
            amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
            amplitudeComponentName={listOfComponentNames.brukernotifikasjon.BeskjedMottatt}
            knapp={visKnapp}
          >
            <IkonBeskjed />
          </PanelMedIkon>
        )}
    </>
  );
};

Beskjed.propTypes = {
  beskjed: BeskjedType,
  innloggingsstatus: InnloggingsstatusType,
  erAktiv: bool,
  erInaktiv: bool,
};

Beskjed.defaultProps = {
  beskjed: null,
  innloggingsstatus: null,
  erAktiv: false,
  erInaktiv: false,
};

export default Beskjed;
