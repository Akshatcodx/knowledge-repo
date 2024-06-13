import React from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "./Dropdown";

const MultiLang = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Dropdown />
      MultiLang :{t("title")}
    </div>
  );
};

export default MultiLang;
