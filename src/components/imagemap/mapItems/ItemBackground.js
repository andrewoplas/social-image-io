/* eslint-disable indent */
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { UNSPLASH } from '../../../global/config';
import { getImageItem } from '../../../utils/functions';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';
import Icon from '../../icon/Icon';
import BackgroundSection from '../components/BackgroundSection';
import CustomGallery from '../components/CustomGallery';
import RecentlyUsedSection from '../components/RecentlyUsedSection';
import CustomSpinner from '../components/CustomSpinner';

const unsplashService = new Unsplash({
  accessKey: UNSPLASH.ACCESS_KEY,
});

const keywords = {
  PATTERN: 'pattern',
  TEXTURE: 'texture',
  BACKGROUND: 'background',
};

const ItemBackground = ({ onAdd, onDragStart, onDragEnd }) => {
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [seeAllKeyword, setSeeAllKeyword] = useState(null);
  const [pattern, setPattern] = useState({ page: 1, images: [], loading: false });
  const [texture, setTexture] = useState({ page: 1, images: [], loading: false });
  const [background, setBackground] = useState({ page: 1, images: [], loading: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    onSearch(keywords.BACKGROUND, background.page);
    onSearch(keywords.PATTERN, pattern.page);
    onSearch(keywords.TEXTURE, texture.page);
  }, []);

  const onSearch = (keyword, selectedPage) => {
    if (selectedPage === 1) {
      setImages(keyword, []);
    }

    setLoading(keyword, true);

    unsplashService.search
      .photos(keyword, selectedPage, UNSPLASH.MAX_PAGES)
      .then(toJson)
      .then(data => {
        const addedImages = data?.results.map(result => ({
          key: result?.id,
          width: result?.width,
          height: result?.height,
          alt: result?.alt_description,
          thumbnail: result?.urls?.thumb,
          src: result?.urls?.small,
          imageItem: getImageItem(result?.urls?.small),
        }));

        addPage(keyword);
        setImages(keyword, addedImages, true);
        setLoading(keyword, false);
      })
      .catch(() => {
        setError('An error occurred while fetching in to our server.');
      });
  };

  const getStateFunction = keyword => {
    switch (keyword) {
      case keywords.BACKGROUND:
        return setBackground;
      case keywords.PATTERN:
        return setPattern;
      case keywords.TEXTURE:
        return setTexture;
      default:
        return null;
    }
  };

  const getState = keyword => {
    switch (keyword) {
      case keywords.BACKGROUND:
        return background;
      case keywords.PATTERN:
        return pattern;
      case keywords.TEXTURE:
        return texture;
      default:
        return null;
    }
  };

  const setImages = (keyword, images, includePrevious = false) => {
    const setState = getStateFunction(keyword);
    setState(previousState => ({
      ...previousState,
      images: [...(includePrevious ? previousState.images : []), ...images],
    }));
  };

  const setLoading = (keyword, loading) => {
    const setState = getStateFunction(keyword);
    setState(previousState => ({
      ...previousState,
      loading,
    }));
  };

  const addPage = (keyword, page = null) => {
    // If not null, set to given page
    const setState = getStateFunction(keyword);
    setState(previousState => ({
      ...previousState,
      page: page === null ? previousState.page + 1 : page,
    }));
  };

  return error === null ? (
    <FlexBox flexDirection="column" style={{ height: '100%', width: '100%' }}>
      {seeAllKeyword && (
        <button type="button" className="see-all-back" onClick={() => setSeeAllKeyword(null)}>
          <Icon name="arrow-left" /> Back
        </button>
      )}

      <Scrollbar
        onScrollBottom={
          seeAllKeyword !== null
            ? () => {
                onSearch(seeAllKeyword, getState(seeAllKeyword).page);
              }
            : undefined
        }
      >
        {seeAllKeyword === null ? (
          <>
            <BackgroundSection
              title="Backgrounds"
              images={background.images}
              onSeeAll={() => setSeeAllKeyword(keywords.BACKGROUND)}
              onClick={onAdd}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
            <BackgroundSection
              title="Patterns"
              images={pattern.images}
              onSeeAll={() => setSeeAllKeyword(keywords.PATTERN)}
              onClick={onAdd}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
            <BackgroundSection
              title="Textures"
              images={texture.images}
              onSeeAll={() => setSeeAllKeyword(keywords.TEXTURE)}
              onClick={onAdd}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          </>
        ) : (
          <>
            <CustomGallery
              photos={getState(seeAllKeyword)?.images || []}
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
          </>
        )}

        {seeAllKeyword && <CustomSpinner loading={getState(seeAllKeyword).loading} />}
      </Scrollbar>
    </FlexBox>
  ) : (
    <Alert message="Error" description={error} type="error" showIcon />
  );
};

ItemBackground.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default ItemBackground;
