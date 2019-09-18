import React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import App from '../js/App';
import Api from '../js/Api';
import NavApp from '../js/NavApp';

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

it('index renders without crashing', () => {
  const component = ReactTestRenderer.create(wrapNavApp(<App api={Api} />));
  expect(component.toJSON()).toMatchSnapshot();
});
