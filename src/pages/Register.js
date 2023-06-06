import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !values.email ||
      !values.password ||
      (!values.isMember && !values.name)
    ) {
      toast.error("Please fill out all fields");
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    console.log(values);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        {values.isMember ? <h3>Login</h3> : <h3>Register</h3>}
        {!values.isMember ? (
          <FormRow
            type="name"
            name="name"
            values={values.name}
            handleChange={handleChange}
          />
        ) : null}

        <FormRow
          type="email"
          name="email"
          values={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          values={values.password}
          handleChange={handleChange}
        />

        <button className="btn btn-block" type="submit">
          Submit
        </button>

        {values.isMember ? (
          <p>
            Not a member yet?{" "}
            <button type="button" className="member-btn" onClick={toggleMember}>
              {" "}
              Register
            </button>{" "}
          </p>
        ) : (
          <p>
            {" "}
            Already a member?{" "}
            <button type="button" className="member-btn" onClick={toggleMember}>
              {" "}
              Login
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
