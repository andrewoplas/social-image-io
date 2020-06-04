/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp, react/prop-types */
import { Button, Divider } from 'antd';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CommonButton from '../common/CommonButton';

class ImageMapFooterToolbar extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    onChangePreview: PropTypes.func,
    zoomRatio: PropTypes.number,
    onSaveImage: PropTypes.func,
    isApplying: PropTypes.bool,
  };

  state = {
    interactionMode: 'selection',
  };

  componentDidMount() {
    const { canvasRef } = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  componentWillUnmount() {
    const { canvasRef } = this.props;
    this.detachEventListener(canvasRef);
  }

  waitForCanvasRender = canvas => {
    setTimeout(() => {
      if (canvas) {
        this.attachEventListener(canvas);
        return;
      }
      const { canvasRef } = this.props;
      this.waitForCanvasRender(canvasRef);
    }, 5);
  };

  attachEventListener = canvasRef => {
    canvasRef.canvas.wrapperEl.addEventListener('keydown', this.events.keydown, false);
  };

  detachEventListener = canvasRef => {
    canvasRef.canvas.wrapperEl.removeEventListener('keydown', this.events.keydown);
  };

  handlers = {
    selection: () => {
      if (this.props.canvasRef.handler.interactionHandler.isDrawingMode()) {
        return;
      }
      this.forceUpdate();
      this.setState({ interactionMode: 'selection' });
    },
    grab: () => {
      if (this.props.canvasRef.handler.interactionHandler.isDrawingMode()) {
        return;
      }
      this.forceUpdate();
      this.setState({ interactionMode: 'grab' });
    },
  };

  events = {
    keydown: e => {
      if (this.props.canvasRef.canvas.wrapperEl !== document.activeElement) {
        return false;
      }
      if (e.keyCode === 81) {
        this.handlers.selection();
      } else if (e.keyCode === 87) {
        this.handlers.grab();
      }
    },
  };

  render() {
    const { canvasRef, zoomRatio, onChangePreview, onSaveImage, isApplying } = this.props;
    const { interactionMode } = this.state;
    const { selection, grab } = this.handlers;
    if (!canvasRef) {
      return null;
    }
    const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);
    return (
      <React.Fragment>
        <div className="rde-editor-footer-toolbar-interaction">
          <Button.Group>
            <CommonButton
              type={interactionMode === 'selection' ? 'primary' : 'default'}
              style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
              onClick={() => {
                selection();
              }}
              icon="mouse-pointer"
              tooltipTitle={i18n.t('action.selection')}
            />
            <CommonButton
              type={interactionMode === 'grab' ? 'primary' : 'default'}
              style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
              onClick={() => {
                grab();
              }}
              tooltipTitle={i18n.t('action.grab')}
              icon="hand-rock"
            />
          </Button.Group>
        </div>
        <div className="rde-editor-footer-toolbar-zoom">
          <Button.Group>
            <CommonButton
              style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomOut();
              }}
              icon="search-minus"
              tooltipTitle={i18n.t('action.zoom-out')}
            />
            <CommonButton
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomOneToOne();
              }}
              tooltipTitle={i18n.t('action.one-to-one')}
            >
              {`${zoomValue}%`}
            </CommonButton>
            <CommonButton
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomToFit();
              }}
              tooltipTitle={i18n.t('action.fit')}
              icon="expand"
            />
            <CommonButton
              style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomIn();
              }}
              icon="search-plus"
              tooltipTitle={i18n.t('action.zoom-in')}
            />
          </Button.Group>
        </div>
        <div className="rde-editor-footer-toolbar-preview">
          <Button type="primary" icon="eye" onClick={() => onChangePreview(true)}>
            Preview
          </Button>

          <Divider className="rde-editor-footer-toolbar-preview-divider" type="vertical" />

          <Button type="primary" icon="cloud-download" onClick={onSaveImage}>
            Download
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageMapFooterToolbar;
