/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { Scrollbar } from '../../common';
import { FlexBox } from '../../flex';
import { getTextItem } from '../../../utils/functions';

import Fonts from '../../font/fonts';
const fonts = Fonts.getGoogleFonts();

const ItemText = ({ onAdd, onDragStart, onDragEnd }) => (
  <FlexBox style={{ height: '100%' }}>
    <Scrollbar>
      {sortBy(fonts, ['name']).map(({ name }) => (
        <div
          key={name}
          className="item-text"
          style={{ fontFamily: name }}
          onClick={() => onAdd(getTextItem(name), true)}
          onDragStart={e => onDragStart(e, getTextItem(name))}
          onDragEnd={e => onDragEnd(e, getTextItem(name))}
          draggable
        >
          {name}
        </div>
      ))}
    </Scrollbar>
  </FlexBox>
);

ItemText.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default ItemText;
