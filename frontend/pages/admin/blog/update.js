import React, { useEffect, useState } from "react";
import { getCookie } from "../../../actions/auth.action";
import { getSingleBlog, updateBlog } from "../../../actions/blog.action";
import { getAllTags } from "../../../actions/tag.action";
import BlogEditor from "../../../components/Dashboard/Admin/Blog/Editor/BlogEditor";
import { generateFormData } from "../../../helpers/util.functions";
import Router from "next/router";

function useUpdateBlog() {
  const [tags, setTags] = useState([]);
  const [slug, setSlug] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    tagNames: [],
    tags: [],
  });

  useEffect(() => {
    const blogSlug = window.location.search.split("=")[1];
    if (!blogSlug) return Router("/blog");

    setSlug(blogSlug);
    getBlogData(blogSlug);
    getTags();
  }, []);

  function getBlogData(slug) {
    let tagIds = [],
      tagNames = [];
    getSingleBlog(slug).then((res) => {
      console.log(res);
      res.tags.forEach((tag) => {
        tagIds.push(tag._id);
        tagNames.push(tag.name);
      });

      setBlogData({
        ...blogData,
        body: res.body,
        title: res.title,
        tags: tagIds,
        tagNames: tagNames,
      });
    });
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
    setBlogData({
      ...blogData,
      title: e.target.value,
    });
  }

  function handleBody(data) {
    if (!blogData.title) return;

    setBlogData({
      ...blogData,
      body: data,
    });
  }
  function handleTags(tag) {
    const tagIds = [...blogData.tags];
    const tagNames = [...blogData.tagNames];
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

    setBlogData({
      ...blogData,
      tags: tagIds,
      tagNames: tagNames,
    });
  }

  function updateUserBlog(e) {
    e.preventDefault();

    const formData = generateFormData(blogData);

    updateBlog(formData, slug, getCookie("token"))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return {
    blogData,
    tags,
    handleTitle,
    handleBody,
    handleTags,
    updateUserBlog,
  };
}

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
