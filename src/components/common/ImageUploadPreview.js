import PropTypes from 'prop-types';
import React from 'react';
import { Typography, Popconfirm } from 'antd';

const ImageUploadPreview = ({ imageBase64, onRemove }) => (
  <div className="image-preview">
    <Popconfirm
      placement="top"
      title="Are you sure you want to remove uploaded picture?"
      onConfirm={onRemove}
      okText="Yes"
      cancelText="No"
    >
      <div className="image-preview-container ">
        <img src={imageBase64} alt="uploaded-preview" />
      </div>
    </Popconfirm>
    <Typography.Text type="danger">Click the image to remove it.</Typography.Text>
  </div>
);

ImageUploadPreview.propTypes = {
  imageBase64: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ImageUploadPreview;
