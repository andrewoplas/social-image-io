/**
 * Create descriptor
 * @param {string} name
 * @param {array} images
 */

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
