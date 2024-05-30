import React from "react";
import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
const LEVEL_OPTIONS = ["begineer", "intermeddiate", "expert"];

const ArrayComponent = ({ watch, errors, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    name: "languages",
    rules: {
      required: "Array fields are required",
    },
    control,
  });
  const handleAppend = () => {
    const languages = watch("languages");
    const index = languages.findIndex(
      (curElem) => curElem.language === "" || curElem.level === ""
    );
    if (index === -1) {
      append({ language: "", level: "" });
    }
  };
  return (
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
      <button type="button" className="mb-4" onClick={handleAppend}>
        Add more
      </button>
    </div>
  );
};

export default ArrayComponent;
