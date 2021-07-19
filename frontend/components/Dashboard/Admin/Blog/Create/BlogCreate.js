import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../../../../node_modules/react-quill/dist/quill.snow.css";
import styles from "./BlogCreate.module.scss";

const BlogCreate = ({ handlers, data, tags }) => {
  const [handleTitle, handleBody, handleTags, createBlog] = handlers;

  return (
    <div className={`${styles.editorContainer}`}>
      <form onSubmit={createBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" onChange={handleTitle} />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={data.body}
            placeholder="write something amazing.."
            onChange={handleBody}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Create New Blog
          </button>
        </div>
      </form>

      <section>
        {tags.map((tag) => {
          return (
            <div key={tag._id}>
              <input
                type="checkbox"
                onChange={() => handleTags(tag._id)}
                name="tag"
                id="tag"
              />
              <label htmlFor="tag">{tag.name}</label>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default BlogCreate;

const QuillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

const QuillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
