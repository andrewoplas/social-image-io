/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Empty, Input, message } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { UNSPLASH } from '../../../global/config';
import { getImageItem } from '../../../utils/functions';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';
import CustomGallery from '../components/CustomGallery';
import CustomSpinner from '../components/CustomSpinner';
import RecentlyUsedSection from '../components/RecentlyUsedSection';

const unsplashService = new Unsplash({
  accessKey: UNSPLASH.ACCESS_KEY,
});

function ItemStock({ onAdd, onDragStart, onDragEnd }) {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const onSearch = (searchedKeyword, selectedPage) => {
    if (searchedKeyword) {
      if (selectedPage === 1) {
        setImages([]);
      }

      setLoading(true);

      unsplashService.search
        .photos(searchedKeyword, selectedPage, 20)
        .then(toJson)
        .then(data => {
          const addedImages = data?.results.map(result => ({
            key: result?.id,
            width: result?.width,
            height: result?.height,
            alt: result?.alt_description,
            thumbnail: result?.urls?.thumb,
            src: result?.urls?.small,
          }));

          setImages(previousImages => [...previousImages, ...addedImages]);
          setLoading(false);
        });
    } else {
      message.error('No keyword inputted.');
    }
  };

  return (
    <>
      <Input.Search
        placeholder="Search photos from Unsplash"
        onSearch={value => {
          setPage(1);
          setKeyword(value.trim());
          onSearch(value.trim(), page);
        }}
        style={{ marginBottom: '20px' }}
        loading={loading}
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
            <RecentlyUsedSection
              recentlyUsed={recentlyUsed}
              onClick={onAdd}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />

            <CustomGallery
              photos={images}
              onClick={(src, photo) => {
                const imageItem = getImageItem(src);
                onAdd(imageItem, true);
                setRecentlyUsed(recents => {
                  const previous = recents.filter(({ key }) => key !== photo.key);
                  return [{ ...photo, imageItem }, ...previous];
                });
              }}
              onDragStart={(e, src) => onDragStart(e, getImageItem(src))}
              onDragEnd={(e, src) => onDragEnd(e, getImageItem(src))}
            />

            <CustomSpinner loading={loading} />
          </Scrollbar>
        </FlexBox>
      )}
    </>
  );
}

ItemStock.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default ItemStock;
