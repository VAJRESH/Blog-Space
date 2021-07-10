export function validateDetails(fieldName, fieldValue) {
  let errorMessage = false;

  if (fieldName === "name") {
    const minimumNameLength = 3;
    errorMessage = isInputLong(fieldValue, minimumNameLength)
      ? `Name should be at least ${minimumNameLength} characters!!`
      : false;
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
