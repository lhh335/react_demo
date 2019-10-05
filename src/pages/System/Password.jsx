import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const PwdInfo = ({ app, main, dispatch }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>修改密码页面</h1>
        </div>
    )
}

PwdInfo.propTypes = {
    app: PropTypes.object,
    main: PropTypes.object,
    dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(PwdInfo);