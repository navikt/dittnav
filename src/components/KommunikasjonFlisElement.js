import React from 'react';
import Lenke from 'nav-frontend-lenker';
import PropTypes from 'prop-types';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';

const KommunikasjonFlisElement = ({ className, Ikon, tittel, undertekst, linkUrl, onClick }) => (
  <div className={`kommunikasjon-flis-element ${className}`}>
    <Lenke className="kommunikasjon-flis-lenke" href={linkUrl} onClick={onClick}>
      <Undertittel>
        <Ikon />   
        <span className="kommunikasjon-flis-element-tittel">{tittel}</span>
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
  onClick: PropTypes.func.isRequired,

};

export default KommunikasjonFlisElement;
