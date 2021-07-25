import { getSingleBlog } from "../../actions/blog.action";
import BlogPage from "../../components/Blog/BlogPage/BlogPage";
import useHandleBlogData from "./Logic/useHandleBlogData";

const BlogPostPage = ({ blog }) => {
  const { handleLikes } = useHandleBlogData(blog);

  return (
    <>
      <BlogPage blog={blog} handleLikes={handleLikes} />
    </>
  );
};

BlogPostPage.getInitialProps = ({ query }) => {
  return getSingleBlog(query.slug).then((data) => {
    if (data.error) return console.log(data.error);

    return {
      blog: data,
    };
  });
};

export default BlogPostPage;
