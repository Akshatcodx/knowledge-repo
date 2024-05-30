import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Timer from "./Timer";

const OtpScreen = () => {
  const [otp, setOtp] = useState(null);
  return (
    <div>
      <div
        tabindex="-1"
        role="dialog"
        className={`modal show`}
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h5>Enter Otp</h5>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <Timer completionText={"resend otp"} time={5000} />
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${true ? "show" : ""}`}
        style={{ display: true ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default OtpScreen;
