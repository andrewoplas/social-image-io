/**
 * Component below the site title
 */

import PropTypes from 'prop-types';
import React from 'react';
import { FlexBox, FlexItem } from '../flex';

const ImageMapTitle = ({ title, content, action, children }) =>
  children || (
    <FlexBox className="rde-content-layout-title" alignItems="center" flexWrap="wrap">
      <FlexItem flex="0 1 auto">
        <FlexBox
          className="rde-content-layout-title-title"
          justifyContent="flex-start"
          alignItems="center"
        >
          {title instanceof String ? <h3>{title}</h3> : title}
        </FlexBox>
      </FlexItem>
      <FlexItem flex="auto">
        <FlexBox className="rde-content-layout-title-content" alignItems="center">
          {content}
        </FlexBox>
      </FlexItem>
      <FlexItem flex="auto">
        <FlexBox
          className="rde-content-layout-title-action"
          justifyContent="flex-end"
          alignItems="center"
        >
          {action}
        </FlexBox>
      </FlexItem>
    </FlexBox>
  );

ImageMapTitle.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  action: PropTypes.any,
  children: PropTypes.any,
};

export default ImageMapTitle;
