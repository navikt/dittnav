import { redirectToLogin } from 'Api';
/* global */

it('it crashes', async () => {
  expect.assertions(1);
  await expect(fetchPersonNavn()).rejects.toEqual(new TypeError('Cannot read property \'then\' of undefined'));
});

it('handling Unauthorized', async () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { assign: jest.fn() },
  });

  fetch.mockResponseOnce(JSON.stringify({ }), { status: 401 });
  expect.assertions(1);
  jest.spyOn(window.location, 'assign').mockImplementation(l => {
    expect(l).toEqual('http://localhost:5000/');
  });
  await expect(redirectToLogin());
});
