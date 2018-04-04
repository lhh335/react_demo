import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const Menu2 = ({app,dispatch})=>{
    return(
        <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
            <h1>页面二</h1>
        </div>
    )
}

Menu2.propTypes = {
    main: PropTypes.object,
    dispatch: PropTypes.func,
  }
export default connect(({main})=>({main}))(Menu2);