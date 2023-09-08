import { FormikErrors, FormikTouched } from "formik";
import { LoginUserData } from "../pages/auth/types";
import { ReactNode } from "react";
import { RegisterUserData } from "../pages/auth/types";
import { CreatePostFromData, SearchFormData } from "../components/forms/types";

type FormikTypes =
  | LoginUserData
  | RegisterUserData
  | CreatePostFromData
  | SearchFormData;

export const checkErrors = (
  errors: FormikErrors<FormikTypes>,
  touched: FormikTouched<FormikTypes>,
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
