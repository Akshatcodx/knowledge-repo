import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
const keys = {
  1: ["name"],
  2: ["email"],
  3: ["password"],
};
const MultiStepForm2 = () => {
  const [activeStep, setActiveStep] = useState(1);

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // Initialize the active step from localStorage when the component mounts
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(Number(savedStep));
    }
  }, []);

  useEffect(() => {
    // keys[activeStep].map((key) => {
    //   if (key in response) {
    //     setValue(key, response[key]);
    //   }
    // });
    // Save the current active step to localStorage whenever it changes
    console.log("Active step changed:", activeStep);
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);
  console.log(activeStep, "active");
  const steps = ["", Step1, Step2, Step3];
  const ActiveComponent = steps[activeStep];

  const onSubmit = (data) => {
    setActiveStep((prev) => prev + 1);
    localStorage.setItem("activeStep", activeStep + 1);
    let payload = {};
    const keys = {
      step1: ["name"],
      step2: ["email"],
      step3: ["password"],
    };
    const stepKeys = keys[`step${activeStep}`];
    for (let key in stepKeys) {
      payload[key] = {};
      stepKeys.forEach((field) => {
        if (data.hasOwnProperty(field)) {
          payload[key][field] = data[field];
        }
      });
    }
    console.log(payload);
    // keys[activeStep].map((key) => {
    //   // to check that key is inside data or not
    //   if (key in data) {
    //     payload = {
    //       ...payload,
    //       // key: data[key],
    //       // very important to put key in [key] because it is dunamic value
    //       [key]: data[key],
    //     };
    //   }
    // });
    console.log(payload, "payload");

    // if (activeStep < 3) {
    //   setActiveStep((prev) => prev + 1);
    // } else {
    //   const payload = createPayload(data, stepKeys);
    //   console.log(payload, "payload");
    // }
    // console.log(data, "data");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {ActiveComponent && (
          <ActiveComponent register={register} errors={errors} />
        )}
        {/* {activeStep === 1 && <Step1 register={register} errors={errors} />}
        {activeStep === 2 && <Step2 register={register} errors={errors} />}
        {activeStep === 3 && <Step3 register={register} errors={errors} />} */}
        {activeStep > 1 && (
          <button
            type="button"
            onClick={() => {
              setActiveStep((prev) => prev - 1);
              localStorage.setItem("activeStep", activeStep - 1); // Save the next step to localStorage
            }}
          >
            Previous
          </button>
        )}
        <button type="submit">{activeStep < 3 ? "Next" : "Submit"}</button>
      </form>
    </div>
  );
};

export default MultiStepForm2;
