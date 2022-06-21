import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

const UXTweak = () => {
  const translate = useIntl();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const mobileUXTweak = 'https://study.uxtweak.com/firstclick/YNNfVhFFqOMcGOfkdml8u';
  const desktopUXTweak = 'https://study.uxtweak.com/firstclick/K8EjYIXhrLD4BxNaYTwe2';

  return (
    <section className="uxtweak-wrapper">
      <Undertittel className="uxtweak-tittel">
        {translate.formatMessage({ id: 'uxtweak.header' })}
      </Undertittel>
      <Normaltekst>
        {translate.formatMessage({ id: 'uxtweak.ingress-1' })}
        <a className="uxtweak-link" href={isMobile ? mobileUXTweak : desktopUXTweak} target="_blank" rel="noreferrer">
          {translate.formatMessage({ id: 'uxtweak.lenketekst' })}
        </a>
      </Normaltekst>
    </section>
  );
};

export default UXTweak;
