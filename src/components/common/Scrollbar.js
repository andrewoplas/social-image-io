import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

class Scrollbar extends Component {
  constructor(props) {
    super(props);
    this.scrollbarRef = React.createRef();
  }

  handleScrollAtBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = this.scrollbarRef.current.getValues();
    if (Math.round(scrollTop + clientHeight) >= scrollHeight) {
      this.props.onScrollBottom();
    }
  };

  renderTrackVertical = props => <div {...props} className="rde-track-vertical" />;

  renderTrackHorizontal = props => <div {...props} className="rde-track-horizontal" />;

  render() {
    const { children, onScrollBottom, orientation } = this.props;
    return (
      <Scrollbars
        ref={this.scrollbarRef}
        onScroll={onScrollBottom ? this.handleScrollAtBottom : null}
        renderTrackVertical={orientation === 'vertical' ? this.renderTrackVertical : undefined}
        renderTrackHorizontal={
          orientation === 'horizontal' ? this.renderTrackHorizontal : undefined
        }
      >
        {children}
      </Scrollbars>
    );
  }
}

Scrollbar.defaultProps = {
  orientation: 'vertical',
};

Scrollbar.propTypes = {
  children: PropTypes.any,
  onScrollBottom: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default Scrollbar;
