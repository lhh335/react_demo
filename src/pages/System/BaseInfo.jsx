import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const BaseInfo = ({ app, main, dispatch }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>个人中心页面</h1>
    </div>
  )
}

BaseInfo.propTypes = {
  app: PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(BaseInfo);