import { configure } from '@storybook/react';

import "./addons";

const req = require.context('../src/stories', true, /index.tsx/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

export default configure(loadStories, module);
