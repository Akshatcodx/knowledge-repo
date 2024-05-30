import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import ErrorMessage from "../Common/ErrorMessage";

const Validations1 = () => {
  const SKILLS = ["Java", "Python", "C", "C++", "React", "JavaScript"];
  const [file, setFile] = useState(null);
  const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const [fileError, setFileError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const schema = yup.object().shape({
    fullName: yup.string().min(2).max(10).required("This field is required"),
    skills: yup.array().min(2, "Please select at least 2 fields"),
    phoneNumber: yup.string().required("this field is required"),
    // skills: yup.string().min(2, "Please select at least 2 fields"),

    pass: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 digits long.")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    document: yup.mixed().required("file is required"),
    password: yup
      .string()
      .required(" password is required")
      .min(6, "Password must be at least 6 digits long")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Passwords and confirm password must match"
      )
      .required("Confirm Password is required"),
    // email: yup.string().email().required("email is required"),

    oldPassword: yup
      .string()
      .required("old password is required")
      .min(6, "Password must be at least 6 digits long")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    newPassword: yup.string().required("new Password is required"),
    // .notOneOf(
    //   [yup.ref("oldPassword"), null],
    //   "oldPasswords and new password must not match"
    // ),
  });

  const {
    register,
    watch,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [],
    },
    resolver: yupResolver(schema),
  });
  const allowedTypes = ["image/jpeg", "image/png", "image/jpeg"];
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile.type, "type");
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileError("");
    } else {
      setFile(null);
      setFileError("Please select a valid file (JPEG or PNG only)");
    }
  };
  const handleChangePassword = (value, type) => {
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    if (type === "password") {
      if (value === confirmPassword) {
        if (confirmPassword.length) {
          setError("confirmPassword", {
            type: "manual",
            message: "",
          });
        }
      } else {
        if (confirmPassword?.length) {
          setError("confirmPassword", {
            type: "manual",
            message: "password and confirmpassword must match",
          });
        }
      }
    } else {
      if (value === "password") {
        setError("confirmPassword", {
          type: "manual",
          message: "", // Clear the error message
        });
      }
    }
  };
  console.log(errors.email, "errors");

  const handleChange = (type, value) => {
    const oldPassword = watch("oldPassword");
    const newPassword = watch("newPassword");
    if (type === "oldPassword") {
      if (value === newPassword) {
        if (newPassword?.length) {
          setError("newPassword", {
            type: "manual",
            message: "old password and new password must not match",
          });
        }
      } else {
        setError("newPassword", {
          type: "manual",
          message: "",
        });
      }
    } else {
      // if(value === oldPassword)
      // {
      //   if (oldPassword?.length) {
      //     setError("newPassword", {
      //       type: "manual",
      //       message: "old password and new password must not match",
      //     });
      //     else{
      //       setError("newPassword", {
      //         type: "manual",
      //         message: "",
      //       });
      //     }
      //   }
      // }
      if (value === oldPassword) {
        if (oldPassword.length) {
          setError("newPassword", {
            type: "manual",
            message: "Password and new password must not match",
          });
        }
      } else {
        setError("newPassword", {
          type: "manual",
          message: "",
        });
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div classNameName="d-flex ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name  */}
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Full Name
          </label>
          <input
            {...register("fullName")}
            type="text"
            className="form-control"
          />
          {errors.fullName && <ErrorMessage msg={errors.fullName.message} />}
          {/* <input {...register("fullName",{required:true})} type="text" className="form-control" /> */}
          {/* <input {...register("fullName",{required:"This field is required"})} type="text" className="form-control" /> */}
          {/* <input 
            {...register("fullName", {
              required: "This field is required",
              minLength: 2,
              maxLength: 20,
            //   min: 20,just a demo min and max would be required in a number field and not in a text field
              max: 30,
            })}
            type="text"
            className="form-control"
          />*/}
        </div>
        {/* name validations */}
        {/* password validation */}
        <div class="mb-3">
          <label for="disabledSelect" class="form-label">
            Password
          </label>
          <input
            {...register("pass")}
            type={showPassword ? "text" : "password"}
            className="inputBox"
          />
          <div
            className="passIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {errors.pass && <ErrorMessage msg={errors.pass.message} />}

        {/* password validation */}

        {/* phone number */}
        <h5>Phone Number</h5>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                field.onChange(numericValue);
              }}
              type="text"
            />
          )}
        />
        {errors.phoneNumber && (
          <ErrorMessage msg={errors.phoneNumber.message} />
        )}
        {/* phone number */}
        {/* checkbox validation */}
        <h5>SKILLS</h5>
        {SKILLS.map((curSkill) => (
          <>
            <input type="checkbox" {...register("skills")} value={curSkill} />
            <h5>{curSkill}</h5>
          </>
        ))}
        {errors.skills && <ErrorMessage msg={errors.skills.message} />}

        {/* map options through constant, register with one single name ,set default  value of that name as array,must give value attribute inside input ,unless it  gives on and off */}

        {/* checkbox validationn */}

        {/* file validation */}
        <h5>Submit File</h5>
        <label htmlFor="fileUpload">
          {/* <button type="button">Upload File</button> does not works if it is button so take a span and style it accordingly */}
          <span>Upload File</span>
        </label>
        <Controller
          name="document"
          control={control}
          // rules={{ required: "This field is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="file"
              id="fileUpload"
              // style={{ display: "none" }}
              className="visually-hidden"
              onChange={(e) => {
                field.onChange(e);
                handleFileChange(e);
              }}
            />
          )}
        />

        {errors.document && <ErrorMessage msg={errors.document.message} />}
        {fileError && <ErrorMessage msg={"Invalid File Type"} />}
        {file && <span>{file.name}</span>}

        {/* file validation */}
        {/* email validation */}
        <p>email</p>
        {/* <Controller
          name="email"
          control={control}
          rules={{
            pattern: { value: EMAIL_REGEX, message: "Invalid email address" },
          }}
          render={({ field }) => <input {...field} type="text" />}
        /> */}
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "please enter a valid email",
            },
          })}
        />

        {errors.email && <ErrorMessage msg={errors.email.message} />}
        {/* email validation */}
        {/* password and confirm password */}
        <div className="">
          <p> password</p>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                onChange={(e) => {
                  handleChangePassword(e.target.value, "password");
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.password && <ErrorMessage msg={errors.password.message} />}
          <p>confirm password</p>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                onChange={(e) => {
                  handleChangePassword(e.target.value, "confirmPassword");
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>
        {errors.confirmPassword && (
          <ErrorMessage msg={errors.confirmPassword.message} />
        )}

        <div className="g">
          <p>Old Password</p>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                onChange={(e) => {
                  handleChange("oldPassword", e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.oldPassword && (
            <ErrorMessage msg={errors.oldPassword?.message} />
          )}

          <p>New Password</p>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                onChange={(e) => {
                  handleChange("newPassword", e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.newPassword && (
            <ErrorMessage msg={errors.newPassword?.message} />
          )}
        </div>
        {/* password and confirm password */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Validations1;
{
  /* <input
  {...register("input", {
    required: "this field is required",
    // required:true
    maxLength: 2,
    minLength: 1,
    minLength: {
      value: 2,
      message: "minimum length should be 2",
    },
    max: 12,
    min: 13,
    pattern: {
      value: RegExp,
      message: "",
    },
  })}
/>; */
}
