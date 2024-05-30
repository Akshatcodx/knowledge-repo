import React, { Fragment, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
const LEVEL_OPTIONS = ["begineer", "intermeddiate", "expert"];

const UseFieldArray = () => {
  const {
    register,
    control,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { languages: [{ language: "", level: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  const handleAppend = () => {
    const languages = watch("languages");
    // easier way
    // const index = watch("languages").findIndex(

    const index = languages.findIndex(
      (curElem) => curElem.language === "" || curElem.level === ""
    );
    if (index === -1) {
      append({ language: "", level: "" });
    }
  };
  const onSubmit = (data) => {
    console.log(data, "datta");
  };

  useEffect(() => {
    if (data.length) {
      setValue("projects", data);
      data.map((curElem, index) => {
        for (let key in curElem) {
          if (key === "tech_stacks_used") {
            const techStackArray = curElem[key].split(",");
            const techStackArrayForSelect = skillCate.filter((curElem) =>
              techStackArray.includes(curElem?.label)
            );
            setValue(`projects.${index}.${key}`, techStackArrayForSelect);
          } else if (
            key === "project_start_date" ||
            key === "project_end_date"
          ) {
            const temp = moment(curElem[key]).format("MM/DD/YYYY");
            const formattedDate = new Date(temp).toISOString().split("T")[0];
            setValue(`projects.${index}.${key}`, formattedDate);
          } else {
            setValue(`projects.${index}.${key}`, curElem[key]);
          }
        }
      });
    } else {
      setValue("projects", [
        {
          project_title: "",
          project_description: "",
          tech_stacks_used: "",
          project_start_date: "",
          project_end_date: "",
          project_team_size: "",
          project_link: "",
          role_in_project: "",
        },
      ]);
    }
  }, [renderModalData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h5>Languages</h5>
          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <input
                type="text"
                {...register(`languages.${index}.language`, {
                  required: "This field is required",
                })}
              />
              {errors.languages?.[index]?.language && (
                <p style={{ color: "red" }}>
                  {errors?.languages?.[index].language.message}
                </p>
              )}
              <select
                {...register(`languages.${index}.level`, {
                  required: "This field is required",
                })}
              >
                <option disabled value="" selected>
                  Select level
                </option>
                {LEVEL_OPTIONS.map((lvl) => (
                  <option value={lvl} className="text-capitalize">
                    {lvl}
                  </option>
                ))}
              </select>
              {watch("languages").length !== 1 && (
                <button
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Remove
                </button>
              )}
              {errors.languages?.[index]?.level && (
                <p style={{ color: "red" }}>
                  {errors.languages?.[index]?.level.message}
                </p>
              )}
            </Fragment>
          ))}
        </div>
        <button onClick={handleAppend}>Add more</button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UseFieldArray;
