import React from "react";
import { useForm } from "react-hook-form";

const St2 = ({ handleNext, handlePrev }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = (values) => {
    handleNext(values);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Email</h5>
        <input
          type="text"
          {...register("email", {
            required: "This field is required",
          })}
        />
        <button onClick={handlePrev}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default St2;
