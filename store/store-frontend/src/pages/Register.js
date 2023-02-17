import { useEffect, useState } from "react";
import { Alert, Logo } from "../components";
import "../assets/css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [value, setValue] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = value;
    if (!email || !password || !isMember & !name) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const toggleMember = () => {
    setValue({ ...value, isMember: !value.isMember });
  };

  return (
    <div className="registerPage">
      <form onSubmit={onSubmit} className="registerForm">
        <div className="formHeader">
          <Link to="/">
            <Logo width="150px" />
          </Link>
          <h3>{value.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert alertText="x" alertType={value.alertType} />}
        </div>
        <div className="formRows">
          {value.isMember || <FormRow labelName="Name" name="name" type="text" handleChange={handleChange} />}
          <FormRow labelName="Email" name="email" type="email" handleChange={handleChange} />
          <FormRow labelName="Password" name="password" type="password" handleChange={handleChange} />
          <button className="submitButton" disabled={isLoading}>
            Submit
          </button>
          {value.isMember ? (
            <p>
              Not a member yet?{" "}
              <button className="memberLink" onClick={() => toggleMember()}>
                Register
              </button>{" "}
              instead
            </p>
          ) : (
            <p>
              Are you a member?{" "}
              <button type="button" className="memberLink" onClick={() => toggleMember()}>
                Login{" "}
              </button>
              instead.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
