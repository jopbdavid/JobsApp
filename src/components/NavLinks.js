import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/userSlicer";

const NavLinks = () => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={() => dispatch(toggleSidebar())}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
