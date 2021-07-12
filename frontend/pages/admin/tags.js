import Layout from "../../components/Layout/Layout";
import Admin from "../../components/Auth/AccessControl/Admin";
import ManageTags from "../../components/Dashboard/Admin/Tags";

const CreateTags = () => {
  return (
    <Layout>
          <Admin>
              <ManageTags />
      </Admin>
    </Layout>
  );
};

export default CreateTags;
