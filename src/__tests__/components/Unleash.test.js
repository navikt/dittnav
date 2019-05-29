/* eslint-disable react/prop-types */

import * as React from 'react';
import Unleash from 'js/components/Unleash';

const ReactTestRenderer = require('react-test-renderer');

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

test('feature is enabled Unleash snaphot-test', async () => {
  const api = {
    fetchUnleashFeatures: () => new Promise(res => res({ 'dittnav.fo': true })),
  };
  const C = props => (props.isFeatureEnabled ? <div>Hello, the feature is enabled</div> : <div>Not hello, the feature is disabled</div>);
  const component = ReactTestRenderer.create(<Unleash api={api} feature="dittnav.fo"><C /></Unleash>);
  await flushPromises();
  expect(component.toJSON()).toMatchSnapshot();
});

test('feature is disabled Unleash snaphot-test', async () => {
  const api = {
    fetchUnleashFeatures: () => new Promise(res => res({ 'dittnav.fo': false })),
  };
  const C = props => (props.isFeatureEnabled ? <div>Hello, the feature is enabled</div> : <div>Not hello, the feature is disabled</div>);
  const component = ReactTestRenderer.create(<Unleash api={api} feature="dittnav.fo"><C /></Unleash>);
  await flushPromises();
  expect(component.toJSON()).toMatchSnapshot();
});

test('no such feature Unleash snaphot-test', async () => {
  const api = {
    fetchUnleashFeatures: () => new Promise(res => res({ 'dittnav.notfo': false })),
  };
  const C = props => (props.isFeatureEnabled ? <div>Hello, the feature is enabled</div> : <div>Not hello, the feature is disabled</div>);
  const component = ReactTestRenderer.create(<Unleash api={api} feature="dittnav.fo"><C /></Unleash>);
  await flushPromises();
  expect(component.toJSON()).toMatchSnapshot();
});

test('null while fetching Unleash snaphot-test', () => {
  const api = {
    fetchUnleashFeatures: () => new Promise(res => res({ 'dittnav.notfo': false })),
  };
  const C = props => (props.isFeatureEnabled ? <div>Hello, the feature is enabled</div> : <div>Not hello, the feature is disabled</div>);
  const component = ReactTestRenderer.create(<Unleash api={api} feature="dittnav.fo"><C /></Unleash>);
  expect(component.toJSON()).toMatchSnapshot();
});

test('error while fetching Unleash snaphot-test', async () => {
  const api = {
    fetchUnleashFeatures: () => new Promise((_, rej) => rej(new Error('error fetching'))),
  };
  const C = props => (props.isFeatureEnabled ? <div>Hello, the feature is enabled</div> : <div>Not hello, the feature is disabled</div>);
  const component = ReactTestRenderer.create(<Unleash api={api} feature="dittnav.fo"><C /></Unleash>);
  await flushPromises();
  expect(component.toJSON()).toMatchSnapshot();
});
