/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable default-case */
import { Input, Modal, Empty, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';

const UnsplashModal = ({
  visible,
  onCancel,
  onOk,
  onSearch,
  onImageClick,
  selectedImageId,
  loading,
  images,
}) => {
  const firstCol = [];
  const secondCol = [];
  const thirdCol = [];

  images.forEach((image, index) => {
    const colNumber = index % 3;
    const imageElement = (
      <img
        className={`thumbnail ${selectedImageId === image.id && 'active'}`}
        onClick={() => onImageClick(image.id, image.src)}
        key={image.id}
        src={image.thumbnail}
        alt={image.alt}
      />
    );

    switch (colNumber) {
      case 0:
        firstCol.push(imageElement);
        break;
      case 1:
        secondCol.push(imageElement);
        break;
      case 2:
        thirdCol.push(imageElement);
        break;
    }
  });

  return (
    <Modal
      className="unsplash-modal"
      title="Unsplash"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      closable
      centered
    >
      <Input.Search
        placeholder="Search from Unsplash"
        onSearch={value => onSearch(value.trim())}
        size="large"
        loading={loading}
        style={{ marginBottom: '30px' }}
        enterButton
      />

      {images.length === 0 ? (
        <Empty />
      ) : (
        <FlexBox style={{ height: '50vh' }}>
          <Scrollbar>
            <Row gutter={16}>
              <Col span={8}>{firstCol}</Col>
              <Col span={8}>{secondCol}</Col>
              <Col span={8}>{thirdCol}</Col>
            </Row>
          </Scrollbar>
        </FlexBox>
      )}
    </Modal>
  );
};

UnsplashModal.defaultProps = {
  loading: false,
  images: [],
};

UnsplashModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  images: PropTypes.array,
  onImageClick: PropTypes.func.isRequired,
  selectedImageId: PropTypes.string,
};

export default UnsplashModal;
