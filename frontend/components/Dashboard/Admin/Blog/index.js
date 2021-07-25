import Link from "next/link";
import React from "react";
import BlogCard from "../../../Blog/BlogCards/BlogCard";
import useManageBlogs from "../../Logic/useManageBlogs";

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
