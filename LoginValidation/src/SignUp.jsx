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
      document.getElementById("display").innerHTML = `
      <h5>Sign Up Successsful !</h5>
      <a href="/">Log In Now</a>`
    }
  }, [errors]);
  const validateInfo = (info) => {
    const errors = {};
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log(regex.test(info.password));
    if (!info.firstName) {
      errors.firstName = "FirstName cannot be empty!";
    }
    if (!info.lastName) {
      errors.lastName = "LastName cannot be empty!";
    }
    if (!info.email) {
      errors.email = "Email cannot be empty!";
    }
    if (!info.password) {
      errors.password = "Password cannot be empty!";
    } else if (!regex.test(info.password)) {
      errors.password = `Password does not match pattern`;
    }
    for (let i = 1; i <= localStorage.length; i++) {
      console.log(JSON.parse(localStorage.getItem(i)));
      if (JSON.parse(localStorage.getItem(i)).email === info.email) {
        errors.user = "User already has a account with given email!";
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
          <p>{errors.firstName}</p>
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
          <br/>
        <p>{errors.lastName}</p>
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
          <p>{errors.email}</p>
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
          <p>{errors.password}</p>
        </div>
        <div>
          <button className="button" type="submit">
            SignUp
          </button>
        </div>
      </form>
      <div id="display">
        <p>{errors.user}</p>
      </div>
    </div>
  );
}
