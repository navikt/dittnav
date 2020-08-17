import Api from 'js/Api';
/*global global*/
import { FetchError } from 'node-fetch';

it('it crashes', async () => {
  expect.assertions(1);
  await expect(Api.fetchPersonNavn()).rejects.toEqual(new FetchError('invalid json response body at undefined reason: Unexpected end of JSON input'));
});

it('handling Unauthorized', async () => {
  fetch.mockResponseOnce(JSON.stringify({}), {status: 401});
  expect.assertions(1);
  jest.spyOn(window.location, 'assign').mockImplementation( l => {
    expect(l).toEqual('http://localhost:5000');
  });
  await expect(Api.redirectToLogin());
});
