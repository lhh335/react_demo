import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const LogPage = ({ app, main, dispatch }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>操作日志页面</h1>
        </div>
    )
}

LogPage.propTypes = {
    app: PropTypes.object,
    main: PropTypes.object,
    dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(LogPage);