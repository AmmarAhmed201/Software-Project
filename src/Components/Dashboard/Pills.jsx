import React from "react";
import "./Pills.css";
import { Link } from "react-router-dom";

const Pills = props => {
  return (
    <div className="pill pt-3">
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <Link
          className="nav-link"
          id="v-pills-Employee-tab"
          to="/profile"
          onClick={props.onClickMe}
        >
          Employee
        </Link>
        <Link
          className="nav-link"
          id="v-pills-Manager-tab"
          to="/profile"
          onClick={props.onClickMe}
        >
          Manager
        </Link>
        <Link
          className="nav-link"
          id="v-pills-HR-tab"
          to="/profile"
          onClick={props.onClickMe}
        >
          HR
        </Link>
        <Link
          className="nav-link"
          id="v-pills-CEO-tab"
          to="/profile"
          onClick={props.onClickMe}
        >
          CEO
        </Link>
      </div>
    </div>
  );
};

export default Pills;
