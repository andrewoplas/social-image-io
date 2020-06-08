import { Form } from 'antd';
import React from 'react';
import FileUpload from '../../common/FileUpload';

export default {
  render(canvasRef, form, data) {
    const { getFieldDecorator } = form;
    if (!data) {
      return null;
    }
    const imageLoadType = data.imageLoadType || 'file';
    return (
      <React.Fragment>
        {/* <Form.Item label={i18n.t('imagemap.image.image-load-type')} colon={false}>
          {getFieldDecorator('imageLoadType', {
            initialValue: imageLoadType,
          })(
            <Radio.Group size="small">
              <Radio.Button value="file">{i18n.t('imagemap.image.file-upload')}</Radio.Button>
              <Radio.Button value="src">{i18n.t('imagemap.image.image-url')}</Radio.Button>
            </Radio.Group>,
          )}
        </Form.Item> */}
        {/* {imageLoadType === 'file' ? ( */}
        <Form.Item label="File" colon={false}>
          {getFieldDecorator('file', {
            rules: [
              {
                required: true,
                message: 'Please upload a file first',
              },
            ],
            initialValue: data.file,
          })(<FileUpload accept="image/*" />)}
        </Form.Item>
        {/* ) : (
          <Form.Item>
            {getFieldDecorator('src', {
              initialValue: data.src,
            })(<UrlModal form={form} />)}
          </Form.Item>
        )} */}
      </React.Fragment>
    );
  },
};
