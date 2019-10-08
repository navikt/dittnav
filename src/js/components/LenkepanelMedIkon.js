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
            <Undertittel className="lenkepanel__heading">
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

const IkonOppgave = () => (
  <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Group 4</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-382.000000, -429.000000)">
        <g id="Group-4" transform="translate(382.000000, 429.000000)">
          <circle id="Oval" fill="#FFBD66" cx="24" cy="24" r="24" />
          <path d="M35.5,12 C35.7760001,12 36,12.224 36,12.5 L36,35.5 C36,35.7760001 35.7760001,36 35.5,36 L12.5,36 C12.224,36 12,35.7760001 12,35.5 L12,12.5 C12,12.224 12.224,12 12.5,12 L35.5,12 Z M35,13 L13,13 L13,35 L35,35 L35,13 Z M22.853,25.1470001 C23.048,25.3420001 23.048,25.6590001 22.853,25.8540001 L17.853,30.8540001 C17.756,30.9510001 17.628,31.0000001 17.5,31.0000001 C17.372,31.0000001 17.244,30.9510001 17.146,30.8540001 L15.146,28.8540001 C14.951,28.6590001 14.951,28.3420001 15.146,28.1470001 C15.341,27.9520001 15.658,27.9520001 15.853,28.1470001 L17.5,29.7930001 L22.146,25.1470001 C22.341,24.9520001 22.658,24.9520001 22.853,25.1470001 Z M32.5,29.0000001 C32.7760001,29.0000001 33,29.2240001 33,29.5000001 C33,29.7760001 32.7760001,30.0000001 32.5,30.0000001 L24.5,30.0000001 C24.2240001,30.0000001 24,29.7760001 24,29.5000001 C24,29.2240001 24.2240001,29.0000001 24.5,29.0000001 L32.5,29.0000001 Z M22.853,16.147 C23.048,16.342 23.048,16.659 22.853,16.854 L17.853,21.854 C17.756,21.951 17.628,22 17.5,22 C17.372,22 17.244,21.951 17.146,21.854 L15.146,19.854 C14.951,19.659 14.951,19.342 15.146,19.147 C15.341,18.952 15.658,18.952 15.853,19.147 L17.5,20.793 L22.146,16.147 C22.341,15.952 22.658,15.952 22.853,16.147 Z M32.5,20 C32.7760001,20 33,20.224 33,20.5 C33,20.776 32.7760001,21 32.5,21 L24.5,21 C24.2240001,21 24,20.776 24,20.5 C24,20.224 24.2240001,20 24.5,20 L32.5,20 Z" id="Combined-Shape" fill="#3E3832" />
        </g>
      </g>
    </g>
  </svg>
);

const IkonInformasjon = () => (
  <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Group 5</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-382.000000, -303.000000)">
        <g id="Group-5" transform="translate(382.000000, 303.000000)">
          <circle id="Oval" fill="#C2EAF7" cx="24" cy="24" r="24" />
          <path d="M23.5,12 C29.8410001,12 35,17.159 35,23.5 C35,29.8410001 29.8410001,35 23.5,35 C17.159,35 12,29.8410001 12,23.5 C12,17.159 17.159,12 23.5,12 Z M23.5,13 C17.71,13 13,17.71 13,23.5 C13,29.2900001 17.71,34 23.5,34 C29.2900001,34 34,29.2900001 34,23.5 C34,17.71 29.2900001,13 23.5,13 Z M21.5,21 L23.5,21 C23.7453334,21 23.9495803,21.1769877 23.9919397,21.4101619 L24,21.5 L24,30 L26.5,30 C26.7760001,30 27,30.2240001 27,30.5 C27,30.7453334 26.8230124,30.9495803 26.5898382,30.9919397 L26.5,31 L20.5,31 C20.224,31 20,30.7760001 20,30.5 C20,30.2546667 20.1769877,30.0504198 20.4101619,30.0080604 L20.5,30 L23,30 L23,22 L21.5,22 C21.224,22 21,21.776 21,21.5 C21,21.2546667 21.1769877,21.0504198 21.4101619,21.0080604 L21.5,21 L23.5,21 Z M23,16.5 C23.5522848,16.5 24,16.9477153 24,17.5 C24,18.0522848 23.5522848,18.5 23,18.5 C22.4477153,18.5 22,18.0522848 22,17.5 C22,16.9477153 22.4477153,16.5 23,16.5 Z" id="Combined-Shape" fill="#3E3832" />
        </g>
      </g>
    </g>
  </svg>
);

const IkonMelding = () => (
  <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Group 3</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-382.000000, -366.000000)">
        <g id="Group-3" transform="translate(382.000000, 366.000000)">
          <circle id="Oval" fill="#FFBD66" cx="24" cy="24" r="24" />
          <path d="M33,16 C34.1030001,16 35,16.897 35,18 L35,29 C35,30.1030001 34.1030001,31 33,31 L15,31 C13.897,31 13,30.1030001 13,29 L13,18 C13,16.897 13.897,16 15,16 L33,16 Z M14,18 L14,29 C14,29.5510001 14.448,30 15,30 L33,30 C33.5520001,30 34,29.5510001 34,29 L34,18 C34,17.8895814 33.9820088,17.7832589 33.9487949,17.6838252 L24.313,25.391 C24.221,25.463 24.11,25.5 24,25.5 C23.89,25.5 23.779,25.463 23.687,25.391 L14.0515345,17.682841 C14.0181101,17.7825572 14,17.8892169 14,18 Z M33,17 L15,17 C14.9396359,17 14.8805155,17.0053694 14.8230887,17.0156544 L24,24.36 L33.1798974,17.0161939 C33.1215346,17.0055572 33.0614109,17 33,17 Z" id="Combined-Shape" fill="#3E3832" />
        </g>
      </g>
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
  LenkepanelMedIkon, IkonBlyant, IkonKane, IkonPille, IkonSkilt, IkonOppgave, IkonInformasjon, IkonMelding,
};
