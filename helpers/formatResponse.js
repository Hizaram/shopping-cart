const formatResponse = (object) => {
  const customer = {
    id: object._id,
    username: object.username,
    password: object.password,
  };
  return customer;
};

module.exports = formatResponse;
