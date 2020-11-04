import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import wrapIntl from 'js/IntlTestHelper';
import sinon from 'sinon';
import Brukernotifikasjoner from 'js/components/Brukernotifikasjoner';
import BeskjedStoreProvider from 'js/context/StoreProvider';
import * as useInnloggingsstatus from '../../js/hooks/useInnloggingsstatus';
const ReactTestRenderer = require('react-test-renderer');

jest.mock('react-ga');
let sandbox = null;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  useInnloggingsstatus.default.restore();
});

const beskjeder = {
  data: {
    content: [
      {
        eventTidspunkt: '2020-03-13T08:53:24.636Z',
        eventId: '1784093204636',
        uid: '934de6ce-f94f-47de-84d2-639ac2674627',
        tekst: 'Du har en sykemelding som må godkjennes',
        link: 'https://enNyLenke',
        produsent: 'dittnav',
        sistOppdatert: '2020-03-13T08:53:25.002983Z',
        sikkerhetsnivaa: 4,
      },
      {
        eventTidspunkt: '2020-03-13T08:53:24.636Z',
        eventId: '1584093204636',
        uid: '9346e6ce-f94f-47de-84g2-639ac2674627',
        tekst: 'Du har en sykemelding som må godkjennes',
        link: 'https://enNyLenke',
        produsent: 'dittnav',
        sistOppdatert: '2020-03-13T08:53:25.002983Z',
        sikkerhetsnivaa: 4,
      },
    ],
  },
};

const oppgaver = {
  data: {
    content: [
      {
        eventTidspunkt: '2020-03-13T08:53:24.636Z',
        eventId: '1582093204636',
        tekst: 'Du har en sykemelding som må godkjennes',
        link: 'https://enNyLenke',
        produsent: 'dittnav',
        sistOppdatert: '2020-03-13T08:53:25.002983Z',
        sikkerhetsnivaa: 4,
      },
      {
        eventTidspunkt: '2020-03-13T08:53:24.636Z',
        eventId: '1587093204636',
        tekst: 'Du har en sykemelding som må godkjennes',
        link: 'https://enNyLenke',
        produsent: 'dittnav',
        sistOppdatert: '2020-03-13T08:53:25.002983Z',
        sikkerhetsnivaa: 4,
      },
    ],
  },
};

const innbokser = {
  data: {
    content: [
      {
        eventTidspunkt: '2020-03-13T08:53:24.636Z',
        eventId: '2584093204636',
        tekst: 'Du har en sykemelding som må godkjennes',
        link: 'https://enNyLenke',
        produsent: 'dittnav',
        sistOppdatert: '2020-03-13T08:53:25.002983Z',
        sikkerhetsnivaa: 4,
      },
      {
        eventTidspunkt: '2020-03-13T08:53:24.636Z',
        eventId: '6584093204636',
        tekst: 'Du har en sykemelding som må godkjennes',
        link: 'https://enNyLenke',
        produsent: 'dittnav',
        sistOppdatert: '2020-03-13T08:53:25.002983Z',
        sikkerhetsnivaa: 4,
      },
    ],
  },
};

const innloggingsstatus = {
  securityLevel: '4',
};

test('Brukernotifikasjoner empty', () => {
  sandbox.stub(useInnloggingsstatus, 'default')
    .returns([{
      data: { content: null },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner oppgaver={null} innbokser={null} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder', () => {
  sandbox.stub(useInnloggingsstatus, 'default')
    .returns([{
      data: { content: innloggingsstatus },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={null} innbokser={null} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});


test('Brukernotifikasjoner with oppgaver', () => {
  sandbox.stub(useInnloggingsstatus, 'default')
    .returns([{
      data: { content: innloggingsstatus },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner oppgaver={oppgaver} innbokser={null} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with innbokser', () => {
  sandbox.stub(useInnloggingsstatus, 'default')
    .returns([{
      data: { content: innloggingsstatus },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner beskjeder={null} oppgaver={null} innbokser={innbokser} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser', () => {
  sandbox.stub(useInnloggingsstatus, 'default')
    .returns([{
      data: { content: innloggingsstatus },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser, but no innlogging', () => {
  sandbox.stub(useInnloggingsstatus, 'default')
    .returns([{
      data: { content: null },
      isLoading: false,
      isSuccess: false,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});
