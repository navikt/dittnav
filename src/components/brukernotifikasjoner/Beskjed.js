import React, { useState } from 'react';
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
import PanelMedIkon from '../common/PanelMedIkon';

const remove = (beskjed, removeBeskjed, harIkkeLenke) => {
  if (beskjed.produsent === 'digiSos') {
    postDigisosDone({
      eventId: beskjed.eventId,
      grupperingsId: beskjed.grupperingsId,
    });
  } else {
    postDone({
      eventId: beskjed.eventId,
    });
  }

  if (!harIkkeLenke) {
    return;
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
  const [isBeingRemoved, setIsBeingRemoved] = useState(false);

  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innloggingsstatus);
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);
  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const harIkkeLenke = beskjed.link === null || beskjed.link === "";
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const overskriftInnlogging = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="LoginLenke" />;

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv);

  const handleArkiverBeskjed = (skalMaskeres) => {
    if (skalMaskeres) {
      logAmplitudeEvent(listOfComponentNames.brukernotifikasjon.BeskjedMottatt, listOfActions.LoggInn);
      return;
    }

    remove(beskjed, removeBeskjed, harIkkeLenke);
    addTilInaktiveHvisErAktiv(beskjed, addInaktivBeskjed, erAktiv);
    logAmplitudeEvent(listOfComponentNames.brukernotifikasjon.BeskjedMottatt, listOfActions.TrykkPaaArkiverKnapp);
  };

  const onClickBeskjed = () => {
    setIsBeingRemoved(true);
  };

  const onAnimationEnd = () => {
    handleArkiverBeskjed();
  };
  return (
    <>
      { !harIkkeLenke 
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
