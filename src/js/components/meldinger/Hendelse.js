import React from 'react';
import '../../../less/components/Hendelser.less';
import PropTypes from 'prop-types';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import IkonOppgave from '../../../assets/IkonOppgave';
import IkonInnboks from '../../../assets/IkonInnboks';

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

const Hendelse = ({ eventId, uid, type, tekst, link, removeHendelse }) => {
  const erBeskjed = type === 'BESKJED';

  return (
    <>
      {
        erBeskjed ? (
          <PanelMedIkon
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={createOverskrift(tekst, erBeskjed)}
            onClick={() => removeHendelse(eventId, uid)}
            lenke={link}
            knapp
          >
            <IkonBeskjed />
          </PanelMedIkon>
        ) : (
          <LenkepanelMedIkon
            className="infomelding"
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={createOverskrift(tekst)}
            href={link}
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
  uid: PropTypes.string,
  type: PropTypes.string.isRequired,
  tekst: PropTypes.string.isRequired,
  link: PropTypes.string,
  removeHendelse: PropTypes.func.isRequired,
};

Hendelse.defaultProps = {
  uid: null,
  link: null,
};

export default Hendelse;
