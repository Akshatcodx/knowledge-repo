import React from "react";

const Step3 = ({ register, errors }) => {
  return (
    <div>
      <h5>Password</h5>
      <input
        type="text"
        {...register("title", { required: "This field is required" })}
      />
      {errors?.title && (
        <p style={{ color: "red" }}>{errors?.title?.message}</p>
      )}
    </div>
  );
};

export default Step3;
