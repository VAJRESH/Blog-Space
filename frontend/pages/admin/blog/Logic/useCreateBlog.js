import React, { useEffect, useState } from "react";
import { getAllTags } from "../../../../actions/tag.action";
import { getCookie, setLocalStorage } from "../../../../actions/auth.action";
import { createNewBlog } from "../../../../actions/blog.action";
import { generateFormData } from "../../../../helpers/util.functions";

function useCreateBlog() {
  const [tags, setTags] = useState([]);
  const [newBlogData, setNewBlogData] = useState({
    title: getSavedData().title || "",
    body: getSavedData().body || "",
    tagNames: getSavedData().tagNames || [],
    tags: getSavedData().tags || [],
    shouldSave: false,
  });

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (newBlogData.shouldSave) {
      setLocalStorage("blog", newBlogData);
    }
  }, [newBlogData]);

  function getSavedData() {
    if (process.browser) {
      return { ...JSON.parse(localStorage.getItem("blog")) };
    }

    return {};
  }

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
      shouldSave: true,
    });
  }

  function handleBody(data) {
    setNewBlogData({
      ...newBlogData,
      body: data,
      shouldSave: true,
    });
  }
  function handleTags(tag) {
    const tagIds = [...newBlogData.tags];
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
      tags: tagIds,
      tagNames: tagNames,
      shouldSave: true,
    });
  }

  function createBlog(e) {
    e.preventDefault();
    const formData = generateFormData(newBlogData);

    createNewBlog(formData, getCookie("token"))
      .then((res) => {
        console.log(res);
        if (res.message) {
          localStorage.removeItem("blog");
        }
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

export default useCreateBlog;
