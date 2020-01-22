import React from 'react';
import '../../../less/components/Hendelser.less';
import PropTypes from 'prop-types';
import { IkonBeskjed, IkonInnboks, IkonOppgave, LenkepanelMedIkon } from '../common/LenkepanelMedIkon';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';

const getHendelseIkon = (type) => {
  switch (type) {
    case 'BESKJED':
      return <IkonBeskjed />;
    case 'OPPGAVE':
      return <IkonOppgave />;
    case 'INNBOKS':
      return <IkonInnboks />;
    default:
      return null;
  }
};

const createOverskrift = (tekst, erBeskjed) => {
  const overskriftType = erBeskjed ? 'Normaltekst' : 'Element';

  return (
    <PanelOverskrift overskrift={tekst} type={overskriftType} />
  );
};

const Hendelse = ({ eventId, type, tekst, link, removeHendelse }) => {
  const erBeskjed = type === 'BESKJED';

  return (
    <>
      {
        erBeskjed ? (
          <PanelMedIkon
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={createOverskrift(tekst, erBeskjed)}
            ikon={<IkonBeskjed />}
            onClick={() => removeHendelse(eventId)}
            key={eventId}
            lenke={link}
            knapp
          />
        ) : (
          <LenkepanelMedIkon
            className="infomelding"
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={createOverskrift(tekst)}
            href={link}
            key={eventId}
          >
            {getHendelseIkon(type)}
          </LenkepanelMedIkon>
        )
      }
    </>
  );
};

Hendelse.propTypes = {
  eventId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tekst: PropTypes.string.isRequired,
  link: PropTypes.string,
  removeHendelse: PropTypes.func.isRequired,
};

Hendelse.defaultProps = {
  link: null,
};

export default Hendelse;
