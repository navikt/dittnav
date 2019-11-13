import React from 'react';
import PropTypes from 'prop-types';
import { IkonInformasjon, LenkepanelMedIkon } from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';

const HendelseTestGui = ({ hendelse }) => (
  <LenkepanelMedIkon
    className="info-lenkepanel-test"
    href={hendelse.link}
    overskrift={<PanelOverskrift overskrift={hendelse.tekst} type="Element" />}
  >
    <IkonInformasjon />
  </LenkepanelMedIkon>
);

HendelseTestGui.propTypes = {
  hendelse: PropTypes.shape({
    tekst: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};

HendelseTestGui.defaultProps = {
  hendelse: {},
};

export default HendelseTestGui;
