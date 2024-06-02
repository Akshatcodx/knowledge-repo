import React from "react";

const jobStep1 = ({ register, errors }) => {
  return (
    <div>
      {" "}
      <input
        type="text"
        {...register("step1_info", { required: "this field is required" })}
      />
      {errors?.step1_info && <p>{errors?.step1_info?.message}</p>}
    </div>
  );
};

export default jobStep1;
