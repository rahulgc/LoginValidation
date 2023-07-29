import { useState, useEffect } from "react";

export default function Login() {
  const initialValues = { email: "", password: "" };
  const [formInputs, setFormInputs] = useState(initialValues);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
    console.log(formInputs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formInputs);
    console.log(errors);
    setError(errors);
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      console.log("Login Success");
      document.getElementById("display").innerHTML = "LogIn Successful !";
    }
  }, [error]);
  const validate = (values) => {
    let errors = {};
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log(regex.test(values.password));

    if (!values.email) {
      errors.email = "Email cannot be empty!";
    }
    if (!values.password) {
      errors.password = "Password cannot be empty!";
    } else if (!regex.test(values.password)) {
      errors.password = `Password does not match pattern`;
    }
    return errors;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <div>
          <input
            className="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formInputs.email}
            onChange={handleChange}
          />
          <br />
          <p>{error.email}</p>
        </div>
        <div>
          <input
            className="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formInputs.password}
            onChange={handleChange}
          />
          <br />
          <p>{error.password}</p>
        </div>

        <div>
          <button className="button" type="submit">
            Login
          </button>
        </div>
        <div id="display"></div>
      </form>
    </div>
  );
}
