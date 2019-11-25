import React from 'react';
import '../../../less/components/Hendelser.less';
import PropTypes from 'prop-types';
import { IkonInformasjon, IkonInnboks, IkonOppgave, LenkepanelMedIkon } from '../common/LenkepanelMedIkon';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';

const getHendelseIkon = (type) => {
  switch (type) {
    case 'INFORMASJON':
      return <IkonInformasjon />;
    case 'OPPGAVE':
      return <IkonOppgave />;
    case 'INNBOKS':
      return <IkonInnboks />;
    default:
      return null;
  }
};

const createOverskrift = (tekst) => (
  <PanelOverskrift overskrift={tekst} type="Element" />
);

const Hendelse = ({ id, type, tekst, link, removeHendelse }) => {
  const erInformasjon = type === 'INFORMASJON';

  return (
    <>
      {
        erInformasjon ? (
          <PanelMedIkon
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={createOverskrift(tekst)}
            ikon={<IkonInformasjon />}
            onClick={() => removeHendelse(id)}
            key={id}
          />
        ) : (
          <LenkepanelMedIkon
            className="infoMelding"
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={createOverskrift(tekst)}
            href={link}
            key={id}
          >
            {getHendelseIkon(type)}
          </LenkepanelMedIkon>
        )
      }
    </>
  );
};

Hendelse.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tekst: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  removeHendelse: PropTypes.func.isRequired,
};

export default Hendelse;
