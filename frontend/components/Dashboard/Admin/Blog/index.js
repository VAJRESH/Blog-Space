import { useState } from "react";
import { getCookie } from "../../../../actions/auth.action";
import { createNewBlog } from "../../../../actions/blog.action";
import InputWithLabel from "../../../InputForm/InputWithLabel";

function useCreateBlogs() {
  const [blog, setBlog] = useState();

  function handleChange(e) {
    setBlog({ ...blog, [e.target.name.toLowerCase()]: e.target.value });
  }

  function createBlog(e) {
    e.preventDefault();

    const formData = {
      title: "a",
      body: "s",
      tags: "sas,scas,asa,sd,c,ad,cav",
    };
    createNewBlog(formData, getCookie("token"))
      .then((res) => {
        generateResponseMessage(res, setResponse);
      })
      .catch((err) => console.log(err));
  }

  return { handleChange, createBlog };
}

const BlogCreate = () => {
  const { handleChange, createBlog } = useCreateBlogs();

  return (
    <div>
      <form onSubmit={createBlog}>
        <InputWithLabel
          label="Tags"
          inputType="text"
          handleChange={handleChange}
          //   isRequired
        />
        <section className={`formSubmit`}>
          <button type="submit">Submit</button>
        </section>
      </form>
    </div>
  );
};

export default BlogCreate;
