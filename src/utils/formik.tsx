import { FormikErrors, FormikTouched } from "formik";
import { LoginUserData } from "../pages/auth/Login";
import { ReactNode } from "react";
import { RegisterUserData } from "../pages/Register";

export const checkErrors = (
  errors: FormikErrors<LoginUserData | RegisterUserData>,
  touched: FormikTouched<LoginUserData | RegisterUserData>,
  name: string
): ReactNode => {
  return (errors as { [key: string]: boolean })[name] &&
    (touched as { [key: string]: boolean })[name] ? (
    <small className="p-error">
      {(errors as { [key: string]: string })[name]}
    </small>
  ) : (
    <small className="p-error">&nbsp;</small>
  );
};
