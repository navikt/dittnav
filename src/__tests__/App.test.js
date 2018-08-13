import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');

const mockApi = {
  fetchPersonInfoAndServices: () => new Promise((resolve, reject) => {}),
  fetchPaabegynteSaker: () => new Promise((resolve, reject) => {}),
  fetchMinInnboksData: () => new Promise((resolve, reject) => []),
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App api={mockApi} />, div);
  ReactDOM.unmountComponentAtNode(div);
});