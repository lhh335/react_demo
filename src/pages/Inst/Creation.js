import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const Creation = ({app,dispatch})=>{
    return(
        <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
            <h1>指令创建页面</h1>
        </div>
    )
}

Creation.propTypes = {
    main: PropTypes.object,
    dispatch: PropTypes.func,
  }
export default connect(({main})=>({main}))(Creation);