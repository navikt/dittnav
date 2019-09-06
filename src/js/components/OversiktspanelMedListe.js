import React from 'react';
import PropTypes from 'prop-types';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import HoyreChevron from 'nav-frontend-chevron';
import PanelBase from 'nav-frontend-paneler';

class OversiktspanelMedListe extends React.Component {
  render() {
    const { className, border, overskrift, ikon, headerLenkeTekst, headerLenkeHref, liste } = this.props;

    return (
      <PanelBase border={border} className={`oversiktspanel ${className}`}>
        <div className="oversiktspanel__header">
          <div className="oversiktspanel__overskrift">
            <div className="lenkepanel__ikon">
              {ikon}
            </div>
            <Undertittel>
              {overskrift}
            </Undertittel>
          </div>
          <Normaltekst className="oversiktspanel__header-lenketekst">
            <a href={headerLenkeHref} className="oversiktspanel__header-lenke" id="dekorator-bottomborder-overstyring">
              {headerLenkeTekst}
              <HoyreChevron className="oversiktspanel__chevron" />
            </a>
          </Normaltekst>
        </div>
        { liste && liste.length > 0
          ? (
            <>
              <div><hr /></div>
              <div className="oversiktspanel__liste">
                {liste}
              </div>
            </>
          )
          : null}
      </PanelBase>
    );
  }
}

OversiktspanelMedListe.propTypes = {
  className: PropTypes.string,
  border: PropTypes.bool,
  overskrift: PropTypes.node.isRequired,
  ikon: PropTypes.node.isRequired,
  headerLenkeTekst: PropTypes.string,
  headerLenkeHref: PropTypes.string,
  liste: PropTypes.arrayOf(PropTypes.node),
};

OversiktspanelMedListe.defaultProps = {
  className: '',
  headerLenkeTekst: '',
  headerLenkeHref: '',
  liste: [],
  border: true,
};

export default OversiktspanelMedListe;
