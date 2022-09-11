const USER_RETURN_FIELDS = ['username', '_id', 'email'].join(' ');
const TODO_FIELD = 'todo';
const USER_WITH_TODO_RETURN_FIELDS = USER_RETURN_FIELDS.concat(
  ` ${TODO_FIELD}`
);

export { USER_RETURN_FIELDS, USER_WITH_TODO_RETURN_FIELDS, TODO_FIELD };
