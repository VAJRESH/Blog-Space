import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from "./BlogCreate.module.scss";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogEditor = ({ handlers, data, tags, isUpdate }) => {
  const [handleTitle, handleBody, handleTags, handleSubmit] = handlers;
  console.log(data);
  return (
    <div className={`${styles.editorContainer}`}>
      {/* editor */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={data.title}
            onChange={handleTitle}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            theme={"snow"}
            value={data.body}
            placeholder="write something amazing.."
            onChange={handleBody}
          />

          <p>
            {data.body.length >= 200 ? (
              <>Total Characters:{data.body.length}</>
            ) : (
              <>Minimum {200 - data.body.length} Characters required</>
            )}
          </p>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            {isUpdate ? "Update Blog" : "Create New Blog"}
          </button>
        </div>
      </form>

      <section>
        {tags.map((tag) => {
          return (
            <div key={tag._id}>
              <input
                type="checkbox"
                checked={data.tags.includes(tag._id)}
                onChange={() => handleTags(tag)}
                name="tag"
                id="tag"
              />
              <label htmlFor="tag">{tag.name}</label>
            </div>
          );
        })}
      </section>

      {/* preview */}
      <div>
        <h1>{data.title}</h1>
        <section>
          {data.tagNames.map((tag) => {
            return <span>{tag}</span>;
          })}
        </section>
        <ReactQuill value={data.body} readOnly={true} theme={"bubble"} />
      </div>
    </div>
  );
};

export default BlogEditor;

const QuillModules = {
  toolbar: [
    [{ header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
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
