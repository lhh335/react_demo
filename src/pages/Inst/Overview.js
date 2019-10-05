import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

const Overview = ({ app, main, dispatch }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>指令总览页面</h1>
        </div>
    )
}

Overview.propTypes = {
    app: PropTypes.object,
    main: PropTypes.object,
    dispatch: PropTypes.func,
}
export default connect(({ app, main }) => ({ app, main }))(Overview);