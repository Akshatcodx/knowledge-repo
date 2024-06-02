import React from "react";

const jobStep3 = ({ register, errors }) => {
  return (
    <div>
      <input
        type="text"
        {...register("step3_info", { required: "This field is required" })}
      />
      {errors?.step3_info && <p>{errors?.step3_info?.message}</p>}
    </div>
  );
};

export default jobStep3;
