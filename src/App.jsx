import React from "react";
import PasswordToggle from "./Password Toggle/PasswordToggle";
import Validations1 from "./Validations/Validations1";
import PasswordValidations from "./PasswordValidations/PasswordValidations";
import StaffPage from "./Crud1/StaffPage";
import { Route, Routes } from "react-router-dom";
import AddEditStaff from "./Crud1/AddEditStaff";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login(understanding password validation)/Login";
import Crud2 from "./Crud2/Crud2";
import Crud3 from "./Crud3/Crud3";
import FieldArray1 from "./FieldArray/FieldArray1";
import FieldArray2 from "./FieldArray/FieldArray2";
import FieldArray3 from "./FieldArray/FieldArray3";
import UseFieldArray from "./UseFieldArray.jsx/UseFieldArray";
import UseFieldArray2 from "./UseFieldArray.jsx/UseFieldArray2";
import UseFieldArray3 from "./UseFieldArray.jsx/UseFieldArray3";
import Description from "./Description/Description";
import OtpScreen from "./Otp/OtpScreen";
import PhoneInputWithController from "./Phone input/PhoneInputWithController";
import Scenario1 from "./Radio and checkboxes/Scenario1";
import Scenario2 from "./Radio and checkboxes/Scenario2";
import Filter1 from "./Filters/Filter1";
import MultiStepForm1 from "./MultiStepForm/MultiStepForm1";
import MultiStepForm2 from "./MultiStepForm/MultiStepForm2";
import FormScenario1 from "./MultiStepForm/FormScenario1";
import FormScenario2 from "./MultiStepForm/FormScenario2";
import MsForm from "./MultiStep  Form buttons inside/MsForm";
import MultiSForm from "./MultiStepForm  combine/MultiSForm";
import File1 from "./File Formats/File1";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/add" element={<AddEditStaff />} />
        <Route path="/staff/edit/:id" element={<AddEditStaff />} />
        <Route path="/crud2" element={<Crud2 />} />
        <Route path="/crud3" element={<Crud3 />} />
        <Route path="/fieldArray" element={<UseFieldArray3 />} />
        <Route path="/description" element={<Description />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/phone" element={<PhoneInputWithController />} />
        <Route path="/radio" element={<Scenario2 />} />
        <Route path="/filter" element={<Filter1 />} />
        <Route path="/multi" element={<MultiStepForm2 />} />
        <Route path="/scenario1" element={<MsForm />} />
        <Route path="/multi2" element={<MultiSForm />} />
        <Route path="/file" element={<File1 />} />
      </Routes>
      {/* <Login /> */}
    </div>
  );
};

export default App;
