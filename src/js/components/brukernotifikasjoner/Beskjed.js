import React from 'react';
import { useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useStore from '../../hooks/useStore';
import transformTolokalDatoTid from '../../utils/DatoUtils';
import PanelMedIkon from '../common/PanelMedIkon';
import Api from '../../Api';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import BeskjedType from '../../types/BeskjedType';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../../utils/GoogleAnalytics';

const remove = (beskjed, removeBeskjed, visInnloggingsModal) => {
  Api.postDone({
    eventId: beskjed.eventId,
    uid: beskjed.uid,
  }).then((headers) => {
    if (Api.tokenExpiresSoon(headers)) {
      visInnloggingsModal();
    }
  });
  removeBeskjed(beskjed);
};

const addTilInaktiveHvisErAktiv = (beskjed, addInaktivBeskjed, erAktiv) => {
  if (erAktiv) {
    addInaktivBeskjed(beskjed);
    window.location.hash = '';
  }
};

const onClickBeskjed = (beskjed, removeBeskjed, addInaktivBeskjed, visInnloggingsModal, erAktiv) => {
  remove(beskjed, removeBeskjed, visInnloggingsModal);
  addTilInaktiveHvisErAktiv(beskjed, addInaktivBeskjed, erAktiv);
  trackEvent(GoogleAnalyticsCategory.Forside, GoogleAnalyticsAction.BeskjedLukk, '');
};

const Beskjed = ({ beskjed, innloggingsstatus, erAktiv, erInaktiv }) => {
  const location = useLocation();
  const { removeBeskjed, addInaktivBeskjed, visInnloggingsModal } = useStore();

  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innloggingsstatus);
  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv);

  return (
    <PanelMedIkon
      className="beskjed"
      alt="Beskjed"
      overskrift={sikkerhetsnivaa.tekst}
      etikett={lokalDatoTid}
      onClick={() => onClickBeskjed(beskjed, removeBeskjed, addInaktivBeskjed, visInnloggingsModal, erAktiv)}
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
