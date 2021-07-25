import Layout from "../../components/Layout/Layout";
import Admin from "../../components/Auth/AccessControl/Admin";
import ManageTags from "../../components/Dashboard/Admin/Tag";

const Tags = () => {
  return (
    <>
      <Admin>
        <ManageTags />
      </Admin>
    </>
  );
};

export default Tags;
