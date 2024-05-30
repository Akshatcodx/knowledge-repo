import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ArrayComponent from "./ArrayComponent";
const REQUIRED_MESSAGE = "This field is required";
const SKILL_OPTIONS = ["java", "css", "html", "javascript", "reactjs"];
const UseFieldArray2 = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(REQUIRED_MESSAGE),
    phone: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .min(10, "phone number must contains 10 digits")
      .max(10, "phone number must contains 10 digits"),
    skills: yup
      .array()
      .required("this field is required")
      .min(2, "Select at least two"),
    languages: yup.array().of(
      yup.object().shape({
        language: yup.string().required(REQUIRED_MESSAGE),
        level: yup.string().required(REQUIRED_MESSAGE),
        // .oneOf(LEVEL_OPTIONS, "Invalid level"),
      })
    ),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [],
      languages: [{ languages: "", level: "" }],
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors, "errors");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="email">
          <h5>Email</h5>
          <input type="email form-field" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="phone">
          <h5>Phone number</h5>
          <input
            type="text"
            {...register("phone", {
              onChange: (e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                setValue("phone", numericValue);
              },
            })}
          />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
        </div>
        <div className="skills">
          {SKILL_OPTIONS.map((curSkill, index) => (
            <Fragment key={index}>
              <input {...register("skills")} type="checkbox" value={curSkill} />
              <p className="text-capitalize">{curSkill}</p>
            </Fragment>
          ))}
          {errors.skills && (
            <p style={{ color: "red" }}>{errors.skills.message}</p>
          )}
        </div>
        <ArrayComponent
          watch={watch}
          errors={errors}
          register={register}
          control={control}
        />
        {/* <ArrayComponent
          languages={watch("languages")}
          errors={errors}
          register={register}
          control={control}
        /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UseFieldArray2;
