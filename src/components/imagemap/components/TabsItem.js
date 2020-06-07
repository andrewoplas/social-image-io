import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../icon/Icon';

const TabsItem = ({ iconName, tabName }) => (
  <React.Fragment>
    <Icon name={iconName} />
    <span style={{ display: 'block', fontSize: '10px' }}>{tabName}</span>
  </React.Fragment>
);

TabsItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
};

export default TabsItem;
