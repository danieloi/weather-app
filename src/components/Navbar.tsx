import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function Navbar() {
  return (
    <nav className="pa3 mw6 flex items-center justify-between flex-wrap">
      <Link className="pv2 ph3 b " to="/">
        Home
      </Link>
      <div className="ph3 pv2">
        <Searchbar />
      </div>
    </nav>
  );
}
