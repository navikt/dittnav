import React from 'react';
import { func, bool } from 'prop-types';
import ModalWrapper from 'nav-frontend-modal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import IkonVeileder from '../../../assets/IkonVeileder';

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
        <a href="#som-lenke" className="modal-box__lenkeknapp knapp">
          Gå til forsiden på nav.no
        </a>
        <a href="#som-lenke" className="modal-box__lenkeknapp knapp knapp--hoved">
          Logg inn på nytt
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
