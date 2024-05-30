import React from "react";
import { toast } from "react-toastify";

const toastMessage = (msg, type) => {
  if (type === "success") {
    toast.dismiss();
    toast.success(msg);
  } else {
    toast.dismiss();
    toast.error(msg);
  }
};

export default toastMessage;
