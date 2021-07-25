import { useEffect, useState } from "react";
import { isAuth } from "../../../actions/auth.action";
import { getUserBlogs } from "../../../actions/blog.action";

function useManageBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    loadUserBlogs();
  }, []);

  function loadUserBlogs() {
    getUserBlogs(isAuth()._id).then((res) => {
      if (res.error) return;
      setUserBlogs(res);
    });
  }

  return {
    userBlogs,
  };
}

export default useManageBlogs;
