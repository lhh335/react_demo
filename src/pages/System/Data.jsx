import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const DataPage = ({ app, main, dispatch }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>数据管理页面</h1>
        </div>
    )
}

DataPage.propTypes = {
    app: PropTypes.object,
    main: PropTypes.object,
    dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(DataPage);