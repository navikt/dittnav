import React, { Component } from 'react';

class InfoMeldinger extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="infomeldinger varsel-liste">
          <h1 className="vekk">Varsler</h1>

          <a data-ga="Dittnav/Varsel" className="melding meldekort varsel klikkbar " href="url">
            <span className="varsel-ikon meldekort-varsel-ikon" aria-label="alarm-ikon" />
            <span className="varsel-tekster">
              <span>Du har to meldekort klare for innsending</span>
              <span>(Send inn nå, du risikerer trekk!)</span>
              <p>Oversikt over meldekort</p>
            </span>
          </a>

          <div className="melding">
            <span className="varsel-ikon forbrukte-pleiepengedager-varsel-ikon" aria-label="alarm-ikon" />
            <div className="varsel-tekster">
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 11111111111: <b>999</b></p>
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 22222222222: <b>999</b></p>
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 33333333333: <b>999</b></p>
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 33333333333: <b>999</b></p>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default InfoMeldinger;
