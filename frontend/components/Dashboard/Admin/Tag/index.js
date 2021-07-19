import { useState, useEffect } from "react";
import { getCookie } from "../../../../actions/auth.action";
import { deleteTag, getAllTags } from "../../../../actions/tag.action";
import { generateResponseMessage } from "../../../../helpers/util.functions";
import ToastMessage from "../../../ToastMessage/ToastMessage";
import InputWithLabel from "../../../InputForm/InputWithLabel";
import { createNewTag } from "../../../../actions/tag.action";

function useManageTags() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    getTagsToShow();
  }, []);

  function getTagsToShow() {
    getAllTags()
      .then((res) => {
        setTags(res);
      })
      .catch((err) => console.log(err));
  }

  function removeTag(slug) {
    deleteTag(slug, getCookie("token"))
      .then((res) => {
        generateResponseMessage(res, setResponse, () => {
          getTagsToShow();
        });
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    setNewTag(e.target.value);
  }

  function createTag(e) {
    e.preventDefault();

    createNewTag({ name: newTag }, getCookie("token"))
      .then((res) => {
        generateResponseMessage(res, setResponse, () => {
          setNewTag("");
          getTagsToShow();
        });
      })
      .catch((err) => console.log(err));
  }

  return { handleChange, createTag, tags, newTag, response, removeTag };
}

const ManageTags = () => {
  const { handleChange, createTag, tags, newTag, response, removeTag } =
    useManageTags();

  return (
    <>
      <ToastMessage type={response.type} message={response.message} />
      <div>
        <form onSubmit={createTag}>
          <InputWithLabel
            label="Tags"
            inputType="text"
            handleChange={handleChange}
            inputValue={newTag}
            isRequired
          />
          <section className={`formSubmit`}>
            <button type="submit">Submit</button>
          </section>
        </form>
      </div>

      <div>
        <ul>
          {tags.map((tag) => {
            return (
              <li key={tag._id} onDoubleClick={() => removeTag(tag.slug)}>
                {tag.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ManageTags;
