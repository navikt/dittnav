import Api from 'js/Api';

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

  Object.defineProperty(window.location, 'href', {
    writable: true,
    value: 'original_url'
  });

  fetch.mockResponseOnce(JSON.stringify({}), {status: 401});
  expect.assertions(2);
  await expect(Api.fetchPersonInfoAndServices()).rejects.toEqual(new Error('Unauthorized'));
  await expect(window.location.href).toEqual('/dittnav-api/local/cookie?redirect=original_url');
});