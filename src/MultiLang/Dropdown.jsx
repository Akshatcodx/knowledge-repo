import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Dropdown = () => {
  const [t, i18n] = useTranslation("global");
  let lang = localStorage.getItem("language");

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="en">
          <img src="/UsFlag.jpg" />
          English
        </option>
        <option value="zh">
          <img src="/ChinaFlag.jpg" />
          Chinese
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
