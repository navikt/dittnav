import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import { hotjarTrigger, hotjarSafetyStub } from '../../utils/Hotjar';
import transformTolokalDatoTid from '../../utils/DatoUtils';
import PanelMedIkon from '../common/PanelMedIkon';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import { REMOVE_BESKJED, ADD_INAKTIV_BESKJED, VIS_INNLOGGINGSMODAL } from '../../types/Actions';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import BeskjedType from '../../types/BeskjedType';
import {
  GoogleAnalyticsAction,
  GoogleAnalyticsCategory,
  trackEvent,
} from '../../utils/GoogleAnalytics';
import Api from '../../Api';

const remove = (beskjed, dispatch) => {
  Api.postDone({
    eventId: beskjed.eventId,
    uid: beskjed.uid,
  }).then((headers) => {
    if (Api.tokenExpiresSoon(headers)) {
      dispatch({
        type: VIS_INNLOGGINGSMODAL,
        payload: true,
      });
    }
  });
  dispatch({
    type: REMOVE_BESKJED,
    payload: beskjed,
  });
};

const addInaktiv = (beskjed, dispatch) => dispatch({
  type: ADD_INAKTIV_BESKJED,
  payload: beskjed,
});

const addTilInaktiveHvisErAktiv = (beskjed, dispatch, erAktiv) => {
  if (erAktiv) {
    addInaktiv(beskjed, dispatch);
    window.location.hash = '';
  }
};

const onClickBeskjed = (beskjed, dispatch, erAktiv) => {
  remove(beskjed, dispatch);
  addTilInaktiveHvisErAktiv(beskjed, dispatch, erAktiv);
  hotjarTrigger('beskjed_trykket_ok');
  trackEvent(GoogleAnalyticsCategory.Forside, GoogleAnalyticsAction.BeskjedLukk, '');
};

const Beskjed = ({ beskjed, innloggingsstatus, erAktiv, erInaktiv }) => {
  const location = useLocation();
  const { dispatch } = useBeskjedStore();
  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innloggingsstatus);

  useEffect(() => {
    hotjarSafetyStub();
  }, []);

  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv);

  return (
    <PanelMedIkon
      className="beskjed"
      alt="Beskjed"
      overskrift={sikkerhetsnivaa.tekst}
      etikett={lokalDatoTid}
      onClick={() => onClickBeskjed(beskjed, dispatch, erAktiv)}
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
