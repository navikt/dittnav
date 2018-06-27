import * as React from 'react';
import Lenkelister from '../../js/components/Lenkelister';
const ReactTestRenderer = require('react-test-renderer');

test('basic green component test', () => {
    const component = ReactTestRenderer.create((<Lenkelister links={[]}/>));
    expect(component.toJSON()).toMatchSnapshot();
});
