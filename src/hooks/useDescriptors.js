/* eslint-disable no-underscore-dangle */
// use-body-scroll-position.js
import { createImageDescriptors } from '../utils/functions';

export default () => {
  const getDescriptors = callback => {
    const data = {
      Tools: tools,
      'My Images': createImageDescriptors(myImages),
      'Stock Images': createImageDescriptors(stockImages),
      Unsplash: createImageDescriptors(unsplashImages),
    };

    callback(data);
  };

  return getDescriptors;
};

const tools = [
  {
    name: 'Text',
    description: '',
    type: 'text',
    icon: {
      prefix: 'fas',
      name: 'font',
    },
    option: {
      type: 'textbox',
      text: 'Text Here',
      width: 60,
      height: 30,
      fontSize: 32,
      name: 'New text',
    },
  },
  {
    name: 'Image',
    description: '',
    type: 'modal-button',
    icon: {
      prefix: 'fas',
      name: 'image',
    },
    option: {
      type: 'modal-button',
    },
  },
];

const myImages = [];

const stockImages = [];

const unsplashImages = [];
