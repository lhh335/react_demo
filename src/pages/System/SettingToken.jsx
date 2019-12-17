import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const SettingToken = ({ app, main, dispatch }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>令牌设置页面</h1>
    </div>
  )
}

SettingToken.propTypes = {
  app: PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(SettingToken);