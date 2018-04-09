import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const Menu1 = ({app,main,dispatch})=>{
    console.log(app,main,'app/main');
   
    return(
        <div>
            <h1 style={{textAlign:'center'}}>页面一</h1>
            <div style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
                <span>状态:{app.data.code}</span>
                <span>信息:{app.data.msg}</span>
            </div>
        </div>
    )
}

Menu1.propTypes = {
    app: PropTypes.object,
    main: PropTypes.object,
    dispatch: PropTypes.func,
  }
export default connect(({app,main})=>({app,main}))(Menu1);