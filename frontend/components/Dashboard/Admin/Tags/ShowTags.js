import { useState, useEffect } from "react";
import { getCookie } from "../../../../actions/auth.action";
import { deleteTag, getAllTags } from "../../../../actions/tag.action";
import { generateResponseMessage } from "../../../../helpers/util.functions";
import ToastMessage from "../../../ToastMessage/ToastMessage";

function useGetAllTags() {
  const [tags, setTags] = useState([]);
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    getTags();
  }, []);

  function getTags() {
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
          getTags();
        });
      })
      .catch((err) => console.log(err));
  }

  return { tags, response, removeTag };
}

const ShowTags = () => {
  const { tags, response, removeTag } = useGetAllTags();

  return (
    <div>
      <ToastMessage type={response.type} message={response.type} />
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
  );
};

export default ShowTags;
