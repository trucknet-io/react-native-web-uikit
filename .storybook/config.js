import { configure } from '@storybook/react';
import './addons';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
