import React from 'react';
import { arrayOf } from 'prop-types';
import { useIntl } from 'react-intl';
import sikkerhetsContext from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import InnboksType from '../../types/InnboksType';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import { lenker } from '../../utils/lenker';
import { listOfActions, listOfComponentNames } from '../../utils/amplitudeUtils';

const Innboks = ({ innbokser, innloggingsstatus }) => {
  const intl = useIntl();

  if (innbokser.length === 0) {
    return null;
  }

  const sikkerhetsnivaa = sikkerhetsContext(innbokser[0], 'innboks', innloggingsstatus);
  const gruppert = innbokser.length > 1;
  const gruppertTekst = intl.formatMessage({ id: 'innboks.flere.meldinger' }, { count: innbokser.length });
  const overskrift = <PanelOverskrift overskrift={gruppert ? gruppertTekst : sikkerhetsnivaa.tekst} type="Element" />;
  const lokalDatoTid = transformTolokalDatoTid(innbokser[0].eventTidspunkt);

  return (
    <LenkepanelMedIkon
      className="innboks-notifikasjon"
      alt="Innboks"
      overskrift={overskrift}
      etikett={gruppert ? null : lokalDatoTid}
      href={gruppert ? lenker.minInnboks.url : sikkerhetsnivaa.lenke}
      amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
      amplitudeComponentName={listOfComponentNames.brukernotifikasjon.InnboksMeldingOppsummering}
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
