import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FileDownloader from "./FileDownloader";
import WebCamera from "./WebCamera";
import ViewFile from "./ViewFileModal";
import ViewFileModal from "./ViewFileModal";

const File1 = () => {
  // https://github.com/Akshatcodx/knowledge-repo
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [showViewFileModal, setShowViewFileModal] = useState({
    show: false,
    file: null,
  });
  const handleShowViewFile = (show = false, file = null) => {
    setShowViewFileModal({
      file: file,
      show: show,
    });
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpeg"];
      if (allowedTypes.includes(file.type)) {
        clearErrors("logo");
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   setPreviewImage(e.target.result);
        //   handleShowViewFile(false, e.target.result);
        //   setValue("logo", e.target.result);
        // };
        // reader.readAsDataURL(file);
        const url = URL.createObjectURL(file);
        setPreviewImage(url);
        handleShowViewFile(false, url);
        setValue("logo", url);
      } else {
        setError("logo", {
          type: "manual",
          message: "Please enter a valid image format",
        });
        setPreviewImage(null);
        setValue("logo", null);
      }
    }
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf", // PDF
        "application/msword", // DOC
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowedTypes.includes(file.type)) {
        clearErrors("document");
        const reader = new FileReader();
        reader.onload = (e) => {
          setFile(e.target.result);
          setValue("document", e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError("document", {
          type: "manual",
          message: "Please enter a  valid file format",
        });
        setFile(null);
        setValue("document", null);
      }
    }
  };

  console.log(file, "eeeeee");
  console.log(errors.document, "errors");

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="image">
            <span className="me-5">Add Image</span>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="visually-hidden "
            {...register(
              "logo",
              { required: "This field is required" },
              (onchange = (e) => {
                handleImage(e);
              })
            )}
          />
          {/* <Controller
          name="logo"
          rules={{ required: "This field is required" }}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="file"
              id="image"
              accept="image/*"
              className="visually-hidden"
              onChange={(e) => {
                handleImage(e);
              }}
            />
          )}
        /> */}
          {errors?.logo && (
            <p style={{ color: "red" }}>{errors.logo.message}</p>
          )}
          <img src={previewImage && previewImage} />
          <label htmlFor="document">
            <span>Add Files</span>
          </label>
          <input
            type="file"
            id="document"
            {...register(
              "document",
              { required: "This field is requred" },
              (onchange = (e) => {
                handleFile(e);
              })
            )}
            className="visually-hidden"
          />
          {errors?.document && (
            <p style={{ color: "red" }}>{errors.document?.message}</p>
          )}

          <button type="submit">Submit</button>

          {file && <FileDownloader fileUrl={file} />}
          {file && (
            <button
              onClick={() => {
                handleShowViewFile(true);
              }}
            >
              View File
            </button>
          )}
          <WebCamera />
        </form>
      </div>
      {showViewFileModal?.show && (
        <ViewFileModal
          // something was worng inside view modal state that's why directly added this
          file={file}
          showModal={showViewFileModal?.show}
          handleCloseModal={handleShowViewFile}
        />
      )}
    </>
  );
};

export default File1;
