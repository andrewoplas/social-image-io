/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';

const RecentlyUsedSection = ({ recentlyUsed, onClick, onDragStart, onDragEnd }) =>
  recentlyUsed?.length > 0 ? (
    <div style={{ padding: '0 5px' }}>
      <span className="section-header">Recently Used</span>
      <FlexBox style={{ height: '90px', width: '100%', marginBottom: '20px' }}>
        <Scrollbar orientation="horizontal">
          <FlexBox flexDirection="row" style={{ height: '100%' }}>
            {recentlyUsed.map(image => (
              <img
                className="thumbnail-horizontal"
                key={image.key}
                src={image.thumbnail}
                alt={image.alt}
                onClick={() => {
                  onClick(image.imageItem, true);
                }}
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

RecentlyUsedSection.propTypes = {
  recentlyUsed: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default RecentlyUsedSection;
