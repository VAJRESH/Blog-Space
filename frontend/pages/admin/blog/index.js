import Layout from "../../../components/Layout/Layout";
import Admin from "../../../components/Auth/AccessControl/Admin";
import ManageBlogs from "../../../components/Dashboard/Admin/Blog";

const Blogs = () => {
  return (
    <>
      <Admin>
        <ManageBlogs />
      </Admin>
    </>
  );
};

export default Blogs;
