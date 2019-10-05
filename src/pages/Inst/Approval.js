import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const Approval = ({app,dispatch})=>{
    return(
        <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
            <h1>指令审批页面</h1>
        </div>
    )
}

Approval.propTypes = {
    main: PropTypes.object,
    dispatch: PropTypes.func,
  }
export default connect(({main})=>({main}))(Approval);