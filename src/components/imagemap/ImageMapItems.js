/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/**
 * Left sidebar
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, notification, Input, message, Modal, Form, Radio } from 'antd';
import { v4 } from 'uuid';
import classnames from 'classnames';
import i18n from 'i18next';

import { FlexBox } from '../flex';
import Icon from '../icon/Icon';
import Scrollbar from '../common/Scrollbar';
import CommonButton from '../common/CommonButton';
import { SVGModal, FileUpload, UrlModal } from '../common';
import ImageProperty from './properties/ImageProperty';
import ImageUploadPreview from '../common/ImageUploadPreview';

notification.config({
  top: 80,
  duration: 2,
});

class ImageMapItems extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    descriptors: PropTypes.object,
  };

  state = {
    collapse: false,
    textSearch: '',
    descriptors: {},
    filteredDescriptors: [],
    svgModalVisible: false,
    imageUploadModalVisible: false,
    imageLoadType: 'file',
    imageFile: null,
    imageFileBase64: null,
    imageSrc: '',
  };

  componentDidMount() {
    const { canvasRef } = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.descriptors) !== JSON.stringify(nextProps.descriptors)) {
      const descriptors = Object.keys(nextProps.descriptors).reduce((prev, key) => {
        return prev.concat(nextProps.descriptors[key]);
      }, []);
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
    } else if (this.state.svgModalVisible !== nextState.svgModalVisible) {
      return true;
    } else if (this.state.imageUploadModalVisible !== nextState.imageUploadModalVisible) {
      return true;
    } else if (this.state.imageLoadType !== nextState.imageLoadType) {
      return true;
    } else if (this.state.imageFile !== nextState.imageFile) {
      return true;
    } else if (this.state.imageSrc !== nextState.imageSrc) {
      return true;
    } else if (this.state.imageFileBase64 !== nextState.imageFileBase64) {
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

  /* eslint-disable react/sort-comp, react/prop-types */
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
      const option = Object.assign({}, item.option, { id });
      if (item.option.type === 'svg' && item.type === 'default') {
        this.handlers.onSVGModalVisible(item.option);
        return;
      }

      if (item.option.type === 'modal-button') {
        this.setState({ imageUploadModalVisible: true });
        return;
      }

      canvasRef.handler.add(option, centered);
    },
    onAddSVG: (option, centered) => {
      const { canvasRef } = this.props;
      canvasRef.handler.add({ ...option, type: 'svg', id: v4(), name: 'New SVG' }, centered);
      this.handlers.onSVGModalVisible();
    },
    onDrawingItem: item => {
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
      if (item.option.type === 'line') {
        canvasRef.handler.drawingHandler.line.init();
      } else if (item.option.type === 'arrow') {
        canvasRef.handler.drawingHandler.arrow.init();
      } else {
        canvasRef.handler.drawingHandler.polygon.init();
      }
    },
    onChangeActiveKey: activeKey => {
      this.setState({
        activeKey,
      });
    },
    onCollapse: () => {
      this.setState({
        collapse: !this.state.collapse,
      });
    },
    onSearchNode: e => {
      const filteredDescriptors = this.handlers
        .transformList()
        .filter(descriptor => descriptor.name.toLowerCase().includes(e.target.value.toLowerCase()));
      this.setState({
        textSearch: e.target.value,
        filteredDescriptors,
      });
    },
    transformList: () => {
      return Object.values(this.props.descriptors).reduce((prev, curr) => prev.concat(curr), []);
    },
    onSVGModalVisible: () => {
      this.setState(prevState => {
        return {
          svgModalVisible: !prevState.svgModalVisible,
        };
      });
    },
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

  onChangeUpload = (key, value) => {
    this.setState({ [key]: value });

    if (key === 'imageFile') {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = () => this.setState({ imageFileBase64: reader.result });
    }
  };

  removeUploadedFile = () => {
    this.setState({
      imageFile: null,
      imageFileBase64: null,
    });
  };

  onOk = () => {
    const { imageLoadType, imageFile, imageSrc } = this.state;

    if ((imageLoadType === 'file' && !imageFile) || (imageLoadType === 'src' && !imageSrc)) {
      message.error('No image to upload');
      return;
    }

    this.handlers.onAddItem({
      name: 'Image',
      type: 'image',
      option: {
        type: 'image',
        name: 'New image',
        [imageLoadType]: imageLoadType === 'file' ? imageFile : imageSrc,
      },
    });

    this.setState({
      imageLoadType: 'file',
      imageFile: null,
      imageFileBase64: null,
      imageSrc: '',
      imageUploadModalVisible: false,
    });
  };

  render() {
    const { descriptors, form, canvasRef } = this.props;
    const {
      collapse,
      textSearch,
      filteredDescriptors,
      activeKey,
      svgModalVisible,
      svgOption,
      imageUploadModalVisible,
      imageLoadType,
      imageFile,
      imageSrc,
      imageFileBase64,
    } = this.state;
    const className = classnames('rde-editor-items', {
      minimize: collapse,
    });
    return (
      <div className={className}>
        <FlexBox flex="1" flexDirection="column" style={{ height: '100%', background: 'white' }}>
          <Scrollbar>
            <FlexBox flex="1" style={{ overflowY: 'hidden' }}>
              {(textSearch.length && this.renderItems(filteredDescriptors)) ||
                (collapse ? (
                  <FlexBox
                    flexWrap="wrap"
                    flexDirection="column"
                    style={{ width: '100%' }}
                    justifyContent="center"
                  >
                    {this.handlers.transformList().map(item => this.renderItem(item))}
                  </FlexBox>
                ) : (
                  <Collapse
                    style={{ width: '100%' }}
                    bordered={false}
                    defaultActiveKey={Object.keys(descriptors)?.[0]}
                    onChange={this.handlers.onChangeActiveKey}
                    accordion
                  >
                    {Object.keys(descriptors).map(key => (
                      <Collapse.Panel
                        key={key}
                        header={key}
                        style={{ borderBottomColor: '#f1f1f1', padding: 0 }}
                        showArrow
                      >
                        {this.renderItems(descriptors[key])}
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                ))}
            </FlexBox>
          </Scrollbar>
        </FlexBox>
        <SVGModal
          visible={svgModalVisible}
          onOk={this.handlers.onAddSVG}
          onCancel={this.handlers.onSVGModalVisible}
          option={svgOption}
        />
        <Modal
          title="Upload Image"
          visible={imageUploadModalVisible}
          onCancel={() => this.setState({ imageUploadModalVisible: false })}
          onOk={this.onOk}
          closable
        >
          <React.Fragment>
            {/* <Form.Item label={i18n.t('imagemap.image.image-load-type')} colon={false}>
              <Radio.Group
                size="small"
                onChange={e => this.onChangeUpload('imageLoadType', e.target.value)}
                defaultValue={imageLoadType}
              >
                <Radio.Button value="file">{i18n.t('imagemap.image.file-upload')}</Radio.Button>
                <Radio.Button value="src">{i18n.t('imagemap.image.image-url')}</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            {/* {imageLoadType === 'file' ? ( */}
            <Form.Item label={i18n.t('common.file')} colon={false}>
              {imageFileBase64 ? (
                <ImageUploadPreview
                  imageBase64={imageFileBase64}
                  onRemove={this.removeUploadedFile}
                />
              ) : (
                <FileUpload
                  accept="image/*"
                  onChange={file => this.onChangeUpload('imageFile', file)}
                />
              )}
            </Form.Item>
            {/* ) : (
              <Form.Item label={i18n.t('common.url')} colon={false}>
                <Input onChange={e => this.onChangeUpload('imageSrc', e.target.value)} />
              </Form.Item>
            )} */}
          </React.Fragment>
        </Modal>
      </div>
    );
  }
}

export default ImageMapItems;
