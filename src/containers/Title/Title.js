/**
 * Main header of the app
 */
import { Button, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { FlexBox } from '../../components/flex';
import { ShortcutHelp } from '../../components/help/index.tsx';
import Icon from '../../components/icon/Icon';

const Title = () => {
  const [visible, setVisibility] = useState(false);

  const showHelp = () => setVisibility(true);

  return (
    <FlexBox style={{ background: 'white' }} flexWrap="wrap" flex="1" alignItems="center">
      <FlexBox style={{ marginLeft: 8 }} flex="0 1 auto" justifyContent="space-between">
        <img className="logo-image" src="./images/logo-placeholder.png" alt="logo" />
        <Tooltip title="Shortcut" overlayStyle={{ fontSize: 11 }}>
          <Button
            className="rde-action-btn"
            style={{
              color: '#0984e3',
            }}
            shape="circle"
            size="large"
            onClick={showHelp}
          >
            <Icon name="question" prefix="fas" size={0.75} />
          </Button>
        </Tooltip>
      </FlexBox>
      <Modal
        visible={visible}
        onCancel={() => setVisibility(false)}
        closable
        footer={null}
        width="50%"
      >
        <ShortcutHelp />
      </Modal>
    </FlexBox>
  );
};

export default Title;
