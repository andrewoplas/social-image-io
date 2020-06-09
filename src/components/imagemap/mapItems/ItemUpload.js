import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { FileUpload } from '../../common';
import CustomGallery from '../components/CustomGallery';
import { getImageItem } from '../../../utils/functions';

const ItemUpload = ({ onAdd, onDragStart, onDragEnd }) => {
  const [images, setImages] = useState([]);

  const onUpload = value => {
    const { name } = value;

    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = e => {
      const uri = e.target.result;
      const image = new Image();
      image.src = uri;

      image.onload = () => {
        const { naturalWidth: width, naturalHeight: height } = image;

        setImages(previousImages => [
          {
            key: v4(),
            width,
            height,
            alt: name,
            thumbnail: uri,
            src: uri,
          },
          ...previousImages,
        ]);
      };
    };
  };

  return (
    <React.Fragment>
      <Form.Item>
        <FileUpload accept="image/*" onChange={file => onUpload(file)} />
      </Form.Item>

      {images.length > 0 ? (
        <>
          <span className="section-header">Uploads</span>
          <CustomGallery
            photos={images}
            onClick={(src, photo) => onAdd(getImageItem(src, photo.alt), true)}
            onDragStart={(e, src, photo) => onDragStart(e, getImageItem(src, photo.alt))}
            onDragEnd={(e, src, photo) => onDragEnd(e, getImageItem(src, photo.alt))}
          />
        </>
      ) : null}
    </React.Fragment>
  );
};

ItemUpload.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default ItemUpload;
