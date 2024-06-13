import React, { useEffect, useState } from "react";
import { addFaq, deleteFaq, getFaqs, updateFaq } from "./faqApiHandlers";

const useFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [faqModalData, setFaqModalData] = useState({
    show: false,
    isEdit: false,
    data: null,
  });
  // const handleFaqModalData = (show = false, isEdit = false, data = null) => {
  //   setFaqModalData({ show: show, isEdit: isEdit, data: data });
  // };
  const handleFaqModalData = (action, data) => {
    switch (action) {
      case "open":
        setFaqModalData({
          data: null,
          show: !faqModalData?.show,
          isEdit: false,
        });
        break;
      case "close":
        setFaqModalData({
          data: null,
          show: !faqModalData?.show,
          isEdit: false,
        });
        break;
      case "edit":
        setFaqModalData({ data: data, show: !faqModalData.show, isEdit: true });
        break;
    }
  };
  const handleGetFaqs = () => {
    getFaqs()
      .then((res) => {
        setFaqs(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const handleAddFaq = (faq) => {
    setLoader(true);
    addFaq(faq)
      .then(() => {
        setFaqs([...faqs, faq]);
        handleFaqModalData("close");
      })
      .catch((error) => {
        f;
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const handleDeleteFaq = (id) => {
    setLoader(true);
    deleteFaq(id)
      .then(() => {
        const temp = faqs.filter((curelem) => curelem.id !== id);
        setFaqs(temp);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const handleUpdateFaq = (payload, id) => {
    setLoader(true);
    updateFaq(payload, id)
      .then((res) => {
        // way 1
        // const temp = [...faqs];
        // const index = faqs.findIndex((curElem) => curElem.id === id);
        // index !== -1 && temp[index] = { ...payload };
        // setFaqs(temp);

        // way 2
        const temp = [...faqs];
        const index = faqs.findIndex((curElem) => curElem.id === id);
        index !== -1 && temp.splice(index, 1, payload);

        handleFaqModalData("close");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  console.log(faqModalData.show, "show modal");
  return {
    faqs,
    loader,
    handleGetFaqs,
    handleDeleteFaq,
    handleAddFaq,
    handleFaqModalData,
    showModal: faqModalData?.show,
    isEdit: faqModalData?.isEdit,
    modalData: faqModalData?.data,
  };
};

export default useFaq;
