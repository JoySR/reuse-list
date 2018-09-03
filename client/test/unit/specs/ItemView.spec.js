import { shallow } from '@vue/test-utils';
import test from 'ava';

import ItemView from '../../../src/pages/ItemView';

test('It should render an `<div>`.', (t) => {
  const wrapper = shallow(ItemView);

  t.true(wrapper.is('div'));
});
