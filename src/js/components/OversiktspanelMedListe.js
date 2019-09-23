import React from 'react';
import PropTypes from 'prop-types';

import HoyreChevron from 'nav-frontend-chevron';
import PanelBase from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';

class OversiktspanelMedListe extends React.Component {
  render() {
    const { className, border, overskrift, ikon, headerLenkeTekst, headerLenkeHref, liste } = this.props;

    return (
      <PanelBase border={border} className={`oversiktspanel ${className}`}>
        <div className="oversiktspanel__header">
          <div className="oversiktspanel__overskrift">
            { ikon
              ? (
                <div className="lenkepanel__ikon">
                  {ikon}
                </div>
              )
              : null}
            <Systemtittel>
              {overskrift}
            </Systemtittel>
          </div>
          <div>
            <Lenke href={headerLenkeHref} className="oversiktspanel__header-lenke" id="dekorator-bottomborder-overstyring">
              <Normaltekst>
                {headerLenkeTekst}
                <HoyreChevron id="oversiktspanel__chevron" />
              </Normaltekst>
            </Lenke>
          </div>
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
  ikon: PropTypes.node,
  headerLenkeTekst: PropTypes.node,
  headerLenkeHref: PropTypes.string,
  liste: PropTypes.arrayOf(PropTypes.node),
};

OversiktspanelMedListe.defaultProps = {
  className: '',
  ikon: null,
  headerLenkeTekst: '',
  headerLenkeHref: '',
  liste: [],
  border: true,
};

export default OversiktspanelMedListe;
