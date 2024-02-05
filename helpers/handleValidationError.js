const formatErrorMessage = (requestBody) => {
  const error = {};
  const fieldNames = [
    'username',
    'password',
    'passwordConfirmation',
  ];

  fieldNames.forEach((field) => {
    if (!requestBody[field]) {
      error[field] = `Invalid ${field}`;
    }
  });
  return error;
};

const handleValidationError = (err, req) => {
  const errorObj = formatErrorMessage(req.body);
  const { errors } = err;

  if (errors.username) errorObj.username = 'username should be string';
  if (errors.password) errorObj.password = errors.password.message;
  if (errors.passwordConfirmation) {
    errorObj.passwordConfirmation = errors.passwordConfirmation.message;
  }
  return errorObj;
};

module.exports = handleValidationError;
