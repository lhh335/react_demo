import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const AuthorityPage = ({ app, main, dispatch }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>权限设置页面</h1>
    </div>
  )
}

AuthorityPage.propTypes = {
  app: PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(AuthorityPage);