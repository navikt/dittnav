import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import Beskjed from 'components/brukernotifikasjoner/Beskjed';
import StoreProvider from '../../../context/StoreProvider';
import wrapIntl from 'utils/intlTestHelper';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-ga');

test('Beskjed with link', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 4,
  };

  const innloggingsstatus = {
    authLevel: 4,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Beskjed with empty link', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: '',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 4,
  };

  const innloggingsstatus = {
    authLevel: 4,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Beskjed with null as link', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: null,
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 4,
  };

  const innloggingsstatus = {
    authLevel: 4,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Beskjed with sikkerhetsnivaa 4 and innloggingsnivaa 4', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 4,
  };

  const innloggingsstatus = {
    authLevel: 4,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Beskjed with sikkerhetsnivaa 4 and innloggingsnivaa 3', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 4,
  };

  const innloggingsstatus = {
    authLevel: 3,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Beskjed with sikkerhetsnivaa 3 and innloggingsnivaa 3', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 3,
  };

  const innloggingsstatus = {
    authLevel: 3,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Beskjed with sikkerhetsnivaa 3 and innloggingsnivaa 4', () => {
  const beskjed = {
    uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
    eventTidspunkt: '2020-03-13T08:53:17.47Z',
    eventId: '1584093197470',
    tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:17.773555Z',
    sikkerhetsnivaa: 3,
  };

  const innloggingsstatus = {
    authLevel: 4,
  };

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <StoreProvider>
        <Beskjed beskjed={beskjed} beskjeder={null} innloggingsstatus={innloggingsstatus}/>
      </StoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});
