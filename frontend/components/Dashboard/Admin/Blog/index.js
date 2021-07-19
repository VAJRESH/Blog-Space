import { useEffect, useState } from "react";
import { getCookie, isAuth } from "../../../../actions/auth.action";
import { createNewBlog, getUserBlogs } from "../../../../actions/blog.action";
import { getAllTags } from "../../../../actions/tag.action";
import { generateFormData } from "../../../../helpers/util.functions";
import BlogCreate from "./Create/BlogCreate";

function useCreateBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [newBlogData, setNewBlogData] = useState({
    title: "",
    body: "",
    tags: [],
  });

  useEffect(() => {
    loadUserBlogs();
    getTags();
  }, []);

  function loadUserBlogs() {
    getUserBlogs(isAuth()._id).then((res) => {
      if (res.error) return;
      setUserBlogs(res);
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
  function handleTags(tagId) {
    const tags = [...newBlogData.tags];
    const selectedTagId = tags.indexOf(tagId);

    if (selectedTagId === -1) {
      // adds the selected tag
      tags.push(tagId);
    } else {
      // removes the selected tag
      tags.splice(selectedTagId, 1);
    }

    setNewBlogData({
      ...newBlogData,
      tags: tags,
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
    userBlogs,
    newBlogData,
    tags,
    handleTitle,
    handleBody,
    handleTags,
    createBlog,
  };
}

const ManageBlogs = () => {
  const {
    userBlogs,
    newBlogData,
    tags,
    handleTitle,
    handleBody,
    handleTags,
    createBlog,
  } = useCreateBlogs();

  return (
    <div>
      Create Blog
      <BlogCreate
        handlers={[handleTitle, handleBody, handleTags, createBlog]}
        data={newBlogData}
        tags={tags}
      />
      {JSON.stringify(userBlogs, null, 5)}
      <p>.</p>
      {JSON.stringify(newBlogData)}
      {newBlogData.body.length}
      <div dangerouslySetInnerHTML={{ __html: newBlogData.body }}></div>
      {/*  {userBlogs.map((blog) => {
        return (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <section>
              <article>{blog.body}</article>
            </section>
            <section>
              <p>{ blog.views}</p>
              <p>{ blog.likes.length}</p>
            </section>
          </div>
        );
      })} */}
    </div>
  );
};

export default ManageBlogs;
