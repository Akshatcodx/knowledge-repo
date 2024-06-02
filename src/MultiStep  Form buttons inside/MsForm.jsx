import React, { Component, useState } from "react";
import St1 from "./St1";
import St2 from "./St2";
import St3 from "./St3";
// in this we are setting buttons inside so that i get values of only active step  inside
// and  anot have  to apply any extra logic inside onsubmit to extract values of active step only
const MsForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    {},
    { component: St1, name: "Step1" },
    { component: St2, name: "Step2" },
    { component: St3, name: "Step3" },
  ];
  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleNext = (values) => {
    if (activeStep < 3) {
      setActiveStep((prev) => prev + 1);
    }
    console.log(values);
  };
  const ActiveComponent = steps[activeStep].component;
  return (
    <div>
      <h5>{steps[activeStep].name}</h5>
      {ActiveComponent && (
        <ActiveComponent handleNext={handleNext} handlePrev={handlePrev} />
      )}
    </div>
  );
};

export default MsForm;
