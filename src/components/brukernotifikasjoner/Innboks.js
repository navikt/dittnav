import React from 'react';
import { arrayOf } from 'prop-types';
import { useIntl } from 'react-intl';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import InnboksType from '../../types/InnboksType';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import { lenker } from '../../utils/lenker';

const Innboks = ({ innbokser, innloggingsstatus }) => {
  const intl = useIntl();
  const sikkerhetsnivaa = useSikkerhetsnivaa(innbokser[0], 'innboks', innloggingsstatus);
  const gruppert = innbokser.length > 1;
  const gruppertTekst = intl.formatMessage({ id: 'innboks.flere.meldinger' }, { count: innbokser.length });
  const overskrift = <PanelOverskrift overskrift={gruppert ? gruppertTekst : sikkerhetsnivaa.tekst} type="Element" />;
  const lokalDatoTid = transformTolokalDatoTid(innbokser[0].eventTidspunkt);

  return (
    <LenkepanelMedIkon
      className="innboks"
      alt="Innboks"
      overskrift={overskrift}
      etikett={gruppert ? null : lokalDatoTid}
      href={gruppert ? lenker.minInnboks : sikkerhetsnivaa.lenke}
    >
      <IkonInnboks />
    </LenkepanelMedIkon>
  );
};

Innboks.propTypes = {
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

Innboks.defaultProps = {
  innbokser: null,
  innloggingsstatus: null,
};

export default Innboks;
