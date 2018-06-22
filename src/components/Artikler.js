import React, { Component } from 'react';

class Artikler extends Component {
  render() {
    return (
      <div className="row artikkel side-innhold">
        <div className="container">
          <div className="col-md-8 col-standalone">
            <article>
              <p className="hode hode-etikett-liten hode-dekorert lyspaere">Dette er en mindre overskirft</p>
              <h1 className="typo-innholdstittel">Friskmelding til arbeidsformidling</h1>
              <p>NAV har en rekke ulike tilretteleggingstiltak. Slike tiltak kan være aktuelle for deg som har en funksjonsnedsettelse, men som kan jobbe så lenge de praktiske forholdene blir lagt til rette. Du kan få hjelp til å vurdere hvordan arbeidsplassen kan tilpasses behovene dine. NAV kan også tilby hjelpemidler, eller gi tilskudd til arbeidsgiver for å gjennomføre nødvendige tilpasninger. Hvis du ser dårlig eller bruker tegnspråk, kan NAV betale en lesehjelp eller en hørselstolk slik at du får den informasjonen du trenger i arbeidshverdagen. NAV kan også betale for transport til arbeidet hvis du ikke kan bruke offentlig transport av medisinske grunner. Noen støtteordninger gjelder bare bedrifter som har avtale om et inkluderende arbeidsliv (IA-virksomheter)</p>
              <a data-ga="Dittnav/Artikkel" href="https://www-t1.nav.no/no/Ditt+Nav/DittnavArtikler:443/Friskmelding+til+arbeidsformidling.347278.cms">Les mer om dette</a>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Artikler;
