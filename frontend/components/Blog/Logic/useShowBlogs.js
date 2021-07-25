import { useCallback, useEffect, useRef, useState } from "react";
import { getAllBlogs } from "../../../actions/blog.action";

function useShowBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [skip, setSkip] = useState(0);
  const allBlogs = useRef({ blogs: [], total: 0 });

  useEffect(() => {
    loadBlogs(skip);
  }, []);

  function loadBlogs(countOfBlogsLoaded) {
    const skip = countOfBlogsLoaded;

    getAllBlogs(skip).then((res) => {
      console.log(res);
      allBlogs.current.blogs = [...allBlogs.current.blogs, ...res.blogs];
      allBlogs.current.total = res.total;
      setBlogs(allBlogs.current.blogs);
    });
  }

  // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
  const observer = useRef(null);
  const callBackForLoadingMore = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const blogsLoaded = allBlogs.current.blogs.length;
        const total = allBlogs.current.total;
        if (blogsLoaded >= total) return;

        setSkip(blogsLoaded);
        loadBlogs(blogsLoaded);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return { blogs, total: allBlogs.current.total, callBackForLoadingMore };
}

export default useShowBlogs;
