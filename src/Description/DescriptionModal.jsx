import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage";
import CharactersRemaining from "./CharactersRemaining";
const SKILL_LEVEL_OPTIONS = ["begineer", "intermediatte", "advance"];
const MAX_CHARACTERS = 20;
const MIN_CHARACTERS = 10;
const DescriptionModal = ({ showModal, toggleModal }) => {
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   expertise: [],
    // },
  });

  const onSubmit = (data) => {
    console.log(data, "data");
    toggleModal();
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
              <div className="skillDescription">
                <h3>Skill Description</h3>

                <textarea
                  className="form-control"
                  {...register("description", {
                    required: "This field is required",

                    validate: (value) =>
                      value.length > MIN_CHARACTERS ||
                      `Minimum ${MIN_CHARACTERS} are required`,
                  })}
                  maxLength={MAX_CHARACTERS}
                />
                <CharactersRemaining
                  characters={watch("description").length}
                  maxLength={MAX_CHARACTERS}
                />
                {errors?.description && (
                  <ErrorMessage msg={errors?.description?.message} />
                )}
              </div>

              <button className="btn btn-secondary" type="submit">
                Submit
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

export default DescriptionModal;
