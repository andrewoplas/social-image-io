import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { FlexBox } from '../../flex';

const CustomSpinner = ({ loading }) =>
  loading ? (
    <FlexBox
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 20, marginBottom: 30 }}
    >
      <Spin />
    </FlexBox>
  ) : null;

CustomSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default CustomSpinner;
