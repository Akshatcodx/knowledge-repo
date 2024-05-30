import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage";
const SKILL_LEVEL_OPTIONS = ["begineer", "intermediatte", "advance"];
const EXPERTISE_OPTIONS = [
  "html",
  "css",
  "javascript",
  "react",
  "redux",
  "node",
];
const SkillModal = ({
  showModal,
  isEdit,
  data,
  skills,
  setSkills,
  handleSkillsModalInfo,
  itemIndex,
}) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   expertise: [],
    // },
  });
  useEffect(() => {
    console.log(data, "data");
    for (let key in data) {
      setValue(key, data[key]);
    }
  }, []);
  const onSubmit = (data) => {
    console.log(data, "data");
    if (isEdit) {
      const temp = [...skills];
      temp[itemIndex] = { ...data };
      setSkills(temp);
    } else {
      setSkills([...skills, { ...data }]);
    }
    handleSkillsModalInfo();
  };
  return (
    <div>
      <div
        tabindex="-1"
        role="dialog"
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <h5>{!isEdit ? "Add SKill" : "Update Skill"}</h5>
              <div className="skillName">
                <h3>Skill Name</h3>
                <input
                  className="form-control"
                  {...register("skill_name", {
                    required: "This field is required",
                  })}
                />
                {errors?.skill_name && (
                  <ErrorMessage msg={errors?.skill_name?.message} />
                )}
              </div>

              <div className="skillDescription">
                <h3>Skill Description</h3>

                <textarea
                  className="form-control"
                  {...register("skill_description", {
                    required: "This field is required",
                  })}
                />
                {errors?.skill_description && (
                  <ErrorMessage msg={errors?.skill_description?.message} />
                )}
              </div>

              <div className="skillLevel">
                <h3>Skill Level</h3>
                {SKILL_LEVEL_OPTIONS.map((skill) => (
                  <>
                    <span className="text-capitalize">{skill}</span>
                    <input
                      className="form-check-input"
                      type="radio"
                      value={skill}
                      {...register("skill_level", {
                        required: "This field is required",
                      })}
                    />
                  </>
                ))}

                {errors?.skill_level && (
                  <ErrorMessage msg={errors?.skill_level?.message} />
                )}
              </div>

              <div className="expertise">
                <h3>Expertise</h3>
                {/* new method */}
                {/* {options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="checkbox" 
                      value={option.value}
                      {...register(`${name}.${option.value}`)}
                    />
                    {option.label}
                  </label>
                ))}
                {errors[name] && (
                  <span style={{ color: "red" }}>
                    Please select at least one option
                  </span>
                )} */}

                {EXPERTISE_OPTIONS.map((exp) => (
                  <>
                    <span className="text-capitalize">{exp}</span>
                    <input
                      type="checkbox"
                      defaultValue={[]}
                      className="form-check-input"
                      value={exp}
                      {...register("expertise", {
                        required: "this field is required",
                        validate: (value) =>
                          value.length >= 2 ||
                          "please select at least two fields",
                      })}
                    />
                  </>
                ))}
                {errors.expertise && (
                  <ErrorMessage msg={errors.expertise.message} />
                )}
              </div>
              <button className="btn btn-secondary" type="submit">
                {!isEdit ? "Add Skill" : "Update Skill"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default SkillModal;
