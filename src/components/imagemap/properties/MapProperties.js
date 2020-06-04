import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Collapse } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../common/Scrollbar';

const { Panel } = Collapse;

class MapProperties extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    form: PropTypes.any,
  };

  render() {
    const { canvasRef, form } = this.props;
    const showArrow = true;
    if (canvasRef) {
      return (
        <Scrollbar>
          <Form layout="horizontal">
            <Collapse bordered={false} defaultActiveKey={Object.keys(PropertyDefinition.map)?.[0]}>
              {Object.keys(PropertyDefinition.map).map(key => (
                <Panel key={key} header={PropertyDefinition.map[key].title} showArrow={showArrow}>
                  {PropertyDefinition.map[key].component.render(
                    canvasRef,
                    form,
                    canvasRef.handler.workarea,
                  )}
                </Panel>
              ))}
            </Collapse>
          </Form>
        </Scrollbar>
      );
    }
    return null;
  }
}

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    const { onChange, selectedItem } = props;
    onChange(selectedItem, changedValues, { workarea: allValues });
  },
})(MapProperties);
