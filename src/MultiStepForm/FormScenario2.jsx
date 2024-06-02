import React from "react";
import { useForm } from "react-hook-form";

const FormScenario2 = () => {
  const registerForm = () => {
    const { register, formState, handleSubmit } = useForm();
    return { register, formState, handleSubmit };
  };

  // Register multiple forms
  const forms = {
    email: registerForm(),
    delivery: registerForm(),
    payment: registerForm(),
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      {/* form 1 */}
      <form
        onSubmit={forms.email.handleSubmit(onSubmit)}
        style={{ marginBottom: "10px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            {...forms.email.register("email", {
              required: "This field is required",
            })}
          />
          {forms?.email?.formState?.errors?.email && (
            <p style={{ color: "red" }}>
              {forms?.email?.formState?.errors?.email?.message}
            </p>
          )}
          <input
            type="text"
            {...forms.email.register("work", {
              required: "This field is required",
            })}
          />
          <input
            type="text"
            {...forms.email.register("name", {
              required: "This field is required",
            })}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* form 1 */}

      {/* form 2 */}
      <form
        onSubmit={forms.delivery.handleSubmit(onSubmit)}
        style={{ marginBottom: "10px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            {...forms.delivery.register("delivery", {
              required: "This field is required",
            })}
          />
          <input
            type="text"
            {...forms.delivery.register("deliveryTime", {
              required: "This field is required",
            })}
          />
          <input
            type="text"
            {...forms.delivery.register("deliveryOrder", {
              required: "This field is required",
            })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* form 2 */}

      {/* form 3 */}
      <form onSubmit={forms.payment.handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            {...forms.payment.register("payment", {
              required: "This field is required",
            })}
          />
          <input
            type="text"
            {...forms.payment.register("paymentTime", {
              required: "This field is required",
            })}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* form 3 */}
    </div>
  );
};

export default FormScenario2;
