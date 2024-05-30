import React from "react";
import { useForm } from "react-hook-form";
const FILTER_1_OPTIONS = ["option1", "option2", "option3", "option4"];
const FILTER_2_OPTIONS = ["option1", "option2", "option3", "option4"];
const FILTER_3_OPTIONS = ["option1", "option2", "option3", "option4"];
const FILTER_4_OPTIONS = ["option1", "option2", "option3", "option4"];

const FilterSection2 = ({ setFilters, filters }) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    // setFilters(values);
    setFilters({ ...values });
  };
  const isAnyFieldFilled = () => {
    // gets all fields value in the object
    const fields = watch();
    console.log(fields);
    // or watch(["filter1","filter2","filter3","filter4"])
    return Object.values(fields).some((value) => value !== "");
  };
  return (
    <div>
      <div className="section2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="filter1">
            <select {...register("filter1")}>
              <option selected disabled value="">
                Select Filter 1
              </option>
              {FILTER_1_OPTIONS.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="filter1">
            <select {...register("filter2")}>
              <option selected disabled value="">
                Select Filter 2
              </option>
              {FILTER_2_OPTIONS.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="filter1">
            <select {...register("filter3")}>
              <option selected disabled value="">
                Select Filter 3
              </option>
              {FILTER_3_OPTIONS.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="filter1">
            <select {...register("filter4")}>
              <option selected disabled value="">
                Select Filter 4
              </option>
              {FILTER_4_OPTIONS.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={!isAnyFieldFilled()}>
            Apply filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterSection2;
