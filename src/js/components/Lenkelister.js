import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/GoogleAnalytics';

const Lenkelister = (props) => (
  <div className="flere-tjenester">
    <nav className="flere-tjenester__links">
      {props.links.map(l => (
        <div className="flere-tjenester__link-container" key={l.url}>
          <Normaltekst>
            <a
              href={l.url}
              data-ga="Dittnav/Lenkeliste"
              className="lenke flere-tjenester__link"
              onClick={() => trackEvent(
                GoogleAnalyticsCategory.Forside,
                `${GoogleAnalyticsAction.FlereTjenester}/${l.tittel}`,
                l.url,
              )}
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
