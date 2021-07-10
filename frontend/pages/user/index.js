import Layout from "../../components/Layout/Layout";
import Private from "../../components/Auth/AccessControl/Private";

const UserDashboard = () => {
  return (
    <Layout>
      <Private>
        <h1 className={`h1`}>User Dashboard</h1>
      </Private>
    </Layout>
  );
};

export default UserDashboard;
