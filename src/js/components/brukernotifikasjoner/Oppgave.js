import React from 'react';
import PropTypes from 'prop-types';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';

const Oppgave = ({ oppgave }) => (
  <LenkepanelMedIkon
    className="oppgave"
    data-ga="Dittnav/Varsel"
    alt="Oppgave"
    overskrift={<PanelOverskrift overskrift={oppgave.tekst} type="Element" />}
    href={oppgave.link}
    key={oppgave.eventId}
  >
    <IkonOppgave />
  </LenkepanelMedIkon>
);

Oppgave.propTypes = {
  oppgave: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tekst: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
};

Oppgave.defaultProps = {
  oppgave: null,
};

export default Oppgave;
