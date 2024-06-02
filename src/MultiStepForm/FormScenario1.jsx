import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// Having more than one form in a single page and need to get values of a particular
// form only Way1
// similaar scenario
const FormScenario1 = () => {
  useEffect(() => {
    const response = {
      form1: {
        name: "Akshat",
        email: "akshat@gmail.com",
      },
      form2: { company_name: "Aviox", company_email: "aviox@gmail.com" },
      form3: { vendor_name: "Pankaj", vendor_email: "pankaj@gmail.com" },
    };
    for (let key in response) {
      if (key === "form1") {
        for (let subkey in response[key]) {
          setValue(subkey, response[key][subkey]);
        }
      }
      if (key === "form2") {
        for (let subkey in response[key]) {
          setCompanyValues(subkey, response[key][subkey]);
        }
      }
      if (key === "form3") {
        for (let subkey in response[key]) {
          setVendorValues(subkey, response[key][subkey]);
        }
      }
    }
  }, []);
  // for form 1
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  //   for form 2
  const {
    handleSubmit: handleCompanySubmit,
    register: companyRegister,
    setValue: setCompanyValues,
    formState: { errors: companyErrors },
  } = useForm();
  //   for form three
  const {
    handleSubmit: handleVendorSubmit,
    register: vendorRegister,
    setValue: setVendorValues,
    formState: { errors: vendorErrors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "data");
  };
  //   sometimes we also requires different onsubmits to perform different apis
  const onVendorSubmit = (vendorDetails) => {
    console.log(vendorDetails);
  };
  const onCompanySubmit = (companyDetails) => {
    console.log(companyDetails);
  };

  return (
    <div>
      {/* form 1 */}
      <h1>Client Info</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        {errors?.name && <p>{errors.name?.message}</p>}
        <input type="text" {...register("email")} />
        {errors?.email && <p>{errors.email?.message}</p>}
        <button type="submit">Submit</button>
      </form>
      {/* form 1 */}

      {/* form 2 */}
      <h1>Company info</h1>
      <form onSubmit={handleCompanySubmit(onSubmit)}>
        <input type="text" {...companyRegister("company_name")} />
        {companyErrors?.name && <p>{companyErrors.name?.message}</p>}
        <input type="text" {...companyRegister("company_email")} />
        {companyErrors?.email && <p>{companyErrors.email?.message}</p>}
        <button type="submit">Submit</button>
      </form>
      {/* form 2 */}

      {/* form 3 */}
      <h1>Vendor info</h1>
      <form onSubmit={handleVendorSubmit(onSubmit)}>
        <input type="text" {...vendorRegister("vendor_name")} />
        {vendorErrors?.name && <p>{vendorErrors.name?.message}</p>}
        <input type="text" {...vendorRegister("vendor_email")} />
        {vendorErrors?.email && <p>{vendorErrors.email?.message}</p>}
        <button type="submit">Submit</button>
      </form>
      {/* form 3 */}
    </div>
  );
};

export default FormScenario1;
