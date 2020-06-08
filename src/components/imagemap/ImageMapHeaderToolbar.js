import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlexBox, FlexItem } from '../flex';
import ImageMapList from './ImageMapList';
import { CommonButton } from '../common';
import Icon from '../icon/Icon';

class ImageMapHeaderToolbar extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
  };

  render() {
    const { canvasRef, selectedItem } = this.props;
    const isCropping = canvasRef ? canvasRef.handler.interactionMode === 'crop' : false;
    return (
      <FlexBox className="rde-editor-header-toolbar-container" flex="1">
        <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-list">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            icon="layer-group"
            tooltipTitle="Canvas List"
          />
          <div className="rde-canvas-list">
            <ImageMapList canvasRef={canvasRef} selectedItem={selectedItem} />
          </div>
        </FlexItem>
        <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.bringForward()}
            icon="angle-up"
            tooltipTitle="Bring Forward"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.sendBackwards()}
            icon="angle-down"
            tooltipTitle="Send Backward"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.bringToFront()}
            icon="angle-double-up"
            tooltipTitle="Bring to Front"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.sendToBack()}
            icon="angle-double-down"
            tooltipTitle="Sent to Back"
          />
        </FlexItem>
        {/* <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.alignmentHandler.left()}
            icon="align-left"
            tooltipTitle={i18n.t('action.align-left')}
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.alignmentHandler.center()}
            icon="align-center"
            tooltipTitle={i18n.t('action.align-center')}
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.alignmentHandler.right()}
            icon="align-right"
            tooltipTitle={i18n.t('action.align-right')}
          />
        </FlexItem> */}
        <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-group">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.toGroup()}
            icon="object-group"
            tooltipTitle="Group"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.toActiveSelection()}
            icon="object-ungroup"
            tooltipTitle="Ungroup"
          />
        </FlexItem>
        <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-crop">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={canvasRef ? !canvasRef.handler.cropHandler.validType() : true}
            onClick={() => canvasRef.handler.cropHandler.start()}
            icon="crop"
            tooltipTitle="Crop"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={canvasRef ? !canvasRef.handler.cropHandler.cropRect : true}
            onClick={() => canvasRef.handler.cropHandler.finish()}
            icon="check"
            tooltipTitle="Save crop image"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={canvasRef ? !canvasRef.handler.cropHandler.cropRect : true}
            onClick={() => canvasRef.handler.cropHandler.cancel()}
            icon="times"
            tooltipTitle="Cancel crop image"
          />
        </FlexItem>
        <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-operation">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.saveImage()}
            icon="image"
            tooltipTitle="Save IMage"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.duplicate()}
            icon="clone"
            tooltipTitle="Clone"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler.remove()}
            icon="trash"
            tooltipTitle="Delete"
          />
        </FlexItem>
        <FlexItem className="rde-canvas-toolbar rde-canvas-toolbar-history">
          <CommonButton
            className="rde-action-btn"
            disabled={
              isCropping || (canvasRef && !canvasRef.handler.transactionHandler.undos.length)
            }
            onClick={() => canvasRef.handler.transactionHandler.undo()}
          >
            <Icon name="undo-alt" style={{ marginRight: 8 }} />
            Undo
          </CommonButton>
          <CommonButton
            className="rde-action-btn"
            disabled={
              isCropping || (canvasRef && !canvasRef.handler.transactionHandler.redos.length)
            }
            onClick={() => canvasRef.handler.transactionHandler.redo()}
          >
            Redo
            <Icon name="redo-alt" style={{ marginLeft: 8 }} />
          </CommonButton>
        </FlexItem>
      </FlexBox>
    );
  }
}

export default ImageMapHeaderToolbar;
