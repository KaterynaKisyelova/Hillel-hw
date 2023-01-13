export const ADD_TODO_ACTION = "ADD_TODO_ACTION";
export const DELETE_TODO_ACTION = "DELETE_TODO_ACTION";
export const SWITCH_COMPLETENESS_ACTION = "SWITCH_COMPLETENESS_ACTION";

export function addTodo(payload) {
  return { type: ADD_TODO_ACTION, payload };
}

export function deleteTodo(payload) {
  return { type: DELETE_TODO_ACTION, payload };
}

export function switchCompleteness(payload) {
  return { type: SWITCH_COMPLETENESS_ACTION, payload };
}
