/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/**
 * Left sidebar
 */
import { message, notification, Tabs } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { v4 } from 'uuid';
import { UNSPLASH } from '../../global/config';
import CommonButton from '../common/CommonButton';
import { FlexBox } from '../flex';
import Icon from '../icon/Icon';
import TabsItem from './components/TabsItem';
import ItemBackground from './mapItems/ItemBackground';
import ItemObjects from './mapItems/ItemObjects';
import ItemStock from './mapItems/ItemStock';
import ItemText from './mapItems/ItemText';
import ItemUpload from './mapItems/ItemUpload';

notification.config({
  top: 80,
  duration: 2,
});

const unsplashService = new Unsplash({
  accessKey: UNSPLASH.ACCESS_KEY,
});

class ImageMapItems extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    descriptors: PropTypes.object,
  };

  state = {
    collapse: false,
    textSearch: '',
    activeKey: null,
    descriptors: {},
    filteredDescriptors: [],
  };

  componentDidMount() {
    const { canvasRef } = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.descriptors) !== JSON.stringify(nextProps.descriptors)) {
      const descriptors = Object.keys(nextProps.descriptors).reduce(
        (prev, key) => prev.concat(nextProps.descriptors[key]),
        [],
      );
      this.setState({
        descriptors,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state.descriptors) !== JSON.stringify(nextState.descriptors)) {
      return true;
    } else if (
      JSON.stringify(this.state.filteredDescriptors) !==
      JSON.stringify(nextState.filteredDescriptors)
    ) {
      return true;
    } else if (this.state.textSearch !== nextState.textSearch) {
      return true;
    } else if (JSON.stringify(this.state.activeKey) !== JSON.stringify(nextState.activeKey)) {
      return true;
    } else if (this.state.collapse !== nextState.collapse) {
      return true;
    }

    return false;
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

  attachEventListener = canvas => {
    canvas.canvas.wrapperEl.addEventListener('dragenter', this.events.onDragEnter, false);
    canvas.canvas.wrapperEl.addEventListener('dragover', this.events.onDragOver, false);
    canvas.canvas.wrapperEl.addEventListener('dragleave', this.events.onDragLeave, false);
    canvas.canvas.wrapperEl.addEventListener('drop', this.events.onDrop, false);
  };

  detachEventListener = canvas => {
    canvas.canvas.wrapperEl.removeEventListener('dragenter', this.events.onDragEnter);
    canvas.canvas.wrapperEl.removeEventListener('dragover', this.events.onDragOver);
    canvas.canvas.wrapperEl.removeEventListener('dragleave', this.events.onDragLeave);
    canvas.canvas.wrapperEl.removeEventListener('drop', this.events.onDrop);
  };

  handlers = {
    onAddItem: (item, centered) => {
      const { canvasRef } = this.props;
      if (canvasRef.handler.workarea.layout === 'responsive') {
        if (!canvasRef.handler.workarea.isElement) {
          notification.warn({
            message: 'Please your select background image',
          });
          return;
        }
      }
      if (canvasRef.handler.interactionMode === 'polygon') {
        message.info('Already drawing');
        return;
      }
      const id = v4();
      const option = Object.assign({}, item?.option, { id });
      if (item?.option?.type === 'svg' && item.type === 'default') {
        this.handlers.onSVGModalVisible(item.option);
        return;
      }

      canvasRef.handler.add(option, centered);
    },
    onChangeTab: activeKey => {
      this.setState({ activeKey, collapse: true });
    },
    onCollapse: () => {
      this.setState(previousState => ({
        collapse: !previousState.collapse,
        activeKey: null,
      }));
    },
    transformList: () =>
      Object.values(this.props.descriptors).reduce((prev, curr) => prev.concat(curr), []),
  };

  events = {
    onDragStart: (e, item) => {
      this.item = item;
      const { target } = e;
      target.classList.add('dragging');
    },
    onDragOver: e => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'copy';
      return false;
    },
    onDragEnter: e => {
      const { target } = e;
      target.classList.add('over');
    },
    onDragLeave: e => {
      const { target } = e;
      target.classList.remove('over');
    },
    onDrop: e => {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      const { layerX, layerY } = e;
      const dt = e.dataTransfer;
      if (dt.types.length && dt.types[0] === 'Files') {
        const { files } = dt;
        Array.from(files).forEach(file => {
          file.uid = v4();
          const { type } = file;
          if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
            const item = {
              option: {
                type: 'image',
                file,
                left: layerX,
                top: layerY,
              },
            };
            this.handlers.onAddItem(item, false);
          } else {
            notification.warn({
              message: 'Not supported file type',
            });
          }
        });
        return false;
      }
      const option = Object.assign({}, this.item.option, { left: layerX, top: layerY });
      const newItem = Object.assign({}, this.item, { option });
      this.handlers.onAddItem(newItem, false);
      return false;
    },
    onDragEnd: e => {
      this.item = null;
      e.target.classList.remove('dragging');
    },
  };

  renderItems = items => (
    <FlexBox flexWrap="wrap" flexDirection="column" style={{ width: '100%' }}>
      {items.map(item => this.renderItem(item))}
    </FlexBox>
  );

  renderItem = (item, centered) => (
    <div
      key={item.name}
      draggable
      onClick={e => this.handlers.onAddItem(item, centered)}
      onDragStart={e => this.events.onDragStart(e, item)}
      onDragEnd={e => this.events.onDragEnd(e, item)}
      className={classnames('rde-editor-items-item', {
        'rde-editor-items-item-image': item.type === 'image',
      })}
      style={{ justifyContent: this.state.collapse ? 'center' : null }}
    >
      {item.type === 'image' ? (
        <div className="rde-editor-items-item-thumbnail">
          <img src={item?.option?.src} />
        </div>
      ) : (
        <>
          <span className="rde-editor-items-item-icon">
            <Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
          </span>
          {this.state.collapse ? null : (
            <div className="rde-editor-items-item-text">{item.name}</div>
          )}
        </>
      )}
    </div>
  );

  // imageUploadHandler = {
  //   onOk: () => {
  //     const { imageLoadType, imageFile, imageSrc } = this.state;

  //     if ((imageLoadType === 'file' && !imageFile) || (imageLoadType === 'src' && !imageSrc)) {
  //       message.error('No image to upload');
  //       return;
  //     }

  //     this.handlers.onAddItem({
  //       name: 'Image',
  //       type: 'image',
  //       option: {
  //         type: 'image',
  //         name: 'New image',
  //         [imageLoadType]: imageLoadType === 'file' ? imageFile : imageSrc,
  //       },
  //     });

  //     this.setState({
  //       imageLoadType: 'file',
  //       imageFile: null,
  //       imageFileBase64: null,
  //       imageSrc: '',
  //       imageUploadModalVisible: false,
  //     });
  //   },
  //   onCancel: () => this.setState({ imageUploadModalVisible: false }),
  //   onChange: (key, value) => {
  //     this.setState({ [key]: value });

  //     if (key === 'imageFile') {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(value);
  //       reader.onload = () => this.setState({ imageFileBase64: reader.result });
  //     }
  //   },
  //   onRemove: () => {
  //     this.setState({
  //       imageFile: null,
  //       imageFileBase64: null,
  //     });
  //   },
  // };

  render() {
    const { descriptors, canvasRef } = this.props;
    const { collapse, activeKey } = this.state;
    const { onChangeTab, onCollapse } = this.handlers;
    const className = classnames('rde-editor-items');
    return (
      <div className={className}>
        <CommonButton
          className="rde-action-btn"
          shape="circle"
          icon={collapse ? 'angle-double-right' : 'angle-double-left'}
          onClick={onCollapse}
          style={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
        />
        <Tabs
          tabPosition="left"
          style={{ height: '100%' }}
          activeKey={activeKey}
          onChange={onChangeTab}
          tabBarStyle={{ marginTop: 60 }}
        >
          <Tabs.TabPane tab={<TabsItem iconName="font" tabName="Text" />} key="text">
            <ItemText
              onAdd={this.handlers.onAddItem}
              onDragStart={this.events.onDragStart}
              onDragEnd={this.events.onDragEnd}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab={<TabsItem iconName="image" tabName="Bkground" />} key="background">
            <ItemBackground
              onAdd={this.handlers.onAddItem}
              onDragStart={this.events.onDragStart}
              onDragEnd={this.events.onDragEnd}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab={<TabsItem iconName="shapes" tabName="Objects" />} key="objects">
            <ItemObjects />
          </Tabs.TabPane>

          <Tabs.TabPane tab={<TabsItem iconName="camera-retro" tabName="Stock" />} key="stock">
            <ItemStock
              onAdd={this.handlers.onAddItem}
              onDragStart={this.events.onDragStart}
              onDragEnd={this.events.onDragEnd}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={<TabsItem iconName="cloud-upload-alt" tabName="Upload" />}
            key="upload"
          >
            <ItemUpload
              onAdd={this.handlers.onAddItem}
              onDragStart={this.events.onDragStart}
              onDragEnd={this.events.onDragEnd}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ImageMapItems;
