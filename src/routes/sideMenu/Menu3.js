import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const Menu3 = ({app,dispatch})=>{
    return(
        <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
            <h1>页面三</h1>
        </div>
    )
}

Menu3.propTypes = {
    main: PropTypes.object,
    dispatch: PropTypes.func,
  }
export default connect(({main})=>({main}))(Menu3);