import React from "react";

const Step1 = ({ register, errors }) => {
  return (
    <div>
      <h5>Name</h5>
      <input
        type="text"
        {...register("name", { required: "this field is required" })}
      />
      {errors?.name && <p style={{ color: "red" }}>{errors?.name?.message}</p>}
    </div>
  );
};

export default Step1;
