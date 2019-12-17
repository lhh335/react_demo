import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
function Overview() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
      <h1>资金转账页面</h1>
    </div>
  )
}

Overview.propTypes = {
  app: PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(Overview);