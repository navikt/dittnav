import React from 'react';

import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
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
            <Undertittel>
              {overskrift}
            </Undertittel>
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

// Temporary icon for Oppgave events.
const Oppgave = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="#0067C5" fillRule="nonzero">
      <path d="M9.5 16.5c-.3 0-.5-.1-.7-.3l-2.5-2.5c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l1.8 1.8 6.8-6.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7.5 7c-.2.2-.5.3-.7.3z" />
      <path d="M11.8 24C5.3 24 .1 18.9 0 12.2-.1 9 1.2 6 3.5 3.6 5.7 1.3 8.8.1 12 0c3.2 0 6.2 1.1 8.5 3.4 2.2 2.2 3.5 5.2 3.5 8.4.1 6.6-5.3 12.1-12 12.2h-.2zm.4-22H12C6.4 2.1 1.9 6.7 2 12.2c.1 5.6 4.5 9.9 10 9.8 5.6-.1 10.1-4.7 10-10.2 0-2.7-1.1-5.2-3-7C17.2 3 14.8 2 12.2 2z" />
    </g>
  </svg>
);

// Temporary icon for Informasjon events.
const Informasjon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
    <g fill="#0067C5" fillRule="nonzero">
      <path d="M12 24.1c-6.6 0-12-5.4-12-12S5.4.1 12 .1s12 5.4 12 12-5.4 12-12 12zm0-22c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" />
      <path d="M14.6 19.6H9.2c-.6 0-1-.4-1-1s.4-1 1-1H11v-6.5h-1c-.6 0-1-.4-1-1s.4-1 1-1h2c.6 0 1 .4 1 1v7.5h1.6c.6 0 1 .4 1 1s-.4 1-1 1zM11.5 7.6c-.9 0-1.5-.6-1.5-1.5s.6-1.5 1.5-1.5 1.5.6 1.5 1.5-.6 1.5-1.5 1.5z" />
    </g>
  </svg>
);

const IkonPille = () => (
  <svg width="48" height="48" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M62.6616 63.4795L114.327 115.591L145.089 84.4894C159.338 70.0829 159.21 46.853 144.804 32.6039C130.397 18.3548 107.167 18.4824 92.9181 32.8889L62.6616 63.4795Z" fill="#65A9C1" />
    <path d="M87.5801 58.3952C86.8022 59.1794 86.8074 60.4457 87.5916 61.2236C88.3758 62.0015 89.6421 61.9963 90.42 61.2121L87.5801 58.3952ZM103.989 44.6926L105.409 46.101C105.413 46.0969 105.417 46.0927 105.421 46.0885L103.989 44.6926ZM118.011 38.8431L117.856 40.8371L118.011 38.8431ZM131.665 47.1569C132.488 47.894 133.752 47.8248 134.49 47.0021C135.227 46.1795 135.157 44.9151 134.335 44.178L131.665 47.1569ZM90.42 61.2121L105.409 46.101L102.569 43.2841L87.5801 58.3952L90.42 61.2121ZM103.989 44.6926C105.421 46.0885 105.421 46.0889 105.421 46.0893C105.42 46.0894 105.42 46.0898 105.42 46.09C105.419 46.0905 105.419 46.0908 105.419 46.091C105.418 46.0915 105.418 46.0916 105.419 46.0913C105.419 46.0907 105.421 46.0886 105.425 46.0851C105.432 46.078 105.445 46.0651 105.463 46.0469C105.5 46.0104 105.56 45.9524 105.642 45.8761C105.805 45.7235 106.053 45.4986 106.377 45.227C107.027 44.6819 107.971 43.9582 109.135 43.2535C111.494 41.8251 114.573 40.5824 117.856 40.8371L118.166 36.849C113.713 36.5037 109.781 38.1858 107.063 39.8321C105.688 40.6648 104.577 41.516 103.807 42.1614C103.421 42.485 103.118 42.7593 102.907 42.9571C102.801 43.056 102.719 43.136 102.66 43.1937C102.63 43.2225 102.607 43.2458 102.59 43.2631C102.581 43.2717 102.574 43.2789 102.569 43.2845C102.566 43.2873 102.564 43.2897 102.562 43.2917C102.561 43.2928 102.56 43.2937 102.559 43.2945C102.558 43.2949 102.558 43.2954 102.558 43.2956C102.557 43.2962 102.557 43.2966 103.989 44.6926ZM117.856 40.8371C123.592 41.2819 127.546 43.4655 131.665 47.1569L134.335 44.178C129.751 40.0701 125.001 37.3791 118.166 36.849L117.856 40.8371Z" fill="#DCF3FA" />
    <path fillRule="evenodd" clipRule="evenodd" d="M115.031 114.915L63.3652 62.8037L32.6039 93.9048C18.3548 108.311 18.4824 131.541 32.8889 145.79C47.2954 160.039 70.5253 159.912 84.7744 145.505L115.031 114.915Z" fill="#D5D98E" />
  </svg>
);

const IkonSkilt = () => (
  <svg width="48" height="48" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M93 164H85V17C85.5 16 87 14 89 14C91 14 92.6667 16 93 17V164Z" fill="#6D655F" />
    <path d="M144 130V85H31L15 107.5L31 130H144Z" fill="#90C9A7" />
    <path d="M34 74V29H147L163 51.5L147 74H34Z" fill="#FFB45B" />
  </svg>
);

const IkonKane = () => (
  <svg width="48" height="48" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M116 164V172" stroke="#4F4742" strokeWidth="10" strokeLinecap="round" />
    <path d="M116 32H121V31.6316L120.946 31.2673L116 32ZM121 167V32H111V167H121ZM120.946 31.2673C120.23 26.4341 118.44 18.7426 113.587 12.1585C108.545 5.31666 100.414 0 88 0V10C97.0862 10 102.289 13.6833 105.538 18.0915C108.977 22.7574 110.437 28.5659 111.054 32.7327L120.946 31.2673ZM88 0C75.0773 0 67.2216 6.82543 62.7924 14.991C58.5379 22.8345 57.3567 31.9633 57.0092 37.6975L66.9908 38.3025C67.31 33.0367 68.3787 25.6655 71.5826 19.759C74.6117 14.1746 79.4227 10 88 10V0Z" fill="#A96215" />
  </svg>
);

const IkonBlyant = () => (
  <svg width="48" height="48" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="89.3427" width="141" height="63" rx="5" fill="#C5D9E2" />
    <path d="M71 119.343L65 113.343L61 124.343L71 119.343Z" fill="black" />
    <path d="M72.8468 90.4231L94.5728 112.149L71 119.343L65 113.343L72.8468 90.4231Z" fill="#E0A9A0" />
    <rect x="138.262" y="25" width="30.7384" height="15.226" transform="rotate(45 138.262 25)" fill="#E0A9A0" />
    <rect x="127.5" y="35.7648" width="30.7367" height="77.2956" transform="rotate(45 127.5 35.7648)" fill="#C15647" />
  </svg>
);


export {
  LenkepanelMedIkon, IkonBlyant, IkonKane, IkonPille, IkonSkilt, Oppgave, Informasjon,
};
