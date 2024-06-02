import React from "react";
import { useForm } from "react-hook-form";

const St1 = ({ handleNext, handlePrev }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = (values) => {
    handleNext(values);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Name</h5>
        <input
          type="text"
          {...register("name", {
            required: "This field is required",
          })}
        />

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default St1;
