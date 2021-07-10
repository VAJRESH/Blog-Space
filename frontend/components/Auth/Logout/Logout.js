const Logout = ({ handleLogout }) => {
  return (
    <>
      <span onClick={handleLogout} style={{ cursor: "pointer", color: '#0077ff' }}>
        Logout
      </span>
    </>
  );
};

export default Logout;
