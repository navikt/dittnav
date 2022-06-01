import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import Innboks from 'components/brukernotifikasjoner/Innboks';
import wrapIntl from 'utils/intlTestHelper';
import { MemoryRouter } from 'react-router-dom';

test('Innboks with sikkerhetsnivaa 4 and innloggingsnivaa 4', () => {
  const innbokser = [{
    forstBehandlet: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  }];

  const innloggingsstatus = {
    authLevel: 4,
    authenticated: true,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <Innboks innbokser={innbokser} innloggingsstatus={innloggingsstatus}/>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Innboks with sikkerhetsnivaa 4 and innloggingsnivaa 3', () => {
  const innbokser = [{
    forstBehandlet: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  }];

  const innloggingsstatus = {
    authLevel: 3,
    authenticated: true,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <Innboks innbokser={innbokser} innloggingsstatus={innloggingsstatus}/>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Innboks with sikkerhetsnivaa 3 and innloggingsnivaa 3', () => {
  const innbokser = [{
    forstBehandlet: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 3,
  }];

  const innloggingsstatus = {
    authLevel: 3,
    authenticated: true,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <Innboks innbokser={innbokser} innloggingsstatus={innloggingsstatus}/>
    </MemoryRouter>
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Innboks with sikkerhetsnivaa 3 and innloggingsnivaa 4', () => {
  const innbokser = [{
    forstBehandlet: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 3,
  }];

  const innloggingsstatus = {
    authLevel: 4,
    authenticated: true,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <Innboks innbokser={innbokser} innloggingsstatus={innloggingsstatus}/>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});
