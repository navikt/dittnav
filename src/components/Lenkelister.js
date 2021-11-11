import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';
import { listOfActions, logLenkeTrykkAmplitude } from '../utils/amplitudeUtils';

const Lenkelister = (props) => (
  <div className="flere-tjenester">
    <nav className="flere-tjenester__links">
      {props.links.map(l => (
        <div className="flere-tjenester__link-container" key={l.url}>
          <Normaltekst>
            <a
              href={l.url}
              className="lenke flere-tjenester__link"
              onClick={() => logLenkeTrykkAmplitude(l.tittel, listOfActions.TrykkPaaLenkeliste)}
            >
              {l.tittel}
            </a>
          </Normaltekst>
        </div>
      ))}
    </nav>
  </div>
);

Lenkelister.propTypes = {
  links: arrayOf(shape({
    url: string.isRequired,
    tittel: string.isRequired,
  })),
};

Lenkelister.defaultProps = {
  links: [],
};

export default Lenkelister;
