import React from 'react';
import { Form, Input, Radio, Row, Col, InputNumber, Tooltip } from 'antd';
import { sizeTypes, sizeTypeDimensions } from '../../../global/variables';

export default {
  render(canvasRef, form, data) {
    const { getFieldDecorator } = form;
    if (!data) {
      return null;
    }
    const layout = data.layout || 'fixed';
    return (
      <React.Fragment>
        <Form.Item label="Name" colon={false}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: false,
                message: 'Please enter a name',
              },
            ],
            initialValue: data.name || '',
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Number of Slides" colon={false}>
          {getFieldDecorator('slides', {
            rules: [
              {
                required: false,
                message: 'Please enter a number of slides',
              },
            ],
            initialValue: data.slides,
          })(<InputNumber max={10} min={1} />)}
        </Form.Item>

        <Form.Item label="Size" colon={false}>
          {getFieldDecorator('sizeType', {
            initialValue: data.sizeType,
          })(
            <Radio.Group>
              <Tooltip
                title={`${sizeTypeDimensions.LANDSCAPE.width} x ${sizeTypeDimensions.LANDSCAPE.height}`}
              >
                <Radio.Button value={sizeTypes.LANDSCAPE}>Landscape</Radio.Button>
              </Tooltip>
              <Tooltip
                title={`${sizeTypeDimensions.SQUARE.width} x ${sizeTypeDimensions.SQUARE.height}`}
              >
                <Radio.Button value={sizeTypes.SQUARE}>Square</Radio.Button>
              </Tooltip>
              <Tooltip
                title={`${sizeTypeDimensions.PORTRAIT.width} x ${sizeTypeDimensions.PORTRAIT.height}`}
              >
                <Radio.Button value={sizeTypes.PORTRAIT}>Portrait</Radio.Button>
              </Tooltip>
            </Radio.Group>,
          )}
        </Form.Item>
        {layout === 'fixed' ? (
          <React.Fragment>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Width" colon={false}>
                  {getFieldDecorator('slidesWidth', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: data.slidesWidth,
                  })(<Input readOnly />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Height" colon={false}>
                  {getFieldDecorator('height', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                    initialValue: data.height * data.scaleY,
                  })(<Input readOnly />)}
                </Form.Item>
              </Col>
            </Row>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  },
};
