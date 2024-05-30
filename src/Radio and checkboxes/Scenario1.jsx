import React, { Fragment, useEffect, useState } from "react";
import { getInfo, postInfo, updateInfo } from "./Api";
import { toast } from "react-toastify";
const GENDER_OPTIONS = ["male", "female", "any", "other"];
const HOBBIES_OPTIONS = ["chess", "football", "cricket", "coding"];

const Scenario1 = () => {
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [newGender, setNewGender] = useState("");
  const [id, setId] = useState(false);
  useEffect(() => {
    getInfo()
      .then((res) => {
        if (res?.data[0].id) {
          setId(res?.data[0].id);
        }
        if (res?.data[0]?.hobbies) {
          setHobbies(res?.data[0]?.hobbies);
        }
        if (res?.data[0]?.gender) {
          setGender(res?.data[0]?.gender);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const onSubmit = () => {
    const payload = {
      gender: gender,
      hobbies: [...hobbies],
    };
    if (isEdit) {
      updateInfo(id, payload)
        .then(() => toast.success("Info updated successfully"))
        .catch((err) => console.log(err));
    } else {
      postInfo(payload)
        .then(() => {
          toast.success("Info added successfully");
        })
        .catch((err) => console.log(err));
    }
    console.log(gender);
    console.log(hobbies);
  };
  const handleHobbyChange = (e, idx) => {
    const { checked, value } = e.target;
    console.log(checked, "checked");
    if (checked) {
      setHobbies([...hobbies, value]);
      //   or
      const temp = [...hobbies];
      temp.push(value);
      setHobbies(temp);
    } else {
      const temp = [...hobbies];
      temp.splice(idx, 1);
      setHobbies(temp);
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    // setNewGender((prevGender) => (prevGender === value ? null : value));

    if (value !== newGender) {
      setNewGender(value);
    } else {
      setNewGender("");
    }
  };
  console.log(hobbies, "hobbies");
  return (
    <div>
      <h5>Select Gender</h5>
      {GENDER_OPTIONS.map((curGender, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="gender"
            value={curGender}
            onChange={(e) => setGender(e.target.value)}
            checked={curGender === gender}
          />
          <p className="text-capitalize">{curGender}</p>
        </div>
      ))}
      <h5>Select Hobbies</h5>
      {HOBBIES_OPTIONS.map((curHbyOpt, idx) => (
        <Fragment key={idx}>
          <input
            type="checkbox"
            name="hobbies"
            value={curHbyOpt}
            checked={hobbies.includes(curHbyOpt)}
            onChange={(e) => handleHobbyChange(e, idx)}
          />
          <p className="text-capitalize">{curHbyOpt}</p>
        </Fragment>
      ))}

      {GENDER_OPTIONS.map((curGender, idx) => (
        <div key={idx}>
          <input
            type="radio"
            name="newgender"
            value={curGender}
            onClick={(e) => handleRadioChange(e)}
            checked={curGender === newGender}
          />
          <p className="text-capitalize">{curGender}</p>
        </div>
      ))}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Scenario1;
