import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import Api from '../../Api';
import Config from '../../globalConfig';
import HendelseContext from '../../context/HendelseContext';
import HendelserType from '../../types/HendelserType';

const Beskjed = ({ beskjed, hendelser }) => {
  const updateHendelser = useContext(HendelseContext);

  const removeHendelse = (eventId) => {
    updateHendelser(hendelser.filter(h => eventId !== h.eventId));

    Api.postHendelser(
      `${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/done`,
      {
        eventId,
      },
    );
  };

  return (
    <PanelMedIkon
      className="beskjed"
      data-ga="Dittnav/Varsel"
      alt="Beskjed"
      overskrift={<PanelOverskrift overskrift={beskjed.tekst} type="Normaltekst" />}
      onClick={() => removeHendelse(beskjed.eventId)}
      key={beskjed.eventId}
      lenke={beskjed.link}
      knapp
    >
      <IkonBeskjed />
    </PanelMedIkon>
  );
};

Beskjed.propTypes = {
  beskjed: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tekst: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
  hendelser: HendelserType,
};

Beskjed.defaultProps = {
  beskjed: null,
  hendelser: null,
};

export default Beskjed;
