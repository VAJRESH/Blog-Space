import Layout from "../../components/Layout/Layout";
import Admin from "../../components/Auth/AccessControl/Admin";
import BlogCreate from "../../components/Dashboard/Admin/Blog";

const CreateTags = () => {
  return (
    <Layout>
          <Admin>
              <BlogCreate />
      </Admin>
    </Layout>
  );
};

export default CreateTags;
