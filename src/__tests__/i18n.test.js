import i18n from '../translations/i18n';

it('nb 1',  () => {
  expect(i18n.nb.numberToWord(1)).toEqual(undefined);
});

it('nb 2',  () => {
  expect(i18n.nb.numberToWord(2)).toEqual('to');
});

it('nb 12',  () => {
  expect(i18n.nb.numberToWord(12)).toEqual('tolv');
});

it('nb 13', () => {
  expect(i18n.nb.numberToWord(13)).toEqual(13);
});
