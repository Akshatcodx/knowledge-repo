import { yupResolver } from "@hookform/resolvers/yup";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "./Common/ErrorMessage";
const CHECKBOX_LIST = [
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "css",
    label: "CSS",
  },
  {
    value: "javascript",
    label: "Javascript",
  },
];
const Demo = () => {
  const schema = yup.object().shape({
    skills: yup
      .array()
      .required("this field is required")
      .min(2, "select at least two")
      .max(3, "can selct at max 3 only"),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [],
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      {/* if value and label are different */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {CHECKBOX_LIST.map(({ label, value }, index) => (
          <Fragment key={index}>
            <input {...register("skills")} type="checkbox" value={value} />
            <span>{label}</span>;
          </Fragment>
        ))}
        {errors.skills && <ErrorMessage msg={errors.skills.message} />}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Demo;
