// Copyright 2017-2020 @polkadot/react-api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const { React } = require('react');
const { shallow } = require('enzyme');
const Accounts = require('../src');

it('should work', function () {
  const wrapper = shallow(<Accounts/>);

  expect(wrapper).toBe(null);
});
