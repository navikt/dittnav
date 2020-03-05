import React from 'react';
import PropTypes from 'prop-types';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';

const Innboks = ({ innboks }) => (
  <LenkepanelMedIkon
    className="innboks"
    data-ga="Dittnav/Varsel"
    alt="Innboks"
    overskrift={<PanelOverskrift overskrift={innboks.tekst} type="Element" />}
    href={innboks.link}
    key={innboks.eventId}
  >
    <IkonInnboks />
  </LenkepanelMedIkon>
);

Innboks.propTypes = {
  innboks: PropTypes.shape({
    eventId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tekst: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
};

Innboks.defaultProps = {
  innboks: null,
};

export default Innboks;
