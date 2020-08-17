import React from 'react';
import { func, bool } from 'prop-types';
import ModalWrapper from 'nav-frontend-modal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import IkonVeileder from '../../../assets/IkonVeileder';
import Config from '../../globalConfig';

const InnloggingsModal = ({ isOpen, onClick }) => (
  <ModalWrapper
    isOpen={isOpen}
    onRequestClose={onClick}
    closeButton={false}
    contentLabel="Innloggingsmodal"
    appElement={document.getElementById('app')}
  >
    <div className="modal-box">
      <Veilederpanel fargetema="advarsel" svg={IkonVeileder}>
        <div className="modal-box__tekst-container">
          <Undertittel>
            Du er i ferd med å bli logget ut
          </Undertittel>
          <Normaltekst>
            Du kan logge inn på nytt for å fortsette.
          </Normaltekst>
        </div>
      </Veilederpanel>
      <div className="modal-box__knapp-container">
        <a href={Config.dittNav.NAVNO_URL} className="modal-box__lenkeknapp knapp">
          <FormattedMessage id="innloggingsmodal.forside" />
        </a>
        <a href={Config.dittNav.LOGINSERVICE} className="modal-box__lenkeknapp knapp knapp--hoved">
          <FormattedMessage id="innloggingsmodal.logg.inn" />
        </a>
      </div>
    </div>
  </ModalWrapper>
);

InnloggingsModal.propTypes = {
  isOpen: bool.isRequired,
  onClick: func.isRequired,
};

export default InnloggingsModal;
