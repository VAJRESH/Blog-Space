import { useEffect, useState } from "react";
import { getCookie } from "../../../actions/auth.action";
import {
  createNewTag,
  deleteTag,
  getAllTags,
} from "../../../actions/tag.action";
import { generateResponseMessage } from "../../../helpers/util.functions";

function useManageTags() {
  const [newTag, setNewTag] = useState("");
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

  function handleChange(e) {
    setNewTag(e.target.value);
  }

  function createTag(e) {
    e.preventDefault();

    createNewTag({ name: newTag }, getCookie("token"))
      .then((res) => {
        generateResponseMessage(res, setResponse, () => {
          setNewTag("");
          getTags();
        });
      })
      .catch((err) => console.log(err));
  }

  return { handleChange, tags, newTag, response, removeTag, createTag };
}

export default useManageTags;
