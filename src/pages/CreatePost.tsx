import DefaultLayout from "../layouts/Default";
import ArticleForm from "../components/forms/ArticleForm";
import CustomCard from "../components/CustomCard";

function CreatePost() {
  return (
    <DefaultLayout>
      <CustomCard title="New post">
        <ArticleForm />
      </CustomCard>
    </DefaultLayout>
  );
}

export default CreatePost;
