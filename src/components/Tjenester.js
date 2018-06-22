import React, { Component } from 'react';

class Tjenester extends Component {
  render() {
    return (
      <section className="tjenester clearfix" id="tjenesterBoks3">
        <h1>Tjenester</h1>
        <ul className="lenkebokser">
          <li className="lenkeboks">
            <a href="https://tjenester-t4.nav.no/pselv/publisering/dinpensjon.jsf" data-ga="Dittnav/Lenkeboks" className="din_pensjon">
              <h2 className="hode hode-undertittel hode-dekorert">Din Pensjon</h2>
              <p className="typo-normal">Her kan du se hvor mye alderspensjon du har tjent opp og du kan søke om pensjon elektronisk.</p>
            </a>
          </li>
          <li className="lenkeboks">
            <a href="https://tjenester-t4.nav.no/sbl/nav_security_check?goto=https://tjenester-t4.nav.no/meldekort" data-ga="Dittnav/Lenkeboks" className="registrer_arbeidssoker">
              <h2 className="hode hode-undertittel hode-dekorert">Meldekort</h2>
              <p className="typo-normal">Her kan du sende inn meldekort</p>
            </a>
          </li>
          <li className="lenkeboks">
            <a href="https://tjenester-t4.nav.no/foreldrepengeveilederen" data-ga="Dittnav/Lenkeboks" className="foreldrepengeveileder">
              <h2 className="hode hode-undertittel hode-dekorert">Foreldrepengeveileder</h2>
              <p className="typo-normal">Her kan du beregne hvor mye du vil få i foreldrepenger.</p>
            </a>
          </li>
        </ul>
      </section>
    );
  }
}

export default Tjenester;
