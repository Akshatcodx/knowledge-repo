import React from "react";

const Step2 = ({ register, errors }) => {
  return (
    <div>
      <h5>Email</h5>
      <input
        type="text"
        {...register("email", { required: "This field is required" })}
      />
      {errors?.email && (
        <p style={{ color: "red" }}>{errors?.email?.message}</p>
      )}
    </div>
  );
};

export default Step2;
