import React, { useEffect, useState } from "react";
import { getCookie, isAuth } from "../../../../actions/auth.action";
import { createNewBlog, getUserBlogs } from "../../../../actions/blog.action";
import { getAllTags } from "../../../../actions/tag.action";
import { generateFormData } from "../../../../helpers/util.functions";
import BlogCard from "./BlogCards/BlogCard";
import BlogEditor from "./Editor/BlogEditor";
import Link from "next/link";

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

const ManageBlogs = () => {
  const { userBlogs } = useManageBlogs();

  return (
    <div>
      <Link href={`/admin/blog/create`}>Create New Blog</Link>
      {userBlogs.map((blog) => {
        return (
          <React.Fragment key={blog._id}>
            <BlogCard blog={blog} />
            <Link href={`/admin/blog/update?id=${blog.slug}`}>
              <a>Update</a>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ManageBlogs;
