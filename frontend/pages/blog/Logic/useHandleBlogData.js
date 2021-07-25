import { useEffect } from "react";
import { getCookie, setCookie } from "../../../actions/auth.action";
import { updateLikesOfBlog, updateView } from "../../../actions/blog.action";

function useHandleBlogData(blog) {
  useEffect(() => {
    if (!getCookie("viewedBlogs")) setCookie("viewedBlogs", "0");
    incrementViewCount();
  }, []);

  function incrementViewCount() {
    const viewedBlogs = getCookie("viewedBlogs").split(",") || [];
    let isBlogViewed = false;

    viewedBlogs.some((blogId) => {
      if (blogId === blog._id) {
        isBlogViewed = true;
        return true;
      }
    });

    if (!isBlogViewed) {
      viewedBlogs.push(blog._id);
      setCookie("viewedBlogs", viewedBlogs.join(","));
      updateView(blog.slug);
    }
  }

  function handleLikes() {
    if (!getCookie("token")) {
      console.log("login to like");
      return;
    }
    updateLikesOfBlog(blog.slug, getCookie("token")).then((res) => {
      console.log(res);
    });
  }

  return { handleLikes };
}

export default useHandleBlogData;
