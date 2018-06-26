import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/App';

it('renders without crashing', () => {
  const mockApi = new Promise((resolve, reject) => {})
  const div = document.createElement('div');
  ReactDOM.render(<App api={() => mockApi} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
