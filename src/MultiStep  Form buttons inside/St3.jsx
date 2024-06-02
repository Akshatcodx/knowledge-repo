import React from "react";
import { useForm } from "react-hook-form";

const St3 = ({ handleNext, handlePrev }) => {
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (values) => {
    handleNext(values);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Password</h5>
        <input
          type="text"
          {...register("password", {
            required: "This field is required",
          })}
        />
        <button onClick={handlePrev}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default St3;
