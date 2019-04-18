import React from 'react';
import {connect}  from 'dva';



const Practice = ({app,dispatch})=>{
    function changeState(){
        dispatch({type:'app/practice'});
        // request('https://localhost:8005',{method:'GET',origin:'https://localhost:8005',mode:'cors',credentials:'include'});
    }
    return (
        <div>
            <h3>点击次数</h3>
            <h2>{app.myState}</h2>
            <button style={{width:'40px',height:'30px'}} onClick={changeState}>点击</button>
        </div>
    )
}

export default connect(({app})=>({app}))(Practice);