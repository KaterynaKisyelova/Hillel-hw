import {
  ADD_TODO_ACTION,
  DELETE_TODO_ACTION,
  SWITCH_COMPLETENESS_ACTION,
} from "../actions/todo";

const INITIAL_STATE = {
  todoList: [
    { title: "asperiores xxxx ", done: true, id: "2" },
    { title: "eaque ipsa placeat yyy", done: true, id: "3" },
    { title: "delectus unde aliquam", done: true, id: "4" },
    { title: "fugit veritatis vel", done: true, id: "5" },
  ],
};

export default function todoReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ADD_TODO_ACTION:
      return { ...state, todoList: [...state.todoList, payload] };
    case DELETE_TODO_ACTION:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== payload),
      };
    case SWITCH_COMPLETENESS_ACTION:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    default:
      return state;
  }
}
