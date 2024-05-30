import React from "react";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PhoneInputWithController = () => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <h5>Phone input with controller</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* --------------------------------------Phone input------------------------------------ */}
        <Controller
          name="phoneNumber"
          rules={{
            required: "This field is required",
            validate: {
              checkValidMobileNumber: (v) =>
                isPhoneValid(v) || "please enter a valid phone number",
            },
          }}
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              className="phone-input"
              defaultCountry="hk"
              placeholder="Select phone number"
              inputStyle={{ width: "100%", height: "3.1rem" }}
            />
          )}
        />
        {errors?.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber?.message}</p>
        )}
        {/* --------------------------------------Phone input------------------------------------ */}

        {/* --------------------------------------Ck editor------------------------------------ */}
        {/* need to add controller it won't work by setValue onchange it works with field.onChange only  */}
        <Controller
          name="description"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <CKEditor
              {...field}
              type=""
              editor={ClassicEditor}
              config={{
                // plugins: [ Paragraph, Bold, Italic, Essentials ],
                toolbar: {
                  items: [
                    "undo",
                    "redo",
                    "|",
                    "heading",
                    "|",
                    "fontfamily",
                    "fontsize",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "bold",
                    "italic",
                    "strikethrough",
                    "subscript",
                    "superscript",
                    "|",
                    "link",
                    "blockQuote",
                    "|",
                    "bulletedList",
                    "numberedList",
                    ,
                    "outdent",
                    "indent",
                  ],
                },
              }}
              data={watch("description")}
              onChange={(event, editor) => {
                const value = editor.getData();
                field.onChange(value);
              }}
            />
          )}
        />
        {errors?.description && (
          <p style={{ color: "red" }}>{errors.description?.message}</p>
        )}
        <p dangerouslySetInnerHTML={{ __html: watch("description") }}></p>
        {/* --------------------------------------Ck editor------------------------------------ */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PhoneInputWithController;
