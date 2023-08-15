import { Formik, FormikHelpers } from "formik";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import * as Yup from "yup";
import classNames from "classnames";
import { checkErrors } from "../utils/formik";
import { Link } from "react-router-dom";
import { AvailableRoutes } from "../routes/AvailableRoutes";
import { useAxios } from "../hooks/useAxios";

export type LoginUserData = {
  email: string;
  password: string;
};

const initialValues: LoginUserData = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
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

function Login() {
  const { axiosInstance } = useAxios();

  const handleCLickLogin = (
    values: LoginUserData,
    actions: FormikHelpers<LoginUserData>
  ) => {
    axiosInstance
      .post("auth/login", values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        actions.setErrors({ email: error.response.data.cause });
      })
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <>
      <div className="flex align-items-center justify-content-center">
        <Card title="Login" className="w-30rem m-5">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              handleCLickLogin(values, actions);
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
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-column gap-2 mt-2"
              >
                <span className="p-float-label">
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
                <Button type="submit" label="Login" disabled={isSubmitting} />
              </form>
            )}
          </Formik>
          <div className="mt-4 box text-center">
            Return <Link to={AvailableRoutes.Home}>home</Link>
          </div>
          <div className="box text-center">
            Already have an account?{" "}
            <Link to={AvailableRoutes.Register}>Register</Link>
          </div>
        </Card>
      </div>
    </>
  );
}
export default Login;
