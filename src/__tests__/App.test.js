import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';

const mockApi = () => {
  return {
    fetchPersonInfoAndServices: () => new Promise((resolve, reject) => {}),
    fetchPaabegynteSaker: () => new Promise((resolve, reject) => {}),
    fetchMinInnboksData: () => new Promise((resolve, reject) => []),
  }
};

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<App api={mockApi()} />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect PaabegynteSoknader fetching', () => {
  const expectedF = jest.fn();
  const api = mockApi();
  api.fetchPaabegynteSaker = () => new Promise((resolve, reject) => {
    expectedF();
    return {};
  });

  const component = ReactTestRenderer.create(wrapIntl(<App api={api} />));
  expect(expectedF).toHaveBeenCalled();
});

it('expect PaabegynteSoknader fetching', async () => {
  const api = mockApi();
  api.fetchPaabegynteSaker = () => new Promise((resolve, reject) => {
    resolve({feilendeBaksystem: ['hello']});
  });

  const component = ReactTestRenderer.create(wrapIntl(<App api={api} />));
  await flushPromises();

  ///console.log(component.root.children[0].instance)
  expect(component.root.children[0].instance.state.errors).toEqual(['error.paabegynte']);
});

it('expect mininnboks fail while fetching', async () => {
  const api = mockApi();
  api.fetchMinInnboksData = () => new Promise((resolve, reject) => {
    reject(new Error('some error'));
  });

  const component = ReactTestRenderer.create(wrapIntl(<App api={api} />));
  await flushPromises();

  expect(component.root.children[0].instance.state.errors).toEqual(['error.mininnboks']);
});