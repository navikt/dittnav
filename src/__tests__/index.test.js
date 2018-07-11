import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/App';
import api from '../js/Api';

jest.mock('react-dom', ()=> ({render: jest.fn()}))

it('index renders without crashing', () => {
  require('../index');
  expect(ReactDOM.render).toHaveBeenCalledWith(<App api={api} />, null);
});