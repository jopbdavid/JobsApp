import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, toggleSidebar } from "../features/user/userSlicer";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const state = useSelector((store) => store.user);
  const { user, isSidebarOpen } = state;
  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setToggle(false);
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={handleToggle}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>

          {toggle ? (
            <div className={toggle ? "dropdown show-dropdown" : "dropdown"}>
              <button
                type="button"
                className="dropdown-btn"
                onClick={handleLogout}
              >
                logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
