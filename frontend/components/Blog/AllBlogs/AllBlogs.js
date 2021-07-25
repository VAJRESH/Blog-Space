import React from "react";
import BlogCard from "../BlogCards/BlogCard";
import styles from "./AllBlogs.module.scss";
import useShowBlogs from '../Logic/useShowBlogs';

const AllBlogs = () => {
  const { blogs, total, callBackForLoadingMore } = useShowBlogs();

  return (
    <div className={styles.blogsContainer}>
      <section className={styles.blogs}>
        {blogs.map((blog, index) => {
          return (
            <React.Fragment key={blog._id}>
              <BlogCard blog={blog} />
              {index === blogs.length - 1 && index !== total - 1 && (
                <button ref={callBackForLoadingMore}>Load More</button>
              )}
            </React.Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default AllBlogs;
