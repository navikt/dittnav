import React from 'react';

import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class LenkepanelMedIkon extends React.Component {
  render() {
    const { href, onClick, className, overskrift, ingress, children } = this.props;

    const linkCreator = props => // eslint-disable-next-line
               <a onClick={onClick} {...props} />;
    return (
      <LenkepanelBase
        className={className}
        href={href}
        linkCreator={linkCreator}
        border
      >
        <div className="lenkepanel__innhold">
          <div className="lenkepanel__ikon">
            {children}
          </div>
          <div>
            <Undertittel>
              <FormattedMessage id={overskrift} />
            </Undertittel>
            {(ingress)
              ? (
                <Normaltekst>
                  {ingress}
                </Normaltekst>
              )
              : ''
                          }
          </div>
        </div>
      </LenkepanelBase>
    );
  }
}

LenkepanelMedIkon.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  overskrift: PropTypes.string.isRequired,
  ingress: PropTypes.string,
  children: PropTypes.node.isRequired,
};

LenkepanelMedIkon.defaultProps = {
  onClick: null,
  className: '',
  ingress: '',
};

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none">
      <circle cx="8.5" cy="8.5" r="8" />
      <path strokeLinecap="round" d="M14.156 14.156l9.344 9.344" />
    </g>
  </svg>
);

export {
  LenkepanelMedIkon, Icon,
};
