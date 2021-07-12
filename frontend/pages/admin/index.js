import Layout from "../../components/Layout/Layout";
import Admin from "../../components/Auth/AccessControl/Admin";
import Anchor from "../../components/Dashboard/Common/Anchor";

const AdminDashboard = () => {
  return (
    <Layout>
      <Admin>
        <h1 className={`h1`}>Admin Dashboard</h1>
        <Anchor pageLink='/admin/tags' title='Manage Tags' />
      </Admin>
    </Layout>
  );
};

export default AdminDashboard;
