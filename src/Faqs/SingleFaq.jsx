import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const SingleFaq = ({ data, onEdit, onDelete }) => {
  const { question, answer, id } = data;
  console.log(data, "data inside single faq");

  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id={`heading${id}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${id}`}
              aria-expanded="true"
              aria-controls={`collapse${id}`}
            >
              {question}
            </button>
            <div className="icon-container">
              {/* <FontAwesomeIcon
                icon={faEdit}
                className="icon"
                // onClick={() => onEdit(id)}
              /> */}
              {/* <FontAwesomeIcon
                icon={faTrashAlt}
                className="icon"
                // onClick={() => onDelete(id)}
              /> */}
            </div>
          </h2>
          <div
            id={`collapse${id}`}
            className="accordion-collapse collapse show"
            aria-labelledby={`heading${id}`}
            data-bs-parent="#accordionExample"
          >
            <div
              className="accordion-body"
              dangerouslySetInnerHTML={{ __html: answer }}
            >
              {/* {answer} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFaq;
