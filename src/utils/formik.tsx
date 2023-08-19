import { FormikErrors, FormikTouched } from "formik";
import { LoginUserData } from "../pages/auth/types";
import { ReactNode } from "react";
import { RegisterUserData } from "../pages/auth/types";
import { CreatePostFromData } from "../components/forms/types";

export const checkErrors = (
  errors: FormikErrors<LoginUserData | RegisterUserData | CreatePostFromData>,
  touched: FormikTouched<LoginUserData | RegisterUserData | CreatePostFromData>,
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
