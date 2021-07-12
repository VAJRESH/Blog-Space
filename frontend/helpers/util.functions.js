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
