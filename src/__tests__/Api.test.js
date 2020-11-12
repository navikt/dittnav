import Api from 'Api';
/* global */
import { FetchError } from 'node-fetch'; // eslint-disable-line import/no-extraneous-dependencies

it('it crashes', async () => {
  expect.assertions(1);
  await expect(Api.fetchPersonNavn()).rejects.toEqual(new FetchError('invalid json response body at  reason: Unexpected end of JSON input'));
});

it('handling Unauthorized', async () => {
  fetch.mockResponseOnce(JSON.stringify({ }), { status: 401 });
  expect.assertions(1);
  jest.spyOn(window.location, 'assign').mockImplementation(l => {
    expect(l).toEqual('http://localhost:5000');
  });
  await expect(Api.redirectToLogin());
});
