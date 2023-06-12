import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlicer";

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name ? user.name : "",
    lastName: user.lastName ? user.lastName : "",
    email: user.email ? user.email : "",
    location: user.location ? user.location : "",
  });
  const { name, lastName, email, location } = userData;
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      toast.error("Please fill out all fields");
      return;
    }
    const updatedUser = { ...userData, token: user.token };
    dispatch(updateUser(updatedUser));
    return;
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            values={name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            values={lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            values={email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            values={location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {!isLoading ? "Submit" : "Loading..."}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
