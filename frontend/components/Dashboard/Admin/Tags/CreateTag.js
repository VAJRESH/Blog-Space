import { useState } from "react";
import { getCookie } from "../../../../actions/auth.action";
import { createNewTag } from "../../../../actions/tag.action";
import InputWithLabel from "../../../InputForm/InputWithLabel";
function useCreateTags() {
  const [tag, setTag] = useState();

  function handleChange(e) {
    setTag(e.target.value);
  }

  function createTag(e) {
    e.preventDefault();

    createNewTag({ name: tag }, getCookie("token"))
      .then((res) => {
        generateResponseMessage(res, setResponse);
      })
      .catch((err) => console.log(err));
  }

  return { handleChange, createTag };
}
const TagCreate = () => {
  const { handleChange, createTag } = useCreateTags();
  return (
    <div>
      <form onSubmit={createTag}>
        <InputWithLabel
          label="Tags"
          inputType="text"
          handleChange={handleChange}
          isRequired
        />
        <section className={`formSubmit`}>
          <button type="submit">Submit</button>
        </section>
      </form>
    </div>
  );
};

export default TagCreate;
