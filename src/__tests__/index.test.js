import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
import api from 'js/Api';
import NavApp from 'frontshell';

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

it('index renders without crashing', () => {
  require('../index');
  expect(ReactDOM.render).toHaveBeenCalledWith(wrapNavApp(<App api={api} path='/' />), null);
});