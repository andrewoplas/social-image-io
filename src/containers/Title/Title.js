import { Button, Modal, Tooltip } from 'antd';
import i18n from 'i18next';
import React, { useState } from 'react';
import { FlexBox } from '../../components/flex';
import { ShortcutHelp } from '../../components/help';
import Icon from '../../components/icon/Icon';

const Title = () => {
  const [visible, setVisibility] = useState(false);

  const showHelp = () => setVisibility(true);

  return (
    <FlexBox style={{ background: 'white' }} flexWrap="wrap" flex="1" alignItems="center">
      <FlexBox style={{ marginLeft: 8 }} flex="0 1 auto">
        <img className="logo-image" src="./images/logo-placeholder.png" alt="logo" />
        <Tooltip title={i18n.t('action.shortcut-help')} overlayStyle={{ fontSize: 11 }}>
          <Button
            className="rde-action-btn"
            style={{
              color: 'white',
            }}
            shape="circle"
            size="large"
            onClick={showHelp}
          >
            <Icon name="question" prefix="fas" size={1.5} />
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
