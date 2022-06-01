import React from 'react';
import { objectOf, any, string } from 'prop-types';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { formattedMessage } from '../../../utils/tidslinje';
import IkonInformasjon from '../../../assets/IkonInformasjon';
import IkonAdvarsel from '../../../assets/IkonAdvarsel';
import IkonStatus from '../../../assets/IkonStatus';
import { transformTolokalDatoTid } from '../../../utils/datoUtils';

const tidslinjeText = (notifikasjon) => ({
  SENDT: formattedMessage('tidslinje.status.sendt'),
  MOTTATT: formattedMessage('tidslinje.status.mottatt'),
  UNDER_BEHANDLING: formattedMessage('tidslinje.status.under.behandling'),
  FERDIG: formattedMessage('tidslinje.status.ferdig'),
}[notifikasjon.statusGlobal] || notifikasjon.tekst);

const tidslinjeIcon = (type) => ({
  Beskjed: <IkonInformasjon />,
  Oppgave: <IkonAdvarsel />,
  Statusoppdatering: <IkonStatus />,
}[type]);

const SekvensMedIkon = ({ notifikasjon, className }) => (
  <div className={className}>
    <div className={`${className}__ikon`}>
      {tidslinjeIcon(notifikasjon.eventtype)}
    </div>
    <div className={`${className}__tekst`}>
      <Normaltekst>
        {tidslinjeText(notifikasjon)}
      </Normaltekst>
      <Undertekst>
        {transformTolokalDatoTid(notifikasjon.forstBehandlet)}
      </Undertekst>
    </div>
  </div>
);

SekvensMedIkon.propTypes = {
  notifikasjon: objectOf(any),
  className: string,
};

SekvensMedIkon.defaultProps = {
  notifikasjon: null,
  className: null,
};

export default SekvensMedIkon;
