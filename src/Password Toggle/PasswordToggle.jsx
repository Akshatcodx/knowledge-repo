import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const PasswordToggle = () => {
  //   const [showPassword, setShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <div className="passwordToggle">
      <div className="section1">
        <h5>Password</h5>
      </div>
      <div className="inputField">
        <input type={showPassword ? "text" : "password"} className="inputBox" />
        <div
          className="passIcon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {/* <i
            className={`far icon-position ${
              showPassword ? "fa-eye fa-eye-slash" : "fa-eye-slash"
            }`}
          ></i> */}
          {/* <i
            className={
              showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
            }
          ></i> */}
          {showPassword ? <FaEyeSlash /> : <FaEye />}
          <img src={showPassword ? "" : ""} />
        </div>
      </div>
      <div className="wrapper">
        <div className="section1">
          <h5>Password</h5>
        </div>
        <div className="inputField">
          <input
            className="inputBox"
            type={showPassword?.password ? "text" : "password"}
          />
          <div
            className="passIcon"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                password: !showPassword.password,
              })
            }
          >
            {/* <i
         className={`far icon-position ${
           showPassword ? "fa-eye fa-eye-slash" : "fa-eye-slash"
         }`}
       ></i> */}
            {/* <i
         className={
           showPassword ? "fa-regular fa-eye-slash" : "fa-regular f
         }
       ></i> */}
            {showPassword.password ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <div className="section1">
          <h5>Confirm Password</h5>
        </div>
        <div className="inputField">
          <input
            className="inputBox"
            type={showPassword?.confirmPassword ? "text" : "password"}
          />
          <div
            className="passIcon"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                confirmPassword: !showPassword.confirmPassword,
              })
            }
          >
            {/* <i
         className={`far icon-position ${
           showPassword ? "fa-eye fa-eye-slash" : "fa-eye-slash"
         }`}
       ></i> */}
            {/* <i
         className={
           showPassword ? "fa-regular fa-eye-slash" : "fa-regular f
         }
       ></i> */}
            {/*  Note:- sometimes these i does not work in react */}
            {/* <FontAwesomeIcon icon={FaEye} />
            <FontAwesomeIcon icon={FaEyeSlash} /> */}
            {/* import them from fontawesome */}

            {/* you can also use images */}
            {/* <img src={showPassword.confirmPassword ? "hide.png" : "view.png"} /> */}
            {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordToggle;
