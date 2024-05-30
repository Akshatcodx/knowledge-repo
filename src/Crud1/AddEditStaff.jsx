import React, { Fragment, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../Common/ErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../Loader/PageLoader";
import { addStaff, editStaff, getStaffById } from "../ApiHandlers/Crud1Api";
import toastMessage from "../utils/toastMessage";
const REQUIRED_MESSAGE = "This field is required";
const VALID_EMAIL_MESSAGE = "Please Enter a valid email";
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const ROLE_RADIO_BUTTON = ["hr", "admin", "viewer", "editor"];
const PERMISSION_CHECKBOXES = [
  {
    value: "postJob",
    label: "Allowed to add job",
  },
  {
    value: "editStaff",
    label: "Allowed to edit staff",
  },
  {
    value: "editProfile",
    label: "Allowed to edit profile",
  },
  {
    value: "deleteStaff",
    label: "Allowed to delete staff",
  },
];

const AddEditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [loader, setLoader] = useState(false);
  // validation schema
  const schema = yup.object().shape({
    fullName: yup.string().required(REQUIRED_MESSAGE),
    email: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .matches(EMAIL_REGEX, VALID_EMAIL_MESSAGE),
    // image: yup.mixed().required(REQUIRED_MESSAGE),
    role: yup.string().required(REQUIRED_MESSAGE),
    permissions: yup
      .array()
      .min(1, "please select at least one")
      .required(REQUIRED_MESSAGE),
    phone: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .min(10, "Phone number must be 10 digits long")
      .max(10, "Phone number must be 10 digits long"),
  });
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    setError,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { permissions: [] },
  });

  useEffect(() => {
    if (id) {
      setLoader(true);
      getStaffById(id)
        .then((res) => {
          console.log(res.data);
          // way 1
          // Object.keys(res.data).forEach((key) => {
          // setValue(key, res.data[key]);
          // });
          // way 2
          // Object.entries(res?.data).map((curElem)=>{
          //   setValue(curElem[0],curElem[1])
          // })
          // way 3
          for (let key in res?.data) {
            if (key !== "id" && key !== "image") {
              setValue(key, res?.data[key]);
            }
          }
        })
        .catch((err) => {
          if (err.response.data.message) {
            console.log(err.response.data.message);
          } else {
            console.log("something went wrong");
          }
        })
        .finally(() => setLoader(false));
    }
  }, []);
  const handleImageUpload = (e) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpeg"];
    const image = e.target.files[0];
    if (allowedTypes.includes(image.type)) {
      // setImagePreview(URL.createObjectURL(image));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(image);
    } else {
      setError("image", {
        type: "manual",
        message: "Enter a valid image",
      });
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(imagePreview, "image");
    const payload = {
      ...data,
      image: imagePreview,
    };
    if (id) {
      editStaff(id, payload)
        .then(() => {
          toastMessage("staff updated successfully", "success");
          navigate("/staff");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoader(false));
      return;
    }
    addStaff(payload)
      .then(() => {
        toastMessage("staff added successfully", "sucess");
        navigate("/staff");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  // three doubts clear them modal info data scenario,image upload ,watch etc,in useeffect getting only some of the keys
  return (
    <div>
      {loader && <PageLoader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>{id ? "Update Staff" : "Add Staff"}</h5>
        {/* Image */}
        <div className="imageUpload">
          <img
            src={
              imagePreview
                ? imagePreview
                : "https://up.yimg.com/ib/th?id=OIP.audMX4ZGbvT2_GJTx2c4GgHaHw&pid=Api&rs=1&c=1&qlt=95&w=117&h=122"
            }
          />
          <label htmlFor="imageUpload">
            <span
              style={{
                background: "blue",
                borderRadius: "12px",
                padding: "8px 12px",
              }}
            >
              Upload Image
            </span>
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                className="visually-hidden"
                id="imageUpload"
                onChange={(e) => {
                  field.onChange(e);
                  handleImageUpload(e);
                }}
              />
            )}
          />
          {errors.image && <ErrorMessage msg={errors.image.message} />}
        </div>
        {/* name */}
        <div className="mb-3">
          <label for="fullName" className="form-label">
            Name
          </label>
          <input
            {...register("fullName")}
            type="name"
            className="form-control"
            id="fullName"
            aria-describedby="emailHelp"
          />
        </div>
        {errors.fullName && <ErrorMessage msg={errors.fullName.message} />}

        {/* email */}
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        {errors.email && <ErrorMessage msg={errors.email.message} />}

        {/* phone number */}
        <div className="mb-3">
          <label for="phoneNumber" className="form-label">
            Phone number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                id="phoneNumber"
                className="form-control"
                {...field}
                type="text"
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(numericValue);
                }}
              />
            )}
          />
        </div>
        {errors.phone && <ErrorMessage msg={errors.phone.message} />}

        {/* Role */}
        <div className="mb-3">
          <label for="role" className="form-label">
            Role
          </label>
          <br />
          {ROLE_RADIO_BUTTON.map((value, index) => (
            <Fragment key={index}>
              <input
                {...register("role")}
                type="radio"
                value={value}
                className="form-check-input"
                id={`role${index}`}
                aria-describedby="emailHelp"
              />
              <span className="text-capitalize">{value}</span>
            </Fragment>
          ))}
        </div>
        {errors.role && <ErrorMessage msg={errors.role.message} />}
        {/* permissions */}
        <div className="mb-3">
          <label for="role" className="form-label">
            Permissions
          </label>
          <br />
          {PERMISSION_CHECKBOXES.map(({ value, label }, index) => (
            <Fragment key={index}>
              <input
                {...register("permissions")}
                type="checkbox"
                value={value}
                className="form-check-input"
                id={`role${index}`}
                aria-describedby="emailHelp"
              />
              <span>{label}</span>
            </Fragment>
          ))}
        </div>
        {errors.permissions && (
          <ErrorMessage msg={errors.permissions.message} />
        )}

        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update Staff" : "Add Staff"}
        </button>
      </form>
    </div>
  );
};

export default AddEditStaff;
