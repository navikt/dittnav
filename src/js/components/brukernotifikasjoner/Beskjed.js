import React, { useEffect } from 'react';
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

const remove = (beskjed, dispatch) => dispatch({
  type: REMOVE_BESKJED,
  payload: beskjed,
});

const addInaktiv = (beskjed, dispatch) => dispatch({
  type: ADD_INAKTIV_BESKJED,
  payload: beskjed,
});

const onClickBeskjed = (beskjed, dispatch, erAktiv) => {
  remove(beskjed, dispatch);
  hotjarTrigger('beskjed_trykket_ok');

  if (erAktiv) {
    addInaktiv(beskjed, dispatch);
  }
};

const Beskjed = ({ beskjed, innlogging, erAktiv, erInaktiv }) => {
  const { dispatch } = useBeskjedStore();
  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innlogging);

  useEffect(() => {
    hotjarSafetyStub();
  }, []);

  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';
  const lokalDatoTid = transformTolokalDatoTid(beskjed.eventTidspunkt);

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv)

  return (
    <PanelMedIkon
      className="beskjed"
      data-ga="Dittnav/Varsel"
      alt="Beskjed"
      overskrift={sikkerhetsnivaa.tekst}
      etikett={lokalDatoTid}
      onClick={() => onClickBeskjed(beskjed, dispatch, erAktiv)}
      skjermleserTekst="beskjed.knapp.skjermleser.tekst"
      lenke={sikkerhetsnivaa.lenke}
      lenkeTekst={lenkeTekst}
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
};

Beskjed.defaultProps = {
  beskjed: null,
  innlogging: null,
  erAktiv: false,
  erInaktiv: false,
};

export default Beskjed;
