import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';
import Icon from '../../icon/Icon';

const BackgroundSection = ({ title, images, onSeeAll, onClick, onDragStart, onDragEnd }) =>
  images?.length > 0 ? (
    <div style={{ padding: '0 5px' }}>
      <FlexBox alignItems="center" justifyContent="space-between">
        <span className="section-header">{title}</span>
        <button type="button" className="see-all" onClick={onSeeAll}>
          See More <Icon name="long-arrow-right" />
        </button>
      </FlexBox>
      <FlexBox style={{ height: '90px', width: '100%', marginBottom: '20px' }}>
        <Scrollbar orientation="horizontal">
          <FlexBox flexDirection="row" style={{ height: '100%' }}>
            {images.map(image => (
              <img
                className="thumbnail-horizontal"
                key={image.key}
                src={image.thumbnail}
                alt={image.alt}
                onClick={() => onClick(image.imageItem, true)}
                onDragStart={e => onDragStart(e, image.imageItem)}
                onDragEnd={e => onDragEnd(e, image.imageItem)}
                draggable
              />
            ))}
          </FlexBox>
        </Scrollbar>
      </FlexBox>
    </div>
  ) : null;

BackgroundSection.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onSeeAll: PropTypes.func.isRequired,
};

export default BackgroundSection;
