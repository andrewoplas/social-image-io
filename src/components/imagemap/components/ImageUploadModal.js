import { Form, Modal } from 'antd';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { FileUpload } from '../../common';
import ImageUploadPreview from '../../common/ImageUploadPreview';

const ImageUploadModal = ({ visible, onRemove, onCancel, onOk, onChange, imageFileBase64 }) => (
  <Modal title="Upload Image" visible={visible} onCancel={onCancel} onOk={onOk} closable>
    <React.Fragment>
      {/* <Form.Item label={i18n.t('imagemap.image.image-load-type')} colon={false}>
              <Radio.Group
                size="small"
                onChange={e => this.onChange('imageLoadType', e.target.value)}
                defaultValue={imageLoadType}
              >
                <Radio.Button value="file">{i18n.t('imagemap.image.file-upload')}</Radio.Button>
                <Radio.Button value="src">{i18n.t('imagemap.image.image-url')}</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
      {/* {imageLoadType === 'file' ? ( */}
      <Form.Item label={i18n.t('common.file')} colon={false}>
        {imageFileBase64 ? (
          <ImageUploadPreview imageBase64={imageFileBase64} onRemove={onRemove} />
        ) : (
          <FileUpload accept="image/*" onChange={file => onChange('imageFile', file)} />
        )}
      </Form.Item>
      {/* ) : (
              <Form.Item label={i18n.t('common.url')} colon={false}>
                <Input onChange={e => this.onChange('imageSrc', e.target.value)} />
              </Form.Item>
            )} */}
    </React.Fragment>
  </Modal>
);

ImageUploadModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  imageFileBase64: PropTypes.string,
};

export default ImageUploadModal;
