/**
 * Create descriptor
 * @param {string} name
 * @param {array} images
 */

import { sizeTypes, sizeTypeDimensions } from '../global/variables';

export const createImageDescriptors = (name, images) => ({
  [name]: images.map(({ name: optionName, src }) => ({
    name: 'Image',
    description: '',
    type: 'image',
    icon: {
      prefix: 'fas',
      name: 'image',
    },
    option: { type: 'image', name: optionName, src },
  })),
});

export const getSizeTypeDimensions = sizeType => {
  switch (sizeType) {
    case sizeTypes.LANDSCAPE:
      return sizeTypeDimensions.LANDSCAPE;
    case sizeTypes.SQUARE:
      return sizeTypeDimensions.SQUARE;
    case sizeTypes.PORTRAIT:
      return sizeTypeDimensions.PORTRAIT;
    default:
      return sizeTypeDimensions.SQUARE;
  }
};

export const getAspectRatio = (width, height) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const ratio = gcd(width, height);

  return {
    aspectWidth: width / ratio,
    aspectHeight: height / ratio,
  };
};
