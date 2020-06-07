/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Col, Empty, Input, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';

function ItemStock({ onSearch, onAdd, onDragStart, onDragEnd, loading, images }) {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  const firstCol = [];
  const secondCol = [];
  images.forEach((image, index) => {
    const colNumber = index % 2;
    const imageItem = {
      name: 'Image',
      type: 'image',
      option: {
        type: 'image',
        name: 'New image',
        src: image.src,
      },
    };

    const imageElement = (
      <img
        className="thumbnail"
        key={image.id}
        src={image.thumbnail}
        alt={image.alt}
        onClick={() => {
          onAdd(imageItem, true);
          setRecentlyUsed(recents => {
            const previous = recents.filter(({ id }) => id !== image.id);
            return [{ ...image, imageItem }, ...previous];
          });
        }}
        onDragStart={e => onDragStart(e, imageItem)}
        onDragEnd={e => onDragEnd(e, imageItem)}
        draggable
      />
    );

    switch (colNumber) {
      case 0:
        firstCol.push(imageElement);
        break;
      case 1:
        secondCol.push(imageElement);
        break;
      default:
    }
  });

  console.log(recentlyUsed);

  return (
    <>
      <Input.Search
        placeholder="Search photos from Unsplash"
        onSearch={value => {
          setPage(1);
          setKeyword(value.trim());
          onSearch(value.trim(), page);
        }}
        loading={loading}
        style={{ marginBottom: '20px' }}
        enterButton
      />

      {images.length === 0 ? (
        <Empty />
      ) : (
        <FlexBox style={{ height: '100%' }}>
          <Scrollbar
            onScrollBottom={() => {
              const newPage = page + 1;
              setPage(newPage);
              onSearch(keyword, newPage);
            }}
          >
            {!!recentlyUsed?.length && (
              <>
                <span className="sectionHeader">Recently Used</span>
                <FlexBox style={{ height: '90px', width: '100%', marginBottom: '20px' }}>
                  <Scrollbar orientation="horizontal">
                    <FlexBox flexDirection="row" style={{ height: '100%' }}>
                      {recentlyUsed.map(image => (
                        <img
                          className="thumbnail-horizontal"
                          key={image.id}
                          src={image.thumbnail}
                          alt={image.alt}
                          onClick={() => {
                            onAdd(image.imageItem, true);
                          }}
                          onDragStart={e => onDragStart(e, image.imageItem)}
                          onDragEnd={e => onDragEnd(e, image.imageItem)}
                          draggable
                        />
                      ))}
                    </FlexBox>
                  </Scrollbar>
                </FlexBox>
              </>
            )}

            <Row gutter={16}>
              <Col span={12}>{firstCol}</Col>
              <Col span={12}>{secondCol}</Col>
            </Row>

            {loading && (
              <FlexBox
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: 20, marginBottom: 30 }}
              >
                <Spin />
              </FlexBox>
            )}
          </Scrollbar>
        </FlexBox>
      )}
    </>
  );
}

ItemStock.defaultProps = {
  loading: false,
  images: [],
};

ItemStock.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  images: PropTypes.array,
};

export default ItemStock;
