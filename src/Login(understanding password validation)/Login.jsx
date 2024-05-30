import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const Login = () => {
  const schema = yup.object().shape({
    document: yup.mixed().required("This field is required"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="doc">upload document</label>
        {/* <Controller
          name="document"
          control={control}
          render={({ field }) => <input {...field} type="file" />}
        /> */}
        <input
          type="file"
          id="doc"
          className="visually-hidden"
          {...register("document", {
            required: "this field is required",
            validate: (value) => {
              const file = value[0];
              const allowedTypes = ["image/jpeg", "image/png", "image/jpeg"];
              if (!allowedTypes.includes(file.type)) {
                return "Upload a valid file";
              }
            },
          })}
        />
        <button type="submit">Submit</button>
        {errors?.document && <p>{errors?.document?.message}</p>}
      </form>
      {/* <input type={showPassword ? "text" : "password"} /> */}
    </div>
  );
};

export default Login;
