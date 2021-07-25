import Private from "../../components/Auth/AccessControl/Private";

const UserDashboard = () => {
  return (
    <>
      <Private>
        <h1 className={`h1`}>User Dashboard</h1>
      </Private>
    </>
  );
};

export default UserDashboard;
