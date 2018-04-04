import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const Menu1 = ({app,dispatch})=>{
    return(
        <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
            <h1>页面一</h1>
        </div>
    )
}

Menu1.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func,
  }
export default connect(({app})=>({app}))(Menu1);