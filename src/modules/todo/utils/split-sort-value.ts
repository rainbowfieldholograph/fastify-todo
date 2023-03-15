import { TodoSort, TodoSortFields, TodoSortTypes } from '../todo.constant';

export const splitSortValue = (sort: TodoSort) => {
  return sort.split('|') as [TodoSortFields, TodoSortTypes];
};
