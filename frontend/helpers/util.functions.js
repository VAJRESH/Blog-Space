exports.generateResponseMessage = (
  responseObject,
  setStateFunction,
  successCallback = () => {}
) => {
  if (!responseObject)
    setStateFunction({ type: "info", message: "No Response" });

  if (responseObject) {
    if (responseObject.error) {
      setStateFunction({ type: "error", message: responseObject.error });
    } else if (responseObject.message) {
      setStateFunction({ type: "success", message: responseObject.message });
      successCallback();
    } else {
      setStateFunction({ type: "info", message: "No Message" });
    }
  }
};

exports.generateFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};
