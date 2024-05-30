import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage";
import { createUser, updateUser } from "../ApiHandlers/Crud1Api";
import { useNavigate } from "react-router-dom";
import toastMessage from "../utils/toastMessage";

const UserModal = ({
  handleUserModal,
  showModal,
  data,
  isEdit,
  handleUpdateUser,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      //   for (let key in data) {
      // setValue(key, data[key]);
      //   }
      //   Object.entries((curElem) => setValue(curElem[0], curElem[1]));
      //   Object.keys(data).forEach((key) => {
      //     setValue(key, data[key]);
      //   });
      //   Object.keys(data).forEach((key) => {
      // key !== "id" && setValue(key, data[key]);
      //   });

      const keysRequired = ["name", "username", "phone", "email"];
      keysRequired.forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, []);
  const onSubmit = (payload) => {
    if (isEdit) {
      handleUpdateUser(payload, data.id);
    } else {
      console.log(payload);
      setLoader(true);
      createUser(payload)
        .then(() => {
          toastMessage("user created suucessfully", "success");
          //   handle();
        })
        .catch((err) => console.log(err))
        .finally(() => setLoader(false));
    }
  };
  return (
    <>
      <div
        tabindex="-1"
        role="dialog"
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <h3 className="text-center font-weight-light">
                {isEdit ? "Update User" : "Add User"}
              </h3>
              <div className="name">
                Name
                <input
                  type="text"
                  className="form-control"
                  {...register("name", {
                    required: "This field is required",
                  })}
                />
                {errors?.name && <ErrorMessage msg={errors.name.message} />}
              </div>
              <div className="username">
                Username
                <input
                  type="text"
                  className="form-control"
                  {...register("username", {
                    required: "This field is required",
                  })}
                />
                {errors?.username && (
                  <ErrorMessage msg={errors.username.message} />
                )}
              </div>
              <div className="email">
                Email
                <input
                  type="text"
                  className="form-control"
                  {...register("email", {
                    required: "This field is Required",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors?.email && <ErrorMessage msg={errors.email.message} />}
              </div>
              <div className="phoneNumber">
                Phone number
                {/* <input
                type="text"
                {...register("test", {
                  onChange: (e) => {},
                  onBlur: (e) => {},
                })}
              /> */}
                {/* create like this */}
                <input
                  className="form-control"
                  {...register("phone", {
                    onChange: (e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setValue("phone", numericValue);
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must of 10 digits only",
                    },
                    required: "This Field is required",
                  })}
                  // either restrict user using below method or also add validation for
                  // maxlenngth  like above
                  maxLength={10}
                  type="text"
                />
                {errors?.phone && <ErrorMessage msg={errors.phone.message} />}
              </div>
              <div className="modal-body text-center">
                <div className="name"></div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleUserModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  {loader ? "loader" : isEdit ? "Update user" : "Add user"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default UserModal;
