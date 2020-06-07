/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import Gallery from 'react-photo-gallery';

const CustomGallery = ({ photos, onClick, onDragStart, onDragEnd }) =>
  photos.length > 0 ? (
    <Gallery
      photos={photos}
      columns={2}
      direction="column"
      margin={5}
      renderImage={({ margin, photo, left, top }) => (
        <div
          className="image-item"
          key={photo.key}
          role="button"
          tabIndex={0}
          style={{
            position: 'absolute',
            margin,
            width: photo.width,
            height: photo.height,
            left,
            top,
          }}
          onClick={() => onClick(photo.src, photo)}
          onDragStart={e => onDragStart(e, photo.src)}
          onDragEnd={e => onDragEnd(e, photo.src)}
          draggable
        >
          <img
            className="thumbnail"
            src={photo.thumbnail}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        </div>
      )}
    />
  ) : null;

CustomGallery.propTypes = {
  photos: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default CustomGallery;
