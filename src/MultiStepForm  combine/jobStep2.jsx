import React from "react";

const jobStep2 = ({ register, errors }) => {
  return (
    <div>
      {" "}
      <input type="text" {...register("step2_info")} />
      {errors?.step2_info && <p>{errors?.step2_info?.message}</p>}
    </div>
  );
};

export default jobStep2;
