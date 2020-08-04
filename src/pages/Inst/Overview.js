import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import WS from "../../services/websocket";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: "初始数据",
      },
    };
    this.initEvent();
  }

  initEvent = () => {
    WS.register("overview", (res) => {
      console.log("注册/接收信息成功", res);
      this.setState({
        data: res.data
      })
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <h1>{data.id}</h1>
      </div>
    );
  }
}

Overview.propTypes = {
  app: PropTypes.object,
  main: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(({ app, main }) => ({ app, main }))(Overview);
