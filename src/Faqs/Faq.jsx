import React, { useEffect } from "react";
import useFaq from "./useFaq";
import FaqModal from "./FaqModal";
import SingleFaq from "./SingleFaq";

const Faq = () => {
  const {
    faqs,
    handleGetFaqs,
    loader,
    handleFaqModalData,
    showModal,
    isEdit,
    modalData,
  } = useFaq();
  useEffect(() => {
    handleGetFaqs();
  }, []);
  console.log(showModal, "inside faqs");

  return (
    <>
      <div>
        {loader ? (
          "...loading"
        ) : (
          <div className="faqs">
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleFaqModalData("open");
              }}
            >
              Add Faq
            </button>
            <div className="listing">
              {faqs.length > 0 &&
                faqs.map((curFaq, idx) => (
                  <SingleFaq key={idx} data={curFaq} />
                ))}
            </div>
          </div>
        )}
      </div>
      {showModal && (
        // may be we get isEdit and data inside the modal only using useFaq
        <FaqModal showModal={showModal} isEdit={isEdit} data={modalData} />
      )}
    </>
  );
};

export default Faq;
