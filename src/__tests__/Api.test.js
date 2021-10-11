import { fetchPersonNavn, redirectToLogin } from 'Api';
/* global */
import { FetchError } from 'node-fetch'; // eslint-disable-line import/no-extraneous-dependencies

it('it crashes', async () => {
  expect.assertions(1);
  await expect(fetchPersonNavn()).rejects.toEqual(new FetchError('Cannot read property \'then\' of undefined'));
});

it('handling Unauthorized', async () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { assign: jest.fn() },
  });

  fetch.mockResponseOnce(JSON.stringify({ }), { status: 401 });
  expect.assertions(1);
  jest.spyOn(window.location, 'assign').mockImplementation(l => {
    expect(l).toEqual('https://loginservice.dev.nav.no/login?level=Level3&redirect=https://www.dev.nav.no/person/dittnav/');
  });
  await expect(redirectToLogin());
});
