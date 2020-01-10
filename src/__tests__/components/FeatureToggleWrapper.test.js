/* eslint-disable react/prop-types */

import * as React from 'react';
import { FeatureToggleWrapper, FeatureToggles } from '../../js/components/FeatureToggles';

const ReactTestRenderer = require('react-test-renderer');
const C = props => (props.isFeatureEnabled ? <div>Hello, the feature is enabled</div> : <div>Not hello, the feature is disabled</div>);

test('feature is enabled Unleash snaphot-test', async () => {
  const featureToggles = { "dittnav.fo": true };
  const component = ReactTestRenderer.create(
    <FeatureToggles.Provider value={{ featureToggles }}>
      <FeatureToggleWrapper toggle="dittnav.fo">
        <C />
      </FeatureToggleWrapper>
    </FeatureToggles.Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('feature is disabled Unleash snaphot-test', async () => {
  const featureToggles = { "dittnav.fo": false };
  const component = ReactTestRenderer.create(
    <FeatureToggles.Provider value={{ featureToggles }}>
      <FeatureToggleWrapper toggle="dittnav.fo">
        <C />
      </FeatureToggleWrapper>
    </FeatureToggles.Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('no such feature Unleash snaphot-test', async () => {
  const featureToggles = { "dittnav.notfo": true };
  const component = ReactTestRenderer.create(
    <FeatureToggles.Provider value={{ featureToggles }}>
      <FeatureToggleWrapper toggle="dittnav.fo">
        <C />
      </FeatureToggleWrapper>
    </FeatureToggles.Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('no set feature toggles', async () => {
  const component = ReactTestRenderer.create(
    <FeatureToggles.Provider value={{ }}>
      <FeatureToggleWrapper toggle="dittnav.fo">
        <C />
      </FeatureToggleWrapper>
    </FeatureToggles.Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
