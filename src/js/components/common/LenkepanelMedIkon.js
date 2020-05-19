import React from 'react';
import { shape, any, node, func, string } from 'prop-types';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { trackEvent } from '../../utils/GoogleAnalytics';

class LenkepanelMedIkon extends React.Component {
  render() {
    const { href, onClick, className, overskrift, ingress, etikett, gaCategory, gaAction, gaUrl, children } = this.props;

    const linkCreator = props => // eslint-disable-next-line
               <a onClick={onClick} {...props} />;
    return (
      <LenkepanelBase
        className={className}
        href={href}
        onClick={trackEvent(gaCategory, gaAction, (gaUrl || href))}
        linkCreator={linkCreator}
        border
      >
        <div className="lenkepanel__innhold">
          <div className="lenkepanel__ikon">
            {children}
          </div>
          <div>
            {overskrift}
            {(ingress)
              ? (
                <Normaltekst>
                  {ingress}
                </Normaltekst>
              ) : ''}
            {etikett
              ? (
                <Undertekst className="lenkepanel__etikett">
                  {etikett}
                </Undertekst>
              ) : ''}
          </div>
        </div>
      </LenkepanelBase>
    );
  }
}

LenkepanelMedIkon.propTypes = {
  href: string.isRequired,
  onClick: func,
  className: string,
  overskrift: shape({ root: any }).isRequired,
  ingress: shape({ root: any }),
  etikett: string,
  gaCategory: string,
  gaAction: string,
  gaUrl: string,
  children: node.isRequired,
};

LenkepanelMedIkon.defaultProps = {
  onClick: null,
  className: '',
  ingress: null,
  etikett: null,
  gaCategory: null,
  gaAction: null,
  gaUrl: null,
};

export default LenkepanelMedIkon;
