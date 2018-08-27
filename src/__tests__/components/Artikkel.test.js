import * as React from 'react';
import Artikkel from 'js/components/Artikkel';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/Intl';

test('render empty Artikkel', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Artikkel />));
  expect(component.toJSON()).toMatchSnapshot();
});


test('render non-empty Artikkel', () => {
  const article = {
    "url": "https://nav.no/no/Ditt+Nav/DittnavArtikler:443/Friskmelding+til+arbeidsformidling.347278.cms",
    "preface": "Dette er en mindre overskirft",
    "lead": "NAV har en rekke ulike tilretteleggingstiltak. Slike tiltak kan være aktuelle for deg som har en funksjonsnedsettelse, men som kan jobbe så lenge de praktiske forholdene blir lagt til rette. Du kan få hjelp til å vurdere hvordan arbeidsplassen kan tilpasses behovene dine. NAV kan også tilby hjelpemidler, eller gi tilskudd til arbeidsgiver for å gjennomføre nødvendige tilpasninger. Hvis du ser dårlig eller bruker tegnspråk, kan NAV betale en lesehjelp eller en hørselstolk slik at du får den informasjonen du trenger i arbeidshverdagen. NAV kan også betale for transport til arbeidet hvis du ikke kan bruke offentlig transport av medisinske grunner. Noen støtteordninger gjelder bare bedrifter som har avtale om et inkluderende arbeidsliv (IA-virksomheter)",
    "heading": "Friskmelding til arbeidsformidling",
    "className": "lyspaere"
  };

  const component = ReactTestRenderer.create(wrapIntl(<Artikkel article={article} />));
  expect(component.toJSON()).toMatchSnapshot();
});
