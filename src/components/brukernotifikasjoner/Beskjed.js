import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useStore from '../../hooks/useStore';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import PanelMedIkon from '../common/PanelMedIkon';
import { postDigisosDone, postDone } from '../../Api';
import IkonBeskjed from '../../assets/IkonBeskjed';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import BeskjedType from '../../types/BeskjedType';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../../utils/googleAnalytics';

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
  const location = useLocation();
  const { removeBeskjed, addInaktivBeskjed, visInnloggingsModal } = useStore();
  const [isBeingRemoved, setIsBeingRemoved] = useState(false);

  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innloggingsstatus);
  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv);
  const onClickBeskjed = () => {
    setIsBeingRemoved(true);
  };

  const handleArkiverBeskjed = () => {
    remove(beskjed, removeBeskjed, visInnloggingsModal);
    addTilInaktiveHvisErAktiv(beskjed, addInaktivBeskjed, erAktiv);
    trackEvent(GoogleAnalyticsCategory.Forside, GoogleAnalyticsAction.BeskjedLukk, '');
  };

  const onAnimationEnd = () => {
    handleArkiverBeskjed();
  };
  
  return (
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
      gaCategory={`Ditt NAV${location.pathname}`}
      gaAction={GoogleAnalyticsAction.Beskjed}
      knapp={visKnapp}
    >
      <IkonBeskjed />
    </PanelMedIkon>
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
