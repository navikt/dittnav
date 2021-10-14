import React from 'react';
import Lenke from 'nav-frontend-lenker';
import PropTypes from 'prop-types';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

const KommunikasjonFlisElement = ({ className, Ikon, tittel, undertekst, linkUrl }) => (
  <div className={`KommunikasjonFlis-element ${className}`}>
    <Lenke className="KommunikasjonFlis-lenke" href={linkUrl}>
      <Undertittel>
        <Ikon />   
        <span className="KommunikasjonFlis-element-tittel">{tittel}</span>
      </Undertittel>   

      <Undertekst>
        {undertekst}
      </Undertekst>                  
    </Lenke>

  </div>
);

KommunikasjonFlisElement.propTypes = {
  className: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  Ikon: PropTypes.elementType.isRequired,
  tittel: PropTypes.node.isRequired,
  undertekst: PropTypes.node.isRequired,

};

export default KommunikasjonFlisElement;
