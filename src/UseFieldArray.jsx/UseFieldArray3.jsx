import React, { Fragment } from "react";
import { useFieldArray, useForm } from "react-hook-form";
const LEVEL_OPTIONS = ["html", "css", "javascript", "reactjs"];
const SKILL_LEVEL_OPTIONS = ["begineer", "intermediate", "expert"];
const UseFieldArray3 = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      languages: [{ language: "", level: "" }],
      skills: [{ skill: "", level: "" }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "languages",
  });
  const {
    fields: skillFields,
    remove: removeSkill,
    append: appendSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const handleAppendLanguage = () => {
    const languages = watch("languages");
    const index = languages.findIndex(
      (curElem) => curElem.language === "" || curElem.level
    );
    if (index === -1) {
      append({
        language: "",
        level: "",
      });
    }
  };
  const handleAppendSkill = () => {
    const languages = watch("skills");
    const index = languages.findIndex(
      (curElem) => curElem.skill === "" || curElem.level === ""
    );
    if (index === -1) {
      appendSkill({
        language: "",
        level: "",
      });
    }
  };
  return (
    <>
      <div>
        <h5>SKill Fields</h5>
        {skillFields.map((field, index) => (
          <Fragment key={field.id}>
            <input
              placeholder="Enter language"
              type="text"
              {...register(`skills.${index}.skill`)}
            />
            <select {...register(`skills.${index}.level`)}>
              <option value="" disabled selected>
                Please select level
              </option>
              {SKILL_LEVEL_OPTIONS.map((lvl) => (
                <option value={lvl}>{lvl}</option>
              ))}
            </select>
            {watch("skills").length !== 1 && (
              <button onClick={() => removeSkill(index)}>Remove</button>
            )}
          </Fragment>
        ))}
        <button onClick={handleAppendSkill}>Add Skill</button>
      </div>

      <div>
        <h5>Languages Fields</h5>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <input
              placeholder="Enter language"
              type="text"
              {...register(`languages.${index}.language`)}
            />
            <select {...register(`languages.${index}.level`)}>
              <option value="" disabled selected>
                Please select level
              </option>
              {LEVEL_OPTIONS.map((lvl) => (
                <option value={lvl}>{lvl}</option>
              ))}
            </select>
            {watch("languages").length !== 1 && (
              <button onClick={() => remove(index)}>Remove</button>
            )}
          </Fragment>
        ))}
        <button onClick={handleAppendLanguage}>Add Language</button>
      </div>
    </>
  );
};

export default UseFieldArray3;
