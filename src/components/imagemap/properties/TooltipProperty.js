import React from 'react';
import { Form, Switch } from 'antd';

export default {
  render(canvasRef, form, data) {
    const { getFieldDecorator } = form;
    if (!data) {
      return null;
    }
    return (
      <Form.Item label="Tooltip Enabled" colon={false}>
        {getFieldDecorator('tooltip.enabled', {
          rules: [{ type: 'boolean' }],
          valuePropName: 'checked',
          initialValue: data.tooltip.enabled,
        })(<Switch size="small" />)}
      </Form.Item>
    );
  },
};
