import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate=useNavigate();
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
      setTimeout(()=>{
        navigate("/home");
      },1000)
    }
  }, [error]);
  const validate = (values) => {
    let errors = {};

    if (!!values.email && !!values.password ) {
      for (let i = 1; i <= localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(i)).email);
        console.log(values.email)
        if ((JSON.parse(localStorage.getItem(i)).email === values.email)&&(JSON.parse(localStorage.getItem(i)).password === values.password)) {
          return errors;
        }
      }
      errors.password="email/password is incorrect";
    }else{
      errors.email="Email and Password cannot be empty";
    }
    
    return errors;
  };
  const handleClick=(e)=>{
    e.preventDefault();
    console.log("Inside")
    navigate("/signUp");
  
  }

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
        </div>

        <div>
          <button className="button" type="submit">
            Login
          </button><br></br>
          <a onClick={handleClick} href="">SignUp</a>
        </div>
        <div id="display">
          {Object.keys(error).length!==0?<p>{error.password}</p>:""}
        </div>
      </form>
    </div>
  );
}
