import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useFaq from "./useFaq";

const FaqModal = () => {
  const {
    isEdit,
    data,
    loader,
    handleAddFaq,
    showModal,
    handleUpdateFaq,
    handleFaqModalData,
  } = useFaq();
  const MAX_LENGTH = 100;
  const quillRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();
  const getPlainText = (string) => {
    if (string) {
      const plainText = string.replace(/(<([^>]+)>)/gi, "");
      return plainText;
    } else {
      return "";
    }
  };
  console.log(loader, "loader");
  const handleChange = (html, field) => {
    const editor = quillRef.current.getEditor();
    const plainText = getPlainText(html);

    if (plainText.length <= MAX_LENGTH) {
      field.onChange(html);
    } else {
      // Prevent further input
      const currentLength = editor.getLength();
      if (currentLength > MAX_LENGTH + 1) {
        editor.deleteText(MAX_LENGTH, currentLength);
      }
    }
  };
  const onSubmit = (values) => {
    if (isEdit) {
      handleUpdateFaq(values, data?.id);
    } else {
      handleAddFaq(values);
    }
  };
  return (
    <div>
      <div
        tabindex="-1"
        role="dialog"
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <h5>{isEdit ? "Update Faq" : "Add Faq"}</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <h5>Question</h5>
              <input
                type="text"
                {...register("question", { required: "Question is required" })}
              />
              {errors.question && (
                <p style={{ color: "red" }}>{errors.question.message}</p>
              )}
              <h5>Answer</h5>
              <Controller
                name="answer"
                control={control}
                rules={{ required: "Answer is required" }}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    ref={quillRef}
                    value={watch("answer")}
                    theme="snow"
                    onChange={(html) => {
                      handleChange(html, field);
                      // field.onChange(html);
                      // setValue("description", html);
                    }}
                  />
                )}
              />{" "}
              <p className="text-end text-muted font-14 mt-1">{`${
                getPlainText(watch("answer"))?.length
                  ? getPlainText(watch("answer")).length
                  : 0
              }/100`}</p>{" "}
              {errors.answer && (
                <p style={{ color: "red" }}>{errors.answer?.message}</p>
              )}
            </div>
          </div>

          <button disabled={loader} type="submit" className="btn btn-secondary">
            {loader ? "...loading" : "Submit"}
          </button>
        </form>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default FaqModal;
