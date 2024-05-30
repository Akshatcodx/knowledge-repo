import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
// assume that this a data from the api

const response = {
  step1: {
    name: "akshat",
  },
  step2: {
    email: "akshaaaa",
  },
  step3: {
    title: "asdawww",
  },
};
// const response = {
// name: "asdad",
// email: "asdas",
// title: "asd",
// };
const MultiStepForm1 = () => {
  useEffect(() => {
    Object.keys(response).forEach((step) => {
      Object.keys(response[step]).forEach((field) => {
        setValue(field, response[step][field]);
      });
    });

    // if (response && Object.keys(response).length) {
    //   for (let key in response) {
    //     setValue(key, response[key]);
    //   }
    // }
  }, []);
  const {
    watch,
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();
  const [activeStep, setActiveStep] = useState(1);
  const steps = ["", Step1, Step2, Step3];
  const ActiveComponent = steps[activeStep];
  const stepKeys = {
    step1: ["name"],
    step2: ["email"],
    step3: ["title"],
  };
  useEffect(() => {
    // Initialize the active step from localStorage when the component mounts
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(Number(savedStep));
    }
  }, []);
  useEffect(() => {
    // Save the current active step to localStorage whenever it changes
    console.log("Active step changed:", activeStep);
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  const createPayload = (data, stepKeys) => {
    const payload = {};
    for (const step in stepKeys) {
      payload[step] = {};
      stepKeys[step].forEach((field) => {
        if (data.hasOwnProperty(field)) {
          payload[step][field] = data[field];
        }
      });
    }
    return payload;
  };
  const onSubmit = (data) => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    } else {
      const payload = createPayload(data, stepKeys);
      console.log(payload, "payload");
    }
    console.log(data, "data");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {ActiveComponent && (
          <ActiveComponent register={register} errors={errors} />
        )}
        {activeStep > 1 && (
          <button
            type="button"
            onClick={() => {
              setActiveStep((prev) => prev - 1);
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

export default MultiStepForm1;
