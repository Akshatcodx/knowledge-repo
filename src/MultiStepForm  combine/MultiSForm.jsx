import React, { useEffect, useState } from "react";
import jobStep1 from "./jobStep1";
import jobStep2 from "./jobStep2";
import jobStep3 from "./jobStep3";
import { useForm } from "react-hook-form";

const MultiSForm = () => {
  // getting single step values even after containing button outside
  const [activeStep, setActiveStep] = useState(1);
  useEffect(() => {
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(Number(savedStep));
    }
  }, []);
  useEffect(() => {
    const response = {
      step1: { step1_info: "step 1 info" },
    };
    for (let key in response[stepKey]) {
      forms[stepKey].setValue(key, response[stepKey][key]);
    }
  }, [activeStep]);
  const registerForm = () => {
    const { register, formState, handleSubmit, setValue } = useForm();

    return { register, formState, handleSubmit, setValue };
  };

  // Register multiple forms
  const forms = {
    step1: registerForm(),
    step2: registerForm(),
    step3: registerForm(),
  };
  const steps = [
    {},
    { component: jobStep1, name: "Step1", formKey: "step1" },
    { component: jobStep2, name: "Step2", formKey: "step2" },
    { component: jobStep3, name: "Step3", formKey: "step3" },
  ];
  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
    localStorage("activeStep", activeStep - 1);
  };
  const onSubmit = (values) => {
    console.log(values);
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
      localStorage("activeStep", activeStep + 1);
    }
  };
  const ActiveComponent = steps[activeStep].component;
  const stepKey = steps[activeStep].formKey;
  return (
    <div>
      <h5>{steps[activeStep].name}</h5>
      <form onSubmit={forms[stepKey].handleSubmit(onSubmit)}>
        {ActiveComponent && (
          <ActiveComponent
            register={forms[stepKey].register}
            errors={forms[stepKey].formState.errors}
          />
        )}
        {activeStep > 1 && (
          <button type="button" onClick={handlePrev}>
            Previous
          </button>
        )}
        <button type="submit">{activeStep < 3 ? "Next" : "Submit"}</button>
      </form>
    </div>
  );
};

export default MultiSForm;
