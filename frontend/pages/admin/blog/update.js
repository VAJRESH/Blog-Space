import React from "react";
import BlogEditor from "../../../components/Blog/Editor/BlogEditor";
import useUpdateBlog from "./Logic/useUpdateBlog";

const Update = () => {
  const {
    blogData,
    tags,
    handleTitle,
    handleBody,
    handleTags,
    updateUserBlog,
  } = useUpdateBlog();

  return (
    <div>
      <BlogEditor
        handlers={[handleTitle, handleBody, handleTags, updateUserBlog]}
        data={blogData}
        tags={tags}
        isUpdate
      />
    </div>
  );
};

export default Update;
