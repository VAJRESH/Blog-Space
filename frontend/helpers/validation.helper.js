export function validateDetails(fieldName, fieldValue) {
  let errorMessage = false;

  if (fieldName === "name") {
    const minimumNameLength = 3;
    errorMessage = isInputLong(fieldValue, minimumNameLength)
      ? `Name should be at least ${minimumNameLength} characters!!`
      : false;
  } else if (fieldName === "username") {
    const minimumNameLength = 3;
    errorMessage = isInputLong(fieldValue, minimumNameLength)
      ? `Username should be at least ${minimumNameLength} characters!!`
      : false;
  } else if (fieldName === "email") {
    errorMessage = isValidEmail(fieldValue) ? false: `Enter a valid email!!`;
  } else if (fieldName === "password") {
    const minimumPasswordLength = 6;
    errorMessage = isInputLong(fieldValue, minimumPasswordLength)
      ? `Password should be at least ${minimumPasswordLength} characters!!`
      : false;
  }

  return errorMessage;
}

function isInputLong(value, length) {
  if (!value) return false;

  return value.length < length;
}

function isValidEmail(email) {
  if (!email) return false;

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}
