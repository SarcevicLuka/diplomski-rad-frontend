import WatchIcon from "@mui/icons-material/Watch";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { EditPostData, WatchUserData, EditPostFromData } from "./types";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import TextEditor from "../richTextEditor/TextEditor";
import classNames from "classnames";
import { checkErrors } from "../../utils/formik";
import { Button } from "primereact/button";
import { useAxios } from "../../api/hooks/useAxios";
import { PostRoutes } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import FormContentDivider from "../FormContentDivider";
import { PostData } from "../post/types";
import { useMemo } from "react";

interface EditArticleFormProps {
  postData: PostData;
}

const EditPostSchema = Yup.object().shape({
  brand: Yup.string().required("Required"),
  model: Yup.string().required("Required"),
  diameter: Yup.number().min(0).required("Required"),
  lugWidth: Yup.number().min(0).required("Required"),
  caseMaterial: Yup.string().required("Required"),
  mechanismModel: Yup.string().required("Required"),
  review: Yup.string().required("Required"),
  score: Yup.number().required("Required"),
});

function EditArticleForm({ postData }: EditArticleFormProps) {
  const { axiosInstance } = useAxios();
  const navigation = useNavigate();

  const initialValues: EditPostFromData = useMemo(() => {
    return {
      brand: postData?.watchData?.brand ?? " ",
      model: postData?.watchData?.model ?? " ",
      diameter: postData?.watchData?.diameter ?? 0,
      lugWidth: postData?.watchData?.lugWidth ?? 0,
      caseMaterial: postData?.watchData?.caseMaterial ?? " ",
      mechanismModel: postData?.watchData?.mechanismModel ?? " ",
      review: postData?.post?.text ?? " ",
      score: postData?.post?.score ?? 0,
    };
  }, [postData]);

  const handleEditPost = (
    values: EditPostData,
    actions: FormikHelpers<EditPostFromData>
  ) => {
    axiosInstance
      .patch(PostRoutes.EDIT_POST(postData?.post.id), values)
      .then((response) => {
        console.log(response);
        //navigation(AvailableRoutes.Post());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => actions.setSubmitting(false));
  };

  const insertable = (values: EditPostFromData): EditPostData => {
    const watchData: WatchUserData = {
      brand: values.brand,
      model: values.model,
      diameter: values.diameter,
      lugWidth: values.lugWidth,
      caseMaterial: values.caseMaterial,
      mechanismModel: values.mechanismModel,
    };

    const postData: EditPostData = {
      watchData: watchData,
      review: values.review,
      score: values.score,
    };

    return postData;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const userValues = insertable(values);
        actions.setSubmitting(true);
        handleEditPost(userValues, actions);
      }}
      validationSchema={EditPostSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="gap-2 mt-2">
          <div className="md:flex xl:grid">
            <div className="col">
              <FormContentDivider icon={<TextSnippetIcon />} text="Review" />
              <TextEditor setFieldValue={setFieldValue} values={values} />
              {checkErrors(errors, touched, "review")}
            </div>
            <div className="col">
              <FormContentDivider icon={<WatchIcon />} text="Watch info" />
              <span className="p-float-label mt-2">
                <InputText
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.brand && touched.brand,
                    "w-full": true,
                  })}
                />
                <label htmlFor="brand">Watch brand</label>
              </span>
              {checkErrors(errors, touched, "brand")}
              <span className="p-float-label mt-2">
                <InputText
                  id="model"
                  name="model"
                  value={values.model}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.model && touched.model,
                    "w-full": true,
                  })}
                />
                <label htmlFor="model">Watch model</label>
              </span>
              {checkErrors(errors, touched, "model")}
              <span className="p-float-label mt-2">
                <InputNumber
                  inputId="diameter"
                  name="diameter"
                  showButtons
                  useGrouping={false}
                  value={values.diameter}
                  onValueChange={handleChange}
                  min={0}
                  className={classNames({
                    "p-invalid": errors.diameter && touched.diameter,
                    "w-full": true,
                  })}
                />
                <label htmlFor="diameter">Case diameter</label>
              </span>
              {checkErrors(errors, touched, "diameter")}
              <span className="p-float-label mt-2">
                <InputNumber
                  inputId="lugWidth"
                  name="lugWidth"
                  showButtons
                  useGrouping={false}
                  value={values.lugWidth}
                  onValueChange={handleChange}
                  min={0}
                  className={classNames({
                    "p-invalid": errors.lugWidth && touched.lugWidth,
                    "w-full": true,
                  })}
                />
                <label htmlFor="lugWidth">Lug width</label>
              </span>
              {checkErrors(errors, touched, "lugWidth")}
              <span className="p-float-label mt-2">
                <InputText
                  id="caseMaterial"
                  name="caseMaterial"
                  value={values.caseMaterial}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid": errors.caseMaterial && touched.caseMaterial,
                    "w-full": true,
                  })}
                />
                <label htmlFor="caseMaterial">Case material</label>
              </span>
              {checkErrors(errors, touched, "caseMaterial")}
              <span className="p-float-label mt-2">
                <InputText
                  id="mechanismModel"
                  name="mechanismModel"
                  value={values.mechanismModel}
                  onChange={handleChange}
                  className={classNames({
                    "p-invalid":
                      errors.mechanismModel && touched.mechanismModel,
                    "w-full": true,
                  })}
                />
                <label htmlFor="mechanismModel">Mechanism model</label>
              </span>
              {checkErrors(errors, touched, "mechanismModel")}
              <span className="p-float-label mt-2">
                <InputNumber
                  inputId="score"
                  name="score"
                  showButtons
                  value={values.score}
                  onValueChange={handleChange}
                  min={1}
                  max={5}
                  className={classNames({
                    "p-invalid": errors.score && touched.score,
                    "w-full": true,
                  })}
                />
                <label htmlFor="score">Score</label>
              </span>
              {checkErrors(errors, touched, "score")}
            </div>
          </div>
          <div className="flex justify-content-end mt-5">
            <Button
              className="mr-2"
              type="reset"
              label="Cancel"
              outlined
              icon="pi pi-times"
              onClick={() => navigation(AvailableRoutes.Home)}
            />
            <Button
              type="submit"
              label="Save"
              icon="pi pi-check"
              disabled={isSubmitting}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}

export default EditArticleForm;
