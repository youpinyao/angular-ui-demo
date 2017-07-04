import sample from '../pages/sample';
import sample1 from '../pages/sample/sample1';
import sample11 from '../pages/sample/sample1/sample11';

import sample2 from '../pages/sample/sample2';

const routers = [{
  title: 'sample',
  state: 'sample',
  url: '/sample',
  ...sample,
  routers: [{
    title: 'sample1',
    state: 'sample.sample1',
    url: '/sample1',
    ...sample1,
    routers: [{
      title: 'sample11',
      state: 'sample.sample1.sample11',
      url: '/sample11',
      ...sample11,
    }],
  }, {
    title: 'sample2',
    state: 'sample.sample2',
    url: '/sample2',
    ...sample2,
  }]
}];

module.exports = routers;
export default routers;
