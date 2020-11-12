import React from 'react';
import { func, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ModalWrapper from 'nav-frontend-modal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import IkonVeileder from '../../assets/IkonVeileder';
import { NAV_NO_URL, Innlogging } from '../../constants';

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
            <FormattedMessage id="innloggingsmodal.tittel" />
          </Undertittel>
          <Normaltekst>
            <FormattedMessage id="innloggingsmodal.ingress" />
          </Normaltekst>
        </div>
      </Veilederpanel>
      <div className="modal-box__knapp-container">
        <a href={NAV_NO_URL} className="modal-box__lenkeknapp knapp">
          <FormattedMessage id="innloggingsmodal.forside" />
        </a>
        <a href={Innlogging.LOGINSERVICE_URL} className="modal-box__lenkeknapp knapp knapp--hoved">
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
