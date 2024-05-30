import React, { useState } from "react";
import DescriptionModal from "./DescriptionModal";

const Description = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const toggleDescriptionModal = () => {
    setShowDescriptionModal(!showDescriptionModal);
  };
  return (
    <div>
      <button onClick={toggleDescriptionModal}>Add Description</button>
      {showDescriptionModal && (
        <DescriptionModal
          showModal={showDescriptionModal}
          toggleModal={toggleDescriptionModal}
        />
      )}
    </div>
  );
};

export default Description;
