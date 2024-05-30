import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const PasswordValidations = () => {
  const schema = yup.object().shape({
    // way one
    // joining_date: yup
    //   .date()
    //   .nullable()
    //   .transform((value, originalValue) =>
    //     originalValue.trim() === "" ? null : value
    //   )
    //   .required("this field is required"),
    // way 2
    joining_date: yup.string().required("this field is required"),
    // release_date: yup.string().required("This field is required"),
    dob: yup.string().required("This field is required"),
    age: yup.string().required("This field is required"),
  });
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const setAgeFromDob = () => {
    const dob = watch("dob");
    console.log(dob, "dob");
    const years = moment().diff(dob, "years");
    setValue("age", years);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Select Joining Date</h5>
        <input
          {...register("joining_date")}
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.joining_date && <span>{errors.joining_date.message}</span>}
        <h5>Release date from previous company</h5>
        {/* <input
          {...register("release_date")}
          type="date"
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.release_date && <span>{errors.release_date.message}</span>} */}
        <h5>Date of birth</h5>
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setAgeFromDob();
                field.onChange(e);
              }}
            />
          )}
        />

        {errors.dob && <span>{errors.dob.message}</span>}
        <h5>Age</h5>
        <input
          {...register("age", {
            deps: ["dob"],
          })}
          type="text"
          readOnly
        />
        {errors.age && <span>{errors.age.message}</span>}
        <br />
        <h5>Start Date</h5>
        <input
          type="date"
          {...register("start_date")}
          max={new Date().toISOString().split("T")[0]}
        />
        <h5>End Date</h5>
        <input
          type="date"
          {...register("end_date")}
          disabled={!watch("start_date")}
          min={
            watch("start_date")
              ? new Date(watch("start_date"))?.toISOString()?.split("T")[0]
              : undefined
          }
          max={new Date().toISOString().split("T")[0]}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordValidations;
