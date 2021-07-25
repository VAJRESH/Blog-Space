import InputWithLabel from "../../../InputForm/InputWithLabel";
import ToastMessage from "../../../ToastMessage/ToastMessage";
import useManageTags from "../../Logic/useManageTags";

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
