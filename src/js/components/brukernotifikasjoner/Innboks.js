import React from 'react';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import {
  finnLenkeForSikkerhetsnivaa,
  finnTekstForSikkerhetsnivaa,
} from '../../utils/SikkerhetsNivaa';
import InnloggingType from '../../types/InnloggingType';
import InnboksType from '../../types/InnboksType';

const isLoading = (innboks, innlogging) => !innboks || !innlogging;

const Innboks = ({ innboks, innlogging }) => {
  if (isLoading(innboks, innlogging)) {
    return null;
  }

  const tekst = finnTekstForSikkerhetsnivaa(innboks, innlogging);
  const lenke = finnLenkeForSikkerhetsnivaa(innboks, innlogging);

  return (
    <LenkepanelMedIkon
      className="innboks"
      data-ga="Dittnav/Varsel"
      alt="Innboks"
      overskrift={<PanelOverskrift overskrift={tekst} type="Element" />}
      href={lenke}
      key={innboks.eventId}
    >
      <IkonInnboks />
    </LenkepanelMedIkon>
  );
};

Innboks.propTypes = {
  innboks: InnboksType,
  innlogging: InnloggingType,
};

Innboks.defaultProps = {
  innboks: null,
  innlogging: null,
};

export default Innboks;
