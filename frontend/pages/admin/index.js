import Layout from "../../components/Layout/Layout";
import Admin from "../../components/Auth/AccessControl/Admin";

const AdminDashboard = () => {
  return (
    <Layout>
      <Admin>
        <h1 className={`h1`}>Admin Dashboard</h1>
      </Admin>
    </Layout>
  );
};

export default AdminDashboard;
