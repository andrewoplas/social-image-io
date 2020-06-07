import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { FileUpload } from '../../common';

const ItemUpload = ({ onAdd, onDragStart, onDragEnd }) => {
  const [images, setImages] = useState([]);

  const onUpload = value => {
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = () =>
      setImages(previousImages => [
        {
          id: v4(),
          name: 'Image',
          type: 'image',
          option: {
            type: 'image',
            name: 'New image',
            src: reader.result,
          },
        },
        ...previousImages,
      ]);
  };

  return (
    <React.Fragment>
      <Form.Item>
        <FileUpload accept="image/*" onChange={file => onUpload(file)} />
      </Form.Item>

      {!!images.length && (
        <>
          <span className="section-header">Uploads</span>
        </>
      )}
    </React.Fragment>
  );
};

ItemUpload.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default ItemUpload;
