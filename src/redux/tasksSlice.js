import { createAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// export const addTask = newTask => {
//   return {
//     type: 'tasks/addTask',
//     payload: newTask,
//   };
// };

// export const deleteTask = taskId => {
//   return {
//     type: 'tasks/deleteTask',
//     payload: taskId,
//   };
// };

// export const toggleCompleted = taskId => {
//   return {
//     type: 'tasks/toggleCompleted',
//     payload: taskId,
//   };
// };

const slice = createSlice({
  name: 'tasks',

  initialState: {
    items: [
      { id: 0, text: 'Learn HTML and CSS', completed: true },
      { id: 1, text: 'Get good at JavaScript', completed: true },
      { id: 2, text: 'Master React', completed: false },
      { id: 3, text: 'Discover Redux', completed: false },
      { id: 4, text: 'Build amazing apps', completed: false },
    ],
  },

  reducers: {
    addTask: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    deleteTask: (state, action) => {
      return {
        ...state,
        items: state.items.filter(task => task.id !== action.payload),
      };
    },
    toggleCompleted: (state, action) => {
      return {
        ...state,
        items: state.items.map(task => {
          if (task.id !== action.payload) {
            return task;
          }
          return {
            ...task,
            completed: !task.completed,
          };
        }),
      };
    },
  },
});

export const { addTask, deleteTask, toggleCompleted } = slice.actions;
export default slice.reducer;

////////////////////////

// export const addTask = createAction('tasks/addTask');
// export const deleteTask = createAction('tasks/deleteTask');
// export const toggleCompleted = createAction('tasks/toggleCompleted');

// const initialState = {
//   items: [
//     { id: 0, text: 'Learn HTML and CSS', completed: true },
//     { id: 1, text: 'Get good at JavaScript', completed: true },
//     { id: 2, text: 'Master React', completed: false },
//     { id: 3, text: 'Discover Redux', completed: false },
//     { id: 4, text: 'Build amazing apps', completed: false },
//   ],
// };

// export default function tasksReducer(state = initialState, action) {
//   switch (action.type) {
//     //////  ADD reducer function /////////////
//     case 'tasks/addTask': {
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     }

//     //////  DELETE reducer function /////////////
//     case 'tasks/deleteTask': {
//       return {
//         ...state,
//         items: state.items.filter(task => task.id !== action.payload),
//       };
//     }

//     //////  CHECKBOX reducer function /////////////
//     case 'tasks/toggleCompleted':
//       return {
//         ...state,
//         items: state.items.map(task => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };

//     default:
//       return state;
//   }
// }
