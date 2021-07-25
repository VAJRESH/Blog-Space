import React, { useEffect, useState } from "react";
import BlogEditor from "../../../components/Blog/Editor/BlogEditor";
import useCreateBlog from "./Logic/useCreateBlog";
import Layout from "../../../components/Layout/Layout";

const Create = () => {
  const { newBlogData, tags, handleTitle, handleBody, handleTags, createBlog } =
    useCreateBlog();

  return (
    <>
      <BlogEditor
        handlers={[handleTitle, handleBody, handleTags, createBlog]}
        data={newBlogData}
        tags={tags}
      />
    </>
  );
};

export default Create;
