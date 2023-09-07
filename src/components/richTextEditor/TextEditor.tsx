import { FormikErrors } from "formik";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { CreatePostFromData, EditPostFromData } from "../forms/types";

interface TextEditorProps {
  values: CreatePostFromData | EditPostFromData;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<CreatePostFromData | EditPostFromData>>;
}

function TextEditor({ setFieldValue, values }: TextEditorProps) {
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
      </span>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <Editor
        id="review"
        name="review"
        placeholder="Write a review..."
        headerTemplate={header}
        value={values.review}
        onTextChange={(e: EditorTextChangeEvent) => {
          if (e.htmlValue) setFieldValue("review", e.htmlValue);
        }}
        style={{ height: "320px" }}
      />
    </div>
  );
}

export default TextEditor;
