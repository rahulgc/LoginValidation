import { useState, useEffect } from "react";

export function SignUp() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [userInfo, setuserInfo] = useState(initialValues);
  const [i, setI] = useState(1);
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(userInfo));
    setSubmit(true);
    console.log(errors.length);
  };
  useEffect(() => {
    if (Object.keys(errors).length == 0 && submit) {
      setI(i + 1);
      localStorage.setItem(i, JSON.stringify(userInfo));
      console.log("Success");
      document.getElementById("display").innerHTML = "SignUp Successful !";
    }
  }, [errors]);
  const validateInfo = (info) => {
    const errors = {};
    for (let i = 1; i <= localStorage.length; i++) {
      console.log(JSON.parse(localStorage.getItem(i)));
      if (JSON.parse(localStorage.getItem(i)).email === info.email) {
        errors.email = "User already has a account with given email!";
      }
    }
    return errors;
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up Page</h1>
        <div>
          <input
            className="email"
            type="text"
            placeholder="FirstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
          />
          <br />
          {/* <p>{error.email}</p> */}
        </div>
        <div>
          <input
            className="password"
            type="text"
            placeholder="LastName"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="email"
            type="email"
            placeholder="Email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <br />
        </div>
        <div>
          <input
            className="password"
            type="password"
            placeholder="Create Password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <br />
          {/* <p>{error.password}</p> */}
        </div>
        <div>
          <button className="button" type="submit">
            SignUp
          </button>
        </div>
      </form>
      <div id="display">
        <p>{errors.email}</p>
      </div>
    </div>
  );
}
