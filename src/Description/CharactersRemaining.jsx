import React from "react";

const CharactersRemaining = ({ maxLength, characters }) => {
  console.log(maxLength, "malenttg");
  console.log(characters, "char");

  return (
    <div>
      {characters && characters >= maxLength
        ? "Maximum character limit reached"
        : `${maxLength - characters} characters remaining`}
    </div>
  );
};

export default CharactersRemaining;
