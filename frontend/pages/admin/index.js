import Layout from "../../components/Layout/Layout";
import Admin from "../../components/Auth/AccessControl/Admin";
import Anchor from "../../components/Dashboard/Common/Anchor";

const AdminDashboard = () => {
  return (
    <>
      <Admin>
        <h1 className={`h1`}>Admin Dashboard</h1>
        <Anchor pageLink='/admin/tag' title='Manage Tags' />
        <Anchor pageLink='/admin/blog' title='Manage Blogs' />
      </Admin>
    </>
  );
};

export default AdminDashboard;
