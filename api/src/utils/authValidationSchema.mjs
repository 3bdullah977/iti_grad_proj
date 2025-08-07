export const registerSchema = {
  username: {
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      errorMessage:
        "Username must be at least 3 characters and at most 20 characters",
      options: { min: 3, max: 20 },
    },
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
    notEmpty: {
      errorMessage: "Email must not be empty",
    },
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      errorMessage:
        "Password must be at least 8 characters and at most 20 characters",
      options: { min: 8, max: 20 },
    },
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
  },
};

// --------------------------------------------------

export const loginSchema = {
  email: {
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
    notEmpty: {
      errorMessage: "Email must not be empty",
    },
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      errorMessage:
        "Password must be at least 8 characters and at most 20 characters",
      options: { min: 8, max: 20 },
    },
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
  },
};
