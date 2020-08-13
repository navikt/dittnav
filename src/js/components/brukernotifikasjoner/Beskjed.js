import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import { hotjarTrigger, hotjarSafetyStub } from '../../utils/Hotjar';
import transformTolokalDatoTid from '../../utils/DatoUtils';
import PanelMedIkon from '../common/PanelMedIkon';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import { REMOVE_BESKJED, ADD_INAKTIV_BESKJED } from '../../types/Actions';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';
import {
  GoogleAnalyticsAction,
  GoogleAnalyticsCategory,
  trackEvent,
} from '../../utils/GoogleAnalytics';
import InnloggingsModal from '../common/InnloggingsModal';
import useModal from '../../hooks/useModal';

const remove = (beskjed, dispatch) => {
  // TODO : do api call. When ready, dispatch a new action with headers as payload
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

const Beskjed = ({ beskjed, innlogging, erAktiv, erInaktiv, tokenExpiresSoon }) => {
  const [visModal, toggleModal, handleModal] = useModal();
  const location = useLocation();
  const { dispatch } = useBeskjedStore();
  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innlogging);

  useEffect(() => {
    hotjarSafetyStub();
  }, []);

  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv);

  if (tokenExpiresSoon) {
    return (
      <InnloggingsModal isOpen onClick={handleModal} />
    );
  }

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
  innlogging: InnloggingType,
  erAktiv: bool,
  erInaktiv: bool,
  tokenExpiresSoon: bool.isRequired,
};

Beskjed.defaultProps = {
  beskjed: null,
  innlogging: null,
  erAktiv: false,
  erInaktiv: false,
};

export default Beskjed;
