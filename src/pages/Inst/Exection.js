import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";

const Exection = ({ app, dispatch }) => {
  return (
    <div
      style={{ width: "100%", display: "flex", justifyContent: "space-around" }}
    >
      <h1>指令执行页面</h1>
    </div>
  );
};

Exection.propTypes = {
  main: PropTypes.object,
  dispatch: PropTypes.func
};
export default connect(({ main }) => ({ main }))(Exection);
