const postUserSchema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['username', 'email', 'password'],
  },
};

const loginUserSchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
};

export { postUserSchema, loginUserSchema };
