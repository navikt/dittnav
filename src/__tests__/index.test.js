import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/App';
import Api from '../js/Api';
import NavApp from '../js/NavApp';
import nbMessages from 'translations/nb.json';
import enMessages from 'translations/en.json';
import BeskjedStoreProvider from '../js/context/BeskjedStoreProvider';

jest.mock('react-dom', () => ({render: jest.fn()}));
jest.mock('react-ga');

const loadMessages = () => {
  return {
    nb: nbMessages,
    en: enMessages,
  };
};

const wrapNavApp = (children, props = { defaultSprak: 'nb', messages: loadMessages() }) => (
  <NavApp {...props}>
    <BeskjedStoreProvider>
    {children}
    </BeskjedStoreProvider>
  </NavApp>
);

it('index renders without crashing', async () => {

  const expectedF = jest.fn();

  Api.checkAuth = () => new Promise((resolve, reject) => {
    expectedF();
    resolve(true);
  });
  const flushPromises = () => new Promise(setImmediate);

  await require('../index');
  await flushPromises();

  expect(expectedF).toHaveBeenCalled();
  expect(ReactDOM.render).toHaveBeenCalledWith(wrapNavApp(<App api={Api} />), null);
});
