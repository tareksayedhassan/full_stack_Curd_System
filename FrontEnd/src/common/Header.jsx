import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"add/post"}>Add </Link>
        </li>
        <li>
          <Link to={"update/post"}>Update</Link>
        </li>
        <li className="login">login</li>
      </ul>
    </div>
  );
};

export default Header;
