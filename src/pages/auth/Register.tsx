import { Formik, FormikHelpers } from "formik";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import * as Yup from "yup";
import classNames from "classnames";
import { checkErrors } from "../../utils/formik";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { Link } from "react-router-dom";
import Avatar from "react-avatar-edit";
import { useState } from "react";
import { useAxios } from "../../api/hooks/useAxios";
import { Password } from "primereact/password";
import { RegisterUserData } from "./types";
import { AuthRoutes } from "../../api/endpoints";

const initialValues: RegisterUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  avatar: "default.jpg",
};

const LoginSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Email of incorrect format").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
      "Password must contain number, capital and small letters"
    )
    .required("Required"),
});

function Register() {
  const [imageError, setImageError] = useState<string>("");
  const { axiosInstance } = useAxios();

  const handleCLickRegister = (
    values: RegisterUserData,
    actions: FormikHelpers<RegisterUserData>
  ) => {
    axiosInstance
      .post(AuthRoutes.REGISTER, values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          actions.setErrors({
            password: error.response.data.errors.password.errors,
          });
        } else if (error.response.data?.cause.includes("email")) {
          actions.setErrors({ email: error.response.data.cause });
        }
      })
      .finally(() => actions.setSubmitting(false));
  };

  const onBeforeFileLoad = (elem: React.ChangeEvent<HTMLInputElement>) => {
    if (elem.target.files && elem.target.files[0].size > 200000) {
      setImageError("Image too big. Should be 2MB");
      elem.target.value = "";
    }
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <Card title="Create account" className="sm:w-10 md:w-30rem">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values);
            handleCLickRegister(values, actions);
            actions.setSubmitting(true);
          }}
          validationSchema={LoginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-column gap-2 mt-2"
            >
              <div className="flex flex-column align-items-center justify-content-center mb-3">
                <Avatar
                  label="Upload image"
                  width={200}
                  height={200}
                  onCrop={(image: string | null) =>
                    setFieldValue("avatar", image)
                  }
                  onBeforeFileLoad={onBeforeFileLoad}
                  shadingOpacity={0.8}
                />
                {imageError ? (
                  <small className="p-error mt-2">{imageError}</small>
                ) : (
                  <small className="p-error mt-2">&nbsp;</small>
                )}
              </div>
              <span className="p-float-label mt-2">
                <InputText
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.firstName && touched.firstName,
                    "w-full": true,
                  })}
                />
                <label htmlFor="input_value">First name</label>
              </span>
              {checkErrors(errors, touched, "firstName")}
              <span className="p-float-label mt-2">
                <InputText
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.lastName && touched.lastName,
                    "w-full": true,
                  })}
                />
                <label htmlFor="input_value">Last name</label>
              </span>
              {checkErrors(errors, touched, "lastName")}
              <span className="p-float-label mt-2">
                <InputText
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.email && touched.email,
                    "w-full": true,
                  })}
                />
                <label htmlFor="input_value">Email</label>
              </span>
              {checkErrors(errors, touched, "email")}
              <span className="p-float-label mt-2">
                <Password
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.password && touched.password,
                    "w-full": true,
                  })}
                  toggleMask
                  feedback={false}
                />
                <label htmlFor="input_value">Password</label>
              </span>
              {checkErrors(errors, touched, "password")}
              <Button
                type="submit"
                label="Register"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </form>
          )}
        </Formik>
        <div className="mt-4 box text-center">
          Return <Link to={AvailableRoutes.Home}>home</Link>
        </div>
        <div className="box text-center">
          Already have an account? <Link to={AvailableRoutes.Login}>Login</Link>
        </div>
      </Card>
    </div>
  );
}
export default Register;
