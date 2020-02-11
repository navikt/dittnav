import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst } from 'nav-frontend-typografi';
import PropTypes from 'prop-types';

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
            {overskrift}
            {(ingress)
              ? (
                <Normaltekst>
                  {ingress}
                </Normaltekst>
              )
              : ''}
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
  overskrift: PropTypes.shape({ root: PropTypes.any }).isRequired,
  ingress: PropTypes.shape({ root: PropTypes.any }),
  children: PropTypes.node.isRequired,
};

LenkepanelMedIkon.defaultProps = {
  onClick: null,
  className: '',
  ingress: null,
};

export default LenkepanelMedIkon;
