const signupValidator = ({ email, password, name }) => {
  const errors = {
    email: "",
    password: "",
    name: "",
  };
  if (!email) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }
  if (!name) {
    errors.name = "Name is required";
  }
  return errors;
};

export default signupValidator;
