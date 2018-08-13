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