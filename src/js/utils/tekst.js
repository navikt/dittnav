import React from 'react';

export const checkOverflow = (tekst, limit) => (
  tekst.length >= limit
);

export const finnTekstBase = (tekst, limit) => (
  checkOverflow(tekst, limit) ? tekst.slice(0, limit) : tekst
);

export const avkortTekst = (tekst, limit) => (
  checkOverflow(tekst, limit) ? tekst.slice(limit, tekst.length) : ''
);

export const checkForFormattedMessage = (tekst) => (
  typeof tekst === 'object' && tekst.type.displayName === 'FormattedMessage'
);

export const ellipse = (skalVise) => (
  skalVise ? '... ' : ''
);

export const linebreak = (skalvise) => (
  skalvise ? <br /> : ''
);
