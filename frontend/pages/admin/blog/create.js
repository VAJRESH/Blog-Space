import React, { useEffect, useState } from "react";
import BlogEditor from "../../../components/Dashboard/Admin/Blog/Editor/BlogEditor";

function useCreateBlog() {
  const [tags, setTags] = useState([]);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    body: "",
    tagNames: [],
    tagIds: [],
  });

  useEffect(() => {
    getTags();
  }, []);

  function getTags() {
    getAllTags()
      .then((res) => {
        if (res.error) return;
        setTags(res);
      })
      .catch((err) => console.log(err));
  }

  function handleTitle(e) {
    setNewBlogData({
      ...newBlogData,
      title: e.target.value,
    });
  }

  function handleBody(data) {
    setNewBlogData({
      ...newBlogData,
      body: data,
    });
  }
  function handleTags(tag) {
    const tagIds = [...newBlogData.tagIds];
    const tagNames = [...newBlogData.tagNames];
    const selectedTagId = tagIds.indexOf(tag._id);

    if (selectedTagId === -1) {
      // adds the selected tag
      tagIds.push(tag._id);
      tagNames.push(tag.name);
    } else {
      // removes the selected tag
      tagIds.splice(selectedTagId, 1);
      tagNames.splice(selectedTagId, 1);
    }

    setNewBlogData({
      ...newBlogData,
      tagIds: tagIds,
      tagNames: tagNames,
    });
  }

  function createBlog(e) {
    e.preventDefault();
    const formData = generateFormData(newBlogData);

    createNewBlog(formData, getCookie("token"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return {
    newBlogData,
    tags,
    handleTitle,
    handleBody,
    handleTags,
    createBlog,
  };
}

const Create = () => {
  const {
    newBlogData,
    tags,
    handleTitle,
    handleBody,
    handleTags,
    createBlog,
  } = useCreateBlog();

  return (
    <div>
      <BlogEditor
        handlers={[handleTitle, handleBody, handleTags, createBlog]}
        data={newBlogData}
        tags={tags}
      />
    </div>
  );
};

export default Create;
