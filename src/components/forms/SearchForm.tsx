import { Formik } from "formik";
import { Button } from "primereact/button";
import { checkErrors } from "../../utils/formik";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { SearchFormData } from "./types";
import { SetStateAction, Dispatch } from "react";

interface SearchFormDataProps {
  setSearchTerm: Dispatch<SetStateAction<SearchFormData | undefined>>;
}

const initialValues: SearchFormData = {
  searchTerm: "",
};

function SearchForm({ setSearchTerm }: SearchFormDataProps) {
  const handleSearchUser = (values: SearchFormData) => {
    setSearchTerm(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSearchUser(values);
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex w-full p-input-icon-right">
              <i
                className="pi pi-times cursor-pointer"
                onClick={() => setFieldValue("searchTerm", "")}
              />
              <InputText
                id="searchTerm"
                name="searchTerm"
                placeholder="Type in user or watch brand to search"
                value={values.searchTerm}
                onChange={handleChange}
                className={classNames({
                  "p-invalid": errors.searchTerm && touched.searchTerm,
                  "w-full": true,
                })}
              />
            </div>
            {checkErrors(errors, touched, "searchTerm")}

            <Button className="ml-2" type="submit" icon="pi pi-search" />
          </form>
        )}
      </Formik>
    </>
  );
}

export default SearchForm;
