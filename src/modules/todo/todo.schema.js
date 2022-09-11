const postTodoSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['title', 'description'],
  },
};

const patchTodoSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      completed: { type: 'boolean' },
    },
  },
};

const putTodoSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      completed: { type: 'boolean' },
    },
    required: ['title', 'description', 'completed'],
  },
};

export { patchTodoSchema, postTodoSchema, putTodoSchema };
