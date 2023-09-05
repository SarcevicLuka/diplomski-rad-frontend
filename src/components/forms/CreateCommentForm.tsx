import * as Yup from "yup";
import { useAxios } from "../../api/hooks/useAxios";
import { Formik, FormikHelpers } from "formik";
import { Button } from "primereact/button";
import { checkErrors } from "../../utils/formik";
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";
import { PostRoutes } from "../../api/endpoints";
import { CreateCommentFromData } from "./types";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface CreateCommentFormProps {
  postId?: string;
}

const initialValues: CreateCommentFromData = {
  text: "",
  score: 1,
};

const CreateCommentSchema = Yup.object().shape({
  text: Yup.string().max(500, "500 character max").required("Required"),
  score: Yup.number().min(1).max(5).required("Required"),
});

function CreateCommentForm({ postId }: CreateCommentFormProps) {
  const { axiosInstance } = useAxios();
  const toast = useRef<Toast>(null);

  const showToast = () => {
    toast.current?.show({
      sticky: true,
      severity: "success",
      summary: "Comment created",
      life: 3000,
    });
  };

  const handleCreateComment = (
    values: CreateCommentFromData,
    actions: FormikHelpers<CreateCommentFromData>
  ) => {
    axiosInstance
      .post(PostRoutes.CREATE_COMMENT(postId), values)
      .then((response) => {
        console.log(response);
        showToast();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <>
      <div className="text-lg font-medium">Share you thoughts:</div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          handleCreateComment(values, actions);
          actions.resetForm();
        }}
        validationSchema={CreateCommentSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="gap-2 mt-2">
            <Toast ref={toast} position="top-right" />
            <div>
              <span className="p-float-label mt-2">
                <InputTextarea
                  id="text"
                  name="text"
                  rows={4}
                  cols={30}
                  value={values.text}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.text && touched.text,
                    "w-full": true,
                  })}
                />
                <label htmlFor="text">Your thoughts...</label>
              </span>
              {checkErrors(errors, touched, "text")}
            </div>
            <div className="flex align-items-center justify-content-between w-17rem sm:w-30rem">
              <div>
                <div>Your score:</div>
                <Rating
                  id="score"
                  name="score"
                  value={values.score}
                  onChange={handleChange}
                  cancel={false}
                />
              </div>
              <Button
                type="submit"
                label="Create"
                size="small"
                icon="pi pi-plus"
                disabled={isSubmitting}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default CreateCommentForm;
