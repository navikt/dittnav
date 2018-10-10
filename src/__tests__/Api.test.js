import Api from 'js/Api';
/*global global*/
import jsdom from 'jsdom';

it('it crashes', async () => {
  expect.assertions(1);
  await expect(Api.fetchPersonInfoAndServices()).rejects.toEqual(new SyntaxError('Unexpected end of JSON input'));
});

it('some default JSON', async () => {
  const data = { data: '12345' };
  fetch.mockResponseOnce(JSON.stringify(data));
  expect.assertions(1);
  await expect(Api.fetchPersonInfoAndServices()).resolves.toEqual(data);
});

it('handling Unauthorized', async () => {

  fetch.mockResponseOnce(JSON.stringify({}), {status: 401});
  expect.assertions(2);
  jest.spyOn(window.location, 'assign').mockImplementation( l => {
    expect(l).toEqual('/dittnav-api/local/cookie?redirect=http://localhost/');
  })
  await expect(Api.fetchPersonInfoAndServices()).rejects.toEqual(new Error('Unauthorized'));
});