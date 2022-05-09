import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { useIntl } from 'react-intl';

const UXTweak = () => {
  const translate = useIntl();

  return (
    <section className="uxtweak-wrapper">
      <Undertittel className="uxtweak-tittel">
        {translate.formatMessage({ id: 'uxtweak.header' })}
      </Undertittel>
      <Normaltekst>
        {translate.formatMessage({ id: 'uxtweak.ingress-1' })}
        <a href="https://study.uxtweak.com/prototype/f3KnIP0FDrSHxpYm5cakH" target="_blank" rel="noreferrer">
          {translate.formatMessage({ id: 'uxtweak.lenketekst' })}
        </a>
        {translate.formatMessage({ id: 'uxtweak.ingress-2' })}
      </Normaltekst>
    </section>
  );
};

export default UXTweak;
