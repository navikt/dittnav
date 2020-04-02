import React from 'react';
import { bool } from 'prop-types';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
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

  if (erAktiv) {
    addInaktiv(beskjed, dispatch);
  }
};

const Beskjed = ({ beskjed, innlogging, erAktiv, erInaktiv }) => {
  const { dispatch } = useBeskjedStore();
  const sikkerhetsnivaa = useSikkerhetsnivaa(beskjed, 'beskjed', innlogging);

  if (beskjed.tekst.includes('forskudd') || sikkerhetsnivaa.skalMaskeres) {
    return null;
  }

  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Normaltekst" />;
  const lenkeTekst = sikkerhetsnivaa.skalMaskeres ? 'beskjed.lenke.stepup.tekst' : 'beskjed.lenke.tekst';

  const visKnapp = !(sikkerhetsnivaa.skalMaskeres || erInaktiv)
    && !beskjed.tekst.includes('forskudd');

  return (
    <PanelMedIkon
      className="beskjed"
      data-ga="Dittnav/Varsel"
      alt="Beskjed"
      overskrift={overskrift}
      onClick={() => onClickBeskjed(beskjed, dispatch, erAktiv)}
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
