import React, { Component } from 'react';
import DittLink from 'js/components/common/DittLink';
import Tjenester from 'js/components/Tjenester';

class Postkasse extends Component {
  render() {
    const { info } = this.props;
    return (
      <div>
        <h1 className="typo-sidetittel text-center">Din dialog med NAV</h1>
        <Tjenester services={info.viktigeTjenester} />
        <section className="text-center">
          <DittLink url="/" className="lenke">Til Ditt NAV</DittLink>
        </section>
      </div>);
  }
}

Postkasse.propTypes = Tjenester.propTypes;

export default Postkasse;
