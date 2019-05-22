import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
import Api from 'js/Api';
import NavApp from 'frontshell';
import LoginWrapper from 'js/components/LoginWrapper';
import conf from 'js/Config';

import nbMessages from 'translations/nb.json';
import enMessages from 'translations/en.json';

const loadMessages = () => {
  return {
    nb: nbMessages,
    en: enMessages,
  };
};

const wrapNavApp = (children, props = { defaultSprak: 'nb', messages: loadMessages() }) => (
  <NavApp {...props}>
    {children}
  </NavApp>
);

jest.mock('react-dom', () => ({render: jest.fn()}))

it('index renders without crashing', async () => {
  const expectedF = jest.fn();
  Api.checkAuth = () => new Promise((resolve, reject) => {
    expectedF();
    resolve({});
  });

  await require('../index');
  expect(expectedF).toHaveBeenCalled();

  expect(ReactDOM.render).toHaveBeenCalledWith(wrapNavApp(<App api={Api} />), null);
});
