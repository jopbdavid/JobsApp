import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlicer";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    } else {
      dispatch(registerUser({ name: name, email: email, password: password }));
      return;
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  // if (isLoading) {
  //   return (
  //     <Wrapper className="full-page">
  //       <h1>Page is Loading...</h1>
  //     </Wrapper>
  //   );
  // }

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

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {!isLoading ? "Submit" : "Loading..."}
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
